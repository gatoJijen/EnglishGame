"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { collection, getDocs, query, where, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { auth, db } from "@/firebase/config";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import NavBarInit from "@/components/new/NavBarInit";
import CategoryHeader from "@/components/new/CategoryHeader";
import InWork from "@/components/new/InWork";
import NavGame from "@/components/new/NavGame";
import GamePay from "@/components/new/GamePay";

interface Question {
  quest: string;
  correct: string;
  incorrects: string[];
}

interface Game {
  title: string;
  description: string;
  type: string;
  url: string;
  categoryId: string;
  quests: Question[];
  grade: number;
  id: string;
}

interface UserData {
  año: string;
  plan: string;
  grado: string;
  colegio: string;
  displayName: string;
  image: string;
  email: string;
  resources: any[];
  categoria: string;
}

const Page = ({ params }: { params: Promise<{ games: string }> }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [uid, setUid] = useState<string>("");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userDocId, setUserDocId] = useState<string>("");
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false) ;
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [pSolved, setPSolved] = useState<{games:string}>()

  // Redirige al usuario si no está autenticado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setUid(currentUser?.uid || "");
      if (!currentUser) {
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, [router]);

  // Obtiene los datos del usuario desde Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (uid) {
          const usersRef = collection(db, "users");
          const q = query(usersRef, where("uid", "==", uid));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const docData = querySnapshot.docs[0].data();
            setUserDocId(querySnapshot.docs[0].id);
            setUserData({
              email: docData.email || "",
              año: docData.año || "",
              grado: docData.grado || "",
              colegio: docData.colegio || "",
              displayName: docData.displayName || "",
              image: docData.image || "",
              plan: docData.plan || "test",
              categoria: docData.categoria || "",
              resources: docData.resources || "",
            });
          }
        }
      } catch (error) {
        console.error("Error obteniendo datos del usuario:", error);
      }
    };

    fetchUserData();
  }, [uid]);

  // Obtiene el juego específico por ID
  useEffect(() => {
    const fetchGame = async () => {
      try {
        const resolvedParams = await params;
        setPSolved(resolvedParams)
        const gameId = resolvedParams.games;

        if (gameId) {
          setLoading(true);
          const gameRef = doc(db, "games", gameId);
          const gameSnap = await getDoc(gameRef);

          if (gameSnap.exists()) {
            setGame({ id: gameSnap.id, ...gameSnap.data() } as Game);
          } else {
            setError("Juego no encontrado");
          }
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
        setLoading(false);
      }
    };

    fetchGame();
  }, [params]);

  // Baraja las preguntas una vez que se carga el juego
  useEffect(() => {
    if (game) {
      const totalQuestions = game.grade === 6 ? 5 : game.grade === 8 ? 10 : game.grade === 10 ? 15 : 0;
      const shuffled = [...game.quests].sort(() => Math.random() - 0.5).slice(0, totalQuestions);
      setShuffledQuestions(shuffled);
    }
  }, [game]);

  if (loading || !userData) {
    return <Loading />;
  }

  if (error) {
    return (
      <section>
        <NavBarInit
          ul={true}
          button={true}
          user={userData?.displayName || "Usuario"}
          img={userData?.image || "https://www.instagram.com/static/images/text_app/profile_picture/profile_pic.png/72f3228a91ee.png"}
        />
        <main>
          <InWork/>
        </main>
      </section>
    );
  }

  if (!game || shuffledQuestions.length === 0) {
    return <InWork />;
  }

  const totalQuestions = shuffledQuestions.length;
  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const options = [...currentQuestion.incorrects, currentQuestion.correct].sort(() => Math.random() - 0.5);

  const handleAnswer = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);
    setUserAnswers([...userAnswers, option]);
    if (option === currentQuestion.correct) {
      setScore(score + 10);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex + 1 < totalQuestions) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsAnswered(false);
      setSelectedOption("");
    } else {
      setShowResults(true);
    }
  };

  const handleFinalize = async () => {
    try {
      const userRef = doc(db, "users", userDocId);
      await updateDoc(userRef, {
        resources: arrayUnion(score),
      });
      router.push(`/dashboard/categories/${game.type}`);
    } catch (err) {
      console.error("Error actualizando recursos del usuario:", err);
    }
  };

  const correctCount = userAnswers.filter((answer, index) => answer === shuffledQuestions[index].correct).length;
  const incorrectCount = totalQuestions - correctCount;

  return (
    <section className="flex flex-col overflow-hidden justify-center">
      <NavGame
      title={game.title}
      ref={`/dashboard/categories/${game.type}`}
      points={score}
      rounds={currentQuestionIndex + 1}
      totalR={totalQuestions}
      />
      <main className="flex h-[75dvh] flex-col justify-center items-center overflow-hidden">
        <GamePay  game={game} userData={userData} userDocId={userDocId}/>
      </main>
    </section>
  );
};

export default Page;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */