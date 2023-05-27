from pydantic import BaseModel


class ItemIn(BaseModel):
    user_uuid: str
    did: str
    name: str
    description: str
    image: str
