import { ChangeEvent, FC } from 'react';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface Props {
  quizListLength: number;
  formIsOpen: boolean;
  searchQuizTitle: string;
  setSearchedQuizTitle: (e: ChangeEvent<HTMLInputElement>) => void;
  setOpenForm: () => void;
}

const Header: FC<Props> = ({
  quizListLength,
  formIsOpen,
  searchQuizTitle,
  setSearchedQuizTitle,
  setOpenForm,
}) => {
  return (
    <header className="flex justify-between w-full items-center gap-5 mb-10">
      {!formIsOpen && (
        <p className="text-3xl font-semibold mb-1">
          Quiz&apos;s{' '}
          <span className="p-1 px-3 bg-gray-700 rounded-md text-lg">
            {quizListLength}
          </span>{' '}
        </p>
      )}

      <Input
        value={searchQuizTitle}
        name="searchQuiz"
        variant="primary"
        placeholder="Search..."
        onChange={setSearchedQuizTitle}
        className="max-w-[450px] h-10"
      />

      <Button variant="green" onClick={setOpenForm}>
        Add
      </Button>
    </header>
  );
};

export default Header;
