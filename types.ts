
export enum GameType {
  MATH = 'MATH',
  CLOCK = 'CLOCK',
  NONE = 'NONE'
}

export enum Difficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD'
}

export interface Question {
  id: number;
  problem: string;
  answer: number | string;
  options: (number | string)[];
  type: GameType;
}

export interface GameState {
  score: number;
  currentQuestionIndex: number;
  questions: Question[];
  isFinished: boolean;
}

export interface FeedbackMessage {
  text: string;
  type: 'success' | 'error' | 'neutral';
}
