export interface Game {
  id?: string;
  word: string;
  language: string;
  isCompleted?: boolean;
  createdAt?: Date;
}
