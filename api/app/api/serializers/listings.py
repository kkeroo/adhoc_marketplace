from pydantic import BaseModel


class ListingIn(BaseModel):
    user_uuid: str
    item_uuid: str
    price: int
    private: bool


class BuyListingIn(BaseModel):
    user_uuid: str


class AcceptListingIn(BaseModel):
    user_uuid: str


class FinishListingIn(BaseModel):
    user_uuid: str
