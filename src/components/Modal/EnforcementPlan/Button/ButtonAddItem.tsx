import React from "react";
import GeneralButton from "../../../../modules/button/GeneralButton";

interface IButton {
  handleSave?: any;
  handleDelete?: any;
  handleUpdate?: any;
  data?: any;
}

const ButtonAddItem: React.FC<IButton> = ({
  handleSave,
  handleDelete,
  handleUpdate,
  data,
}) => {
  return (
    <div className="flex justify-between items-center gap-4 mt-3">
      <div>
        {data ? (
          <div className="w-28">
            <GeneralButton
              title="Delete"
              variantButton="outlined"
              colorButton="error"
              handleClick={handleDelete}
            />
          </div>
        ) : null}
      </div>
      <div className="flex gap-3">
        {data ? (
          <div className="w-28">
            <GeneralButton
              title="Update"
              variantButton="contained"
              colorButton="info"
              handleClick={handleUpdate}
            />
          </div>
        ) : (
          <div className="w-28">
            <GeneralButton
              title="Save"
              variantButton="contained"
              colorButton="info"
              handleClick={handleSave}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ButtonAddItem;
