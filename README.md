# Introduction

The purpose of this app was to build a URL Shortener that takes in any valid URL and then shortens
it down to a unique 8 character ID attached to https://pbid.io/.

## Approach

The approach I took to create this app was with using the Vue CLI to add the frontend boilerplate,
and for the backend I used a Node, Express, MongoDB and Typescript boilerplate which I felt was clean and modularised.

I took inspiration from NestJS to update the backend boilerplate to a better structure. In the boilerplate all the logic was in the controller,
so I added a service layer for the business logic. Then I swapped pure Mongoose for Typegoose so that I didn't need to create duplicate types.

## Tech Stack

The tech stack consisted of the following:

- Front End

  - Vue w/ Typescript
  - Vuex
  - Axios
  - Jest for Unit Tests

- Back End
  - Express
  - Express Validation
  - Typescript
  - MongoDb
  - Typegoose
  - Jest for Unit Tests

## Installation instructions / Run Instructions

### Running with Docker

To run the full application in production mode you can use:

```
docker compose up
```

You'll be able to access the app at http://localhost:8080

### Setup

I used `npm-run-all` to run multiple npm commands from the root folder.
Install all dependencies with:

```
npm install
```

### Tests

I've covered unit tests for the frontend and backend, run them with:

```
npm run test
```

### Requirements

There is a requirement for Node.js and Docker to be installed on the system to run

### Development

For development set up, refer to the readmes within each respective application
