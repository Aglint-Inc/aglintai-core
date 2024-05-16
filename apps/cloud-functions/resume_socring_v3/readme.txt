JD text to JD json Google Cloud Function.

Setup:
    1. Clone the function.
    2. sudo npm install --global yarn 
    3. run npm i

Run:
    yarn start

Run With hot-reload:
    yarn dev

add runtime variable:
    gcloud functions deploy resume_scoring_v1 --update-env-vars FOO=bar

push function to G-Cloud:
    gcloud functions deploy resume_scoring_v1 --gen2 --runtime=nodejs18 --region=northamerica-northeast2 --source=. --entry-point=hello --trigger-http --allow-unauthenticated

test:
    url: https://northamerica-northeast2-aglint-cloud-381414.cloudfunctions.net/resume_scoring_v1
    method: POST
    payload: copy from test.json