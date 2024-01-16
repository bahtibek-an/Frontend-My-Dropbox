import { useState } from "react";

// /////
export default function App() {
    const [textToCopy, setTextToCopy] = useState(""); // The text you want to copy
    const [copyStatus, setCopyStatus] = useState(false); // To indicate if the text was copied

    const onCopyText = () => {
        setCopyStatus(true);
        setTimeout(() => setCopyStatus(false), 2000); // Reset status after 2 seconds
    };
}
