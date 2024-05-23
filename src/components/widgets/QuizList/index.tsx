import { FC, useState } from 'react';

import Button from '@/components/ui/Button';
import Quiz from '@/components/widgets/Quiz';
import { IListQuiz } from '@/types';

interface Props {
  quizs: IListQuiz[];
}

const QuizList: FC<Props> = ({ quizs }) => {
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
    <div className="flex flex-col gap-10 w-full">
      <div className="flex flex-col gap-3 w-full">
        {quizs?.map((quiz, i) => (
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
