import YouTubePlayer from "@/components/quiz/YouTubePlayer";

import { QuizPanel } from "@/components/quiz/QuizPanel";

import { prisma } from "@/src/lib/prisma";

import { QuizContent } from "./QuizContent";

export default async function QuizPage({ params }: { params: { quizId: string } }) {
    const { quizId } = await params;

    const quiz = await prisma.quiz.findUnique({
      where: { youtubeId: quizId },
      include: {
        questions: {
          orderBy: { startTime: "asc" },
          include: {
            choices: { orderBy: { order: "asc" }},
            correctChoice: true,
          },
        },
      },
    });

    if (!quiz) {
      return (
        <div>No Quiz</div>
      )
    }

    console.log('quizId', quizId)
    console.log('quiz', quiz)
  
    return (
      <QuizContent quiz={quiz} quizId={quizId} />
      // <div className="text-white flex flex-col gap-6 p-6 max-xl:p-4 w-full">
      //   <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-2 xl:gap-4 w-full align-top justify-center">
      //       {/* <div className="relative aspect-video min-w-0 flex-1 basis-0"> */}
      //       <div className="w-full aspect-video md:w-[640] lg:w-[768px]">
      //         <YouTubePlayer videoId={quizId} />
      //       </div>
      //       <QuizPanel />
      //   </div>
        

  
      //   {/* Right column: Leaderboard + instructions */}
      //   <div className="w-full  bg-[#161F22] rounded-2xl shadow-lg p-4">
      //     <h2 className="text-xl font-bold text-[#E30101] mb-3">🏆 Leaderboard</h2>
      //     {/* <Leaderboard quizId={quizId} /> */}
      //   </div>
      // </div>
    );
  }