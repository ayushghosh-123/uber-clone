# User Registration Endpoint Documentation

## Endpoint

`POST /user/register`

---

## Description

This endpoint allows a new user to register by providing their full name, email, and password. Upon successful registration, the endpoint returns the created user object and a JWT authentication token.

---

## Request Body

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "yourpassword"
}
```

### Field Requirements

- `fullname.firstname` (string, required): Minimum 3 characters.
- `fullname.lastname` (string, required): Minimum 3 characters.
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.

---

## Responses

### Success

- **Status Code:** `201 Created`
- **Body:**
    ```json
    {
      "user": {
        "_id": "user_id",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "johndoe@example.com",
        "socketId": null
      },
      "token": "jwt_token_here"
    }
    ```

### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
    ```json
    {
      "errors": [
        {
          "msg": "Invalid Email",
          "param": "email",
          "location": "body"
        },
        {
          "msg": "Firstmesssage at least 3 character  long",
          "param": "fullname.firstname",
          "location": "body"
        },
        {
          "msg": "Firstmesssage at least 6 character  long",
          "param": "password",
          "location": "body"
        }
      ]
    }
    ```

### Server Error

- **Status Code:** `500 Internal Server Error`
- **Body:**
    ```json
    {
      "error": "Error message"
    }
    ```

---

## Example Request

```bash
curl -X POST http://localhost:PORT/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": { "firstname": "Jane", "lastname": "Smith" },
    "email": "janesmith@example.com",
    "password": "securepassword"
  }'
```

---

## Notes

- All fields are required.
- On success, you will receive a JWT token for authentication in subsequent requests.

---

# User Login Endpoint Documentation

## Endpoint

`POST /user/login`

---

## Description

This endpoint allows an existing user to log in using their email and password. If the credentials are valid, the endpoint returns the user object and a JWT authentication token.

---

## Request Body

Send a JSON object with the following structure:

```json
{
  "email": "johndoe@example.com",
  "password": "yourpassword"
}
```

### Field Requirements

- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.

---

## Responses

### Success

- **Status Code:** `200 OK`
- **Body:**
    ```json
    {
      "user": {
        "_id": "user_id",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "johndoe@example.com",
        "socketId": null
      },
      "token": "jwt_token_here"
    }
    ```

### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
    ```json
    {
      "errors": [
        {
          "msg": "Invalid Email",
          "param": "email",
          "location": "body"
        },
        {
          "msg": "Password must be at least 6 characters long",
          "param": "password",
          "location": "body"
        }
      ]
    }
    ```

### User Not Found

- **Status Code:** `404 Not Found`
- **Body:**
    ```json
    {
      "message": "User not found"
    }
    ```

### Invalid Credentials

- **Status Code:** `401 Unauthorized`
- **Body:**
    ```json
    {
      "message": "Invalid credentials"
    }
    ```

### Server Error

- **Status Code:** `500 Internal Server Error`
- **Body:**
    ```json
    {
      "error": "Error message"
    }
    ```

---

## Example Request

```bash
curl -X POST http://localhost:PORT/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "janesmith@example.com",
    "password": "securepassword"
  }'
```

---

## Notes

- Both fields are required.
- On success, you will receive a JWT token for authentication in subsequent requests.