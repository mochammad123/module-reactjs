import React from "react";
import GeneralButton from "../../../../modules/button/GeneralButton";

interface IButtonAddNewItem {
  handleSave?: any;
}

const ButtonAddNewItem: React.FC<IButtonAddNewItem> = ({ handleSave }) => {
  return (
    <div className="flex justify-between items-center gap-4 mt-3">
      <div></div>
      <div className="flex gap-3">
        <div className="w-28">
          <GeneralButton
            title="Save"
            variantButton="contained"
            colorButton="info"
            handleClick={handleSave}
          />
        </div>
      </div>
    </div>
  );
};

export default ButtonAddNewItem;
