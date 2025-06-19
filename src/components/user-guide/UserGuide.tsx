import React from 'react';
import './UserGuide.scss';

interface UserGuideProps {
  onClose: () => void;
}

export function UserGuide({ onClose }: UserGuideProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>How to use the AI Interviewer</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <p>Welcome to the AI Interviewer! Here's how to get started:</p>
          <ul>
            <li><strong>Job Description:</strong> You can edit the job description in the text area to match the role you're hiring for.</li>
            <li><strong>Upload Resume:</strong> Click the "Upload Resume" button to select a candidate's resume in PDF format. The AI will use this to ask personalized questions.</li>
            <li><strong>Go to Interview Screen:</strong> Once you're ready, click "Go to Interview Screen" to proceed.</li>
            <li><strong>Start Interview:</strong> On the interview screen, click the big red play button  in the control tray at the bottom to start the conversation with the AI.</li>
            <li><strong>During the Interview:</strong> The AI will ask questions based on the job description and the provided resume. You can use your microphone to answer.</li>
            <li><strong>Ending the Interview:</strong> The AI will end the call and provide an evaluation when it has enough information. You can also say "end call" to stop the interview yourself.</li>
          </ul>
          <p>The AI will provide a full evaluation of the candidate's performance on the screen after the interview is complete.</p>
        </div>
        <div className="modal-footer">
          <button className="nice-button" onClick={onClose}>Got it!</button>
        </div>
      </div>
    </div>
  );
} 