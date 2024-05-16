Deploy command

gcloud functions deploy enqueueTask \
 --runtime nodejs18 \
 --trigger-http \
 --allow-unauthenticated

gcloud functions deploy enqueueTask --runtime nodejs18 --trigger-http --allow-unauthenticated