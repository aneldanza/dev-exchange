import "react-loading-skeleton/dist/skeleton.css";
import PostVoteSectionSkeleton from "../posts/PostVoteSectionSkeleton";
import PostBodySkeleton from "../posts/PostBodySkeleton";
import PostMetaSkeleton from "../posts/PostMetaSkeleton";
import CommentsContainerSkeleton from "../comments/CommentsContainerSkeleton";

const AnswerSkeleton = () => {
  return (
    <div id="container" className="flex gap-4">
      <div id="stats" className="flex flex-col items-center flex-none">
        <PostVoteSectionSkeleton />
      </div>
      <div id="post" className="flex-grow overflow-hidden">
        <PostBodySkeleton />

        <div className="mt-4">
          <div className="flex justify-end">
            <PostMetaSkeleton />
          </div>

          <CommentsContainerSkeleton />
        </div>
      </div>
    </div>
  );
};

export default AnswerSkeleton;
