/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useRef, useState } from "react";
import "./App.scss";
import { LiveAPIProvider } from "./contexts/LiveAPIContext.tsx";
import { InterviewerAgent } from "./components/interviewer-agent/InterviewerAgent.tsx";
import ControlTray from "./components/control-tray/ControlTray.tsx";
import cn from "classnames";
import logo from "./assets/Logo.png"
import { WelcomeScreen } from "./components/welcome-screen/WelcomeScreen.tsx";

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY as string;
if (typeof API_KEY !== "string") {
  throw new Error("set REACT_APP_GEMINI_APIK_KEY in .env");
}

const host = "generativelanguage.googleapis.com";
const uri = `wss://${host}/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent`;

type InterviewState = "welcome" | "in-progress" | "evaluation";

function App() {
  // this video reference is used for displaying the active stream, whether that is the webcam or screen capture
  // feel free to style as you see fit
  const videoRef = useRef<HTMLVideoElement>(null);
  // either the screen capture, the video or null, if null we hide it
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [interviewState, setInterviewState] = useState<InterviewState>("welcome");
  const [jobDescription, setJobDescription] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [evaluation, setEvaluation] = useState<string>("");

  const handleStartInterview = (jd: string, rt: string) => {
    setJobDescription(jd);
    setResumeText(rt);
    setInterviewState("in-progress");
  };

  const handleEndInterview = (finalEvaluation: string) => {
    setEvaluation(finalEvaluation);
    setInterviewState("evaluation");
  };

  return (
    <div className="App">
      <div className="logo-container">
        <img src={logo} alt="App Logo" className="app-logo" />
      </div>
      
      <LiveAPIProvider url={uri} apiKey={API_KEY}>
        <div className="streaming-console">
          <main>
            {interviewState === "welcome" && (
              <WelcomeScreen onStart={handleStartInterview} />
            )}
            {interviewState === "in-progress" && (
              <div className="main-app-area">
                <InterviewerAgent
                  jobDescription={jobDescription}
                  resumeText={resumeText}
                  onComplete={handleEndInterview}
                  videoStream={videoStream}
                />
                <video
                  className={cn("stream", {
                    hidden: !videoRef.current || !videoStream,
                  })}
                  ref={videoRef}
                  autoPlay
                  playsInline
                />
              </div>
            )}
             {interviewState === "evaluation" && (
              <div className="evaluation-container">
                <h2>Interview Evaluation</h2>
                <p>{evaluation}</p>
              </div>
            )}

            {interviewState === "in-progress" && (
              <ControlTray
                videoRef={videoRef}
                supportsVideo={true}
                onVideoStreamChange={setVideoStream}
              >
                {/* put your own buttons here */}
              </ControlTray>
            )}
          </main>
        </div>
      </LiveAPIProvider>
    </div>
  );
}

export default App; 