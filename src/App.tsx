import { useEffect, useState } from 'react';

import { quizList } from '../data';

import Container from '@/components/ui/Container';
import Header from '@/components/widgets/Header';
import QuizForm from '@/components/widgets/QuizForm';
import QuizList from '@/components/widgets/QuizList';
import { throttle } from '@/helpers';
import { IListQuiz, IQuiz } from '@/types';

export type FormData = {
  title: string;
  quizList: IQuiz[];
};

const App = () => {
  const [quizListInit, setQuizListInit] = useState<IListQuiz[]>();
  const [quizForEditing, setQuizForEditing] = useState<IListQuiz | null>(null);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [searchedQuizTitle, setSearchedQuizTitle] = useState('');
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
      await throttle();
      setQuizListInit(updatedList);
      localStorage.setItem('reactQuizStorage', JSON.stringify(updatedList));
    }
  };

  const filteredQuizList = quizListInit?.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchedQuizTitle.toLowerCase()),
  );

  if (formIsOpen && quizListInit) {
    return (
      <main className="w-full">
        <QuizForm
          initedListQuiz={quizListInit}
          closeForm={() => setIsFormOpen(false)}
          initialValues={quizForEditing !== null ? quizForEditing : null}
          updateStorage={(quizList: IListQuiz[]) => setQuizListInit(quizList)}
        />
      </main>
    );
  }

  return (
    <Container className="flex flex-col items-start w-full min-h-screen py-10">
      {!isQuizStarted && (
        <Header
          quizListLength={filteredQuizList?.length || 0}
          formIsOpen={formIsOpen}
          searchQuizTitle={searchedQuizTitle}
          setSearchedQuizTitle={(e) => setSearchedQuizTitle(e.currentTarget.value)}
          setOpenForm={() => {
            setIsFormOpen(true);
            setQuizForEditing(null);
          }}
        />
      )}
      <main className="w-full">
        <QuizList
          isLoading={isLoading}
          setIdForEditing={editQuizHandler}
          quizs={filteredQuizList || ([] as IListQuiz[])}
          deleteQuiz={deleteQuizHandler}
          setIsQuizStarted={() => setIsQuizStarted(true)}
          resetQuiz={() => {
            setIsQuizStarted(false);
          }}
        />
      </main>
    </Container>
  );
};

export default App;
