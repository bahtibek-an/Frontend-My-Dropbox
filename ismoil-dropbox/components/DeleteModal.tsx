import { useUser } from "@clerk/nextjs";

import { db, storage } from "@/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref } from "firebase/storage";

import Toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useAppStore } from "@/store/store";

interface DeleteModalProps {
  fileId: string;
  deleteFileFromState: (fileId: string) => void;
}

const DeleteModal = ({ fileId, deleteFileFromState }: DeleteModalProps) => {
  const { user } = useUser();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useAppStore((state) => [
    state.isDeleteModalOpen,
    state.setIsDeleteModalOpen,
    state.fileName,
    state.setFileName,
  ]);

  const deleteFile = async () => {
    const toastId = Toast.loading("Deleting file...");
    try {
      if (user) {
        // Delete the file from Firestore
        const fileRef = doc(db, "users", user.id, "files", fileId);

        await deleteDoc(fileRef);
        Toast.success("File deleted successfully", { id: toastId });

        // Delete the file from Storage
        const storageRef = ref(storage, `users/${user.id}/files/${fileId}`);
        const url = await getDownloadURL(storageRef);
        if (url) {
          await deleteObject(storageRef);
        }

        // Delete the file from the state
        deleteFileFromState(fileId);

        // Close the delete modal
        setIsDeleteModalOpen(false);
      } else {
        console.error("User is not defined");
      }
    } catch (error: any) {
      console.error(
        `Failed to delete file with ID: ${fileId}. Error: ${error.message}`
      );
      Toast.error("Failed to delete file");
    }
  };
  return (
    <Dialog
      open={isDeleteModalOpen}
      onOpenChange={(isOpen) => {
        setIsDeleteModalOpen(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure to delete ?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the file.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2 ">
          <Button
            size="sm"
            className="px-3 flex-1"
            variant={"ghost"}
            onClick={() => setIsDeleteModalOpen(false)}
          >
            <span className="sr-only">Cancel</span>
            <span>Cancel</span>
          </Button>

          <Button
            type="submit"
            size="sm"
            className="px-3 flex-1"
            variant={"destructive"}
            onClick={() => deleteFile()}
          >
            <span className="sr-only">Delete</span>
            <span>Delete</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
