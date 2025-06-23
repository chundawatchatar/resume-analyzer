# CV Analyzer

This project is a full-stack application designed to analyze a CV against a job description. It consists of a React frontend and a Node.js/Express backend, using tRPC for communication.

## Features

- Upload a CV and a Job Description.
- AI-powered analysis of the CV against the Job Description.
- View the analysis results on the web interface.

## Tech Stack

- **Frontend**: React, TypeScript, Vite, TailwindCSS, Shadcn
- **Backend**: Node.js, Express, TypeScript, tRPC
- **Monorepo**: Turborepo, pnpm workspaces
- **Testing**: Vitest

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm

### Installation and Setup

1.  **Clone the repository:**
    ```sh
    git https://github.com/chundawatchatar/resume-analyzer.git
    cd resume-analyzer
    ```

2.  **Install dependencies:**
    ```sh
    pnpm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root of the project and add the **.env.example** file.

### Running the Application

To start both the frontend and backend in development mode, run:

```sh
pnpm dev
```

The web app will be available at `http://localhost:3000` and the API at `http://localhost:3001`.

### Running Tests

To run the tests, run the test command:

```sh
pnpm test
```