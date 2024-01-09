import { useEffect, useState } from "react";
import useBudgetPlanApi from "../../../apis/budget/budgetPlanApi";
import PaginationBudgetPlan from "../../../components/Footer/Pagination/BudgetPlan/PaginationBudgetPlan";
import HeaderButton from "../../../components/Header/BudgetPlan/HeaderButton";
import ModalBudgetPlan from "../../../components/Modal/BudgetPlan/ModalBudgetPlan";
import TableBudgetPlan from "../../../components/Table/BudgetPlan/TableBudgetPlan";
import HeaderLayout from "../../../modules/header/HeaderLayout";
import { DataBudgetPlanResponse } from "../../../interface/BudgetPlan/IBudgetPlan";

const Page = () => {
  const {
    show,
    dataBudgetPlan,
    getBudgetPlanPagination,
    dataBudgetPlanPagination,
    setDataBudgetPlanPagination,
    dataDoubleClick,
  } = useBudgetPlanApi();

  const [perPage, setPerPage] = useState<number>(25);
  const [keyword, setKeyword] = useState<string>("");
  const [isWaitingApproval, setIsWaitingApproval] = useState<boolean>(false);
  const [approvalStatus, setApprovalStatus] = useState<string>("");

  const data: DataBudgetPlanResponse = {
    page:
      perPage == 0
        ? 0
        : dataBudgetPlan?.currentPage != 0
        ? dataBudgetPlan?.currentPage
        : 1,
    perPage: perPage,
    keyWord: keyword,
    isWaitApproval: false,
    sortBy: "",
    sortDirection: "",
    approvalStatus: approvalStatus,
  };

  const page =
    perPage === 0
      ? 0
      : dataBudgetPlan?.currentPage === 0
      ? 1
      : dataBudgetPlan?.currentPage;

  useEffect(() => {
    setDataBudgetPlanPagination(data);
  }, [dataBudgetPlan, perPage, keyword, approvalStatus]);

  useEffect(() => {
    getBudgetPlanPagination(data);
  }, []);

  return (
    <div>
      <HeaderLayout
        title="Budget Plan"
        menu="Budget & Investment"
        subMenu="Budget Plan"
      />
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body mt-0 mb-0">
                  <div className="mb-2">
                    <HeaderButton
                      reject={approvalStatus}
                      setReject={setApprovalStatus}
                      waiting={isWaitingApproval}
                      setWaiting={setIsWaitingApproval}
                      search={keyword}
                      setSearch={setKeyword}
                    />
                  </div>
                  <TableBudgetPlan perPage={perPage} />
                  <div className="flex justify-end items-center mt-3">
                    <PaginationBudgetPlan
                      page={page}
                      total={dataBudgetPlan?.totalPage}
                      nextPage={(event: any, page: any) => {
                        event.preventDefault();
                        getBudgetPlanPagination({
                          ...dataBudgetPlanPagination,
                          page: page,
                        });
                      }}
                      value={perPage}
                      handleChange={(e: any, v: any) => {
                        e.preventDefault();
                        const newValue = v?.props?.value;
                        setPerPage(newValue);
                        const newPage = newValue === 0 ? 0 : 1;

                        setDataBudgetPlanPagination({
                          ...dataBudgetPlanPagination,
                          page: newPage,
                          perPage: newValue,
                        });
                        getBudgetPlanPagination({
                          ...dataBudgetPlanPagination,
                          perPage: newValue,
                          page: newPage,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {show ? <ModalBudgetPlan dataBudgetPlan={dataDoubleClick} /> : null}
    </div>
  );
};

export default Page;
