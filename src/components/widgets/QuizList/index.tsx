import { FC, useState } from 'react';

import trashbin from '@/assets/icons/delete.svg?react';
import edit from '@/assets/icons/edit.svg?react';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import { Skeleton } from '@/components/ui/Skeleton';
import Quiz from '@/components/widgets/Quiz';
import { IListQuiz } from '@/types';

interface Props {
  quizs: IListQuiz[];
  deleteQuiz: (idx: string) => void;
  setIdForEditing: (idx: string) => void;
  setIsQuizStarted: () => void;
  resetQuiz: () => void;
  isLoading: boolean;
}

const QuizList: FC<Props> = ({
  quizs,
  deleteQuiz,
  setIdForEditing,
  setIsQuizStarted,
  resetQuiz,
  isLoading,
}) => {
  const [currentQuiz, setCurrentQuiz] = useState<null | number>(null);

  const quizStartHandle = (idx: number) => {
    setIsQuizStarted();
    setCurrentQuiz(idx);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col items-center max-w-[750px] gap-3 w-full">
          {Array(3)
            .fill(null)
            .map((_, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <Skeleton key={i} width="100%" height="50px" border="8" />
            ))}
        </div>
      </div>
    );
  }

  if (currentQuiz !== null) {
    return (
      <Quiz
        quiz={quizs[currentQuiz] || ({} as IListQuiz)}
        closeQuiz={() => {
          setCurrentQuiz(null);
          resetQuiz();
        }}
      />
    );
  }

  if (quizs.length === 0) {
    return <h2 className="text-2xl mx-auto mt-5">There is no quiz&apos;s yet</h2>;
  }

  return (
    <section className="flex flex-col items-center gap-10 w-full">
      <ul className="flex flex-col items-center max-w-[750px] gap-3 w-full">
        {quizs?.map((quiz, i) => (
          <li
            key={quiz.id}
            className="flex justify-between items-center px-2 py-4 bg-gray-700 group rounded-md w-full"
          >
            <Button variant="clear" onClick={() => quizStartHandle(i)} className="">
              {quiz?.title}
            </Button>
            <div className="flex gap-2">
              <Button variant="clear" onClick={() => setIdForEditing(quiz.id)}>
                <Icon
                  Svg={edit}
                  className="!stroke-blue-500 hover:!stroke-blue-400 duration-100"
                />
              </Button>
              <Button variant="clear" onClick={() => deleteQuiz(quiz.id)}>
                <Icon
                  Svg={trashbin}
                  className="!stroke-red-500 hover:!stroke-red-400 duration-100"
                />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default QuizList;
