export interface Answer {
  id: string;
  answer: string;
  isCorrect: boolean;
}

export interface IQuiz {
  id: string;
  title: string;
  points: string;
  answers: Answer[];
}

export interface IListQuiz {
  id: string;
  title: string;
  questions: IQuiz[];
}

export interface IUserQuizAnswer {
  id: string;
  title: string;
  answer: string;
  isCorrect: boolean;
  points: string;
}
