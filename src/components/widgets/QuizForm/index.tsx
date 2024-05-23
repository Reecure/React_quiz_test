import { FC } from 'react';

import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

import { FormData } from '@/App';
import close from '@/assets/close.svg?react';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Icon from '@/components/ui/Icon';
import Label from '@/components/ui/Label';
import QuestionAnswerForm from '@/components/ui/QuestionAnswerForm';
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
  const methods = useForm<FormData>({
    defaultValues: initialValues
      ? { title: initialValues.title, quizList: initialValues.questions }
      : { quizList: [], title: '' },
  });

  const { handleSubmit, register } = methods;

  const { append, fields, remove } = useFieldArray({
    control: methods.control,
    name: 'quizList',
  });

  const addQuestionAnswerBlock = () => {
    append({
      id: crypto.randomUUID(),
      title: '',
      answers: [{ id: crypto.randomUUID(), answer: '', isCorrect: false }],
    });
  };

  const renderCloseButton = (index: number) => (
    <Icon
      height={20}
      width={20}
      clickable
      onClick={() => remove(index)}
      Svg={close}
      className="!stroke-white absolute right-5 top-5"
    />
  );

  const onSubmit = (data: FormData) => {
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

    closeForm();
  };

  return (
    <Container className="flex flex-col items-center max-w-[750px]">
      <Button variant="green" onClick={() => closeForm()} className="self-start my-5">
        Back
      </Button>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5  items-center w-full"
        >
          <div className="w-full">
            <Label htmlFor="title" labelText="Quiz Title">
              <input
                className="bg-gray-600 px-2 py-2 outline-none rounded-md w-full"
                {...register(`title`, {
                  required: { value: true, message: 'Question is required' },
                  minLength: { value: 1, message: 'Min length is 1 letter' },
                })}
              />
            </Label>
          </div>

          {fields.map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} className="relative w-full bg-gray-800 p-5 rounded-md">
              <QuestionAnswerForm index={index} />
              {renderCloseButton(index)}
            </div>
          ))}

          <div className="flex justify-between w-full gap-5 mt-5">
            <Button variant="green" className="w-full" onClick={addQuestionAnswerBlock}>
              Add question
            </Button>
            <div className="flex justify-end w-full">
              <input
                value="Send"
                type="submit"
                className="rounded-md bg-green-700 w-full h-10 hover:bg-green-600 duration-100 cursor-pointer"
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
};

export default QuizForm;
