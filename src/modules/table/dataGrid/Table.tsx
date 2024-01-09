import React from "react";
import ReactLoading from "react-loading";
import { DataGrid } from "@mui/x-data-grid";

interface TableResponse {
  isLoading: boolean;
  rows: any;
  columns: any;
  state: any;
  pagination: any;
  count: any;
}

const Table: React.FC<TableResponse> = ({
  isLoading,
  rows,
  columns,
  state,
  pagination,
  count,
}) => {
  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        {isLoading ? (
          <div className="flex h-full">
            <div className="m-auto">
              <ReactLoading type="spin" color="#0B2447" />
            </div>
          </div>
        ) : (
          <DataGrid
            sx={{ m: 0, p: 0, fontSize: "12px" }}
            rows={rows || []}
            columns={columns || []}
            rowHeight={43}
            density="compact"
            initialState={{
              ...state?.initialState,
            }}
            hideFooterPagination={true}
            getRowId={(row) => row.index}
            // hideFooter={true}
            slots={{
              footer: () => (
                <div className="md:h-10 h-40">
                  <div className="flex md:flex-row flex-col items-center justify-between">
                    <div className="px-4">{count}</div>
                    <div className="px-4">{pagination}</div>
                  </div>
                </div>
              ),
            }}
          />
        )}
      </div>
    </>
  );
};

export default Table;
