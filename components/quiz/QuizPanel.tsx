"use client";

import { useQuiz } from "@/context/QuizContext"
import { StartPanel } from "./StartPanel";

export interface Choice {
    id: string;
    questionId: string;
    text: string;
    order: number;
  }

export const QuizPanel = () => {

    const { player, currentQuestionIndex, quiz, score, selectAnswer } = useQuiz();

    console.log('currentQuestionIndex', currentQuestionIndex);

    if (currentQuestionIndex === null) return (
        <div className="p-6 max-xl:p-5 shrink-0 w-full sm:w-[500px] md:w-[640px] lg:w-[225px] xl:w-[250px] h-full align-middle gap-5 lg:gap-7 flex flex-col md:flex-row lg:flex-col border border-[#21272A] rounded-xl bg-[#080E11]">
            <StartPanel />
        </div>
    )

    const currentQuestion = quiz?.questions[currentQuestionIndex];

    


    const testHandleClick = () => {
        player?.playVideo();
    }

    return (
        <div className="p-6 max-xl:p-5 shrink-0 w-full sm:w-[500px] md:w-[640px] lg:w-[225px] xl:w-[250px] h-full align-middle gap-5 lg:gap-7 flex flex-col md:flex-row lg:flex-col border border-[#21272A] rounded-xl bg-[#080E11]">
                <div className="flex flex-col gap-4 md:hidden">
                    <button className="bg-[#E30101] px-2.5 py-2 lg:py-4 font-bold rounded-xl text-md lg:text-lg">Michael Jordan</button>
                    <button className="bg-[#E30101] px-2.5 py-2 lg:py-4 font-bold rounded-xl text-md lg:text-lg">Kobe Bryant</button>
                    <button className="bg-[#E30101] px-2.5 py-2 lg:py-4 font-bold rounded-xl text-md lg:text-lg">Steph Curry</button>
                </div>
                <div className="flex justify-between gap-4 md:gap-5 lg:gap-0">
                    <div className="bg-[#060B0D] border border-[#1F2427] py-4 px-4 md:px-2 lg:px-4 rounded-lg text-center">
                        <p className="font-bold text-sm text-[#CDCECE]">Score</p>
                        <p className="font-bold text-xl">{score}</p>
                    </div>
                    <div className="bg-[#060B0D] border border-[#1F2427] py-4 px-4 md:px-2 lg:px-4 rounded-lg text-center">
                        <p className="font-bold text-sm text-[#CDCECE]">Time</p>
                        <p className="font-bold text-xl">1:50</p>
                    </div>
                </div>
                <div className="flex flex-row md:flex-col lg:flex-row p-2  border border-[#1F2427] rounded-lg justify-between">
                    <p className="font-bold text-sm text-[#CDCECE]">Progress</p>
                    <p className="font-bold text-sm">10 of 20</p>
                </div>
                
                <div className="hidden md:flex flex-row lg:flex-col gap-4">
                {currentQuestion && currentQuestion.choices.map((choice: Choice) => (
                    <button key={choice.id} className="bg-[#E30101] px-2.5 py-4 md:py-2 lg:py-4 font-bold rounded-xl text-md lg:text-lg" onClick={() => selectAnswer(choice)}>{choice.text}</button>
                ))}

                    
                </div>
                
                {/* <button className="bg-[#E30101] px-2.5 py-4 font-bold rounded-xl">Play Now</button> */}
                
            </div>
    )
}