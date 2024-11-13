import { type FC, useState } from "react";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";

import { useCastVoteMutation } from "../../services/api";
import Flash from "./Flash";

interface PostVoteSectionProps {
  postId: number;
  postType: "Question" | "Answer";
  votes: number;
}

export const PostVoteSection: FC<PostVoteSectionProps> = ({
  postId,
  votes,
  postType,
}) => {
  const [castVote] = useCastVoteMutation();
  const [voteError, setVoteError] = useState<string[]>([]);

  const handleVote = async (value: number) => {
    try {
      await castVote({
        votable_id: postId,
        votable_type: postType,
        value,
      }).unwrap();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (e.data) {
        if (e.data.errors) {
          setVoteError([...e.data.errors]);
        } else {
          setVoteError([e.data.error]);
        }
      } else {
        setVoteError(["An error occurred. Please try again later."]);
      }
    }
  };
  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <IoMdArrowDropup
          size={34}
          className="text-appGray-200 hover:text-appGray-400 cursor-pointer"
          onClick={handleVote.bind(null, 1)}
        />
        <div className="text-xl">{votes}</div>
        <IoMdArrowDropdown
          size={34}
          className="text-appGray-200 hover:text-appGray-400 cursor-pointer"
          onClick={handleVote.bind(null, -1)}
        />
      </div>

      <Flash
        style="failure"
        display={!!voteError.length}
        resetDisplay={() => setVoteError([])}
      >
        <ul className="list-item">
          {voteError.map((error, index) => (
            <li key={index}>{`${error}`}</li>
          ))}
        </ul>
      </Flash>
    </>
  );
};
