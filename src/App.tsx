import { useLayoutEffect, useState } from 'react';

import { quizList } from '../data';

import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import QuizForm from '@/components/widgets/QuizForm';
import QuizList from '@/components/widgets/QuizList';
import { IListQuiz, IQuiz } from '@/types';

export type FormData = {
  quizTitle: string;
  quizList: IQuiz[];
};

const App = () => {
  const [quizListInit, setQuizListInit] = useState<IListQuiz[]>();
  const [formIsOpen, setIsFormOpen] = useState(false);

  useLayoutEffect(() => {
    const reactQuizStorage = localStorage.getItem('reactQuizStorage');

    if (reactQuizStorage === null) {
      localStorage.setItem('reactQuizStorage', JSON.stringify(quizList));
      setQuizListInit(quizList);
    } else {
      setQuizListInit(JSON.parse(reactQuizStorage));
    }
  }, []);

  if (formIsOpen && quizListInit) {
    return (
      <QuizForm
        initedListQuiz={quizListInit}
        closeForm={() => setIsFormOpen(false)}
        updateStorage={(quizList: IListQuiz[]) => setQuizListInit(quizList)}
      />
    );
  }

  return (
    <Container className="flex flex-col items-start w-full min-h-screen py-10">
      <div className="flex justify-between w-full items-center gap-5 mb-10">
        {!formIsOpen && (
          <p className="text-4xl font-semibold">
            Quiz&apos;s{' '}
            <span className="p-1 px-3 bg-gray-700 rounded-md text-lg">
              {quizListInit?.length || 0}
            </span>{' '}
          </p>
        )}

        <Button variant="green" onClick={() => setIsFormOpen(true)}>
          Add
        </Button>
      </div>
      {quizListInit && <QuizList quizs={quizListInit} />}
    </Container>
  );
};

export default App;
