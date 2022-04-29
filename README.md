# Insights

This is the repository for the Insights App.
The app lets users create and tag insights as well as reading insights from other users.

## Features

- Show the latest insights
- Filter insights by tags
- Write a new insight
- Update an existing insight
- Create tags
- Find tags by name
- Update an existing tag
- Remove insights and tags

## Tech

The app was created using:
- Node: backend Javascript runtime
- Express: a fastp HTTP framework for Node
- Typescript: Javascript with static typing, similar to C# or Java
- NestJS: a progressive, unopinionated framework for Node apps
- TypeORM: an ORM for TS similar to Hibernate and Entity Framework
- SQLite: a small self-contained database engine for development environment
- Swagger: a tool for documenting and interacting with web APIs
- React: a frontend Javascript framework
- Expo: a mobile framework for building apps for iOS & Android using React

Apart from the tech stack, the following development principles where followed:

- TDD: the tests were written first, then the production code to make the tests pass were written. The project has 100% code coverage
- DDD: the domain is well bounded between the contexts of Users and Posts. Also, the project uses well-known DDD blocks, such as Entities, Repositories, Value Objects, etc.
- Clean architecture: the project has three well defined layers and all dependencies point upwards from the entities:
    - Domain: where entities and use cases goes
    - Application: where all application specific code goes, such as modules, services, interceptors
    - IO: where all input and output is done, such as HTTP controllers and database mappings
- CQRS: all actions on the app are use cases that are either commands or queries
- SOLID: the code is very clean and respect as much as possible the SOLID principles

## Requirements

Posterr requires [Node.js](https://nodejs.org/) and [Yarn](https://yarnpkg.com/) to run.

## Running the app

Install the dependencies for both the frontend and backend, then use the start script

```sh
cd backend && yarn && yarn start
```

```sh
cd frontend && yarn && yarn web
```

After running, the API will be available at http://localhost:3000 and the UI will be available at http://localhost:19006.

To run the backend unit tests with coverage report:
```sh
cd backend && yarn test:cov
```

After the tests where ran, the interactive coverage report will be available at `backend/coverage/lcov-report/index.html`.

To run the backend E2E tests:

```sh
cd backend && yarn test:e2e
```

The E2E tests simulates an HTTP client (such as Postman) making requests to the app and asserting the responses.