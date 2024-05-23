export interface IQuiz {
  id: string;
  title: string;
  answers: {
    id: number;
    answer: string;
    isCorrect: boolean;
  }[];
}

export interface IListQuiz {
  id: string;
  title: string;
  questions: IQuiz[];
}
