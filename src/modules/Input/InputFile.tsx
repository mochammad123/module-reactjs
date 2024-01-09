import React from "react";

interface DataInputFile {
  handleChange?: any;
}

const InputFile: React.FC<DataInputFile> = ({ handleChange }) => {
  return (
    <div>
      <input
        id="example1"
        type="file"
        className="mt-2 cursor-pointer block text-sm file:mr-4 file:rounded-md file:border-0 file:bg-orange-500 file:py-2 file:px-4 file:text-sm file:font-medium file:text-white hover:file:bg-orange-600 focus:outline-none disabled:pointer-events-none disabled:opacity-60 w-64"
        onChange={handleChange}
      />
    </div>
  );
};

export default InputFile;
