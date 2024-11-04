export type AnswerData = {
  id: number;
  body: string;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    username: string;
  };
  question_id: number;
};
