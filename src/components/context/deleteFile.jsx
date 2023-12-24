export default function DeleteFile() {
    // const handleFileDelete = async (file) => {
    //     try {
    //       const storage = getStorage();
    //       const storageRef = ref(storage, `uploads/${file.name}`);
    
    //       try {
    //         await getDownloadURL(storageRef);
    //       } catch (error) {
    //         throw new Error("File not found in Firebase Storage.");
    //       }
    
    //       await deleteObject(storageRef);
    
    //       setUploadedFiles((prevUploadedFiles) =>
    //         prevUploadedFiles.filter((uploadedFile) => uploadedFile.name !== file.name)
    //       );
    
    //       message.success(`${file.name} has been deleted`);
    //     } catch (error) {
    //       console.error("Error deleting file:", error);
    //       message.error(`File deletion failed: ${error.message}`);
    //     }
    //   };
    return (
        <div className="deleteFile">
            delete
            {/* <Button
                type="text"
                icon={<DeleteOutlined />}
                onClick={() => handleFileDelete(file)}
                style={{ color: "red" }}
            /> */}
        </div>
    )
}