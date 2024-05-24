import { useEffect, useState } from 'react';

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

const throttleDelete = () => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};

const App = () => {
  const [quizListInit, setQuizListInit] = useState<IListQuiz[]>();
  const [quizForEditing, setQuizForEditing] = useState<IListQuiz | null>(null);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [formIsOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      return new Promise<IListQuiz[]>((resolve) => {
        const reactQuizStorage = localStorage.getItem('reactQuizStorage');

        setTimeout(() => {
          if (reactQuizStorage === null) {
            localStorage.setItem('reactQuizStorage', JSON.stringify(quizList));
            resolve(quizList);
          } else {
            resolve(JSON.parse(reactQuizStorage));
          }
        }, 1000); // Simulating a 2-second delay
      });
    };

    fetchData().then((data) => {
      setQuizListInit(data);
      setIsLoading(false);
    });
  }, []);

  const editQuizHandler = (idx: string) => {
    const quizForEditing = quizListInit?.find((quiz) => quiz.id === idx);

    if (quizForEditing) {
      setQuizForEditing(quizForEditing);
      setIsFormOpen(true);
    }
  };

  const deleteQuizHandler = async (id: string) => {
    const updatedList = quizListInit?.filter((item) => item.id !== id);

    if (updatedList) {
      await throttleDelete();
      setQuizListInit(updatedList);
      localStorage.setItem('reactQuizStorage', JSON.stringify(updatedList));
    }
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
      {!isQuizStarted && (
        <section className="flex justify-between w-full items-center gap-5 mb-10">
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
        </section>
      )}

      <QuizList
        isLoading={isLoading}
        setIdForEditing={editQuizHandler}
        quizs={quizListInit || ([] as IListQuiz[])}
        deleteQuiz={deleteQuizHandler}
        setIsQuizStarted={() => setIsQuizStarted(true)}
        resetQuiz={() => {
          setIsQuizStarted(false);
        }}
      />
    </Container>
  );
};

export default App;
