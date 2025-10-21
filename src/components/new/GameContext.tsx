import { createContext, useContext, useState, ReactNode } from 'react';

interface Question {
  quest: string;
  correct: string;
  incorrects: string[];
}

interface GameState {
  currentQuestionIndex: number;
  score: number;
  setCurrentQuestionIndex: (index: number) => void;
  setScore: (score: number) => void;
  userAnswers: string[];
  setUserAnswers: (answers: string[]) => void;
  isAnswered: boolean;
  setIsAnswered: (answered: boolean) => void;
  selectedOption: string;
  setSelectedOption: (option: string) => void;
  showResults: boolean;
  setShowResults: (show: boolean) => void;
  shuffledQuestions: Question[];
  setShuffledQuestions: (questions: Question[]) => void;
}

const GameContext = createContext<GameState | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);

  return (
    <GameContext.Provider
      value={{
        currentQuestionIndex,
        setCurrentQuestionIndex,
        score,
        setScore,
        userAnswers,
        setUserAnswers,
        isAnswered,
        setIsAnswered,
        selectedOption,
        setSelectedOption,
        showResults,
        setShowResults,
        shuffledQuestions,
        setShuffledQuestions,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};