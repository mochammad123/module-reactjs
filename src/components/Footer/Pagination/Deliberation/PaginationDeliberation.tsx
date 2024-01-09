import React from "react";
import { IDataPagination } from "../../../../interface/Deliberation/IDeliberation";
import PaginationMui from "../../../../modules/pagination/PaginationMui";

const PaginationDeliberation: React.FC<IDataPagination> = ({
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

export default PaginationDeliberation;
