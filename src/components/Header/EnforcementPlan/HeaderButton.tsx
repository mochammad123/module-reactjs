import React, { useEffect, useState } from "react";
import CreateButton from "../../../modules/button/CreateButton";
import SearchButton from "../../../modules/button/SearchButton";
import AutoCompleteStyle from "../../../modules/Input/AutoCompleteStyle";
import useEnfocementPlanApi from "../../../apis/budget/enforcementPlanApi";
import useDeliberationApi from "../../../apis/budget/deliberationApi";
import sortData from "../../../modules/function/SortData";
import { FiscalYear, Section } from "../../../interface/BudgetPlan/IBudgetPlan";
import useMenuApi from "../../../apis/menu/menuApi";

const HeaderButton = () => {
  const { setShowNonBudget, setDataEpPagination, dataEpPagination } =
    useEnfocementPlanApi();
  const { getPraDeliberation, dataPraDeliberation, getDeliberationPagination } =
    useDeliberationApi();
  const { menus } = useMenuApi();

  const [fiscalYear, setFiscalYear] = useState<FiscalYear | null>(null);
  const [section, setSection] = useState<Section | null>(null);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    getPraDeliberation();
  }, []);

  const handleShow = () => {
    setShowNonBudget(true);
  };

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
    setDataEpPagination({
      ...dataEpPagination,
      fiscalYearsId: value?.id,
    });

    getDeliberationPagination({
      ...dataEpPagination,
      fiscalYearsId: value?.id,
    });
  };

  const handleChangeSection = (event: any, value: any) => {
    event.preventDefault();

    setSection(value);
    setDataEpPagination({
      ...dataEpPagination,
      departmentId: value?.id,
    });

    getDeliberationPagination({
      ...dataEpPagination,
      departmentId: value?.id,
    });
  };

  const handleSearch = (e: any) => {
    e.preventDefault();

    getDeliberationPagination({
      ...dataEpPagination,
      keyWord: search,
    });
  };

  return (
    <div className="flex justify-between items-center my-1">
      <div className="flex items-center gap-4">
        {menus?.data?.employee?.position?.positionLevel == 2 ? (
          <CreateButton title="Non Budget" handleButton={handleShow} />
        ) : null}
      </div>
      <div className="flex items-center gap-3">
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
        {menus?.data?.role?.name == "admin" ? (
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
        ) : null}

        <form onSubmit={handleSearch}>
          <SearchButton value={search} setValue={setSearch} />
        </form>
      </div>
    </div>
  );
};

export default HeaderButton;
