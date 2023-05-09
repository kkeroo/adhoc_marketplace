from typing import Optional, List, Any

from pydantic import BaseModel


class IssueCredentialIn(BaseModel):
    address: str
    credential_type: str
    name: str
    dob: str
    email: str
    pin: str
    id_card_number: str


class VerifyCredentialIn(BaseModel):
    verifiable_credential: dict


class CredentialColumn(BaseModel):
    column: str
    value: Optional[List[Any]]


class CredentialOrder(BaseModel):
    column: str
    direction: Optional[Any]


class FindCredentialsArgs(BaseModel):
    where: Optional[List[CredentialColumn]]
    order: Optional[List[CredentialOrder]]
    take: Optional[int]
    skip: Optional[int]


class CreateSDRArgs(BaseModel):
    issuer: str
    subject: str
    replyUrl: str
    tag: str
    claims: str
    credentials: str


class SRDIn(BaseModel):
    pass
