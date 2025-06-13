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

# User Profile Endpoint Documentation

## Endpoint

`GET /user/profile`

---

## Description

This endpoint retrieves the authenticated user's profile information. The request must include a valid JWT token in the `Authorization` header or as a cookie.

---

## Authentication

- **Required:** Yes (JWT token)
- **How:**  
  - Header: `Authorization: Bearer <token>`  
  - Or Cookie: `token=<token>`

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
      }
    }
    ```

### Unauthorized

- **Status Code:** `401 Unauthorized`
- **Body:**
    ```json
    {
      "message": "Authentication required"
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

---

## Example Request

```bash
curl -X GET http://localhost:PORT/user/profile \
  -H "Authorization: Bearer <jwt_token>"
```

---

# User Logout Endpoint Documentation

## Endpoint

`GET /user/logout`

---

## Description

This endpoint logs out the authenticated user by blacklisting their JWT token and clearing the authentication cookie. The request must include a valid JWT token in the `Authorization` header or as a cookie.

---

## Authentication

- **Required:** Yes (JWT token)
- **How:**  
  - Header: `Authorization: Bearer <token>`  
  - Or Cookie: `token=<token>`

---

## Responses

### Success

- **Status Code:** `200 OK`
- **Body:**
    ```json
    {
      "message": "Logged out successfully"
    }
    ```

### No Token Provided

- **Status Code:** `400 Bad Request`
- **Body:**
    ```json
    {
      "message": "No token provided"
    }
    ```

### Unauthorized

- **Status Code:** `401 Unauthorized`
- **Body:**
    ```json
    {
      "message": "Authentication required"
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
curl -X GET http://localhost:PORT/user/logout \
  -H "Authorization: Bearer <jwt_token>"
```

---

## Notes

- Both fields are required.
- On success, you will receive a JWT token for authentication in subsequent requests.

---

# Captain Registration Endpoint Documentation

## Endpoint

`POST /captain/register`

---

## Description

This endpoint allows a new captain to register by providing their full name, email, password, and vehicle details. Upon successful registration, the endpoint returns the created captain object.

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
  "password": "yourpassword",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Field Requirements

- `fullname.firstname` (string, required): Minimum 3 characters.
- `fullname.lastname` (string, required): Minimum 3 characters.
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.
- `vehicle.color` (string, required): Minimum 3 characters.
- `vehicle.plate` (string, required): Minimum 3 characters.
- `vehicle.capacity` (integer, required): Minimum value 1.
- `vehicle.vehicleType` (string, required): Must be one of: `car`, `motorcycle`, `auto`.

---

## Responses

### Success

- **Status Code:** `201 Created`
- **Body:**
    ```json
    {
      "captain": {
        "_id": "captain_id",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "johndoe@example.com",
        "vehicle": {
          "color": "Red",
          "plate": "ABC123",
          "capacity": 4,
          "vehicleType": "car"
        }
      }
    }
    ```

### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
    ```json
    {
      "errors": [
        {
          "msg": "First name must be at least 3 characters long",
          "param": "fullname.firstname",
          "location": "body"
        },
        {
          "msg": "Invalid email address",
          "param": "email",
          "location": "body"
        }
        // ...other validation errors
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
curl -X POST http://localhost:PORT/captain/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": { "firstname": "Jane", "lastname": "Smith" },
    "email": "janesmith@example.com",
    "password": "securepassword",
    "vehicle": {
      "color": "Blue",
      "plate": "XYZ789",
      "capacity": 4,
      "vehicleType": "car"
    }
  }'
```

# Captain Login Endpoint Documentation

## Endpoint

`POST /captain/login`

---

## Description

This endpoint allows a captain to log in using their email and password. If the credentials are valid, the endpoint returns a JWT authentication token.

---

## Request Body

```json
{
  "email": "captain@example.com",
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
      "message": "Login successful",
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
          "msg": "Invalid email address",
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

### Captain Not Found

- **Status Code:** `404 Not Found`
- **Body:**
    ```json
    {
      "error": "Captain not found"
    }
    ```

### Invalid Password

- **Status Code:** `401 Unauthorized`
- **Body:**
    ```json
    {
      "error": "Invalid password"
    }
    ```

---

## Example Request

```bash
curl -X POST http://localhost:PORT/captain/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "captain@example.com",
    "password": "yourpassword"
  }'
```

---

# Captain Profile Endpoint Documentation

## Endpoint

`GET /captain/profile`

---

## Description

This endpoint retrieves the authenticated captain's profile information. The request must include a valid JWT token in the `Authorization` header or as a cookie.

---

## Authentication

- **Required:** Yes (JWT token)
- **How:**  
  - Header: `Authorization: Bearer <token>`  
  - Or Cookie: `token=<token>`

---

## Responses

### Success

- **Status Code:** `200 OK`
- **Body:**
    ```json
    {
      "captain": {
        "_id": "6841e116d7bd1b2ee6f9c592",
        "fullname": {
          "firstname": "test_captain firstnam4",
          "lastname": "test_captain lastname5"
        },
        "email": "test4_email@gmail.com",
        "socketID": null,
        "status": "inactive",
        "vehicle": {
          "color": "red",
          "plate": "MP 04 XY 6204",
          "capacity": 3,
          "vehicleType": "car"
        },
        "__v": 0
      }
    }
    ```

### Unauthorized

- **Status Code:** `401 Unauthorized`
- **Body:**
    ```json
    {
      "message": "Authentication required"
    }
    ```

### Captain Not Found

- **Status Code:** `404 Not Found`
- **Body:**
    ```json
    {
      "error": "Captain not found"
    }
    ```

---

## Example Request

```bash
curl -X GET http://localhost:PORT/captain/profile \
  -H "Authorization: Bearer <jwt_token>"
```

---

# Captain Logout Endpoint Documentation

## Endpoint

`GET /captain/logout`

---

## Description

This endpoint logs out the authenticated captain by blacklisting their JWT token and clearing the authentication cookie. The request must include a valid JWT token in the `Authorization` header or as a cookie.

---

## Authentication

- **Required:** Yes (JWT token)
- **How:**  
  - Header: `Authorization: Bearer <token>`  
  - Or Cookie: `token=<token>`

---

## Responses

### Success

- **Status Code:** `200 OK`
- **Body:**
    ```json
    {
      "message": "Logout successful"
    }
    ```

### No Token Provided

- **Status Code:** `401 Unauthorized`
- **Body:**
    ```json
    {
      "message": "Authentication token is missing"
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
curl -X GET http://localhost:PORT/captain/logout \
  -H "Authorization: Bearer <jwt_token>"
```

## Get Fare Estimate Endpoint Documentation

### Endpoint

`GET /ride/get-fare`

---

### Description

This endpoint calculates and returns fare estimates for different vehicle types based on the provided pickup and destination addresses. The user must be authenticated.

---

### Query Parameters

- `pickup` (string, required): The pickup location address (minimum 3 characters).
- `destination` (string, required): The destination address (minimum 3 characters).

---

### Authentication

- **Required:** Yes (JWT token)
- **How:**  
  - Header: `Authorization: Bearer <token>`  
  - Or Cookie: `token=<token>`

---

### Responses

#### Success

- **Status Code:** `200 OK`
- **Body:**
    ```json
    {
      "auto": 45,
      "car": 60,
      "moto": 30
    }
    ```
  Each key represents a vehicle type and the value is the estimated fare.

#### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
    ```json
    {
      "errors": [
        {
          "msg": "Invalid pickup point",
          "param": "pickup",
          "location": "query"
        },
        {
          "msg": "Invalid destination point",
          "param": "destination",
          "location": "query"
        }
      ]
    }
    ```

#### Unauthorized

- **Status Code:** `401 Unauthorized`
- **Body:**
    ```json
    {
      "message": "Authentication token is missing"
    }
    ```

#### Server Error

- **Status Code:** `500 Internal Server Error`
- **Body:**
    ```json
    {
      "message": "Internal server Error"
    }
    ```

---

### Example Request

```bash
curl -X GET "http://localhost:PORT/ride/get-fare?pickup=123+Main+St&destination=456+Elm+St" \
  -H "Authorization: Bearer <jwt_token>"
```

---

## Notes

- All fields are required.
- The `vehicleType` must be one of: `car`, `motorcycle`, or `auto`.

