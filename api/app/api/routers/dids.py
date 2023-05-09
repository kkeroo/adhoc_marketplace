import requests
from fastapi import APIRouter

from app.api.routers import check_response_errors

router = APIRouter(prefix='/did', tags=['Decentralized Identifiers'])


@router.get('/')
async def get_did_list():
    response = requests.get(url='http://veramo:8002/did/')
    return check_response_errors(response)


@router.post('/')
async def create_did():
    response = requests.post(url='http://veramo:8002/did/')
    return check_response_errors(response)


@router.delete('/{did}/')
async def delete_did():
    response = requests.delete(url=f'http://veramo:8002/did/{did}/')
    return check_response_errors(response)


@router.get('/{did}/')
async def resolve_did():
    response = requests.get(url=f'http://veramo:8002/did/{did}/')
    return check_response_errors(response)
