import requests
import json
import random


client = requests.Session()
headers = {
    "api-key": "SHRzeXNCeG1rd0dIQUtXaG5Ua3Y",
    "Content-Type": "application/json"
}

base_url = "https://sms.arkesel.com/api/v2/sms/send"



recipients = ["233206612800"]
MESSAGE = {
    "sender": "Test",
    "message": "This is a test",
    "recipients": recipients
}




try:
    response = client.post(base_url, headers=headers, json=MESSAGE)
    response.raise_for_status()
    print(response.text)

except requests.exceptions.RequestException as e:
    print("An error occurred:", e)


