import React, { useEffect } from "react";
import Modal from "./Modal";
import AutoComplete from "../Input/AutoComplete";
import CheckboxApproval from "../checkbox/CheckboxApproval";
import ReactLoading from "react-loading";
import ButtonApprovalModal from "../../components/Modal/SetApproval/ButtonApprovalModal";
import Swal from "sweetalert2";

interface ISetApproval {
  pic: any;
  setPic: any;
  assistantManager: any;
  setAssistantManager: any;
  manager: any;
  setManager: any;
  generalManager: any;
  setGeneralManager: any;
  director: any;
  setDirector: any;
  isAssistantManagerChecked: boolean;
  setIsAssistantManagerChecked: any;
  isManagerChecked: boolean;
  setIsManagerChecked: any;
  isGeneralManagerChecked: boolean;
  setIsGeneralManagerChecked: any;
  setShow: () => void;
  data?: any;
  handle?: () => void;
  loading?: boolean;
  isLoadingModal: boolean;
  setSelectedData: any;
}

const ModalSetApproval: React.FC<ISetApproval> = ({
  pic,
  setPic,
  assistantManager,
  setAssistantManager,
  manager,
  setManager,
  generalManager,
  setGeneralManager,
  director,
  setDirector,
  isAssistantManagerChecked,
  setIsAssistantManagerChecked,
  isManagerChecked,
  setIsManagerChecked,
  isGeneralManagerChecked,
  setIsGeneralManagerChecked,
  setShow,
  data,
  handle,
  loading,
  isLoadingModal,
  setSelectedData,
}) => {
  const positionIds = (positionEmployee: string) => {
    return (
      data?.find((position: any) => position?.positionName === positionEmployee)
        ?.positionId || ""
    );
  };

  const positionIdPic = positionIds("Pic");
  const positionIdAssistantManager = positionIds("Assistant Manager");
  const positionIdManager = positionIds("Manager");
  const positionIdGeneralManager = positionIds("General Manager");
  const positionIdDirector = positionIds("Director");

  const positionEmployees = (id: number) => {
    return (
      data?.find((position: any) => position?.positionId == id)?.employees || []
    );
  };

  const employeePic = positionEmployees(positionIdPic);
  const employeeAssistantManager = positionEmployees(
    positionIdAssistantManager
  );
  const employeeManager = positionEmployees(positionIdManager);
  const employeeGeneralManager = positionEmployees(positionIdGeneralManager);
  const employeeDirector = positionEmployees(positionIdDirector);

  useEffect(() => {
    if (employeePic && employeePic.length > 0) {
      setPic(employeePic[0]);
    }

    if (employeeDirector && employeeDirector.length > 0) {
      setDirector(employeeDirector[0]);
    }
    console.clear();
  }, [employeePic, employeeDirector, data]);

  useEffect(() => {
    if (!isAssistantManagerChecked) {
      setAssistantManager("");
    }
    console.clear();
  }, [isAssistantManagerChecked]);

  useEffect(() => {
    if (!isManagerChecked) {
      setManager("");
    }
    console.clear();
  }, [isManagerChecked]);

  useEffect(() => {
    if (!isGeneralManagerChecked) {
      setGeneralManager("");
    }
    console.clear();
  }, [isGeneralManagerChecked]);

  const handleErrorAdd = () => {
    if (isAssistantManagerChecked && !assistantManager) {
      Swal.fire({
        icon: "error",
        title: "Opss...",
        text: "Please select data Assistant Manager",
      });

      return false;
    } else if (isManagerChecked && !manager) {
      Swal.fire({
        icon: "error",
        title: "Opss...",
        text: "Please select data Manager",
      });

      return false;
    } else if (isGeneralManagerChecked && !generalManager) {
      Swal.fire({
        icon: "error",
        title: "Opss...",
        text: "Please select data General Manager",
      });

      return false;
    } else if (!director) {
      Swal.fire({
        icon: "error",
        title: "Opss...",
        text: "Please select data Director",
      });

      return false;
    }

    return true;
  };

  const handleAddApproval = (e: any) => {
    e.preventDefault();

    if (!handleErrorAdd()) {
      return;
    }

    const newData = [];

    if (pic) {
      newData.push({
        need_approve: true,
        position_id: parseInt(positionIdPic),
        employee_id: parseInt(pic.id),
        initial: pic?.initial,
      });
    }

    if (director) {
      newData.push({
        need_approve: true,
        position_id: parseInt(positionIdDirector),
        employee_id: parseInt(director.id),
        initial: director?.initial,
      });
    }

    if (isAssistantManagerChecked) {
      if (assistantManager) {
        newData.push({
          need_approve: true,
          position_id: parseInt(positionIdAssistantManager),
          employee_id: parseInt(assistantManager.id),
          initial: assistantManager?.initial,
        });
      } else {
        newData.push({
          need_approve: false,
          position_id: parseInt(positionIdAssistantManager),
          employee_id: null,
          initial: null,
        });
      }
    }

    if (isManagerChecked) {
      if (manager) {
        newData.push({
          need_approve: true,
          position_id: parseInt(positionIdManager),
          employee_id: parseInt(manager.id),
          initial: manager?.initial,
        });
      } else {
        newData.push({
          need_approve: false,
          position_id: parseInt(positionIdManager),
          employee_id: null,
          initial: null,
        });
      }
    }

    if (isGeneralManagerChecked) {
      if (generalManager) {
        newData.push({
          need_approve: true,
          position_id: parseInt(positionIdGeneralManager),
          employee_id: parseInt(generalManager.id),
          initial: generalManager?.initial,
        });
      } else {
        newData.push({
          need_approve: false,
          position_id: parseInt(positionIdGeneralManager),
          employee_id: null,
          initial: null,
        });
      }
    }

    setSelectedData(newData);
    setShow();
    setAssistantManager(null);
    setManager(null);
    setGeneralManager(null);
    // setDirector(null);
    // setPresDirector(null);
  };

  return (
    <>
      <Modal
        name="Set Approval"
        size="lg"
        setShow={setShow}
        group={<ButtonApprovalModal handleClick={handleAddApproval} />}
        handle={handle}
        loading={loading}
      >
        {isLoadingModal ? (
          <div className="h-80">
            <div className="flex h-full">
              <div className="m-auto">
                <ReactLoading type="spin" color="#0B2447" />
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex mt-3">
              <div className="basis-4/5">
                <CheckboxApproval
                  label="PIC"
                  checked={true}
                  defaultChecked={true}
                  disabled={true}
                />
              </div>

              <AutoComplete
                readonly={true}
                getOptionLabel={(option: any) => option?.name || ""}
                isOptionEqualToValue={(option: any, value: any) =>
                  option?.name === value?.name
                }
                required={false}
                label=""
                options={employeePic || []}
                value={pic}
                setChange={(e: any, v: any) => {
                  e.preventDefault();
                  setPic(v);
                }}
              />
            </div>
            <div className="flex mt-3">
              <div className="basis-4/5">
                <CheckboxApproval
                  label="Assistant Manager"
                  defaultChecked={false}
                  disabled={false}
                  checked={isAssistantManagerChecked}
                  handleChange={setIsAssistantManagerChecked}
                />
              </div>

              <AutoComplete
                readonly={!isAssistantManagerChecked}
                getOptionLabel={(option: any) => option?.name || ""}
                isOptionEqualToValue={(option: any, value: any) =>
                  option?.name === value?.name
                }
                required={false}
                label=""
                options={employeeAssistantManager || []}
                value={assistantManager}
                setChange={(e: any, v: any) => {
                  e.preventDefault();
                  setAssistantManager(v);
                }}
              />
            </div>
            <div className="flex mt-3">
              <div className="basis-4/5">
                <CheckboxApproval
                  label="Manager"
                  defaultChecked={false}
                  disabled={false}
                  checked={isManagerChecked}
                  handleChange={setIsManagerChecked}
                />
              </div>

              <AutoComplete
                readonly={!isManagerChecked}
                getOptionLabel={(option: any) => option?.name || ""}
                isOptionEqualToValue={(option: any, value: any) =>
                  option?.name === value?.name
                }
                required={false}
                label=""
                options={employeeManager || []}
                value={manager}
                setChange={(e: any, v: any) => {
                  e.preventDefault();
                  setManager(v);
                }}
              />
            </div>
            <div className="flex mt-3">
              <div className="basis-4/5">
                <CheckboxApproval
                  label="DGM / GM"
                  defaultChecked={false}
                  disabled={false}
                  checked={isGeneralManagerChecked}
                  handleChange={setIsGeneralManagerChecked}
                />
              </div>

              <AutoComplete
                readonly={!isGeneralManagerChecked}
                getOptionLabel={(option: any) => option?.name || ""}
                isOptionEqualToValue={(option: any, value: any) =>
                  option?.name === value?.name
                }
                required={false}
                label=""
                options={employeeGeneralManager || []}
                value={generalManager}
                setChange={(e: any, v: any) => {
                  e.preventDefault();
                  setGeneralManager(v);
                }}
              />
            </div>
            <div className="flex mt-3">
              <div className="basis-4/5">
                <CheckboxApproval
                  label="Director"
                  defaultChecked={true}
                  disabled={true}
                />
              </div>

              <AutoComplete
                readonly={false}
                getOptionLabel={(option: any) => option?.name || ""}
                isOptionEqualToValue={(option: any, value: any) =>
                  option?.name === value?.name
                }
                required={false}
                label=""
                options={employeeDirector || []}
                value={director}
                setChange={(e: any, v: any) => {
                  e.preventDefault();
                  setDirector(v);
                }}
              />
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default ModalSetApproval;
