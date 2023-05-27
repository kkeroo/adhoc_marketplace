from fastapi import FastAPI

from app.api.routers import credentials, dids, users, items, listings
from app.common.settings import get_settings

fastapi_app = FastAPI()

settings = get_settings()

API_PREFIX = '/api/v1'
fastapi_app.include_router(credentials.router, prefix=API_PREFIX)
fastapi_app.include_router(dids.router, prefix=API_PREFIX)
fastapi_app.include_router(users.router, prefix=API_PREFIX)
fastapi_app.include_router(items.router, prefix=API_PREFIX)
fastapi_app.include_router(listings.router, prefix=API_PREFIX)
