"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  DocumentSnapshot,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/firebase";

import { Button } from "../ui/button";

import { FileType } from "@/types";

import { columns } from "./columns";

import { DataTable } from "./Table";

import { Skeleton } from "../ui/skeleton";

const TableWrapper = ({ skeletonFiles }: { skeletonFiles: FileType[] }) => {
  const { user } = useUser();
  const [initialFiles, setInitialFiles] = useState<FileType[]>([]);
  const [sort, setSort] = useState<"asc" | "desc">("desc");

  const [docs, loading, error] = useCollection(
    user &&
      query(
        collection(db, "users", user.id, "files"),
        orderBy("timestamp", sort)
      )
  );

  useEffect(() => {
    if (user) {
      const unsubscribe = docs?.docs.map((document) => {
        const docRef = doc(db, "users", user.id, "files", document.id);
        return onSnapshot(docRef, (docSnapshot: DocumentSnapshot) => {
          if (docSnapshot.exists()) {
            const filename = docSnapshot.data().filename;
            // console.log(`Updated filename is ${filename}`);
            setInitialFiles((prevFiles) => {
              // Check if a file with the same ID already exists
              const existingFileIndex = prevFiles.findIndex(
                (file) => file.id === docSnapshot.id
              );

              if (existingFileIndex !== -1) {
                // If the file exists, update it
                const updatedFiles = [...prevFiles];
                updatedFiles[existingFileIndex] = {
                  id: docSnapshot.id,
                  filename: filename || docSnapshot.id,
                  timestamp:
                    new Date(docSnapshot.data().timestamp?.seconds * 1000) ||
                    undefined,
                  fullName: docSnapshot.data().fullName,
                  downloadURL: docSnapshot.data().downloadUrl,
                  size: docSnapshot.data().size,
                  type: docSnapshot.data().type,
                };
                return updatedFiles;
              } else {
                // If the file doesn't exist, add it
                return [
                  ...prevFiles,
                  {
                    id: docSnapshot.id,
                    filename: filename || docSnapshot.id,
                    timestamp:
                      new Date(docSnapshot.data().timestamp?.seconds * 1000) ||
                      undefined,
                    fullName: docSnapshot.data().fullName,
                    downloadURL: docSnapshot.data().downloadUrl,
                    size: docSnapshot.data().size,
                    type: docSnapshot.data().type,
                  },
                ];
              }
            });
          } else {
            console.log("No such document!");
          }
        });
      });

      // Cleanup function
      return () => {
        unsubscribe && unsubscribe.forEach((unsub) => unsub());
      };
    }
  }, [docs, user]);

  // console.log("initial Files ......." + JSON.stringify(initialFiles));

  const deleteFileFromState = (fileId: string) => {
    setInitialFiles((prevFiles) => {
      const newFiles = prevFiles.filter((file) => {
        // console.log(`file.id: ${file.id}, fileId: ${fileId}`);
        return file.id !== fileId;
      });
      // console.log(newFiles);
      return newFiles;
    });
  };
  const sortedFiles = [...initialFiles].sort((a, b) => {
    if (sort === "asc") {
      return a.timestamp > b.timestamp ? -1 : 1;
    } else {
      return a.timestamp < b.timestamp ? -1 : 1;
    }
  });

  <DataTable
    columns={columns}
    data={sortedFiles}
    deleteFileFromState={deleteFileFromState}
  />;

  if (docs?.docs.length === undefined) {
    return (
      <div className="flex flex-col">
        <Button variant={"outline"} className="ml-auto w-36 h-10 mb-5">
          <Skeleton className="h-5 w-full" />
        </Button>

        <div className="border rounded-lg">
          <div className="border-b h-12" />
          {skeletonFiles.map((file) => (
            <div
              key={file.id}
              className="flex items-center space-x-4 p-5 w-full"
            >
              <Skeleton className="h-12 w-12" />
              <Skeleton className="h-12 w-full" />
            </div>
          ))}

          {skeletonFiles.length === 0 && (
            <div className="flex items-center space-x-4 p-5 w-full">
              <Skeleton className="h-12 w-12" />
              <Skeleton className="h-12 w-full" />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-5 pb-11">
      <Button
        variant={"outline"}
        className="ml-auto w-fit"
        onClick={() => setSort(sort === "desc" ? "asc" : "desc")}
      >
        Sort By {sort === "desc" ? "Newest" : "Oldest"}
      </Button>
      <DataTable
        columns={columns}
        data={sortedFiles}
        deleteFileFromState={deleteFileFromState}
      />
    </div>
  );
};

export default TableWrapper;
