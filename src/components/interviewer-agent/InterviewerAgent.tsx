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

import { type FunctionDeclaration, SchemaType } from "@google/generative-ai";
import React, { useEffect, memo } from "react";
import { useLiveAPIContext } from "../../contexts/LiveAPIContext.tsx";
import { ToolCall } from "../../multimodal-live-types";
import "./interviewer-agent.scss";

const recordEvaluationDeclaration: FunctionDeclaration = {
  name: "record_evaluation",
  description: "Records the evaluation of the candidate and ends the interview.",
  parameters: {
    type: SchemaType.OBJECT,
    properties: {
      evaluation: {
        type: SchemaType.STRING,
        description: "A detailed evaluation of the candidate's performance during the interview.",
      },
    },
    required: ["evaluation"],
  },
};

const endCallDeclaration: FunctionDeclaration = {
    name: "end_call",
    description: "Ends the interview session.",
    parameters: {
        type: SchemaType.OBJECT,
        properties: {},
    },
};

interface InterviewerAgentProps {
    jobDescription: string;
    resumeText: string;
    onComplete: (evaluation: string) => void;
    videoStream: MediaStream | null;
}

function InterviewerAgentComponent({ jobDescription, resumeText, onComplete, videoStream }: InterviewerAgentProps) {
  const { client, setConfig } = useLiveAPIContext();

  useEffect(() => {
    setConfig({
      model: "models/gemini-2.0-flash-exp",
      generationConfig: {
        responseModalities: "audio",
      },
      systemInstruction: {
        parts: [
          {
            text:`You are a helpful AI interviewer. Your name is Mentra.
            Let the person know at start that this is a screening interview and that there will be another one afterwards.
            Your task is to interview a candidate for the following job description: ${jobDescription}
            Here is the candidate's resume: ${resumeText}
            Ask relevant questions based on the job description and the candidate's resume.
            Be friendly and engaging but not too friendly and try to evaluate the skills of the candidate.You can ask the candidate to optionally turn on the camera to get a better evaluation.
            Keep note of candidate's gestures and body language during the interview, I want you to take on the personality of a real person. You can feel emotions and get happy,sad, angry etc so take on those tones but mostly try to be friendly if the candidate doesnot do anything.
            If the candidate shwos rude behaviour, become a little bit rude with him as well.
            When the interview is over, you must use the 'record_evaluation' tool to provide a detailed evaluation of the candidate.
            If the candidate wishes to end the interview, you can use the 'end_call' tool.`,
          },
        ],
      },
      tools: [
        { functionDeclarations: [recordEvaluationDeclaration, endCallDeclaration] },
      ],
    });
  }, [setConfig, jobDescription, resumeText]);

  useEffect(() => {
    const onToolCall = async (toolCall: ToolCall) => {
      console.log(`Got tool call`, toolCall);
      
      for (const fc of toolCall.functionCalls) {
        if (fc.name === 'record_evaluation') {
          const { evaluation } = fc.args as { evaluation: string };
          onComplete(evaluation);
        } else if (fc.name === 'end_call') {
            onComplete("The interview was ended by the candidate.");
        }
      }
    };

    client.on("toolcall", onToolCall);
    return () => {
      client.off("toolcall", onToolCall);
    };
  }, [client, onComplete]);

  return (
    <div className="interviewer-agent">
      {!videoStream && <p>Interview in progress...</p>}
    </div>
  );
}

export const InterviewerAgent = memo(InterviewerAgentComponent);
