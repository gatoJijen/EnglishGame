"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Question {
    question: string;
    image: string;
    answers: string[];
    correct: number;
}

const questions: Question[] = [
    {
        question: 'What is the capital of France?',
        image: 'https://imgs.search.brave.com/_byVSis4-7dLJiR8T3tjyq-djshjsQz4_L5sBBkWoN8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNy8w/Ni8wMi8xNS8wNC9m/cmVuY2gtZmxhZy0y/MzY2NTY2XzY0MC5q/cGc',
        answers: ['Paris', 'London', 'Berlin'],
        correct: 0,
    },
    {
        question: 'What is 2 + 2?',
        image: 'https://imgs.search.brave.com/ZqLAERbiVqTLSTTB_6zTDppCURt37PtEYXGCfPZuSmg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/Y291bnRpbmctbnVt/YmVyLTAtOS1tYXRo/LXN5bWJvbHNfMTMw/OC0xMDQ0OTkuanBn/P3NlbXQ9YWlzX2lu/Y29taW5nJnc9NzQw/JnE9ODA',
        answers: ['3', '4', '5'],
        correct: 1,
    },
    {
        question: 'Which planet is known as the Red Planet?',
        image: 'https://imgs.search.brave.com/OFfvdcoOV2uw0TMwUZcmBl24C8Gke66JAqPknF43nkc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/eW91dHViZS5jb20v/dmkvekYtZlFQaVRG/dFEvMC5qcGc',
        answers: ['Earth', 'Mars', 'Jupiter'],
        correct: 1,
    },
    {
        question: 'What is the largest ocean on Earth?',
        image: 'https://imgs.search.brave.com/V5ysR-7m_rMVX4m11D1i8bbWMg_TN6qcxa8si9OLdHM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hZG1p/bi5vY2Vhbm8uZGUv/d3AtY29udGVudC91/cGxvYWRzLzIwMjQv/MDUveW9nYS1ieXRo/ZXNlYS1vY2Vhbm8t/aG90ZWwtaGVhbHRo/LXNwYS10ZW5lcmlm/ZS01NzYtRE5HLTEw/MjR4NTc2LmpwZw',
        answers: ['Atlantic', 'Indian', 'Pacific'],
        correct: 2,
    },
    {
        question: 'Who wrote "Romeo and Juliet"?',
        image: 'https://imgs.search.brave.com/IzEVacuc22DAIIFf6H2HxhLU-Aa6R4nZvX3YMy3kj50/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM4/MTUyMTg5Ni9lcy9m/b3RvL2ZlbWFsZS15/b3VuZy1iZWhpbmQt/Ym9vay13aXRoLWZh/Y2UtY292ZXJlZC1m/b3ItYS1yZWQtYm9v/ay13aGlsZS1zbWls/aW5nLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1lTnpmQWc2/ZXNJMkxYNEtYWTJ3/QnVyU0trMm54Vk0z/Tm5zT3pObi1EQ3Bn/PQ',
        answers: ['Shakespeare', 'Dickens', 'Twain'],
        correct: 0,
    },
];

const GameQuiz: React.FC = () => {
    const [started, setStarted] = useState<boolean>(false);
    const [isScoreAnimated, setIsScoreAnimated] = useState<boolean>(false);
    const [isQuestionAnimated, setIsQuestionAnimated] = useState<boolean>(false);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [score, setScore] = useState<number>(0);

    useEffect(() => {
        if (score > 0 && score % 10 === 0) {
            setIsScoreAnimated(true);
            // Reset animation after 1 second
            const timeout = setTimeout(() => {
                setIsScoreAnimated(false);
            }, 500);
            return () => clearTimeout(timeout);
        }
    }, [score]);
    useEffect(() => {
        if (currentQuestion > 0 && currentQuestion % 1 === 0) {
            setIsQuestionAnimated(true);
            // Reset animation after 1 second
            const timeout = setTimeout(() => {
                setIsQuestionAnimated(false);
            }, 500);
            return () => clearTimeout(timeout);
        }
    }, [currentQuestion]);

    const handleAnswer = (index: number) => {
        if (index === questions[currentQuestion].correct) {
            setScore(score + 10);
        } else {
            setScore(score - 10);
        }
        if (currentQuestion < 5) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    if (!started) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-black">
                <h1 className="text-4xl font-bold mb-6">Game Quiz</h1>
                <button
                    onClick={() => { setStarted(true) }}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                    Start
                </button>
            </div>
        );
    }

    if (currentQuestion == 5) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-black">
                <h1 className="text-4xl font-bold mb-4">Game Over</h1>
                <p className="text-2xl">Your score: {score}</p>
                <button onClick={() => { setScore(0); setStarted(false); setCurrentQuestion(0) }} className='px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition'>Retry</button>
                <Link href={"/"}><button className='px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition'>Home</button></Link>
            </div>
        );
    }

    const question = questions[currentQuestion];

    return (
        <div className={`flex h-dvh w-dvw bg-black flex-col md:flex-row items-center justify-center min-h-screen p-4`}>
            <strong className={`${isQuestionAnimated ? 'bg-white/20 animate-pulse' : 'bg-transparent'}  w-[90dvw] absolute text-2xl top-[5dvh] left-[5dvw] `}> Points: <strong className={`transition duration-500  ${isScoreAnimated ? 'text-green-500 animate-bounce' : 'text-orange-400'
                }`}>{score}</strong></strong>
            <section className={`w-full h-[60%] flex:col md:flex items-center z-50  justify-center min-h-screen p-4 `}>
                <article className="w-[30%] flex justify-center mb-4 md:mb-0">
                    <img
                        src={question.image}
                        alt="Question"
                        className="w-full max-w-xs md:max-w-md h-auto rounded-lg shadow-md"
                    />
                </article>
                <article className="w-[50%] mb-6 flex flex-col gap-6 justify-center items-center">
                    <h2 className="text-2xl font-semibold flex text-center h-full ml-36 justify-center w-full">{question.question}</h2>
                    <section className="flex flex-col gap-4 w-full max-w-xs">
                        {question.answers.map((answer, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswer(index)}
                                className="px-4 py-2 w-[500px] cursor-pointer bg-blue-500 h-[50px] text-white rounded-lg hover:bg-blue-600 transition-all"
                            >
                                <strong>{answer}</strong>
                            </button>
                        ))}
                    </section>
                </article>
            </section>

        </div>
    );
};

export default GameQuiz;
