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

The app requires [Node.js](https://nodejs.org/) and [Yarn](https://yarnpkg.com/) to run.

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

## Critique

Although the SOLID princples were followed as much as possible, I still miss some interfaces on the project to help separate definition from implementation a little more. NestJS's dependency injection system currently doesn't support injecting interfaces, like Castle in .NET or Spring in Java.

The search insights feature is quite simplistic, searching the database using `LIKE %query%`, which is not very performant. The same goes for the tag search. A better solution would be to have the tags on a distributed cache, like Redis for easy access. To proper implement CQRS, the queries should hit Redis, while the writes/delete should hit the SQL database, while updating the Redis cache. For the insights, a proper indexation tool would be benefical like ElasticSearch or even the fulltext search capabilities of some databases, like SQLServer.

Obiously SQLite wasn't designed for production usage, so Postgres could be used instead. Since the code follows the clean architecture, swaping from SQLite to Postgres is just a matter of changing a few environment variables and replacing the libraries (uninstall `sqlite3` and install `pg` through Yarn). Postgres performs very well under high pressure, it's free and highly extendable, making it a great choice for a "startup" app with a lot of users. If the database ever becomes a bottleneck, Postgres can be turned into a cluster with extensions like PgPool or even Citus Data.

The test suite on the backend contains a bunch of duplicated code, which could be turned into a proper test suite toolset, by making test factories or even sharing common structures with related test cases.