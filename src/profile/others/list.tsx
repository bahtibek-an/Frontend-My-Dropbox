import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

const isImageFile = (fileName: string) => {
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp"];
  const extension = fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2);

  return imageExtensions.includes(extension.toLowerCase());
};

const ListOther: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [files, setFiles] = useState<{ name: string; url: string }[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [copiedFilePath, setCopiedFilePath] = useState<string | null>(null);
  const filesPerPage = 6;

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchFiles(user.uid, currentPage);
      } else {
        setUserId(null);
        setFiles([]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [currentPage]);

  const fetchFiles = async (userId: string, page: number) => {
    const storage = getStorage();
    const storageRef = ref(storage, `users/${userId}/upload`);

    try {
      const fileList = await listAll(storageRef);
      const fileDetails = await Promise.all(
        fileList.items.map(async (item) => {
          const downloadUrl = await getDownloadURL(item);
          return { name: item.name, url: downloadUrl };
        })
      );
      setFiles(fileDetails);

      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const indexOfLastFile = currentPage * filesPerPage;
  const indexOfFirstFile = indexOfLastFile - filesPerPage;
  const currentFiles = files.slice(indexOfFirstFile, indexOfLastFile);

  const handleCopy = (text: string) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);

    setCopiedFilePath(text);
  };

  return (
    <div className="border-dashed border-gray-400 rounded-lg dark:border-gray-700 p-2">
      <div className="bg-white dark:bg-gray-100 p-6 rounded-md shadow-md mt-2">
        <h2 className="text-2xl font-bold mb-4">Uploaded Files:</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                File Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Open
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Action
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Download
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentFiles.map((file) => (
              <tr key={file.name}>
                <td className="px-6 py-4 whitespace-nowrap">{file.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Open
                    </a>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleCopy(file.url)}
                    className={
                      "px-2 py-1 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 w-24 "
                    }
                  >
                    {copiedFilePath === file.url ? "Copied!" : "Copy"}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() =>
                      isImageFile(file.name)
                        ? null
                        : (window.location.href = file.url)
                    }
                    disabled={isImageFile(file.name)}
                    className={`px-2 py-1 ${
                      isImageFile(file.name)
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-green-500 text-white"
                    } rounded-md hover:bg-green-600 w-24 `}
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between mt-4">
          <button
            onClick={() => fetchFiles(userId!, currentPage - 1)}
            className="flex items-center justify-center px-4 h-10 me-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            disabled={currentPage === 1}
          >
            <svg
              className="w-3.5 h-3.5 me-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 5H1m0 0 4 4M1 5l4-4"
              />
            </svg>
            Previous
          </button>
          <button
            onClick={() => fetchFiles(userId!, currentPage + 1)}
            className="flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            disabled={currentFiles.length < filesPerPage}
          >
            Next
            <svg
              className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListOther;
