import { FC } from 'react';

import { IUserQuizAnswer } from '@/types';

interface Props {
  userAnswer: IUserQuizAnswer;
}

const UserAnswer: FC<Props> = ({ userAnswer }) => {
  return (
    <li
      className={`w-full border-2 p-5 rounded-md ${
        userAnswer.isCorrect ? 'border-green-300' : 'border-red-300'
      }`}
    >
      <h5 className="text-xl font-semibold">Question: {userAnswer.title}</h5>
      <p>Answer: {userAnswer.answer}</p>
      <p>Points: {userAnswer.points}</p>
    </li>
  );
};

export default UserAnswer;
