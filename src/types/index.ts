export interface Answer {
  id: string;
  answer: string;
  isCorrect: boolean;
}

export interface IQuiz {
  id: string;
  title: string;
  answers: Answer[];
}

export interface IListQuiz {
  id: string;
  title: string;
  questions: IQuiz[];
}
