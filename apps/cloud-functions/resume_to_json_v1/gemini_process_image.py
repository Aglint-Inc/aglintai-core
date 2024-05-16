import google.generativeai as genAi
import os,json
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")

if (GEMINI_API_KEY == None):
  raise Exception('GEMINI_API_KEY key is missing')

genAi.configure(api_key=GEMINI_API_KEY)

# Set up the model
generation_config = {
  "temperature": 0,
  "top_p": 1,
  "top_k": 32,
  "max_output_tokens": 4096,
}

safety_settings = [
  {
    "category": "HARM_CATEGORY_HARASSMENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_HATE_SPEECH",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
]

model = genAi.GenerativeModel(model_name="gemini-pro-vision",
                              generation_config=generation_config,
                              safety_settings=safety_settings)

def gemini_image_process(images):
  image_data = [{"mime_type": "image/png","data": data} for data in images]
  prompt_parts = image_data
  prompt_parts.append(
    "You are tasked with populating the json schema present below with the data from the given resume image. SCHEMA :```{\n \"basics\": {\n  \"currentJobTitle\": \"\",\n  \"currentCompany\": \"\",\n  \"firstName\": \"\",\n  \"lastName\": \"\",\n  \"email\": null,\n  \"phone\": null,\n  \"linkedIn\": null,\n  \"social\": [],\n  \"location\": {\n   \"city\": \"\",\n   \"state\": \"\",\n   \"country\": \"\"\n  },\n  \"totalExperienceInMonths\": null\n },\n \"skills\": [],\n \"positions\": [\n  {\n   \"org\": \"\",\n   \"title\": \"\",\n   \"responsibilities\": \"\",\n   \"location\": \"\",\n   \"start\": {\n    \"year\": null,\n    \"month\": null\n   },\n   \"level\": \"\",\n   \"end\": {\n    \"year\": null,\n    \"month\": null\n   }\n  }\n ],\n \"projects\": [\n  {\n   \"title\": \"\",\n   \"summary\": \"\"\n  }\n ],\n \"schools\": [\n  {\n   \"institution\": \"\",\n   \"degree\": \"\",\n   \"gpa\": null,\n   \"field\": \"\",\n   \"start\": {\n    \"year\": null,\n    \"month\": null\n   },\n   \"end\": {\n    \"year\": null,\n    \"month\": null\n   }\n  }\n ],\n \"languages\": [],\n \"certificates\": []\n}```\nRules to follow : \n1.Populate the skills  into the JSON schema with all the skills and tools extracted from the resume which are present under the skills and tools section.\n2.For each work experience, mention all the responsibilities present under the job title as it is present in the image.\n3.Only extract data present in the provided resume image. Do not infer or add any additional data.\n4.Parse the durations into structured start and end dates for work experiences and education, representing month and year.\n5.If any required fields are missing in the resume, return as null in the JSON schema.\n6. strictly output only using the json Schema which is provided above\n", # type: ignore
  )
  response = model.generate_content(prompt_parts)
  json_data = response.text.replace('```','').replace('json','').replace('JSON','')
  return json.loads(json_data)