import requests
from fastapi import APIRouter
from app.api.serializers.listings import ListingIn, BuyListingIn, AcceptListingIn, FinishListingIn
from typing import Optional

from app.api.routers import check_response_errors

router = APIRouter(prefix='/listings', tags=['Listings'])


@router.get('/')
async def get_listings(user_uuid: str = None):
    # params = {'user_uuid': user_uuid if user_uuid else None}
    return check_response_errors(response=requests.get(url=f'http://marketplace:8003/listings/',
                                                       # params=params
                                                       ))


@router.post('/')
async def create_listing(listing: ListingIn):
    data = {
        "user_uuid": listing.user_uuid,
        "item_uuid": listing.item_uuid,
        "price": listing.price,
        "private": listing.private
    }
    return check_response_errors(response=requests.post(url='http://marketplace:8003/listings/', json=data))


@router.get('/{listing_uuid}/')
async def get_listing(listing_uuid: str):
    return check_response_errors(response=requests.get(url=f'http://marketplace:8003/listings/{listing_uuid}/'))


@router.post('/{listing_uuid}/buy/')
async def buy_listing(listing_uuid: str, listing: BuyListingIn):
    print(listing.dict())
    data = {
        "user_uuid": listing.user_uuid,
    }
    return check_response_errors(response=requests.post(url=f'http://marketplace:8003/listings/{listing_uuid}/buy/',
                                                        json=data))


@router.post('/{listing_uuid}/accept/')
async def accept_listing(listing_uuid: str, listing: AcceptListingIn):
    data = {
        "user_uuid": listing.user_uuid
    }
    print(listing_uuid)
    return check_response_errors(response=requests.post(url=f'http://marketplace:8003/listings/{listing_uuid}/accept/',
                                                        json=data))


@router.post('/{listing_uuid}/finish/')
async def finish_listing(listing_uuid: str, listing: FinishListingIn):
    data = {
        "user_uuid": listing.user_uuid
    }
    return check_response_errors(response=requests.post(url=f'http://marketplace:8003/listings/{listing_uuid}/finish/',
                                                        json=data))
