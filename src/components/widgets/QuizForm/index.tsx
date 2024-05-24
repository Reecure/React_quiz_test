import { FC, useState } from 'react';

import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

import { FormData } from '@/App';
import chevron from '@/assets/icons/chevron.svg?react';
import close from '@/assets/icons/close.svg?react';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Icon from '@/components/ui/Icon';
import Input from '@/components/ui/Input';
import QuestionAnswerForm from '@/components/ui/QuestionAnswerForm';
import { throttle } from '@/helpers';
import { IListQuiz } from '@/types';

interface Props {
  initedListQuiz: IListQuiz[];
  initialValues?: IListQuiz | null;
  closeForm: () => void;
  updateStorage: (list: IListQuiz[]) => void;
}

const QuizForm: FC<Props> = ({
  initedListQuiz,
  closeForm,
  updateStorage,
  initialValues,
}) => {
  const [formError, setFormError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const methods = useForm<FormData>({
    defaultValues: initialValues
      ? { title: initialValues.title, quizList: initialValues.questions }
      : {
          quizList: [
            {
              id: crypto.randomUUID(),
              title: '',
              points: '1',
              answers: [{ id: crypto.randomUUID(), answer: '', isCorrect: false }],
            },
          ],
          title: '',
        },
  });

  const { handleSubmit, register, setError } = methods;

  const { append, fields, remove } = useFieldArray({
    control: methods.control,
    name: 'quizList',
  });

  const addQuestionAnswerBlock = () => {
    append({
      id: crypto.randomUUID(),
      title: '',
      points: '1',
      answers: [{ id: crypto.randomUUID(), answer: '', isCorrect: false }],
    });
  };

  const renderCloseButton = (index: number) => (
    <Button onClick={() => remove(index)} variant="clear">
      <Icon
        height={20}
        width={20}
        Svg={close}
        className="!stroke-white absolute right-5 top-5"
      />
    </Button>
  );

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    let hasError = false;

    if (data.quizList.length === 0) {
      setFormError('The quiz must have at least one question.');
      setIsLoading(false);

      return;
    }

    data.quizList.forEach((question, index) => {
      const hasCorrectAnswer = question.answers.some((answer) => answer.isCorrect);

      if (!hasCorrectAnswer) {
        hasError = true;
        setError(`quizList.${index}.title`, {
          type: 'manual',
          message: 'Each question must have a correct answer.',
        });
      }
    });

    if (hasError) {
      setFormError('Please ensure every question has a correct answer.');
      setIsLoading(false);

      return;
    }

    await throttle();

    let updatedQuizList: IListQuiz[];

    if (initialValues) {
      updatedQuizList = initedListQuiz.map((quiz) =>
        quiz.id === initialValues.id
          ? { ...quiz, title: data.title, questions: data.quizList }
          : quiz,
      );
    } else {
      const newQuiz: IListQuiz = {
        id: crypto.randomUUID(),
        title: data.title,
        questions: data.quizList,
      };

      updatedQuizList = [...(initedListQuiz || []), newQuiz];
    }

    localStorage.setItem('reactQuizStorage', JSON.stringify(updatedQuizList));
    updateStorage(updatedQuizList);
    setIsLoading(false);
    closeForm();
  };

  return (
    <Container className="flex flex-col items-center max-w-[750px]">
      <Button
        variant="green"
        onClick={() => closeForm()}
        className="self-start my-5 flex justify-center items-center"
      >
        <Icon
          width={18}
          height={18}
          Svg={chevron}
          className="-rotate-90 relative top-[1px]"
        />
        Back
      </Button>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5  items-center w-full"
        >
          <div className="w-full">
            <label htmlFor="title">
              Quiz Title
              <Input
                variant="primary"
                className="bg-gray-600 px-2 py-2 outline-none rounded-md w-full"
                {...register(`title`, {
                  required: { value: true, message: 'Question is required' },
                  minLength: { value: 1, message: 'Min length is 1 letter' },
                })}
              />
            </label>
          </div>

          {fields.map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} className="relative w-full bg-gray-800 p-5 rounded-md">
              <QuestionAnswerForm index={index} />
              {renderCloseButton(index)}
            </div>
          ))}
          {formError && <div className="text-red-500">{formError}</div>}
          <div className="flex justify-between w-full gap-5 mt-5">
            <Button variant="green" className="w-full" onClick={addQuestionAnswerBlock}>
              Add question
            </Button>
            <div className="flex justify-end w-full">
              <input
                disabled={isLoading}
                value="Send"
                type="submit"
                className="rounded-md bg-green-700 w-full h-10 hover:bg-green-600 duration-100 cursor-pointer disabled:bg-gray-500"
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
};

export default QuizForm;
