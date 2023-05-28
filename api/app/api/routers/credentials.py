import requests
import datetime
from fastapi import APIRouter
from app.api.serializers.credentials import CredentialSubjectIn, VerifyCredentialIn
from app.api.routers import check_response_errors
from app.common.settings import get_settings

router = APIRouter(prefix='/vc', tags=['Verifiable Credentials'])

settings = get_settings()


@router.post('/')
async def issue_verifiable_credential(subject: CredentialSubjectIn):
    credential = {
        "@context": [
            "https://www.w3.org/2018/credentials/v1",
            "https://www.w3.org/2018/credentials/examples/v1"
        ],
        "type": ["VerifiableCredential", "MarketplaceLoginCredential"],
        "issuer": settings.ISSUER_DID,
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
