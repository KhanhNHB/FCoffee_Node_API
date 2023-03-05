# FCoffes practice with NodeJS, TypeScript

This sample is published as part of self study NodeJS

## Before using

- Please make sure that you have:
- Node.js installed (https://nodejs.org/)
- MySQL installed and running locally
- Run `npm install` or `yarn` in your root project folder

## Usage

To run the project, please use a command line the following:
- `npm start`
- It will run the server at port 3600.

### 2023-03-05 update

- Refactored MySQL connection to a proper common service.
- Added a docker-compose configuration file.

If you are familiar to docker and you have docker installed on your machine and just want to run the project without issues please do:

 - docker-compose build
 - docker-compose up
 - It will run the MySQL at port 3306 (for testing purposes only).
 - It will run the server at port 3600.