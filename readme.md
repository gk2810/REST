
# REST APIs - Practical

## Prerequisite

SQL should be configured on your system

## Installation

Use node package manager [NPM] to install required packages.

```bash
npm install
```

## Description
I used ExpressJS, NodeJS, TypeScript, SQL, Sequelize to develope this project.

## Usage

There are 5 routes.

1./api/users/signup

2./api/users/login

#### following are authenticatetd route

3./api/users/me

4./api/users/logout

5./api/random-joke


## Run Project

to run project first you need to compile code with following code.

```bash
npx tsc
```

after run this command change directory with following command.

```bash
cd dist
```

after run this command you need to run following command.

```bash
node index.js
```

first you need to hit /api/users/signup route with post request

after this you need to hit /api/users/login with post request.

By successful get response of /api/users/login route you have token. you need to add token in authorization in header of authenticatetd route.