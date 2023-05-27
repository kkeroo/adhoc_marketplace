import requests
import datetime
from fastapi import APIRouter
from app.api.serializers.credentials import CredentialSubjectIn, VerifyCredentialIn
from app.api.routers import check_response_errors

router = APIRouter(prefix='/vc', tags=['Verifiable Credentials'])


@router.post('/')
async def issue_verifiable_credential(subject: CredentialSubjectIn):
    credential = {
        "@context": [
            "https://www.w3.org/2018/credentials/v1",
            "https://www.w3.org/2018/credentials/examples/v1"
        ],
        "type": ["VerifiableCredential", "MarketplaceLoginCredential"],
        "issuer": "did:ethr:goerli:0x025b5ec471f236d6c6a7bda93a62527e4d3bb310c148e43cc5eb08a0e367d36c27",
        "issuanceDate": datetime.datetime.now().isoformat(),
        "credentialSubject": subject.dict()
    }
    response = requests.post(url='http://veramo:8002/vc/', json=credential)
    return check_response_errors(response)


@router.post('/verify/')
async def verify_verifiable_credential(vc_in: VerifyCredentialIn):
    data = {
        'verifiable_credential': vc_in.verifiable_credential_jwt
    }
    response = requests.post(url='http://veramo:8002/vc/verify/', json=data)
    return check_response_errors(response)
