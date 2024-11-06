import { CustomError } from "../common/CustomError";
import { FullAnswerData } from "./types";
import { FC } from "react";

interface EditAnswerProps {
  answer: FullAnswerData | undefined;
}

export const EditAnswer: FC<EditAnswerProps> = ({ answer }) => {
  if (!answer) {
    return <CustomError message="Answer not found" />;
  }

  return (
    <div>
      <div>{`editing answer ${answer.id}`}</div>
    </div>
  );
};
