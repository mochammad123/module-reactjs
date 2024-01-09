import React from "react";
import Modal from "./Modal";
import TextFieldInput from "../Input/TextFieldInput";
import RejectApprovalButton from "../button/RejectApprovalButton";
import Swal from "sweetalert2";

interface IReject {
  note?: string | null;
  setNote?: any;
  handleReject?: any;
  setShow: () => void;
  handle?: () => void;
  loading?: boolean;
}

const ModalRejectApproval: React.FC<IReject> = ({
  note,
  setNote,
  handleReject,
  setShow,
  handle,
  loading,
}) => {
  return (
    <>
      <Modal
        name="Reject Budget"
        size="lg"
        setShow={setShow}
        group={<RejectApprovalButton handleReject={handleReject} />}
        handle={handle}
        loading={loading}
      >
        <div className="w-full mt-4">
          <TextFieldInput
            label="Note"
            multiline={true}
            rows={2}
            type="text"
            readonly={false}
            required={true}
            value={note}
            handleChange={(e: any) => setNote(e.target.value)}
          />
        </div>
      </Modal>
    </>
  );
};

export default ModalRejectApproval;
