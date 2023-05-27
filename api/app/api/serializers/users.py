from pydantic import BaseModel


class UserRegistrationIn(BaseModel):
    username: str
