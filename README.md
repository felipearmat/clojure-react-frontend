# Front-End for Clojure/React App

## Introduction

This repository contains the front-end Single Page Application (SPA) designed to work seamlessly with the Clojure/React application. For the guide to the entire application, refer to the [Clojure/React App](https://github.com/felipearmat/clojure-react-app).

This project was created using [Create React App](https://github.com/facebook/create-react-app).

## Requirements

Before you begin, ensure you have the following software installed on your computer:

- [Docker](https://docs.docker.com/engine/install/)

## Application Stack

This project consists of the following components:

- **public**: The "public" folder contains assets like HTML and CSS files.

- **src**: The "src" folder is where the source code of the project is located.

- **tests**: The "tests" folder keeps project unit and/or integration tests.

- **Dockerfile**: The Dockerfile with instructions for building a Docker container for this project.

- **run.sh**: A shell script for making the starting of the container easier.

### Running the Application

To start this application without the back-end, proxy, and Postgres database, execute the following command:

```shell
docker build . -t clojure-react-app-frontend

docker run --rm -it -p 8080:8080 -v ./:/app clojure-react-app-frontend /bin/sh
```

Once you access the container, you can run the [Available Scripts](#available-scripts).

## Available Scripts

Once you access the shell terminal of this project (via Docker or installing locally), you can utilize the following scripts:

### `npm start`

Launches the application in development mode. Open [http://localhost:8080](http://localhost:8080) in your web browser to preview your application.

The page automatically reloads when you make changes, and any lint errors are displayed in the console.

### `npm test`

Starts the test runner in interactive watch mode. For more information on running tests, refer to the [running tests section](https://facebook.github.io/create-react-app/docs/running-tests).

### `npm run build`

Builds the application for production, placing the optimized production files in the `build` folder. This process minifies the code and assigns filenames with unique hashes for optimal performance.

With the build complete, your application is ready for deployment. For detailed information on deployment, see the [deployment section](https://facebook.github.io/create-react-app/docs/deployment).

### `npm run eject`

**Please Note: Ejecting is a one-way operation, and it cannot be undone.**

If you're unsatisfied with the build tool and configuration options, you have the option to "eject" at any time. This command removes the single build dependency from your project and copies all configuration files and transitive dependencies (webpack, Babel, ESLint, etc.) directly into your project. This gives you complete control over these dependencies. While most commands will continue to work, they will refer to the copied scripts, allowing for customization. You do not have to use "eject" if you're satisfied with the default configuration. The curated feature set is suitable for small to mid-sized deployments, and you can choose to customize when you're ready.
