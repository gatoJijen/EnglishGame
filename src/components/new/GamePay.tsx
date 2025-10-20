import React, { useState } from 'react'

interface Props {
    quest: string;

}

const GamePay = () => {
    
    const [showResults, setShowResults] = useState(false);

    return (
        <section className='w-[60dvw] h-[60dvh] bg-white/20 '>
            {!showResults ? (
                <section className="flex flex-col w-[75dvw]">
                    <h2 className="text-xl mb-4">{currentQuestion.quest}</h2>
                    <ul className="flex flex-col gap-2">
                        {options.map((option, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleAnswer(option)}
                                disabled={isAnswered}
                                className={`p-2 border rounded ${isAnswered ? (option === currentQuestion.correct ? "bg-green-500" : option === selectedOption ? "bg-red-500" : "") : ""}`}
                            >
                                {option}
                            </button>
                        ))}
                    </ul>
                    {isAnswered && (
                        <button onClick={handleNext} className="mt-4 p-2 bg-blue-500 text-white rounded">
                            {currentQuestionIndex + 1 === totalQuestions ? "Ver resultados" : "Siguiente"}
                        </button>
                    )}
                </section>
            ) : (
                <section className="flex flex-col w-[75dvw]">
                    <p>Preguntas correctas: {correctCount}</p>
                    <p>Preguntas incorrectas: {incorrectCount}</p>
                    <p>Puntaje final: {score}</p>
                    <button onClick={handleFinalize} className="mt-4 p-2 bg-green-500 text-white rounded">
                        Finalizar
                    </button>
                </section>
            )}
        </section>
    )
}

export default GamePay