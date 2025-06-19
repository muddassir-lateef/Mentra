# AI Interviewer

This project is a web-based AI-powered interviewer that conducts screening interviews with candidates. It uses Google's Generative AI to ask relevant questions based on a job description and a candidate's resume.

## Features

-   **Dynamic Job Descriptions:** Edit the job description to match the role you're hiring for.
-   **Resume Analysis:** Upload a candidate's resume in PDF format. The AI will parse the resume and use it to ask personalized questions.
-   **AI-Powered Interviews:** The AI interviewer, "Mentra," asks questions based on the job description and the provided resume.
-   **Real-time Transcription:** View a real-time transcription of the conversation.
-   **Tool Use:** The AI can use tools, such as ending the call or recording an evaluation.
-   **Evaluation:** The AI provides a detailed evaluation of the candidate's performance at the end of the interview.

## Getting Started


### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/interview-agent.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd interview-agent
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

### Running the Application

First add a .env with REACT_APP_GEMINI_API_KEY filled with your gemini api key.

Note: This method of storing the api key on the client side is not secure but since this is a demo, I am not implmenting a separate backend server for this.

To start the application, run the following command:

```bash
npm start
```

This will start the development server and open the application in your default browser at `http://localhost:3000`.

## Project Structure

The project is structured as follows:

-   `public/`: Contains the public assets of the application.
-   `src/`: Contains the source code of the application.
    -   `components/`: Contains the React components.
    -   `contexts/`: Contains the React contexts.
    -   `hooks/`: Contains the custom React hooks.
    -   `lib/`: Contains the libraries and utility functions.
    -   `assets/`: Contains the static assets, such as images and fonts.
-   `README.md`: This file.

## How to Use

1.  **Welcome Screen:**
  ![image](https://github.com/user-attachments/assets/c9c8213f-57b0-4a1f-a6e8-b9509be49ab6)

    -   Edit the job description in the text area.
    -   Upload a candidate's resume in PDF format.
    -   Click "Go to Interview Screen" to proceed.
2.  **Interview Screen:**
   ![image](https://github.com/user-attachments/assets/e8b0a5ac-b95f-4de1-bc4f-e4d891bad38b)

    -   Click the "Start" button to begin the interview.
    -   Use your microphone to answer the AI's questions or optionally also use the camera
    
    
4.  **Final Evaluation:**
   ![image](https://github.com/user-attachments/assets/e2062dff-4ecf-4357-8580-84325576889c)

-   The AI will end the call and provide an evaluation when it has enough information. You can also say "end call" to stop the interview yourself.

## Contributing

Contributions are welcome! Please see the `CONTRIBUTING.md` file for more information.

## License

This project is licensed under the Apache License 2.0. See the `LICENSE` file for more information.
