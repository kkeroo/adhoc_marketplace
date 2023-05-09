import requests
from fastapi import APIRouter

from app.api.routers import check_response_errors

router = APIRouter(prefix='/vc/', tags=['Verifiable Credentials'])

@router.post('/')
async def issue_verifiable_credential():
    credential = {
        "@context": [
            "https://www.w3.org/2018/credentials/v1",
            "https://www.w3.org/2018/credentials/examples/v1"
        ],
        "id": "http://example.gov/credentials/3732",
        "type": ["VerifiableCredential", "UniversityDegreeCredential"],
        "issuer": "https://example.edu/issuers/14",
        "issuanceDate": "2010-01-01T19:23:24Z",
        "credentialSubject": {
            "id": "did:example:ebfeb1f712ebc6f1c276e12ec21",
            "degree": {
                "type": "BachelorDegree",
                "name": "Bachelor of Science and Arts",
                "college": "College of Engineering",
                "university": "Fake University",
                "location": "Wonderland"
            }

        }
    }
    response = requests.post(url='http://veramo:8002/vc/')
    return check_response_errors(response)



