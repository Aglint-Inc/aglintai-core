from flask import make_response, jsonify

import functions_framework
import requests
import io

# from json_parser import json_parser

# from config.supabase_config import save_supabase 

supported_formats = {
    'PDF': 'PDF',
}

def make_json_response(json=None, error=None):
    return jsonify({'json': json, 'error': error}) 

@functions_framework.http
def hello_http(request):
    headers = {"Access-Control-Allow-Origin": "*"}
    if request.method == 'POST':
        content_type = request.headers["content-type"]

        if content_type == "application/json":
            request_json = request.get_json(silent=True)
            url = None
            if request_json and "url" in request_json:
                url = request_json["url"]
                if (url is None or url.strip() == ''):
                    return make_response(make_json_response(error="Missing payload or wrong payload"), 415, headers)
                try:
                    data = read_file(url)
                    return make_response(make_json_response(json=data), 200, headers)
                except Exception as e:
                    return make_response(make_json_response(error=f"{str(e)}"), 200, headers)
            else:
                return make_response(make_json_response(error="JSON is invalid, or missing 'url' or 'request_json' payload"), 200, headers)
    elif request.method == 'GET':
        return make_response(make_json_response(error='only POST method allowed'), 200, headers)
    elif request.method == "OPTIONS":
        # Allows GET requests from any origin with the Content-Type
        # header and caches preflight response for an 3600s
        headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Max-Age": "3600",
            "content-type": "application/json"
        }
        return ("", 204, headers)
    else:
        return make_response(make_json_response(error='Method not Allowed!'), 400, headers)

from pdf_processor import convert_pdf_to_images
from gemini_process_image import gemini_image_process

def read_file(url):
    if (url is None):
        return None
    response = requests.get(url)
    try:
        response.raise_for_status()
    except Exception as e:
        raise Exception(f'Request failed for file type: {response.headers["Content-Type"]} for url:{url}') 

    formate = None
    if (response.headers['Content-Type'] == 'application/pdf'):
        formate = supported_formats["PDF"]
    # elif (response.headers['Content-Type'] == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'):
    #     formate = supported_formats["DOCX"]
    # elif (response.headers['Content-Type'] in ['text/plain', 'text/plain;charset=UTF-8']):
    #     formate = supported_formats["TEXT"]
    #     return { "images":None, "text":clean_text(response.content.decode('utf-8')), "failed": True}
    else:
        raise Exception('File Formate not Supported yet!!!')
    if (formate != None):
        resume_data = io.BytesIO(response.content)

        images = convert_pdf_to_images(resume_data)

        success = gemini_image_process(images)
        if (success!=None):
            return success
        raise Exception(f'Text Extraction Failed for file type {formate}')
    raise Exception('File Formate not Supported')