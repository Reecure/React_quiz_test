import { IListQuiz } from './src/types';

export const quizList: IListQuiz[] = [
  {
    id: '1',
    title: 'Animals Quiz',
    questions: [
      {
        id: 'q1',
        title: 'What is the largest mammal?',
        points: '2',
        answers: [
          { id: '1', answer: 'Elephant', isCorrect: false },
          { id: '2', answer: 'Blue Whale', isCorrect: true },
          { id: '3', answer: 'Giraffe', isCorrect: false },
          { id: '4', answer: 'Hippopotamus', isCorrect: false },
        ],
      },
      {
        id: 'q2',
        title: 'Which animal is known as the King of the Jungle?',
        points: '2',
        answers: [
          { id: '1', answer: 'Tiger', isCorrect: false },
          { id: '2', answer: 'Lion', isCorrect: true },
          { id: '3', answer: 'Leopard', isCorrect: false },
          { id: '4', answer: 'Jaguar', isCorrect: false },
        ],
      },
      {
        id: 'q3',
        title: 'What is the fastest land animal?',
        points: '2',
        answers: [
          { id: '1', answer: 'Cheetah', isCorrect: true },
          { id: '2', answer: 'Leopard', isCorrect: false },
          { id: '3', answer: 'Tiger', isCorrect: false },
          { id: '4', answer: 'Horse', isCorrect: false },
        ],
      },
      {
        id: 'q4',
        title: 'Which animal is known for its ability to change color?',
        points: '2',
        answers: [
          { id: '1', answer: 'Octopus', isCorrect: false },
          { id: '2', answer: 'Chameleon', isCorrect: true },
          { id: '3', answer: 'Cuttlefish', isCorrect: false },
          { id: '4', answer: 'Squid', isCorrect: false },
        ],
      },
      {
        id: 'q5',
        title:
          'Which bird is known for its impressive memory and problem-solving skills?',
        points: '2',
        answers: [
          { id: '1', answer: 'Crow', isCorrect: true },
          { id: '2', answer: 'Parrot', isCorrect: false },
          { id: '3', answer: 'Pigeon', isCorrect: false },
          { id: '4', answer: 'Eagle', isCorrect: false },
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'Nature Quiz',
    questions: [
      {
        id: 'q1',
        title: 'What is the tallest type of tree in the world?',
        points: '1',
        answers: [
          { id: '1', answer: 'Oak', isCorrect: false },
          { id: '2', answer: 'Sequoia', isCorrect: true },
          { id: '3', answer: 'Pine', isCorrect: false },
          { id: '4', answer: 'Birch', isCorrect: false },
        ],
      },
      {
        id: 'q2',
        title: 'What is the largest rainforest in the world?',
        points: '1',
        answers: [
          { id: '1', answer: 'Congo Rainforest', isCorrect: false },
          { id: '2', answer: 'Amazon Rainforest', isCorrect: true },
          { id: '3', answer: 'Daintree Rainforest', isCorrect: false },
          { id: '4', answer: 'Southeast Asian Rainforest', isCorrect: false },
        ],
      },
      {
        id: 'q3',
        title: 'Which is the longest river in the world?',
        points: '1',
        answers: [
          { id: '1', answer: 'Nile', isCorrect: true },
          { id: '2', answer: 'Amazon', isCorrect: false },
          { id: '3', answer: 'Yangtze', isCorrect: false },
          { id: '4', answer: 'Mississippi', isCorrect: false },
        ],
      },
      {
        id: 'q4',
        title:
          'Which natural phenomenon is responsible for the beautiful colors in the sky at dawn and dusk?',
        points: '1',
        answers: [
          { id: '1', answer: 'Rainbows', isCorrect: false },
          { id: '2', answer: 'Northern Lights', isCorrect: false },
          { id: '3', answer: 'Sunrise and Sunset', isCorrect: true },
          { id: '4', answer: 'Meteor Showers', isCorrect: false },
        ],
      },
      {
        id: 'q5',
        title: 'What is the main gas found in the air we breathe?',
        points: '1',
        answers: [
          { id: '1', answer: 'Oxygen', isCorrect: false },
          { id: '2', answer: 'Carbon Dioxide', isCorrect: false },
          { id: '3', answer: 'Nitrogen', isCorrect: true },
          { id: '4', answer: 'Hydrogen', isCorrect: false },
        ],
      },
    ],
  },
];
