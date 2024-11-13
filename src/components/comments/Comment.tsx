import { type FC, useState } from "react";
import { CommentForm } from "./CommentForm";
import {
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} from "../../services/api";
import { CommentData } from "./types";
import { DeletePostModal } from "../common/DeletePostModal";
import { Link } from "react-router-dom";
import moment from "moment";
import { useAuth } from "../../services/storeHooks";

interface CommentProps {
  comment: CommentData;
}

export const Comment: FC<CommentProps> = ({ comment }) => {
  const { user } = useAuth();
  const [editComment, setEditComment] = useState<boolean>(false);
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment, { isLoading }] = useDeleteCommentMutation();

  const [showModal, setShowModal] = useState<boolean>(false);

  const handleUpdateComment = async (body: string) => {
    await updateComment({
      id: comment.id,
      body,
    }).unwrap();
  };

  return (
    <>
      <div className="comment-body">
        <span>{comment.body}</span> - {""}
        <span>
          {comment.user.id ? (
            <Link className="hyperlink" to={`/users/${comment.user.id}`}>
              {comment.user.username}
            </Link>
          ) : (
            "Anonymous"
          )}
        </span>{" "}
        <span className="text-appGray-200">
          {moment(comment.created_at).fromNow()}
        </span>
        {user && user.id === comment.user.id && (
          <span
            className={`action ml-2 ${editComment ? "hidden" : ""}`}
            onClick={() => setEditComment(true)}
          >
            Edit
          </span>
        )}
        {user && user.id === comment.user.id && (
          <span
            className="action ml-2 text-red-900 hover:text-red-700"
            onClick={() => setShowModal(true)}
          >
            Delete
          </span>
        )}
      </div>

      {editComment && (
        <CommentForm
          body={comment.body}
          formAction={handleUpdateComment}
          setFormVisible={setEditComment}
        />
      )}

      <DeletePostModal
        openModal={showModal}
        setOpenModal={setShowModal}
        id={comment.id}
        deleteRecord={deleteComment}
        isLoading={isLoading}
        prompt="Are you sure you want to delete this comment?"
      />
    </>
  );
};
