import { useParams } from "react-router-dom";

const EditAnswerPage = () => {
  const { answerId } = useParams<{ answerId: string }>();
  //   const { data: answer, isLoading } = useGetAnswerQuery(id);

  return (
    <div>
      <h1>Edit Answer</h1>
      <div>{`editing answer ${answerId}`}</div>
    </div>
  );
};

export default EditAnswerPage;
