import { useEffect, useState } from "react";
import SearchButton from "../../../modules/button/SearchButton";
import useDeliberationApi from "../../../apis/budget/deliberationApi";
import sortData from "../../../modules/function/SortData";
import { FiscalYear, Section } from "../../../interface/BudgetPlan/IBudgetPlan";
import { IOps, IStatus } from "../../../interface/Deliberation/IDeliberation";
import useMenuApi from "../../../apis/menu/menuApi";
import AutoCompleteStyle from "../../../modules/Input/AutoCompleteStyle";
import TextFieldTotalAmountStyle from "../../../modules/Input/TextFieldTotalAmountStyle";

const dataStatus = [
  {
    id: 1,
    value: "approved",
    name: "Approved",
  },
  {
    id: 2,
    value: "postpone",
    name: "Postpone",
  },
  {
    id: 3,
    value: "wait",
    name: "Wait",
  },
  {
    id: 4,
    value: "rejected",
    name: "Rejected",
  },
];

const dataBudget = [
  {
    id: 1,
    name: ">",
  },
  {
    id: 2,
    name: "<",
  },
];

const HeaderButton = () => {
  const {
    dataPraDeliberation,
    getPraDeliberation,
    isLoadingPraDeliberation,
    getDeliberationPagination,
    setDataDeliberationPagination,
    dataDeliberationPagination,
  } = useDeliberationApi();

  const { menus } = useMenuApi();

  const [status, setStatus] = useState<IStatus | null>(null);
  const [ops, setOps] = useState<IOps | null>(null);
  const [fiscalYear, setFiscalYear] = useState<FiscalYear | null>(null);
  const [section, setSection] = useState<Section | null>(null);
  const [amount, setAmount] = useState<string>("0");
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    getPraDeliberation();
  }, []);

  const dataFiscalYears = sortData(
    "fiscal",
    dataPraDeliberation?.data?.fiscalYears,
    "name",
    "name"
  );

  const dataSections = sortData(
    "section",
    dataPraDeliberation?.data?.departments,
    "name",
    "name"
  );

  const handleChangeFiscalYear = (event: any, value: any) => {
    event.preventDefault();

    setFiscalYear(value);
    setDataDeliberationPagination({
      ...dataDeliberationPagination,
      fiscalYearsId: value?.id,
    });

    getDeliberationPagination({
      ...dataDeliberationPagination,
      fiscalYearsId: value?.id,
    });
  };

  const handleChangeSection = (event: any, value: any) => {
    event.preventDefault();

    setSection(value);
    setDataDeliberationPagination({
      ...dataDeliberationPagination,
      departmentId: value?.id,
    });

    getDeliberationPagination({
      ...dataDeliberationPagination,
      departmentId: value?.id,
    });
  };

  const handleChangeStatus = (event: any, value: any) => {
    event.preventDefault();

    setStatus(value);
    setDataDeliberationPagination({
      ...dataDeliberationPagination,
      status: value?.value,
    });

    getDeliberationPagination({
      ...dataDeliberationPagination,
      status: value?.value,
    });
  };

  const handleSearchBudget = (e: any) => {
    e.preventDefault();

    setDataDeliberationPagination({
      ...dataDeliberationPagination,
      amount: amount ? amount?.replace(/,/g, "") : "0",
      ops: ops?.name,
    });

    getDeliberationPagination({
      ...dataDeliberationPagination,
      amount: amount ? amount?.replace(/,/g, "") : "0",
      ops: ops?.name,
    });
  };

  const handleSearch = (e: any) => {
    e.preventDefault();

    getDeliberationPagination({
      ...dataDeliberationPagination,
      keyWord: search,
    });
  };

  return (
    <div>
      {menus?.data?.role?.name == "admin" ? (
        <div className="flex justify-start gap-4 mb-3">
          {isLoadingPraDeliberation ? (
            "Loading ..."
          ) : (
            <>
              <div className="md:w-40 w-full">
                <AutoCompleteStyle
                  label="Fiscal Year"
                  required={false}
                  value={fiscalYear}
                  setChange={handleChangeFiscalYear}
                  options={dataFiscalYears}
                  getOptionLabel={(option: any) => option?.name}
                  isOptionEqualToValue={(option: any, value: any) =>
                    option?.name == value?.name || ""
                  }
                />
              </div>
              <div className="md:w-96 w-full">
                <AutoCompleteStyle
                  label="Section"
                  required={false}
                  value={section}
                  setChange={handleChangeSection}
                  options={dataSections}
                  getOptionLabel={(option: any) => option?.name}
                  isOptionEqualToValue={(option: any, value: any) =>
                    option?.name == value?.name || ""
                  }
                />
              </div>

              <div className="md:w-72 flex items-center">
                <div className="md:w-20">
                  <AutoCompleteStyle
                    label=""
                    required={true}
                    value={ops}
                    setChange={(e: any, v: any) => {
                      e.preventDefault();
                      setOps(v);
                    }}
                    options={dataBudget}
                    getOptionLabel={(option: any) => option?.name}
                    isOptionEqualToValue={(option: any, value: any) =>
                      option?.name == value?.name || ""
                    }
                  />
                </div>
                <div className="md:w-60">
                  <form onSubmit={handleSearchBudget}>
                    <TextFieldTotalAmountStyle
                      label="Budget"
                      disabled={undefined}
                      value={amount}
                      setValue={setAmount}
                    />
                  </form>
                </div>
              </div>
            </>
          )}
        </div>
      ) : null}
      <div className="flex justify-between items-center my-1">
        <div className="flex items-center gap-4">
          <div className="md:w-40 w-full">
            <AutoCompleteStyle
              label="Status"
              required={false}
              value={status}
              setChange={handleChangeStatus}
              options={dataStatus}
              getOptionLabel={(option: any) => option?.name}
              isOptionEqualToValue={(option: any, value: any) =>
                option?.name == value?.name || ""
              }
            />
          </div>
          {menus?.data?.role?.name !== "admin" ? (
            <>
              <div className="md:w-40 w-full">
                <AutoCompleteStyle
                  label="Fiscal Year"
                  required={false}
                  value={fiscalYear}
                  setChange={handleChangeFiscalYear}
                  options={dataFiscalYears}
                  getOptionLabel={(option: any) => option?.name}
                  isOptionEqualToValue={(option: any, value: any) =>
                    option?.name == value?.name || ""
                  }
                />
              </div>
              <div className="md:w-72 flex items-center">
                <div className="md:w-20">
                  <AutoCompleteStyle
                    label=""
                    required={true}
                    value={ops}
                    setChange={(e: any, v: any) => {
                      e.preventDefault();
                      setOps(v);
                    }}
                    options={dataBudget}
                    getOptionLabel={(option: any) => option?.name}
                    isOptionEqualToValue={(option: any, value: any) =>
                      option?.name == value?.name || ""
                    }
                  />
                </div>
                <div className="md:w-60">
                  <form onSubmit={handleSearchBudget}>
                    <TextFieldTotalAmountStyle
                      label="Budget"
                      disabled={undefined}
                      value={amount}
                      setValue={setAmount}
                    />
                  </form>
                </div>
              </div>
            </>
          ) : null}
        </div>
        <div>
          <form onSubmit={handleSearch}>
            <SearchButton value={search} setValue={setSearch} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default HeaderButton;
