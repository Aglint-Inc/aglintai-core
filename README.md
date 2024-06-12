# Getting Started

Welcome to our project! This guide will help you set up and run the project locally.

## Clone the Repository

First, clone the repository from github:

```bash
git clone [repository-url]
```

## Install Dependencies

Before you start, make sure you have Node.js installed on your machine. Then, install all necessary npm packages:

```bash
npm install
```

## Run the Development Server

To start the development server:

```bash
npm run dev
```

Now, open http://localhost:3000 in your browser to see the application in action.

## Deployment on Vercel

You can also deploy the application using Vercel for both preview and production environments.

### Preview Build

To create a preview build:

```bash
vercel
```

### Production Build for Preview

If you want to create a production build for preview purposes:

```bash
vercel --prod --skip-domain
```

### Promote Production Build

To promote a production build:

```bash
vercel promote [deployment-id or url]
```

## check dev or production environment

```bash
if (process && process.env.NODE_ENV === 'development') {
//your code
}
```

# PR Guideline

## Component Update PRs

- **File Restrictions:** Devlink PRs can only contain `<Component>.js` and `<Component>.css` files.
- **Review Requirements:** If there are changes to `<Component>.ts` or any other files, these changes need to be reviewed before raising a PR.

## Other PRs

PRs that depend on devlink changes must include all devlink changes in the same PR.

## PR Submission Process

- **Template Use:** PRs should use the base template as defined in the PR guideline section.
- **Reviewer Assignment:**
  - 1, 2, or 3 reviewers should be assigned based on the extent of the changes.
  - If the change impacts a one or more modules, all owners should be part of review.
- **Urgent Requests:** For urgent PR merge requests notify on Slack on #platform-development channel.

## PR Template

### Description (Must)

Please include a summary of the changes and the issue(s) this PR addresses.

Fixes #(issue)

### Impacts (if applicable)

List all related modules or module owners

- #(Impact 1)
- #(Impact 2)
- #(Impact 3)
- #(Impact 4)

### Related Issues (if applicable)

List all related issues

- #(issue 1)
- #(issue 2)
- #(issue 3)

### Testing Steps (if applicable)

1.
2.
3.

### Screenshots (if applicable)

Please add any screenshots that would help understand your changes.

### Rollback Plan (if applicable)

In case the changes need to be reverted, please describe the rollback plan.

[Guideline](https://www.conventionalcommits.org/en/v1.0.0/)

### Resolving module resolution problem from repo packages

- Any changes made in repo package "npm run build" on that package and install globally for resolving
