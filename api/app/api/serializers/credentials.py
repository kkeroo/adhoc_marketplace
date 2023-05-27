from typing import Optional, List, Any

from pydantic import BaseModel


class CredentialSubjectIn(BaseModel):
    id: str
    details: dict


class VerifyCredentialIn(BaseModel):
    verifiable_credential_jwt: str

#
# class CredentialColumn(BaseModel):
#     column: str
#     value: Optional[List[Any]]
#
#
# class CredentialOrder(BaseModel):
#     column: str
#     direction: Optional[Any]
#
#
# class FindCredentialsArgs(BaseModel):
#     where: Optional[List[CredentialColumn]]
#     order: Optional[List[CredentialOrder]]
#     take: Optional[int]
#     skip: Optional[int]
#
#
# class CreateSDRArgs(BaseModel):
#     issuer: str
#     subject: str
#     replyUrl: str
#     tag: str
#     claims: str
#     credentials: str
#
#
# class SRDIn(BaseModel):
#     pass
