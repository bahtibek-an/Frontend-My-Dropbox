import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";

import Toast from "react-hot-toast";

import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

import { Input } from "./ui/input";

import { useAppStore } from "@/store/store";

const EditModal = () => {
  const { user } = useUser();
  const [input, setInput] = useState("");

  const [isEditModalOpen, setIsEditModalOpen, fileName, fileId] = useAppStore(
    (state) => [
      state.isEditModalOpen,
      state.setIsEditModalOpen,
      state.fileName,
      state.fileId,
    ]
  );

  const editFile = async () => {
    // console.log("Editing file with id:", fileId);
    if (!user || !fileId) return;

    const toastId = Toast.loading("Editing file...");
    try {
      await updateDoc(doc(db, "users", user.id, "files", fileId), {
        filename: input,
      });
    } catch (error) {
      console.error("Error while editing file or document:", error);
    }

    Toast.success("File edited successfully", { id: toastId });
    setInput("");
    setIsEditModalOpen(false);
  };

  return (
    <Dialog
      open={isEditModalOpen}
      onOpenChange={(isOpen) => {
        setIsEditModalOpen(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you want to rename file ?</DialogTitle>
          <Input
            id="link"
            defaultValue={fileName}
            onChange={(e) => setInput(e.target.value)}
            onKeyDownCapture={(e) => {
              if (e.key === "Enter") {
                editFile();
              }
            }}
          />
        </DialogHeader>
        <div className="flex items-center space-x-2 ">
          <Button
            size="sm"
            className="px-3 flex-1"
            variant={"ghost"}
            onClick={() => setIsEditModalOpen(false)}
          >
            <span className="sr-only">Cancel</span>
            <span>Cancel</span>
          </Button>

          <Button
            type="submit"
            size="sm"
            className="px-3 flex-1"
            onClick={() => editFile()}
          >
            <span className="sr-only">Edit</span>
            <span>Edit</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
