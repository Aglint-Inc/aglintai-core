JD text to JD json Google Cloud Function.

Setup:
    1. Clone the function.
    2. run npm i

Run:
    yarn start
Run With hot-reload:
    yarn r-start

push function to G-Cloud:
    gcloud functions deploy jd-to-json-parser \
    --runtime=nodejs18 \
    --source=. \
    --trigger-http