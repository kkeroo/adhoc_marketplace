from pydantic import BaseModel


class UserRegistrationIn(BaseModel):
    username: str
    first_name: str
    last_name: str
