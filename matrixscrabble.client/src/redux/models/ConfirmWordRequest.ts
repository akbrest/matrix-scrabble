import { Answer } from "./Answer";

export interface ConfirmWordRequest {
  gameId: string;
  wordOrderId: string;
  answer: Answer;
}
