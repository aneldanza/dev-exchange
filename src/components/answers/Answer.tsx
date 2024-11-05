import { useState } from "react";
import { PostMeta } from "../common/PostMeta";
import { AnswerData } from "./types";
import { type FC } from "react";
import { DeleteAnswerModal } from "./DeleteAnswerModal";
import { useAuth } from "../../services/storeHooks";
import { PostActions } from "../common/PostActions";

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
          <PostActions
            postId={answer.id}
            setShowModal={setShowModal}
            name="answers"
          />
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
