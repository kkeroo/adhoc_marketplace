import requests
from fastapi import APIRouter
from app.api.serializers.items import ItemIn

from app.api.routers import check_response_errors

router = APIRouter(prefix='/items', tags=['Items'])


@router.get('/')
async def get_items(user_uuid: str):
    params = {'user_uuid': user_uuid if user_uuid else None}
    return check_response_errors(response=requests.get(url=f'http://marketplace:8003/items/', params=params))


@router.post('/')
async def create_item(item: ItemIn):
    data = {
        "user_uuid": item.user_uuid,
        "did": item.did,
        "name": item.name,
        "description": item.description,
        "image": item.image
    }
    return check_response_errors(response=requests.post(url='http://marketplace:8003/items/', json=data))


@router.get('/{item_uuid}/')
async def get_user(item_uuid: str):
    return check_response_errors(response=requests.get(url=f'http://marketplace:8003/items/{item_uuid}/'))
