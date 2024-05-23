import { useLayoutEffect, useState } from 'react';

import { quizList } from '../data';

import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import QuizForm from '@/components/widgets/QuizForm';
import QuizList from '@/components/widgets/QuizList';
import { IListQuiz, IQuiz } from '@/types';

export type FormData = {
  title: string;
  quizList: IQuiz[];
};

const App = () => {
  const [quizListInit, setQuizListInit] = useState<IListQuiz[]>();
  const [quizForEditing, setQuizForEditing] = useState<IListQuiz | null>(null);
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

  const editQuizHandler = (idx: string) => {
    const quizForEditing = quizListInit?.find((quiz) => quiz.id === idx);

    if (quizForEditing) {
      setQuizForEditing(quizForEditing);
      setIsFormOpen(true);
    }
  };

  const deleteQuizHandler = (id: string) => {
    const updatedList = quizListInit?.filter((item) => item.id !== id);

    setQuizListInit(updatedList);
    localStorage.setItem('reactQuizStorage', JSON.stringify(updatedList));
  };

  if (formIsOpen && quizListInit) {
    return (
      <QuizForm
        initedListQuiz={quizListInit}
        closeForm={() => setIsFormOpen(false)}
        initialValues={quizForEditing !== null ? quizForEditing : null}
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

        <Button
          variant="green"
          onClick={() => {
            setIsFormOpen(true);
            setQuizForEditing(null);
          }}
        >
          Add
        </Button>
      </div>
      {quizListInit && (
        <QuizList
          setIdForEditing={editQuizHandler}
          quizs={quizListInit}
          deleteQuiz={deleteQuizHandler}
        />
      )}
    </Container>
  );
};

export default App;
