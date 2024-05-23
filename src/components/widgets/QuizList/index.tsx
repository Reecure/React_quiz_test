import { FC, useState } from 'react';

import trashbin from '@/assets/delete.svg?react';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import Quiz from '@/components/widgets/Quiz';
import { IListQuiz } from '@/types';

interface Props {
  quizs: IListQuiz[];
  deleteQuiz: (idx: string) => void;
}

const QuizList: FC<Props> = ({ quizs, deleteQuiz }) => {
  const [currentQuiz, setCurrentQuiz] = useState<null | number>(null);

  if (currentQuiz !== null) {
    return (
      <Quiz
        quiz={quizs[currentQuiz] || ({} as IListQuiz)}
        closeQuiz={() => setCurrentQuiz(null)}
      />
    );
  }

  return (
    <div className="flex flex-col items-center  gap-10 w-full">
      <div className="flex flex-col items-center max-w-[450px] gap-3 w-full">
        {quizs?.map((quiz, i) => (
          <div
            key={quiz.id}
            className="flex justify-between items-center px-2 py-4 bg-gray-700 group rounded-md w-full"
          >
            <Button variant="clear" onClick={() => setCurrentQuiz(i)} className="">
              {quiz?.title}
            </Button>
            <div>
              <Icon
                Svg={trashbin}
                clickable
                onClick={() => deleteQuiz(quiz.id)}
                className="!stroke-red-500"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizList;
