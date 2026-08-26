"use-client";

import { useQuiz } from "@/context/QuizContext";

export const StartPanel = () => {
    const { startQuiz } = useQuiz();

    return (
       <div className="flex">
            <button onClick={startQuiz} className="bg-[#E30101] px-2.5 py-2 lg:py-4 font-bold rounded-xl text-md lg:text-lg">Start Quiz</button>
       </div>
    )
}