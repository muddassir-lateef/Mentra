import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

export function usePdfParser() {
  const [resumeText, setResumeText] = useState("");
  const [fileName, setFileName] = useState("");
  const [isParsing, setIsParsing] = useState(false);

  const handleFileChange = async (file: File) => {
    if (file) {
      setFileName(file.name);
      setIsParsing(true);
      const reader = new FileReader();
      reader.onload = async (e) => {
        const typedArray = new Uint8Array(e.target?.result as ArrayBuffer);
        const pdf = await pdfjsLib.getDocument(typedArray).promise;
        let text = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          text += content.items
            .map((item) => ("str" in item ? item.str : ""))
            .join(" ");
        }
        setResumeText(text);
        setIsParsing(false);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return { resumeText, fileName, isParsing, handleFileChange };
} 