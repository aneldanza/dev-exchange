import Skeleton from "react-loading-skeleton";
import PostTitleSkeleton from "../posts/PostTitleSkeleton";
import PostVoteSectionSkeleton from "../posts/PostVoteSectionSkeleton";
import PostTagsSkeleton from "../posts/PostTagsSkeleton";
import PostMetaSkeleton from "../posts/PostMetaSkeleton";
import CommentsContainerSkeleton from "../comments/CommentsContainerSkeleton";
import ListSubheaderSkeleton from "../common/ListSubheaderSkeleton";
import PostBodySkeleton from "../posts/PostBodySkeleton";
import AnswerSkeleton from "../answers/AnswerSkeleton";

const QuestionSkeleton = () => {
  return (
    <div className="">
      <div className="border-b py-4">
        <PostTitleSkeleton />

        <div className="flex gap-4 text-xs sm:text-sm flex-wrap">
          <Skeleton width={100} height={20} count={2} />
        </div>
      </div>

      <div className="max-w-3xl w-full ">
        <div className="flex gap-4 mt-4 align-top">
          <div className="pt-4">
            <PostVoteSectionSkeleton />
          </div>
          <div className="flex flex-col gap-4 flex-grow">
            <PostBodySkeleton />
            <PostTagsSkeleton />

            <div>
              <div className="flex justify-end">
                <PostMetaSkeleton />
              </div>
            </div>

            <CommentsContainerSkeleton />
          </div>
        </div>

        <div className="flex flex-col my-6">
          <ListSubheaderSkeleton />

          <div className="flex flex-col gap-4">
            {[...Array(3)].map((_, index) => (
              <AnswerSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionSkeleton;
