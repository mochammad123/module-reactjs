import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { Button } from "@mui/material";

type Size =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl"
  | "full";

interface DataModalResponse {
  children?: React.ReactNode;
  name: any;
  handle?: () => void;
  loading?: boolean;
  setShow?: () => void;
  size?: Size;
  group?: React.ReactNode;
}

const Modal: React.FC<DataModalResponse> = ({
  children,
  name,
  handle,
  loading,
  setShow,
  size,
  group,
}) => {
  return (
    <>
      <div className="fixed inset-0 z-40 overflow-hidden bg-black bg-opacity-60 backdrop-blur-sm">
        <div
          className="fixed inset-0 w-full h-full opacity-40"
          onClick={setShow}
        ></div>
        <div className="flex items-center max-h-screen px-4 py-8">
          <div
            className={
              size == "xs"
                ? `relative w-screen max-w-xs p-4 mx-auto bg-white rounded-md shadow-lg`
                : size == "sm"
                ? `relative w-full max-w-sm p-4 mx-auto bg-white rounded-md shadow-lg`
                : size == "md"
                ? `relative w-full max-w-md p-4 mx-auto bg-white rounded-md shadow-lg`
                : size == "lg"
                ? `relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg`
                : size == "xl"
                ? `relative w-full max-w-xl p-4 mx-auto bg-white rounded-md shadow-lg`
                : size == "2xl"
                ? `relative w-full max-w-2xl p-4 mx-auto bg-white rounded-md shadow-lg`
                : size == "3xl"
                ? `relative w-full max-w-3xl p-4 mx-auto bg-white rounded-md shadow-lg`
                : size == "4xl"
                ? `relative w-full max-w-4xl p-4 mx-auto bg-white rounded-md shadow-lg`
                : size == "5xl"
                ? `relative w-full max-w-5xl p-4 mx-auto bg-white rounded-md shadow-lg`
                : size == "6xl"
                ? `relative w-full max-w-6xl p-4 mx-auto bg-white rounded-md shadow-lg`
                : size == "7xl"
                ? `relative w-full max-w-7xl p-4 mx-auto bg-white rounded-md shadow-lg`
                : `relative w-full max-w-full p-4 mx-auto bg-white rounded-md shadow-lg`
            }
          >
            <div className="sm:flex">
              <div className="sm:text-left w-full">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">
                      {name}
                    </h4>
                  </div>
                  <div>
                    <button
                      className="btn btn-sm text-xs text-white rounded-full drop-shadow-2xl bg-transparent border-none"
                      type="button"
                      onClick={setShow}
                    >
                      <CancelIcon className="bg-gray-400 rounded-full hover:bg-gray-500" />
                    </button>
                  </div>
                </div>
                <hr className="" />
                <form onSubmit={handle}>
                  <div
                    className="overflow-y-auto"
                    style={{ maxHeight: "475px" }}
                  >
                    {children}
                  </div>
                  <hr />
                  <div>
                    {loading ? (
                      <div className="flex justify-end items-center mt-3">
                        <div className="w-28 flex justify-end">
                          <Button
                            size="small"
                            color="info"
                            disabled
                            fullWidth
                            sx={{
                              fontSize: "12px",
                              textTransform: "none",
                              width: "100%",
                            }}
                            variant="contained"
                          >
                            <div className="flex justify-center">
                              <div role="status">
                                <svg
                                  aria-hidden="true"
                                  className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                  viewBox="0 0 100 101"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                  />
                                  <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                  />
                                </svg>
                                <span className="sr-only">Loading...</span>
                              </div>
                            </div>
                          </Button>
                        </div>
                      </div>
                    ) : (
                      group
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
