import { useEffect, useState } from "react";
import HeaderLayout from "../../../modules/header/HeaderLayout";
import HeaderButton from "../../../components/Header/Deliberation/HeaderButton";
import useDeliberationApi from "../../../apis/budget/deliberationApi";
import { IDeliberation } from "../../../interface/Deliberation/IDeliberation";
import TableDeliberation from "../../../components/Table/Deliberation/TableDeliberation";
import PaginationDeliberation from "../../../components/Footer/Pagination/Deliberation/PaginationDeliberation";
import ModalDeliberation from "../../../components/Modal/Deliberation/ModalDeliberation";

const Page = () => {
  const {
    show,
    dataDeliberation,
    setDataDeliberationPagination,
    getDeliberationPagination,
    dataDeliberationPagination,
    dataDoubleClick,
  } = useDeliberationApi();

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
    status: "",
    enforcementFlag: false,
  };

  const page =
    perPage == 0
      ? 0
      : dataDeliberation?.currentPage == 0
      ? 1
      : dataDeliberation?.currentPage;

  useEffect(() => {
    setDataDeliberationPagination(data);
  }, [dataDeliberation, perPage]);

  useEffect(() => {
    getDeliberationPagination(data);
  }, []);

  return (
    <div>
      <HeaderLayout
        title="Deliberation"
        menu="Budget & Investment"
        subMenu="Deliberation"
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
                  <TableDeliberation />
                  <div className="flex justify-end items-center mt-3">
                    <PaginationDeliberation
                      page={page}
                      total={dataDeliberation?.totalPage}
                      nextPage={(event: any, page: any) => {
                        event.preventDefault();
                        getDeliberationPagination({
                          ...dataDeliberationPagination,
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
                          ...dataDeliberationPagination,
                          page: newPage,
                          perPage: newValue,
                        });
                        getDeliberationPagination({
                          ...dataDeliberationPagination,
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

      {show ? <ModalDeliberation dataDeliberation={dataDoubleClick} /> : null}
    </div>
  );
};

export default Page;
