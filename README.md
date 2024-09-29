# Giraffine Academy

**Giraffine Academy** is a fun and interactive programming website designed for kids to learn and practice programming through problem-solving, online contests, tutorials, algorithm visualizations, games, and HTML/CSS practice.

## Features

- **Problem Solving**: Kids can practice programming problems ranging from basic to advanced.
- **Online Contests**: Participate in coding challenges and competitions.
- **Tutorials**: Watch tutorials on various programming languages and concepts.
- **Algorithm Visualizer**: Visualize different algorithms to understand how they work.
- **Games**: Play games that are designed to enhance problem-solving and logical thinking.
- **HTML/CSS Practice**: Learn and practice web development with hands-on coding.

## Tech Stack

- **Frontend**: React
- **Backend**: Spring Boot
- **Database**: MongoDB

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js** (v14.x or above)
- **npm** (v6.x or above)
- **Java** (JDK 11 or above)
- **MongoDB**

## Project Setup

### Frontend Setup

1. Open a terminal and navigate to the `frontend` directory:

    ```bash
    cd frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the development server:

    ```bash
    npm start
    ```

   The frontend will be running at `http://localhost:3000`.

### Backend Setup

1. Open the project in **VS Code**.
2. Navigate to the backend project directory.
3. Right-click on the main application file and select **Run Java** to start the backend server.
   
   The backend will be running on `http://localhost:8080`.

### Database Setup

Make sure you have **MongoDB** running on your machine. By default, the project connects to a local MongoDB instance.

If needed, you can configure the MongoDB connection in the backend project under `src/main/resources/application.properties`.

## Project Structure

```bash
├── frontend                 # React frontend
│   ├── public               # Public files
│   └── src                  # Source code for frontend
├── backend                  # Spring Boot backend
│   └── src
│       ├── main
│       └── test
└── README.md                # Project documentation
```

## Contributing

Contributions are welcome! Please follow the standard procedure for reporting issues and submitting pull requests.


## Contact

For any questions or suggestions, please contact us at [giraffineacademy@gmail.com](mailto:giraffineacademy@gmail.com).
