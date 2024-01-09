import React from "react";

interface DataHeaderResponse {
  title?: string;
  menu?: string;
  subMenu?: string;
}

const HeaderLayout: React.FC<DataHeaderResponse> = ({
  title,
  menu,
  subMenu,
}) => {
  return (
    <div>
      <div className="content-header m-0 pr-0 pl-0 pt-2 pb-2">
        <div className="container-fluid">
          <div className="flex justify-between items-center">
            <div>
              <p className="m-0 text-base font-semibold">{title}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="m-0 text-xs">{menu}</p>
              <p className="m-0 text-xs">/</p>
              <p className="m-0 text-xs">{subMenu}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderLayout;
