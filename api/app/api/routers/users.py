import requests
from fastapi import APIRouter

from app.api.serializers.users import UserRegistrationIn

from app.api.routers import check_response_errors

router = APIRouter(prefix='/users', tags=['Users'])


@router.post('/')
async def create_user(user_registration: UserRegistrationIn):
    data = {
        "username": user_registration.username,
    }
    return check_response_errors(response=requests.post(url='http://veramo:8002/users/', json=data))


@router.get('/{uuid}/')
async def get_user(uuid: str):
    return check_response_errors(response=requests.get(url=f'http://veramo:8002/users/{uuid}/'))
