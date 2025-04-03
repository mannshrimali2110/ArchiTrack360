# Architrack 360

Architrack 360 is a comprehensive project management and collaboration tool designed for architects and construction professionals. It streamlines workflows, enhances team communication, and provides real-time tracking of project progress. With Architrack 360, users can manage tasks, ensuring projects are completed on time and within budget.

## Features

- **Dashboard**: Overview of key metrics and insights.
- **Inventory Management**: Manage stock levels and operations.
- **Employee Management**: Manage employee records efficiently.
- **Sales Management**: Track revenue and performance.
- **Supplier Management**: Seamless procurement processes.
- **Order Management**: Ensure timely fulfillment and satisfaction.

## Prerequisites

Before setting up the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (for database setup)
- A code editor like [Visual Studio Code](https://code.visualstudio.com/)

## Setup Instructions

Follow these steps to set up Architrack 360 on your local machine:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/mannshrimali2110/ArchiTrack360
   cd ArchiTrack360
   ```

2. **Install Dependencies**:
   Run the following command to install all required dependencies for both frontend and backend:
   ```bash
   npm run develop
   ```

3. **Configure Environment Variables**:
   - **Backend**: Create a `.env` file in the `server` directory and add the following variables:
     ```env
     MONGO_URI=mongodb://localhost:27017/ContructionManagement
     PORT=backend port
     JWT_SECRET="your JWT port"
     ```
   - **Frontend**: Create a `.env` file in the `client` directory and add the following variable:
     ```env
     VITE_BACKEND_URL="backend URL with backend PORT"
     ```

4. **Start the Application**:
   Run the following command to start both the frontend and backend servers:
   ```bash
   npm start
   ```


5. **Run Tests (Optional)**:
   To ensure everything is working correctly, run the test suite:
   ```bash
   npm test
   ```

## Folder Structure

```
Final Presentation/
├── src/
│   ├── components/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── utils/
├── public/
├── client/
│   ├── src/
│   ├── .env
│   └── ...
├── server/
│   ├── .env
│   └── ...
├── package.json
├── README.md
└── server.js
```

## Contributing

We welcome contributions to Architrack 360! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push them to your fork.
4. Submit a pull request with a detailed description of your changes.

