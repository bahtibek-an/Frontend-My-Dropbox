import Dropzone from "@/components/Dropzone";
import TableWrapper from "@/components/table/TableWrapper";
import { db } from "@/firebase";
import { FileType } from "@/typings";
import { auth } from "@clerk/nextjs";
import { collection, getDocs } from "firebase/firestore";
import React from "react";

async function page() {
  const { userId } = auth();

  const docsResults = await getDocs(collection(db, "users", userId!, "files"));

  const skeletonFiles: FileType[] = docsResults.docs.map((doc) => ({
    id: doc.id,
    filename: doc.data()?.filename || "Loading..",
    timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
    fullName: doc.data().fullName,
    downloadURL: doc.data().downloadURL,
    type: doc.data().type,
    size: doc.data().size,
  }));

  return (
    <div className="border-t">
      <Dropzone />
      <section className="container space-y-5">
        <h2>All files</h2>
        <div>
          <TableWrapper skeletonFiles={skeletonFiles} />
        </div>
      </section>
    </div>
  );
}

export default page;
