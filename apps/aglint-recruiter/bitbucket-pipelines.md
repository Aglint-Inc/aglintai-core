image: node:16.16.0
pipelines:
  branches:
    master:
      - step:
          name: Production Build
          deployment: production
          script:
            - npm install --global vercel
            - vercel pull --yes --environment=production --token=$VERCEL_TOKEN
            - vercel build --prod --token=$VERCEL_TOKEN
            - vercel deploy --prebuilt --prod --token=$VERCEL_TOKEN
    develop:
      - step:
          name: Test Build
          deployment: test
          script:
            - npm install --global vercel
            - vercel pull --yes --environment=production --token=$VERCEL_TOKEN
            - vercel build --token=$VERCEL_TOKEN
            - vercel deploy --prebuilt --token=$VERCEL_TOKEN
    staging:
      - step:
          name: Staging Build
          deployment: staging
          script:
            - npm install --global vercel
            - vercel pull --yes --environment=production --token=$VERCEL_TOKEN
            - vercel build --token=$VERCEL_TOKEN
            - vercel deploy --prebuilt --token=$VERCEL_TOKEN