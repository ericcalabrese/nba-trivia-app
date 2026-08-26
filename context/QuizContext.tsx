"use client";

import { createContext, useContext, useState, Dispatch, SetStateAction, useEffect } from "react";
// import { QuizType, QuestionType } from "@/types";
// import { }

export interface Choice {
  id: string;
  questionId: string;
  text: string;
  order: number;
}

export interface Question {
  id: string;
  quizId: string;
  text: string;
  startTime: number;
  endTime: number;
  choices: Choice[];
  correctChoiceId: string;
  correctChoice: Choice;
}

interface Quiz {
  id: string;
  youtubeId: string;
  title: string;
  createdAt: Date;
  questions: Question[];
}

type QuizContextType = {
    player: YT.Player | null; 
    setPlayer: Dispatch<SetStateAction<YT.Player | null>>;
    startQuiz: () => void;
    handleStateChange: (event: YT.OnStateChangeEvent) => void;

  quiz: Quiz | null;
//   started: boolean;
//   finished: boolean;
  score: number;
  currentQuestionIndex: number | null;
//   selectedAnswer: string | null;
//   currentTime: number;
//   currentQuestion: QuestionType | null;
//   startQuiz: () => void;
  selectAnswer: (choice: Choice) => void;
//   setCurrentTime: (time: number) => void;
//   resetQuiz: () => void;
};

const QuizContext = createContext<QuizContextType | null>(null);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function QuizProvider({ children, quizData }: { children: React.ReactNode; quizData: any }) {
    const [player, setPlayer] = useState<YT.Player | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [quiz, setQuiz ] = useState(quizData);

    const startQuiz = () => player?.playVideo();

    const handleStateChange = (event: YT.OnStateChangeEvent) => {
      setIsPlaying(event.data === YT.PlayerState.PLAYING);
    };



//   const [started, setStarted] = useState(false);
//   const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
//   const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
//   const [currentTime, setCurrentTime] = useState(0);

    // useEffect(() => {
    //   if (!quizData) return;

    //   setQuiz(quizData)
    // }, [quizData])

  // const questions = quiz?.questions || [];
  // const currentQuestion = questions[currentQuestionIndex] || null;

  // Only run interval when video is playing
  useEffect(() => {
    if (!player || !isPlaying) return;

    const interval = setInterval(() => {
      const time = player.getCurrentTime();
      console.log('time', time);
      //   setCurrentTime(time);
    
      const nextIndex = quiz.questions.findIndex((q: { startTime: number; endTime: number; }) =>
        time >= q.startTime && time < q.endTime
      );

      // if (nextIndex === 0) nextIndex++


      console.log('nextIndex', nextIndex);
  
      if (nextIndex !== -1 && nextIndex !== currentQuestionIndex) {
        console.log('nextIndex', nextIndex);
        setCurrentQuestionIndex(nextIndex);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [player, isPlaying, currentQuestionIndex, quiz]);

  console.log('currentQuestionIndex',currentQuestionIndex)

  const selectAnswer = (choice: Choice) => {
    console.log('inside', choice)
    setScore(score => score + 1)
  }

  return (
    <QuizContext.Provider
      value={{
        player,
        setPlayer,
        startQuiz,
        handleStateChange,
        currentQuestionIndex,
        quiz,

        // started,
        // finished,
        score,
        // currentQuestionIndex,
        // selectedAnswer,
        // currentTime,
        // currentQuestion,
        // startQuiz,
        selectAnswer,
        // setCurrentTime,
        // resetQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) throw new Error("useQuiz must be used within QuizProvider");
  return context;
};
