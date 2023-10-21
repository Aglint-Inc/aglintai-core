Trying Preprod Deployment.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started here

First, run the development server:
 
```bash 
npm run dev 
# or 
yarn dev 
``   
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. 
 
You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.
 
[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More 
To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
 
## Deploy on Vercel 
 
The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## sendgrid

send grid install npm to send emails

## create notification using context
 
// object for create notification

{
type: 'goovibes', 
heading: 'Goodvibes recieved',
text: 'Yuor text',
employee_id:'employee_id for whon to notify',
}

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

## googlemapapi  autosearch taken from place api google 

https://developers.google.com/maps/documentation/places/web-service/autocomplete 


src/
  |- Components/
  |     |- UI/
  |     |   |- Button/
  |     |   |   |- index.tsx
  |     |   |  
  |     |   |
  |     |   |- Input/
  |     |   |   |- index.tsx
  |     |   | 
  |     |   |
  |     |   |- ...
  |     |
  |     |- Unit/
  |     |   |- Avatar/
  |     |   |   |- index.tsx
  |     |   |   
  |     |   |
  |     |   |- Badge/
  |     |   |   |- index.tsx
  |     |   |  
  |     |   |
  |     |   |- ...
  |     |
  |     |- Copies/
  |     |   |- Card/
  |     |   |   |- index.tsx
  |     |   |  
  |     |   |
  |     |   |- Modal/
  |     |   |   |- index.tsx
  |     |   |  
  |     |   |
  |     |   |- ...
  |     |
  |     |- Layout/
  |         |- Header/
  |         |   |- index.tsx
  |         |  
  |         |
  |         |- Footer/
  |         |   |- index.tsx
  |         |   
  |         |
  |         |- ...
  |  
    