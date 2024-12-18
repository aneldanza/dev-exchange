import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllQuestionsQuery } from "../../services/api";
import { withLoading } from "../hoc/withLoading";
import { withError } from "../hoc/withError";
import { CustomError } from "../common/CustomError";
import { CustomLoading } from "../common/CustomLoading";
import QuestionsList from "./QuestionsList";
import Button from "../common/Button";
import { SortTabs } from "../common/SortTabs";
import { sortTabs } from "../common/constants";
import { formatCountString } from "../../services/utils";
import { Pagination } from "flowbite-react";
import { defaultPageSize } from "../common/constants";
import { paginationTheme } from "../../flowbiteCustomTheme";

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
      <div className=" mb-6 pb-6 border-b">
        <div className="flex justify-between mb-4">
          <h1 className="text-xl">All Questions</h1>
          <Button
            title="Ask a Question"
            onClick={() => navigate("/questions/new")}
            className="btn btn-primary"
          />
        </div>
        <div className="font-medium text-sm mb-4">
          {formatCountString(
            data ? data.total_results : 0,
            "result",
            "results"
          )}
        </div>
        <div className="flex justify-start text-xs">
          <SortTabs
            sortOptions={sortTabs}
            selectedOption={selectedTab}
            setSelectedOption={setSelectedTab}
          />
        </div>
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
