import { useNavigate } from "react-router-dom";
import { useCreateQuestionMutation } from "../../services/api";
import { useAuth } from "../../services/storeHooks";
import { QuestionForm } from "./QuestionForm";

const NewQuestionPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [createQuestion] = useCreateQuestionMutation();

  const handleCreateQuestion = async (data: {
    title: string;
    body: string;
    tags: { name: string; id: number }[];
  }) => {
    const newQuestion = await createQuestion({
      user_id: user ? user.id : 0,
      title: data.title,
      body: data.body,
      tags: data.tags,
    }).unwrap();
    console.log(newQuestion);

    navigate(`/questions/${newQuestion.id}`);
  };

  return (
    <div>
      <h1 className="font-bold text-xl mb-4 flex">Ask a New Question</h1>
      <QuestionForm
        questionAction={handleCreateQuestion}
        submitText="Post your question"
      />
    </div>
  );
};

export default NewQuestionPage;
