import { FC, useEffect, useState } from 'react';

import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Radio from '@/components/ui/Radio';
import UserAnswer from '@/components/ui/UserAnswer';
import { IListQuiz, IUserQuizAnswer } from '@/types';

interface Props {
  quiz: IListQuiz;
  closeQuiz: () => void;
}

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
};

const Quiz: FC<Props> = ({ quiz, closeQuiz }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showScore, setShowScore] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [userAnswers, setUserAnswers] = useState<IUserQuizAnswer[]>([]);

  useEffect(() => {
    const timeout = setTimeout(() => setCurrentTime((prev) => prev + 1), 1000);

    if (currentTime >= 3600 || showScore) {
      setShowScore(true);
      clearTimeout(timeout);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [currentTime, showScore]);

  const handleAnswerChange = (answerId: string) => {
    setSelectedAnswer(answerId);
  };

  const handleNextQuestion = () => {
    const isCorrectAnswer = quiz.questions[currentQuestion]?.answers.some(
      (answer) => answer.id === selectedAnswer && answer.isCorrect,
    );

    if (isCorrectAnswer) {
      setScore(score + Number(quiz.questions[currentQuestion]?.points));
    }

    const selectedAnswerText =
      quiz.questions[currentQuestion]?.answers.find(
        (answer) => answer.id === selectedAnswer,
      )?.answer || '';

    setUserAnswers((prevState) => [
      ...prevState,
      {
        id: quiz.questions[currentQuestion]?.id || '',
        title: quiz.questions[currentQuestion]?.title || '',
        answer: selectedAnswerText,
        points: (isCorrectAnswer ? quiz.questions[currentQuestion]?.points : '0') || '0',
        isCorrect: isCorrectAnswer || false,
      },
    ]);

    setSelectedAnswer(null);

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setShowScore(false);
    setCurrentQuestion(0);
    setScore(0);
    setCurrentTime(0);
    closeQuiz();
  };

  if (showScore) {
    return (
      <Container className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col items-center gap-5 max-w-[750px] w-full text-center">
            <h1 className="text-5xl font-semibold">Your Score</h1>
            <p className="text-3xl">{score}</p>
            <p>Your time is {formatTime(currentTime)}</p>
            <Button variant="green" onClick={resetQuiz}>
              Reset
            </Button>
          </div>
          <div className="flex flex-col gap-5">
            {userAnswers.map((answer) => (
              <UserAnswer key={answer.id} userAnswer={answer} />
            ))}
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col gap-5 w-[450px] sm:w-[550px]">
        <h1 className="text-5xl font-semibold">{quiz.title}</h1>
        <div>
          <h2 className="text-2xl">
            Question <span>{currentQuestion + 1}</span> of{' '}
            <span>{quiz.questions.length}</span>{' '}
          </h2>
        </div>
        <div className="flex flex-col gap-5">
          <p className="text-xl">{quiz.questions[currentQuestion]?.title}</p>
          <form className="flex flex-col gap-2 mt-2">
            {quiz.questions[currentQuestion]?.answers.map((answer) => (
              <div
                key={answer.id}
                className="flex items-center gap-3 bg-gray-800 rounded-md px-3 py-2"
              >
                <Radio
                  checked={selectedAnswer === answer.id}
                  value={answer.id}
                  htmlFor={`quiz-answer-${answer.id}`}
                  onChange={() => handleAnswerChange(answer.id)}
                />
                <p>{answer.answer}</p>
              </div>
            ))}
          </form>
        </div>
        <div className="flex justify-between items-center">
          <Button
            disabled={selectedAnswer === null}
            onClick={handleNextQuestion}
            variant="green"
          >
            Next
          </Button>

          <p>{formatTime(currentTime)}</p>
        </div>
      </div>
    </Container>
  );
};

export default Quiz;
