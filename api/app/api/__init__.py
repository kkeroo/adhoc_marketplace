from fastapi import FastAPI
from starlette.middleware.authentication import AuthenticationMiddleware
from app.api.auth import VerifiableCredentialAuthBackend, on_auth_error
from app.api.routers import credentials, dids, users, items, listings
from app.common.settings import get_settings
from fastapi.middleware.cors import CORSMiddleware

fastapi_app = FastAPI()

settings = get_settings()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

fastapi_app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

fastapi_app.add_middleware(AuthenticationMiddleware, backend=VerifiableCredentialAuthBackend(), on_error=on_auth_error)

API_PREFIX = '/api/v1'
fastapi_app.include_router(credentials.router, prefix=API_PREFIX)
fastapi_app.include_router(dids.router, prefix=API_PREFIX)
fastapi_app.include_router(users.router, prefix=API_PREFIX)
fastapi_app.include_router(items.router, prefix=API_PREFIX)
fastapi_app.include_router(listings.router, prefix=API_PREFIX)
