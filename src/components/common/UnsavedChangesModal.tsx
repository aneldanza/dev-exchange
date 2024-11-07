import { type FC } from "react";
import { Modal, Flowbite, Button } from "flowbite-react";
import { customTheme } from "../../flowbiteCustomTheme";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

interface ModalProps {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  questionId: number;
}

export const UnsavedChangesModal: FC<ModalProps> = ({
  openModal,
  setOpenModal,
  questionId,
}) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    navigate(`/questions/${questionId}`);
    setOpenModal(false);
  };
  return (
    <Flowbite theme={{ theme: customTheme }}>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-appGray-400 dark:text-appGray-200" />
            <h3 className="mb-5 text-lg font-normal text-appGray-500 dark:text-appGray-400">
              You have unsaved changes. Are you sure you want to cancel?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="warning" onClick={handleDelete}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Flowbite>
  );
};
