import { Link } from "react-router-dom";

interface PostTitleProps {
  title: string;
  id: number;
  question_id: number | null;
}

export const PostTitle = ({ title, id, question_id }: PostTitleProps) => {
  return (
    <Link
      to={
        question_id
          ? `/questions/${question_id}?answerId=${id}`
          : `/questions/${id}`
      }
      className="text-blue-500 text-base"
    >
      {title}
    </Link>
  );
};
