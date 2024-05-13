# Getting Started

Welcome to our project! This guide will help you set up and run the project locally.

## Clone the Repository

First, clone the repository from Bitbucket:

```bash
git clone [repository-url]
``
## Install Dependencies
Before you start, make sure you have Node.js installed on your machine. Then, install all necessary npm packages:
```bash
npm install

## Run the Development Server
To start the development server:
```bash
npm run dev

Now, open http://localhost:3000 in your browser to see the application in action.


## Deployment on Vercel
You can also deploy the application using Vercel for both preview and production environments.

### Preview Build
To create a preview build:
```bash
vercel
``

### Production Build for Preview
If you want to create a production build for preview purposes:
```bash
vercel --prod --skip-domain
``

### Promote Production Build
To promote a production build:
```bash
vercel promote [deployment-id or url]
``


## check dev or production environment

if (process && process.env.NODE_ENV === 'development') {
//your code
}


## commit guidelines 

fix: Used to indicate that a commit is fixing a bug.
feat: Used to indicate a new feature addition.
refactor: Used to indicate that the code has been refactored, but without any new features or bug fixes.
style: Used to indicate a change in code style or formatting.
test: Used to indicate changes in testing code or adding new tests.
chore: Used to indicate changes to build processes, libraries, or other tooling.
docs: Used to indicate changes to documentation.
|
|
|
|
.... commit-message story-number

