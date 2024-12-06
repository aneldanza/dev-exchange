import { useContext, useMemo, useState } from "react";
import { CustomDropdown } from "../../common/CustomDropdown";
import { LimitedQuestionData } from "../../questions/types";
import { PostsByTag, UserContext } from "../UserContext";
import { FullUserData, PostData } from "../types";
import { TagItem } from "../TagItem";
import { Summary } from "./Summary";
import { Posts } from "./Posts";
import { Post } from "./Post";

export const ActivityTab = () => {
  // Implement the logic for the ActivityTab component here

  const { postsByTag, fullUserData } = useContext(UserContext);
  const { questions, id, answers } = fullUserData as FullUserData;

  const options = ["summary", "questions", "answers", "tags"];
  const [selectedOption, setSelectedOption] = useState<string>(options[0]);

  const sortedItems = useMemo(
    () =>
      Object.values(postsByTag).sort((a, b) => b.posts.length - a.posts.length),
    [postsByTag]
  );

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex shrink-0 w-full md:hidden">
        <CustomDropdown
          options={options}
          handleOptionSelect={setSelectedOption}
          selectedOption={selectedOption}
        />
      </div>
      <div className="md:w-1/4 md:max-w-40 hidden md:block shrink-0 min-w-auto">
        <ul className="list space-y-2 text-sm ">
          {options.map((option) => (
            <li
              key={option}
              className={`tab ${
                selectedOption === option
                  ? "secondary-active-tab"
                  : "inactive-tab"
              }`}
              onClick={() => setSelectedOption(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full">
        {selectedOption === "summary" && (
          <Summary
            questions={questions}
            answers={answers}
            id={id}
            sortedItems={sortedItems}
          />
        )}
        {selectedOption === "questions" && (
          <Posts<LimitedQuestionData>
            posts={questions}
            label="Questions"
            renderItem={(question: LimitedQuestionData) => (
              <Post post={{ ...question, question_id: question.id }} />
            )}
          />
        )}
        {selectedOption === "answers" && (
          <Posts<PostData>
            posts={answers}
            label="Answers"
            renderItem={(answer: PostData) => <Post post={answer} />}
          />
        )}
        {selectedOption === "tags" && (
          <Posts<PostsByTag>
            posts={sortedItems}
            label="Tags"
            renderItem={(tagItem: PostsByTag) => (
              <TagItem
                tag={tagItem.tag}
                userId={id}
                postsCount={tagItem.posts.length}
              />
            )}
          />
        )}
      </div>
    </div>
  );
};
