import React from "react";
import { IDataEnforcementPlan } from "../../../../interface/EnforcementPlan/IEnfocementPlan";
import PaginationMui from "../../../../modules/pagination/PaginationMui";

const PaginationEnforcementPlan: React.FC<IDataEnforcementPlan> = ({
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

export default PaginationEnforcementPlan;
