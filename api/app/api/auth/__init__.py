import requests
from fastapi.requests import HTTPConnection
from starlette.authentication import UnauthenticatedUser, AuthCredentials, AuthenticationError
from starlette.authentication import AuthenticationBackend
from starlette.responses import Response
from starlette.status import HTTP_401_UNAUTHORIZED
from app.api.routers import check_response_errors


class VerifiableCredentialAuthBackend(AuthenticationBackend):
    async def authenticate(self, conn: HTTPConnection):
        endpoint = conn.scope.get('path')
        if endpoint in ['/api/v1/did/', '/api/v1/vc/']:
            return AuthCredentials(['unauthenticated']), UnauthenticatedUser()

        # Always allow OPTIONS requests, so Nuxt Auth lib and FastAPI CORS middleware can handle CORS properly
        if conn.scope.get('method', None) == 'OPTIONS':
            return AuthCredentials(['unauthenticated']), UnauthenticatedUser()

        auth_header = conn.headers.get('Authorization')

        print(auth_header)

        if not auth_header:
            raise AuthenticationError('Authentication token is missing')

        try:
            _, token = auth_header.split(' ')
        except ValueError:
            raise AuthenticationError('Authentication token is missing')

        try:
            data = {
                'verifiable_credential': token
            }
            response = requests.post(url='http://veramo:8002/vc/verify/', json=data)
            check_response_errors(response)
            if not response.json()['verified']:
                raise AuthenticationError('Authentication token is invalid')
        except AuthenticationError as e:
            raise AuthenticationError(e)
        return AuthCredentials(['authenticated']), response.json()


def on_auth_error(conn: HTTPConnection, exc: Exception):
    return Response(status_code=HTTP_401_UNAUTHORIZED, content=str(exc))
