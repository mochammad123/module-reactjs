import React from "react";
import PaginationMui from "../../../../modules/pagination/PaginationMui";

interface DataPaginationResponse {
  total: number;
  page: number;
  nextPage?: any;
  value: number;
  handleChange?: any;
}

const PaginationBudgetPlan: React.FC<DataPaginationResponse> = ({
  total,
  page,
  nextPage,
  value,
  handleChange,
}) => {
  return (
    <div>
      <PaginationMui
        total={total}
        page={page}
        value={value}
        nextPage={nextPage}
        handleChange={handleChange}
      />
    </div>
  );
};

export default PaginationBudgetPlan;
