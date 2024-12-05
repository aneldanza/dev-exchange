import { useContext } from "react";
import { QuestionData } from "../questions/types";
import moment from "moment";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import { FullUserData } from "./types";
import { TopTags } from "./TopTags";

export const ActivityTab = () => {
  // Implement the logic for the ActivityTab component here

  const { postsByTag, fullUserData } = useContext(UserContext);
  const { questions, id } = fullUserData as FullUserData;

  return (
    <div className="activity-list">
      <div>
        <div className="mb-2">Questions</div>
        <div className="activity-card">
          {questions.length ? (
            questions.map((question: QuestionData) => (
              <div key={question.id} className="activity-card-row">
                <div className="card px-2 py-0 min-w-10 justify-center text-center">
                  0
                </div>
                <div className="flex-grow overflow-hidden">
                  <Link
                    to={`/questions/${question.id}`}
                    className="text-blue-400 break-words truncate block max-w-full"
                  >
                    {question.title}
                  </Link>
                </div>
                <div className="text-xs flex-shrink-0 whitespace-nowrap">
                  {moment(question.created_at).format("MMM DD, YYYY")}
                </div>
              </div>
            ))
          ) : (
            <div>No questions found</div>
          )}
        </div>
      </div>

      <TopTags tags={postsByTag} userId={id} />
    </div>
  );
};
