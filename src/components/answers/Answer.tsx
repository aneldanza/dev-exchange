import { useState } from "react";
import Button from "../common/Button";
import { PostMeta } from "../common/PostMeta";
import { AnswerData } from "./types";
import { type FC } from "react";
import { DeleteAnswerModal } from "./DeleteAnswerModal";
import { useAuth } from "../../services/storeHooks";

interface AnswerProps {
  answer: AnswerData;
}

export const Answer: FC<AnswerProps> = ({ answer }) => {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="answer">
      <div className="prose prose-sm">
        <div dangerouslySetInnerHTML={{ __html: answer.body }} />
      </div>
      <div>
        {user && answer.user.id === user.id && (
          <div className="py-2 flex gap-2">
            <Button
              title="Edit"
              className="action"
              onClick={() => console.log(`edit answer ${answer.id}`)}
            />
            <Button
              title="Delete"
              className="action"
              onClick={() => setShowModal(true)}
            />
          </div>
        )}

        <div className="flex justify-end">
          <PostMeta
            userId={answer.user.id}
            username={answer.user.username}
            createdAt={answer.created_at}
            actionWord="answered"
            theme="answer-meta"
          />
        </div>
      </div>

      <DeleteAnswerModal
        openModal={showModal}
        setOpenModal={setShowModal}
        id={answer.id}
      />
    </div>
  );
};
