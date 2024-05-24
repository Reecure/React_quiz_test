import { type FC } from 'react';

import { useFieldArray, useFormContext } from 'react-hook-form';

import close from '../../../../public/images/close.svg?react';

import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import Input from '@/components/ui/Input';
import Radio from '@/components/ui/Radio';
import { Answer } from '@/types';

type Props = {
  index: number;
};

const QuestionAnswerForm: FC<Props> = ({ index }) => {
  const { register, control, watch, setValue } = useFormContext();
  const {
    fields,
    remove,
    append: appendAnswer,
  } = useFieldArray({
    control,
    name: `quizList.${index}.answers`,
  });

  const appendIncorrectAnswer = () => {
    appendAnswer({ id: crypto.randomUUID(), answer: '', isCorrect: false });
  };

  const selectedCorrectAnswer = watch(`quizList.${index}.answers`).findIndex(
    (answer: Answer) => answer.isCorrect,
  );

  const handleCorrectAnswerChange = (answerIndex: number) => {
    fields.forEach((_, idx) => {
      setValue(`quizList.${index}.answers.${idx}.isCorrect`, idx === answerIndex);
    });
  };

  return (
    <div className="flex items-center flex-col gap-5 w-full">
      <h5 className="text-2xl w-full font-bold text-white">{index + 1}. Question</h5>
      <div className="w-full">
        <label htmlFor={`quizList.${index}.title`}>
          Question
          <Input
            variant="primary"
            className="bg-gray-600 px-2 py-2 outline-none rounded-md w-full"
            {...register(`quizList.${index}.title`, {
              required: { value: true, message: 'Question is required' },
              minLength: { value: 1, message: 'Min length is 1 letter' },
            })}
          />
        </label>
      </div>
      {fields.map((field, otherAnswerIndex) => (
        <div key={field.id} className="flex gap-2 items-center w-full">
          <div>
            <Radio
              value={otherAnswerIndex}
              checked={selectedCorrectAnswer === otherAnswerIndex}
              onChange={() => handleCorrectAnswerChange(otherAnswerIndex)}
            />
          </div>
          <div className="w-full">
            <label htmlFor={`quizList.${index}.answers.${otherAnswerIndex}.answer`}>
              <Input
                variant="primary"
                className={`${
                  selectedCorrectAnswer === otherAnswerIndex &&
                  '!border-[3px] border-green-300'
                }`}
                {...register(`quizList.${index}.answers.${otherAnswerIndex}.answer`, {
                  required: { value: true, message: 'Answer is required' },
                  minLength: { value: 1, message: 'Min length is 1 letter' },
                })}
              />
            </label>
          </div>
          <Button onClick={() => remove(otherAnswerIndex)} variant="clear">
            <Icon height={18} width={18} Svg={close} className="!stroke-white" />
          </Button>
        </div>
      ))}
      <Button variant="green" className="w-full" onClick={appendIncorrectAnswer}>
        Add Answer
      </Button>
    </div>
  );
};

export default QuestionAnswerForm;
