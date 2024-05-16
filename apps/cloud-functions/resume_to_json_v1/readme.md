Setup: 1. Clone the function. 2. create venv and activate venv.
python3 -m venv venv
source ./venv/bin/activate (mac) 3. install dependancy
pip install -r requirement.txt 4. run
functions-framework-python --target hello_http

Run:
functions-framework-python --target hello_http --port 8081

add runtime variable:
gcloud functions deploy resume_to_json_v1 --update-env-vars FOO=bar

push function to G-Cloud:
gcloud functions deploy resume_to_json_v1 --gen2 --runtime=python312 --region=asia-south1 --source=. --entry-point=hello_http --trigger-http --allow-unauthenticated

test:
url: https://asia-south1-aglint-cloud-381414.cloudfunctions.net/resume_to_json_v1
method: POST
payload: {"url": "https://gwlinbuxtrnvwvyyhaht.supabase.co/storage/v1/object/public/resume-job-post/public/6ecb18ed-3828-4553-b9c9-e1bd82ca1215/397417e3-aef1-4803-a8bd-a195563ae7d3.pdf"}
