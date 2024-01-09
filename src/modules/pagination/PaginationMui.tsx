import React from "react";
import { Pagination } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface DataPaginationResponse {
  total: number;
  page: number;
  nextPage?: any;
  value: number;
  handleChange?: any;
}

const PaginationMui: React.FC<DataPaginationResponse> = ({
  total,
  page,
  nextPage,
  value,
  handleChange,
}) => {
  return (
    <div className="flex items-center gap-4">
      <FormControl sx={{ minWidth: 80 }} size="small">
        <InputLabel
          id="demo-simple-select-autowidth-label"
          className="font-light text-sm"
        >
          Per Page
        </InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={value}
          onChange={handleChange}
          autoWidth
          label="PerPage"
          size="small"
          sx={{ fontSize: "13px", fontWeight: "100 !important" }}
          inputProps={{
            sx: {
              fontWeight: "100 !important",
            },
          }}
        >
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
          <MenuItem value={0}>All</MenuItem>
        </Select>
      </FormControl>

      <Pagination
        count={total ? total : 1}
        page={page ? page : 1}
        onChange={nextPage}
        variant="outlined"
        shape="rounded"
        color="primary"
        size="small"
      />
    </div>
  );
};

export default PaginationMui;
