import { FC, useState } from 'react';

import Container from '@/components//ui/Container';
import Button from '@/components/ui/Button';
import { IListQuiz, IQuiz } from '@/types';

interface Props {
  quiz: IListQuiz;
  closeQuiz: () => void;
}

const Quiz: FC<Props> = ({ quiz, closeQuiz }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerChange = (answerId: number) => {
    setSelectedAnswer(answerId);
  };

  const handleNextQuestion = () => {
    if (
      quiz.questions[currentQuestion]?.answers.some(
        (answer) => answer.id === selectedAnswer && answer.isCorrect,
      )
    ) {
      setScore(score + 1);
    }

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
    closeQuiz();
  };

  if (showScore) {
    return (
      <Container className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center gap-5 max-w-[450px] w-full text-center">
          <h1 className="text-5xl font-semibold">Your Score</h1>
          <p className="text-3xl">
            {score} out of {quiz.questions.length}
          </p>
          <Button variant="green" onClick={resetQuiz}>
            Reset
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col gap-5 max-w-[450px] w-full">
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
              <label className="flex gap-3 bg-gray-800 px-4 py-2 rounded-md">
                <input
                  type="radio"
                  name="quiz-answer"
                  value={answer.id}
                  checked={selectedAnswer === answer.id}
                  onChange={() => handleAnswerChange(answer.id)}
                />
                {answer.answer}
              </label>
            ))}
          </form>
        </div>
        <Button onClick={handleNextQuestion} variant="green">
          Next
        </Button>
      </div>
    </Container>
  );
};

export default Quiz;
