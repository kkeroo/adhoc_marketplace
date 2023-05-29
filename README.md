# Table of Contents
- [Ad-hoc marketplace](#ad-hoc-marketplace)
- [Architecture](#architecture)
- [Setup](#setup)
  - [Docker](#docker)
  - [Ethereum](#ethereum)
  - [PostgreSql](#postgresql)
  - [SSI service](#ssi-service)
  - [Marketplace service](#marketplace-service)
  - [API gateway](#api-gateway)
  - [Frontend](#frontend)

## Ad-hoc marketplace

A decentralized marketplace is a platform where buyers and sellers can directly connect with each other and engage in transactions without the need for intermediaries. The marketplace can be built using SSI technology, which allows users to control their own identity and personal data through the use of decentralized identifiers (DIDs) and verifiable credentials (VCs).The use of smart contracts enables automated and secure transactions without the need for a centralized authority to facilitate the process.

## Architecture
The architecture of the marketplace application is based on the microservices architecture pattern. This pattern is a software architecture style that structures an application as a collection of loosely coupled services. 

The marketplace application consists of the following services:
- SSI service
- Marketplace service
- API gateway
- Frontend
- Ethereum Blockchain
- PostgreSQL database

Architecture diagram:

![Architecture](images/architecture.png)

## Setup
### Docker
Docker is an open-source platform that allows you to automate the deployment and management of applications within lightweight, portable containers. By leveraging containerization, Docker enables developers to package their software with all of its dependencies, ensuring consistency and easy deployment across different environments. To set up Docker Desktop, please refer to the official Docker documentation for detailed instructions: [Docker Desktop Setup Instructions](https://docs.docker.com/desktop/).

### Ethereum
In this project, we leverage the power of Ethereum blockchain to deploy smart contracts and utilize DIDs (Decentralized Identifiers) and VCs (Verifiable Credentials). Ethereum provides a secure and decentralized environment for executing smart contracts, enabling trust and transparency in various applications. DIDs and VCs offer a self-sovereign identity solution, empowering individuals to control and share their personal data securely. By integrating these technologies, we enhance the privacy, security, and interoperability of our application. The app enables users to generate their own Ethereum address, DIDs and VCs, which can be used to verify their identity and credentials in the marketplace. Make sure to deposit some funds to the generated address in order to successfully, deploy smart contracts and interact with the marketplace.

### PostgreSql
For persistent data storage and retrieval, this project utilizes a PostgreSQL database hosted on ElephantSQL. To establish a connection to the database, you will need to store the necessary credentials securely. We recommend using a .env file to manage sensitive information. The .env file should be placed in the root directory of the project and should not be committed to version control to protect your credentials from exposure. Ensure that the .env file is added to the project's .gitignore file as well. In the .env file, provide the following variables:

```
DB_HOST=<ElephantSQL-hostname>
DB_PORT=<ElephantSQL-port>
DB_NAME=<database-name>
DB_USER=<database-username>
DB_PASSWORD=<database-password>
```
Replace `<ElephantSQL-hostname>`, `<ElephantSQL-port>`, `<database-name>`, `<database-username>`, and `<database-password>` with the respective values provided by ElephantSQL for your specific PostgreSQL instance. For the setup refer to the official ElephantSQL documentation: [ElephantSQL Setup Instructions](https://www.elephantsql.com/docs/).

By utilizing the .env file, you can easily manage and secure your PostgreSQL database credentials without exposing sensitive information in your project repository. 

### SSI service
To set up the SSI microservice, which utilizes the Veramo framework, follow these steps. Start by navigating to the ssi_service folder, which contains the Node.js app that runs inside a Docker container. Inside this folder, you will find a dev.env file that includes the required environment variables. Make sure to review and update the values in the dev.env file as needed, such as the database host, port, name, username, password, and the desired application port. With the environment variables set, open a terminal or command prompt, navigate to the root directory of the ssi_service project, and run the following commands: docker-compose build and docker-compose up. The first command will build the Docker image for the microservice, using the configurations specified in the docker-compose.yml file. The second command will start the Docker container, running the SSI microservice with the provided environment variables. Monitor the console output for any errors or log messages indicating a successful start of the microservice. Once the Docker container is up and running, the SSI microservice, powered by the Veramo framework, will be accessible at the specified port.

### Marketplace service
To set up the marketplace service, start by navigating to the "marketplace" folder within the project directory. Inside this folder, create a file named .env and populate it with the required variables based on the provided dev.env file. These variables should include database connection details, API keys, and other relevant configuration settings specific to your marketplace service. Once the .env file is set up, open a terminal or command prompt and navigate to the root directory of the project. From there, execute the command docker-compose build to build the Docker image for the marketplace service. This process will utilize the configurations specified in the docker-compose.yml file, as well as the environment variables from the .env file. After the build is complete, run the command docker-compose up to start the Docker container for the marketplace service. Keep an eye on the console output for any errors or log messages to ensure a successful setup.

The marketplace service allows users to upload items and create listings. To initiate a listing, a safe remote purchase smart contract is deployed using the user's Ethereum address, serving as an escrow for trustless transactions. Users can view their Ethereum address in their profile and must deposit funds to cover gas fees associated with contract deployment. This deposit ensures seamless payment processing within the marketplace and facilitates secure purchases between users. By leveraging smart contracts, the marketplace eliminates the need for intermediaries and enhances transparency.

### API gateway
The API gateway serves as a unified interface, offering API endpoints for both the SSI (Self-Sovereign Identity) and marketplace services. To set up the API gateway, navigate to the `api` folder within the project directory and create a .env file with the required variables based on the provided dev.env file. This file should include configurations for service endpoints, authentication mechanisms, and any necessary API keys. From the root directory of the project, execute docker-compose build to build the Docker image for the API gateway, utilizing the specified configurations and environment variables. After the build process, run docker-compose up to start the Docker container, launching the API gateway with the provided configuration. Monitor the console output for any errors or log messages to ensure a successful setup. Once up and running, the API gateway acts as a single entry point for accessing both the SSI and marketplace services, enabling seamless integration and unified API endpoints.

### Frontend
The frontend of the marketplace application serves as the user interface, providing a seamless and intuitive interaction experience. It is developed as a React application, leveraging the capabilities of the React framework. To set up the frontend locally, ensure that you have Node.js and npm (Node Package Manager) installed on your machine. Start by navigating to the root directory of the frontend project in a terminal or command prompt. Run the command npm install to install the required dependencies specified in the package.json file. Once the installation is complete, execute npm start to start the development server. You can then access the frontend by opening your web browser and visiting localhost:3000. The React application will be automatically reloaded when changes are made to the code, providing a smooth development experience. From the frontend, users can interact with the marketplace, browse items, create listings, and perform various other actions facilitated by the user interface.
