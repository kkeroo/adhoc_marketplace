from pydantic import BaseSettings


class Settings(BaseSettings):
    INFURA_PROJECT_ID: str = None
    ETHEREUM_NETWORK: str = 'sepolia'
    ISSUER_DID: str = None

    class Config:
        env_file = '.env'


def get_settings() -> Settings:
    return Settings()
