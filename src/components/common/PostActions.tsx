import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";

export const PostActions: React.FC<{
  postId: number;
  setShowModal: (show: boolean) => void;
  name: string;
}> = ({ postId, setShowModal, name }) => (
  <div className="py-2 flex gap-2">
    <Link to={`/${name}/${postId}/edit`} className="action">
      Edit
    </Link>
    <Button
      title="Delete"
      className="action"
      onClick={() => setShowModal(true)}
    />
  </div>
);
