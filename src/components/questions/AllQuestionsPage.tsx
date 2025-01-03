import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllQuestionsQuery } from "../../services/api";
import { withLoading } from "../hoc/withLoading";
import { withError } from "../hoc/withError";
import { CustomError } from "../common/CustomError";
import { CustomLoading } from "../common/CustomLoading";
import QuestionsList from "./QuestionsList";
import Button from "../common/Button";
import { sortTabs } from "../common/constants";
import { Pagination } from "flowbite-react";
import { defaultPageSize } from "../common/constants";
import { paginationTheme } from "../../flowbiteCustomTheme";
import { ListSubheader } from "../common/ListSubheader";

const QuestionsListWithErrorAndLoading = withLoading(
  withError(QuestionsList, CustomError),
  CustomLoading
);

const AllQuestionsPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<string>(sortTabs[0]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, error, isLoading } = useGetAllQuestionsQuery(
    {
      page: currentPage,
      sort: selectedTab.toLowerCase(),
      limit: defaultPageSize,
    },
    { refetchOnMountOrArgChange: true }
  );
  return (
    <div>
      <div className="">
        <div className="subheader-wrap mb-6">
          <h1 className="text-xl">All Questions</h1>
          <Button
            title="Ask a Question"
            onClick={() => navigate("/questions/new")}
            className="btn btn-primary"
          />
        </div>

        <ListSubheader
          count={data ? data.total_results : 0}
          keyword="result"
          sortTabs={sortTabs}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      </div>
      <QuestionsListWithErrorAndLoading
        questions={data ? data.questions : []}
        error={error}
        isLoading={isLoading}
      />

      {data && data.total_results > defaultPageSize && (
        <div className="flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={data?.total_pages || 0}
            onPageChange={(newPage) => setCurrentPage(newPage)}
            color="gray"
            theme={paginationTheme}
          />
        </div>
      )}
    </div>
  );
};

export default AllQuestionsPage;
