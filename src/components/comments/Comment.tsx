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
import Flash from "../common/Flash";

interface CommentProps {
  comment: CommentData;
}

export const Comment: FC<CommentProps> = ({ comment }) => {
  const { user, clearUser } = useAuth();
  const [editComment, setEditComment] = useState<boolean>(false);
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment, { isLoading }] = useDeleteCommentMutation();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [formError, setFormError] = useState<string[]>([]);

  const handleUpdateComment = async (body: string) => {
    try {
      await updateComment({
        id: comment.id,
        body,
      }).unwrap();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (e.data) {
        if (e.data.errors) {
          setFormError([...e.data.errors]);
        } else {
          setFormError([e.data.error ?? "An error occurred"]);
        }
      } else {
        setFormError(["An error occurred. Please try again later."]);
      }
      if (e.status === 401) {
        clearUser();
      }
    }
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

      <Flash
        style="failure"
        display={!!formError.length}
        resetDisplay={() => setFormError([])}
      >
        <ul className="list-item">
          {formError.map((error, index) => (
            <li key={index}>{`${error}`}</li>
          ))}
        </ul>
      </Flash>
    </>
  );
};
