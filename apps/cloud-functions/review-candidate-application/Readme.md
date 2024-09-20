deplyment gloud func https://mails-sender-ta7r36xoza-uc.a.run.app

gcloud functions deploy mails-sender --gen2 --runtime=nodejs18 --region=us-central1 --source=. --entry-point=hello --trigger-http --allow-unauthenticated
