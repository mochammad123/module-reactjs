import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css";
import React from "react";
import ReactLoading from "react-loading";

interface DataTableResponse {
  sizeTable?: number;
  columnDefs: any;
  rowData?: any;
  isLoading?: boolean;
  doubleClick?: any;
  onSortChanged?: any;
}

const Table: React.FC<DataTableResponse> = ({
  sizeTable,
  columnDefs,
  rowData,
  isLoading,
  doubleClick,
  onSortChanged,
}) => {
  return (
    <div
      className="ag-theme-quartz"
      style={{ height: sizeTable ? sizeTable : 400 }}
    >
      {isLoading ? (
        <div className="flex h-full">
          <div className="m-auto">
            <ReactLoading type="spin" color="#0B2447" />
          </div>
        </div>
      ) : (
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          rowHeight={25}
          tooltipShowDelay={50}
          headerHeight={30}
          groupHeaderHeight={30}
          onRowDoubleClicked={doubleClick}
          onSortChanged={onSortChanged}
        />
      )}
    </div>
  );
};

export default Table;
