import { type FC } from "react";
import { CommentData } from "./types";
import { Link } from "react-router-dom";
import moment from "moment";
import { FullUserData } from "../users/types";
import { DeletePostModal } from "../common/DeletePostModal";
import {
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "../../services/api";
import { useState } from "react";
import { CommentForm } from "./CommentForm";

interface CommentsListProps {
  comments: CommentData[];

  user: FullUserData | null;
}

export const CommentsList: FC<CommentsListProps> = ({
  comments,

  user,
}) => {
  const [deleteComment, { isLoading }] = useDeleteCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editComment, setEditComment] = useState<boolean>(false);

  const handleUpdateComment = async (body: string) => {
    await updateComment({
      id: comments[0].id,
      body,
    }).unwrap();
  };

  return (
    <div className="w-full border-y border-appGray-50 divide-y">
      {comments.map((comment) => (
        <div key={comment.id} className="text-xs w-full p-2">
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
            {user && (
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
        </div>
      ))}
    </div>
  );
};
