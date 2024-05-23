import { FC, useState } from 'react';

import { quizList } from '../../../../data';

import Button from '@/components/ui/Button';
import Quiz from '@/components/widgets/Quiz';
import { IListQuiz, IQuiz } from '@/types';

const QuizList: FC = () => {
  const [currentQuiz, setCurrentQuiz] = useState<null | number>(null);

  if (currentQuiz !== null) {
    return (
      <Quiz
        quiz={quizList[currentQuiz] || ({} as IListQuiz)}
        closeQuiz={() => setCurrentQuiz(null)}
      />
    );
  }

  return (
    <div className="flex flex-col gap-10 w-full">
      <div className="">
        <p className="text-2xl font-semibold">
          Quiz's{' '}
          <span className="p-1 px-3 bg-gray-700 rounded-md text-lg">
            {quizList.length}
          </span>{' '}
        </p>
      </div>
      <div className="flex flex-col gap-3 w-full">
        {quizList.map((quiz, i) => (
          <Button key={quiz.id} variant="clear" onClick={() => setCurrentQuiz(i)}>
            <div className="px-2 py-4 bg-gray-700 hover:bg-gray-600 duration-100 rounded-md w-full">
              <p>{quiz?.title}</p>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuizList;
