"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/firebase/config";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
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
  resources?: any[];
}

interface GamePayProps {
  game: Game | null;
  userData: UserData | null;
  userDocId: string;
}

const GamePay = ({ game, userData, userDocId }: GamePayProps) => {
  const router = useRouter();
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("");

  // Baraja las preguntas una vez que se carga el juego
  useEffect(() => {
    if (game && game.quests) {
      const totalQuestions = game.grade === 6 ? 5 : game.grade === 8 ? 10 : game.grade === 10 ? 15 : 0;
      const shuffled = [...game.quests].sort(() => Math.random() - 0.5).slice(0, totalQuestions);
      setShuffledQuestions(shuffled);
    }
  }, [game]);

  if (!game || !userData || shuffledQuestions.length === 0) {
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
    <section className="flex flex-col w-[60dvw] bg-white/10 rounded-xl primary-text">
      {!showResults ? (
        <section className="flex flex-col p-4">
          <header>
            <h2 className="text-3xl mb-4">{currentQuestion.quest}</h2>
          </header>
          <ul className="flex flex-col gap-2 justify-center items-center">
            {options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option)}
                disabled={isAnswered}
                className={`p-2 px-4 cursor-pointer bg-gray-500 rounded w-full text-left ${
                  isAnswered
                    ? option === currentQuestion.correct
                      ? "bg-green-500 text-white"
                      : option === selectedOption
                      ? "bg-red-500 text-white"
                      : "bg-gray-200"
                    : "hover:bg-gray-600"
                }`}
              >
                {option}
              </button>
            ))}
          </ul>
          <footer>
            {isAnswered && (
              <button
                onClick={handleNext}
                className="mt-4 p-2 bg-blue-400 cursor-pointer hover:bg-blue-600 transition-all font-bold text-white rounded w-full"
              >
                {currentQuestionIndex + 1 === totalQuestions ? "Ver resultados" : "Siguiente"}
              </button>
            )}
          </footer>
        </section>
      ) : (
        <section className="flex flex-col p-4">
          <p className="text-lg">Preguntas correctas: {correctCount}</p>
          <p className="text-lg">Preguntas incorrectas: {incorrectCount}</p>
          <p className="text-lg">Puntaje final: {score}</p>
          <button
            onClick={handleFinalize}
            className="mt-4 p-2 bg-green-500 cursor-pointer text-white rounded w-full"
          >
            Finalizar
          </button>
        </section>
      )}
    </section>
  );
};

export default GamePay;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */