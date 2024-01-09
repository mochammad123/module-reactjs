import React from "react";
import Modal from "./Modal";
import ChipDetail from "../chip/ChipDetail";

interface IModalDetailApproval {
  data?: any;
  setShow?: any;
}

const ModalDetailApproval: React.FC<IModalDetailApproval> = ({
  data,
  setShow,
}) => {
  return (
    <>
      <Modal name="Approval Detail" size="lg" setShow={setShow}>
        <div className="mt-3">
          <table className="min-w-full border-none text-sm ">
            <thead className="border-b font-medium text-center  bg-gray-300">
              <tr>
                <th scope="col" className="border-none">
                  Approval
                </th>
                <th scope="col" className="border-none ">
                  Status
                </th>
              </tr>
            </thead>
            {!data || data == 0 ? (
              <tbody>
                <tr className="border-b dark:border-neutral-500">
                  <td
                    className="whitespace-nowrap border-r font-medium dark:border-neutral-500"
                    colSpan={2}
                  >
                    No one data approval
                  </td>
                </tr>
              </tbody>
            ) : data && data?.length === 0 ? (
              <tbody>
                <tr className="border-b dark:border-neutral-500">
                  <td
                    className="whitespace-nowrap border-r font-medium dark:border-neutral-500"
                    colSpan={2}
                  >
                    No one data approval
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {data?.map((item: any, index: number) => (
                  <tr className="border-b px-2" key={index}>
                    <td className="whitespace-nowrap border-none font-medium px-2">
                      <p className="text-sm text-gray-500 mt-2">
                        {item?.empPositition?.positionName}
                      </p>
                      <p className="text-base font-semibold mb-2">
                        {item?.employee ? item?.employee?.name : null}
                      </p>
                    </td>
                    <td className="whitespace-nowrap border-none font-medium px-2">
                      <div className="flex items-center gap-2">
                        {item?.approvalStatus == "approved" ? (
                          <ChipDetail title="Approved" color="#5D9C59" />
                        ) : item?.approvalStatus == "wait" ? (
                          <ChipDetail title="Waiting" color="#FF9800" />
                        ) : item?.approvalStatus == "none" ? (
                          <ChipDetail title="-" color="gray" />
                        ) : (
                          <ChipDetail title="Rejected" color="#BF3131" />
                        )}
                        {item?.isAccounting ? (
                          <ChipDetail title="Accounting" color="#7BD3EA" />
                        ) : null}
                      </div>
                      <p>
                        {item?.approvedAt
                          ? new Date(item?.approvedAt).toLocaleString("id-ID", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                              hour: "numeric",
                              minute: "numeric",
                              second: "numeric",
                              hour12: true,
                            })
                          : "-"}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </Modal>
    </>
  );
};

export default ModalDetailApproval;
