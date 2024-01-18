import React from "react";
import { auth } from "@clerk/nextjs";

import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";

import { FileType } from "@/types";

import Dropzone from "@/components/Dropzone";
import TableWrapper from "@/components/table/TableWrapper";

const Dashboard = async () => {
  const { userId } = auth();

  const docResults = await getDocs(collection(db, "users", userId!, "files"));

  const skeletonFiles: FileType[] = (
    await Promise.all(
      docResults.docs.map(async (document) => {
        const docData = document.data();
        const filename = docData.filename;

        return {
          id: document.id,
          filename: filename || document.id,
          timestamp:
            new Date(document.data().timestamp?.seconds * 1000) || undefined,
          fullName: document.data().fullName,
          downloadURL: document.data().downloadUrl,
          size: document.data().size,
          type: document.data().type,
        };
      })
    )
  ).filter((file): file is FileType => file !== null);
  // console.log(skeletonFiles);

  return (
    <div>
      <Dropzone />

      <section className="container space-y-5">
        <h2 className="font-bold">All Files</h2>

        <div>
          <TableWrapper skeletonFiles={skeletonFiles} />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
