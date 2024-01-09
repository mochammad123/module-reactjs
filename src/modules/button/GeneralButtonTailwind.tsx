import React from "react";

interface DataGeneralButton {
  title: string;
  handleClick?: () => void;
  background?: string;
  ring?: string;
}

const GeneralButtonTailwind: React.FC<DataGeneralButton> = ({
  title,
  handleClick,
  background,
  ring,
}) => {
  return (
    <>
      <button
        className={`w-full min-h-full mt-0 p-1.5 flex-1 text-white ${
          background ? `bg-${background}` : `bg-sky-600`
        }  rounded-md outline-none ring-offset-2  ${
          ring ? `ring-${ring}` : `ring-sky-600`
        } focus:ring-2 shadow-lg`}
        type="submit"
        onClick={handleClick}
      >
        <p className="text-xs font-medium">{title}</p>
      </button>
    </>
  );
};

export default GeneralButtonTailwind;
