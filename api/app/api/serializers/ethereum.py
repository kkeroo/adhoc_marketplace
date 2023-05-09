from pydantic import BaseModel


class TransactionIn(BaseModel):
    from_address: str
    to_address: str
    hash: str
