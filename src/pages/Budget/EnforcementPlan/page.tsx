import React, { useEffect, useState } from "react";
import HeaderLayout from "../../../modules/header/HeaderLayout";
import HeaderButton from "../../../components/Header/EnforcementPlan/HeaderButton";
import TableEnforcementPlan from "../../../components/Table/EnforcementPlan/TableEnforcementPlan";
import useDeliberationApi from "../../../apis/budget/deliberationApi";
import { IDeliberation } from "../../../interface/Deliberation/IDeliberation";
import useEnfocementPlanApi from "../../../apis/budget/enforcementPlanApi";
import PaginationMui from "../../../modules/pagination/PaginationMui";
import ModalEnforcementPlan from "../../../components/Modal/EnforcementPlan/ModalEnforcementPlan";
import useBudgetPlanApi from "../../../apis/budget/budgetPlanApi";
import ModalAddNonBudget from "../../../components/Modal/EnforcementPlan/ModalAddNonBudget";

const page = () => {
  const {
    dataDeliberation,
    setDataDeliberationPagination,
    getDeliberationPagination,
  } = useDeliberationApi();

  const { show, setDataEpPagination, dataEpPagination, showNonBudget } =
    useEnfocementPlanApi();

  const { getPraBudgetPlan } = useBudgetPlanApi();

  const [perPage, setPerPage] = useState<number>(25);

  const data: IDeliberation = {
    fiscalYearsId: 0,
    departmentId: 0,
    ops: ">",
    amount: "0",
    page:
      perPage == 0
        ? 0
        : dataDeliberation?.currentPage == 0
        ? 1
        : dataDeliberation?.currentPage,
    perPage: perPage ? perPage : 0,
    keyWord: "",
    sortBy: "",
    sortDirection: "",
    status: "approved",
    enforcementFlag: false,
  };

  const page =
    perPage == 0
      ? 0
      : dataDeliberation?.currentPage == 0
      ? 1
      : dataDeliberation?.currentPage;

  useEffect(() => {
    setDataEpPagination(data);
  }, [dataDeliberation, perPage]);

  useEffect(() => {
    getDeliberationPagination(data);
    getPraBudgetPlan();
  }, []);

  return (
    <div>
      <HeaderLayout
        title="Enforcement Plan"
        menu="Budget & Investment"
        subMenu="Enforcement Plan"
      />
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body mt-0 mb-0">
                  <div className="mb-2">
                    <HeaderButton />
                  </div>
                  <TableEnforcementPlan />
                  <div className="flex justify-end items-center mt-3">
                    <PaginationMui
                      page={page}
                      total={dataDeliberation?.totalPage}
                      nextPage={(event: any, page: any) => {
                        event.preventDefault();
                        getDeliberationPagination({
                          ...data,
                          page: page,
                        });
                      }}
                      value={perPage}
                      handleChange={(e: any, v: any) => {
                        e.preventDefault();
                        const newValue = v?.props?.value;
                        setPerPage(newValue);
                        const newPage = newValue == 0 ? 0 : 1;

                        setDataDeliberationPagination({
                          ...dataEpPagination,
                          page: newPage,
                          perPage: newValue,
                        });
                        getDeliberationPagination({
                          ...dataEpPagination,
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

      {show ? <ModalEnforcementPlan /> : null}
      {showNonBudget ? <ModalAddNonBudget /> : null}
    </div>
  );
};

export default page;
