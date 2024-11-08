import { Modal, Button, Flowbite } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { type FC } from "react";
import { customTheme } from "../../flowbiteCustomTheme";

interface ModalProps {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  id: number;
  deleteRecord: (id: number) => void;
  isLoading: boolean;
  prompt: string;
}

export const DeletePostModal: FC<ModalProps> = ({
  openModal,
  setOpenModal,
  deleteRecord,
  id,
  isLoading,
  prompt,
}) => {
  const handleDelete = () => {
    try {
      deleteRecord(id);
      setOpenModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Flowbite theme={{ theme: customTheme }}>
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-appGray-400 dark:text-appGray-200" />
              <h3 className="mb-5 text-lg font-normal text-appGray-500 dark:text-appGray-400">
                {prompt}
              </h3>
              <div className="flex justify-center gap-4">
                <Button
                  color="warning"
                  onClick={handleDelete}
                  isProcessing={isLoading}
                >
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
    </>
  );
};
