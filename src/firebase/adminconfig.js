import admin from "firebase-admin";

const config = {
  type: "service_account",
  project_id: "e-commerce-web-app-2f4fa",
  private_key_id: "ed8a9f76348c8bdc9f23955d81c382eceb26c405",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCvgFMNsxZToDy2\nWAC79y/Ae+oba7gr6zr5ceWzdw2HkNseoiJgAAH4pP5Hs7CGQQ638pbhSiLTURs8\nCyeBxhrJAgJvn4hHRPKL5IsV+XQfMLmcDqCHd+KcEHyxHJKpuJXyJpxdrGyAH3RU\nzks/gYRxY91elbjA6AhWPkxe1heCeUHE2vKqVKdQtKkI4caZlFwEn2PLBQPcLfMi\nWFMb1uKUc6zNP6KnibUT0WmpFzWMXkz7KiX+iOC0K4qHE0tbyZA+So8i6usNsjM7\n8EePpQMv7wUGX87WUXD1qYV/IhnFbuIFmEhvmMMCVzWnq3jbatAQoZWhFcKa52/O\nd1SO9o4nAgMBAAECggEANH37WXOhT+3zes6jmZT7kWT+xqjXcztubkGk5KLNRykK\ngQUZpwEZldczvxp9yAoZbud+PXBBLldp//GOJYCtbkXNmLlst3Rl33XCLBZqpxGZ\n0pWFaj9vZiKASTE0pNLy9nSZ/GKgKUo/L0Zst1fz1z55bdr2YayFIdaMXSlH6tv+\np59LxN4+ntY0W3LoRIHZVzo6OszotCcz7Z2to6EVDzKBRsFxhFHgH9huuXMuhgeE\nGe+C8OFYdYf9WnoipY3AnRwf/0+q65ra2BIbJu+IjTd1BcweY+1zkmpdgX6Zw1E+\nqSqSm+RdSd47kK8Uq6Dbm133yrNxfx+AcN1cJM3doQKBgQDkvI0uh10CnGyccypL\n3q5t8aRB0pIrt1Uff0OMHGDaeK3lW9vS1WJizWwJ5kJmT8ZrINmiAYAuPYYHVcUK\nCvfuCcS1+S53pFBsRzoOVEdscwHyZIw5enAC/2csL7N/2847c+7xfJxLCA3MKyDC\nfrY3CD4JWMsqYgCn1KoNpZM5/wKBgQDEa2ci7FMYbUbvwMw/k49sWWfS/zmR8jpi\nDrnWhaez16hqDFli7j2EdGlqSfM9SiYg/dD8wtyJhbY3s0jOu3Xzc9qKUJSkKSFV\ndA85S/FUOiuZtQ/W3eF9AjkNHuZsIC25UU/17yj2G2m0GUc6Le5bzhhVgB6N2Gbn\nhhFU/POb2QKBgQDdum09QliGFG4whm7k1vrNduVcLSwmlnQ8sRggdM3qWftwD0ib\nKuBRmIH3Yq7RENnttQ1ivwOrT1ZiO+FiZ9mIdQ2rvN4veie/npgHlekalq23c4J+\noVJ9hWlU6vScp81V0n84tiunjCob1V7PSxeFZ0cDtoBTGGc8SamCyxNZrwKBgQCx\neNW8gUlnZb1VfZ9OxnYtkO61f7Q1wWatGN8jDKqFXZMnFrdhIx/kYQaqadzkgO3I\nm21MJIj9nRoSY+SiHlEpwoEwvjQ/y4X53x6uR4bq8pBYlneUTfCicfK4fzX1dnG5\n4tVbwlcBX613c+uejseynZnxDw0MXv5DrShV4SP/qQKBgQCkqM3+9mKokMPpVYD3\nN8a6u1A8AyfgD/oIdpY5GPTpAIKk6khM6TXLWUDvxRjie/g8Gft99VX0K1IyMssp\n2oP4/XRyOuzFM9vUYkmcpWUqD0m2mKj34cgxWnL9jvOBgS4NiDKEwuCT9wNjldjM\nHYf4s69BwpvS2r12QVTNwOZC8Q==\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-6p83k@e-commerce-web-app-2f4fa.iam.gserviceaccount.com",
  client_id: "109240722500388901100",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-6p83k%40e-commerce-web-app-2f4fa.iam.gserviceaccount.com",
};


admin.initializeApp({
  credential: admin.credential.cert(config),
  databaseURL: "https://e-commerce-web-app-2f4fa.firebaseapp.com",
});

const adminAuth = admin.auth();
export { adminAuth };
