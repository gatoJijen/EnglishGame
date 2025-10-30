"use client";

import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "@/firebase/config";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import NavBarInit from "@/components/new/NavBarInit";
import CategoryHeader from "@/components/new/CategoryHeader";
import Link from "next/link";
import GamesCard from "@/components/new/GamesCard";
import InWork from "@/components/new/InWork";

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
  categoria: string;
}

const Page = ({ params }: { params: Promise<{ categories: string }> }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [uid, setUid] = useState<string>("");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [category, setCategory] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryParam, setCategoryParam] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

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
            setUserData({
              email: docData.email || "",
              año: docData.año || "",
              grado: docData.grado || "",
              colegio: docData.colegio || "",
              displayName: docData.displayName || "",
              image: docData.image || "",
              plan: docData.plan || "test",
              categoria: docData.categoria || "",
            });
          }
        }
      } catch (error) {
        console.error("Error obteniendo datos del usuario:", error);
      }
    };

    fetchUserData();
  }, [uid]);

  // Obtiene los juegos según la categoría
  useEffect(() => {
    let unsubscribe: () => void;

    const fetchParams = async () => {
      try {
        const resolvedParams = await params;
        setCategoryParam(resolvedParams.categories);

        if (resolvedParams.categories) {
          setLoading(true);
          const q = query(
            collection(db, "games"),
            where("type", "==", resolvedParams.categories)
          );

          unsubscribe = onSnapshot(
            q,
            (querySnapshot) => {
              const results: Game[] = [];
              querySnapshot.forEach((doc) => {
                results.push({ id: doc.id, ...doc.data() } as Game);
              });
              setCategory(results);
              setLoading(false);
            },
            (err) => {
              setError(err.message);
              setLoading(false);
            }
          );
        } else {
          setLoading(false); // Si no hay categoría, termina la carga
          setCategory([]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
        setLoading(false);
      }
    };

    fetchParams();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

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
          <p>Error: {error}</p>
        </main>
      </section>
    );
  }

  const gradeMap: Record<string, number> = {
    easy: 6,
    intermediate: 8,
    challenge: 10,
  };

  const filteredGames = selectedFilter
    ? category.filter((game) => game.grade === gradeMap[selectedFilter])
    : category;

  return (
    <section className="flex flex-col overflow-hidden justify-center">
      <NavBarInit
        ul={true}
        button={true}
        user={userData?.displayName || "Usuario"}
        img={userData?.image || "https://www.instagram.com/static/images/text_app/profile_picture/profile_pic.png/72f3228a91ee.png"}
      />
      {category.length > 0 ? (
        <main className="flex flex-col justify-center items-center overflow-hidden">
          <section className="flex flex-col w-[75dvw] nCategoriesGames">
            <CategoryHeader title={categoryParam || "Categoría"} />

            <div className="flex gap-4 mb-4 flex-wrap w-full">
              <button
                className={`px-4 py-2 rounded primary-text cursor-pointer transition-all ${selectedFilter === null ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-600 hover:bg-gray-600/20'}`}
                onClick={() => setSelectedFilter(null)}
              >
                Todos
              </button>
              <button
                className={`px-4 py-2 rounded primary-text cursor-pointer transition-all ${selectedFilter === 'easy' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-600 hover:bg-gray-600/20'}`}
                onClick={() => setSelectedFilter('easy')}
              >
                Easy
              </button>
              <button
                className={`px-4 py-2 rounded primary-text cursor-pointer transition-all ${selectedFilter === 'intermediate' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-600 hover:bg-gray-600/20'}`}
                onClick={() => setSelectedFilter('intermediate')}
              >
                Intermediate
              </button>
              <button
                className={`px-4 py-2 rounded primary-text cursor-pointer transition-all ${selectedFilter === 'challenge' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-600 hover:bg-gray-600/20'}`}
                onClick={() => setSelectedFilter('challenge')}
              >
                Challenge
              </button>
            </div>

            <ul className="flex flex-col gap-4">
              {filteredGames.map((game) => (
                  <GamesCard
                    title={game.title}
                    description={game.description}
                    url={`/${game.url}.png`}
                    url2={`${game.url}`}
                    type={game.type}
                    categoryId={game.id}
                    grade={game.grade}
                    quests={game.quests}
                    reference={`/dashboard/games/${game.id}`}
                    key={game.id}
                  />
              ))}
            </ul>
          </section>
        </main>
      ) : (
        <InWork />
      )}
    </section>
  );
};

export default Page;