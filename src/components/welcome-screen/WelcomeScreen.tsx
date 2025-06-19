import React, { useState } from "react";
import "./WelcomeScreen.scss";
import { UserGuide } from "../user-guide/UserGuide.tsx";
import { initialJobDescription } from "../../lib/constants.ts";
import { usePdfParser } from "../../hooks/usePdfParser.ts";

interface WelcomeScreenProps {
  onStart: (jobDescription: string, resumeText: string) => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const [jobDescription, setJobDescription] = useState(initialJobDescription);
  const { resumeText, fileName, isParsing, handleFileChange } = usePdfParser();
  const [showUserGuide, setShowUserGuide] = useState(false);

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      await handleFileChange(file);
    }
  };

  return (
    <div className="welcome-screen">
      <button className="user-guide-button" onClick={() => setShowUserGuide(true)}>User Guide</button>
      {showUserGuide && <UserGuide onClose={() => setShowUserGuide(false)} />}
      <h1>AI Interviewer</h1>
      <textarea
        className="job-description-input"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />
      <div className="file-upload-container">
        <label htmlFor="resume-upload" className="file-upload-label">
          Upload Resume (PDF)
        </label>
        <input
          id="resume-upload"
          type="file"
          accept=".pdf"
          onChange={onFileChange}
          style={{ display: "none" }}
        />
        {isParsing && <p className="file-name">Parsing...</p>}
        {fileName && !isParsing && <p className="file-name">Loaded: {fileName}</p>}
      </div>
      <button
        onClick={() => onStart(jobDescription, resumeText)}
        disabled={isParsing || !resumeText}
      >
        Go to Interview Screen
      </button>
    </div>
  );
} 