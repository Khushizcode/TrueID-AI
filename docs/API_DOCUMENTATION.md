# TrueID AI: Backend API Documentation

Backend: Spring Boot (Java) + MySQL
Base URL (local): `http://localhost:8080`
Allowed frontend origin (CORS): `http://localhost:5173`

## General rules

- All request and response bodies are JSON, except `POST /api/screening`, which is `multipart/form-data`.
- Public endpoints (no token needed): `GET /api/health`, `POST /api/auth/signup`, `POST /api/auth/login`.
- Every other endpoint needs this header:
  ```
  Authorization: Bearer <token>
  ```
- The token comes from signup or login and is valid for 24 hours.
- Errors always look like this:
  ```json
  { "error": "message" }
  ```

| Status | Meaning |
|---|---|
| 200 | Success |
| 400 | Bad input (missing field, duplicate email, wrong file type) |
| 401 | Wrong email or password, or missing/invalid/expired token |
| 404 | User or screening not found |

---

## 1. Health

### `GET /api/health`
Response `200`:
```json
{ "status": "ok", "message": "TrueID backend running" }
```

---

## 2. Authentication

### `POST /api/auth/signup`
Request:
```json
{
  "name": "Harshita",
  "email": "harshita@test.com",
  "organization": "TrueID AI",
  "password": "test1234"
}
```
Rules: `name`, `email` required, `password` at least 6 characters. Email is stored in lowercase and must be unique.

Response `200`:
```json
{
  "token": "eyJhbGciOiJIUzM4NCJ9...",
  "user": {
    "id": 1,
    "name": "Harshita",
    "email": "harshita@test.com",
    "organization": "TrueID AI",
    "role": "Screening Officer"
  }
}
```
Errors: `400` `{"error":"Email already registered"}` or `{"error":"Name, email and a password of at least 6 characters are required"}`

### `POST /api/auth/login`
Request:
```json
{ "email": "harshita@test.com", "password": "test1234" }
```
Response `200`: same shape as signup (`token` + `user`).
Error: `401` `{"error":"Invalid email or password"}`

### `GET /api/auth/profile` (token required)
Response `200`:
```json
{
  "id": 1,
  "name": "Harshita",
  "email": "harshita@test.com",
  "organization": "TrueID AI",
  "role": "Screening Officer"
}
```

### `PUT /api/auth/profile` (token required)
Request (both fields optional; email and role cannot be changed here):
```json
{ "name": "Harshita K", "organization": "TrueID Labs" }
```
Response `200`: the updated user object (same shape as `GET /api/auth/profile`).

---

## 3. Screening

### `POST /api/screening` (token required)
Content type: `multipart/form-data`

| Field | Type | Required | Notes |
|---|---|---|---|
| `documentType` | text | yes | e.g. `Aadhaar`, `Passport`, `DL`, `VoterID` |
| `purpose` | text | no | e.g. `Identity Verification` |
| `document` | file | yes | JPG, PNG or PDF, max 5 MB |

Response `200` (verified example):
```json
{
  "screeningId": "SCR-1001",
  "documentType": "Aadhaar",
  "purpose": "Identity Verification",
  "status": "VERIFIED",
  "risk": "LOW",
  "confidence": 96,
  "nameMatch": true,
  "documentValid": true,
  "riskIndicators": [],
  "createdAt": "2026-10-03T14:36:23.483015"
}
```

Response `200` (rejected example):
```json
{
  "screeningId": "SCR-1002",
  "documentType": "Aadhaar",
  "purpose": "Identity Verification",
  "status": "REJECTED",
  "risk": "HIGH",
  "confidence": 38,
  "nameMatch": false,
  "documentValid": false,
  "riskIndicators": [
    { "code": "IMAGE_TAMPERING", "severity": "HIGH", "message": "Potential alteration detected" },
    { "code": "NAME_MISMATCH", "severity": "MEDIUM", "message": "Name does not match the account" }
  ],
  "createdAt": "2026-10-03T14:51:09.435438"
}
```

Field values:
- `status`: `VERIFIED` | `REVIEW` | `REJECTED`
- `risk`: `LOW` | `MEDIUM` | `HIGH`
- `confidence`: number from 0 to 100
- `riskIndicators[].severity`: `LOW` | `MEDIUM` | `HIGH`

Errors: `400` `{"error":"Only JPG, PNG or PDF files are allowed"}`, `{"error":"A document file is required"}`, `{"error":"documentType is required"}`

**Note: the AI result is currently a mock.** Every upload returns the verified example above, except files whose name contains `fake`, which return the rejected example. The response format will not change when the real AI service is connected.

### `GET /api/screening/history` (token required)
Returns the logged-in user's screenings, newest first. Each item has the same shape as the `POST /api/screening` response.
```json
[
  { "screeningId": "SCR-1002", "status": "REJECTED", "risk": "HIGH", "confidence": 38, "...": "..." },
  { "screeningId": "SCR-1001", "status": "VERIFIED", "risk": "LOW", "confidence": 96, "...": "..." }
]
```
An empty history returns `[]`.

### `GET /api/screening/{screeningId}` (token required)
Example: `GET /api/screening/SCR-1001`
Response `200`: one screening object (same shape as above).
Error: `404` `{"error":"Screening not found"}`. A user can only fetch their own screenings.

---

## 4. Reports

### `GET /api/reports` (token required)
Response `200`:
```json
{
  "totalScreenings": 2,
  "verified": 1,
  "review": 0,
  "rejected": 1,
  "verificationRate": 50,
  "averageConfidence": 67,
  "riskLevels": { "low": 1, "medium": 0, "high": 1 },
  "byDocumentType": { "Aadhaar": 2 },
  "recentScreenings": [
    {
      "screeningId": "SCR-1002",
      "documentType": "Aadhaar",
      "status": "REJECTED",
      "risk": "HIGH",
      "confidence": 38,
      "createdAt": "2026-10-03T14:51:09.435438"
    },
    {
      "screeningId": "SCR-1001",
      "documentType": "Aadhaar",
      "status": "VERIFIED",
      "risk": "LOW",
      "confidence": 96,
      "createdAt": "2026-10-03T14:36:23.483015"
    }
  ]
}
```
`verificationRate` is a percentage (0 to 100). `recentScreenings` has up to 5 items. With no screenings, all counts are `0` and the lists are empty.

---

## Frontend usage examples

Login and store the token:
```js
const res = await fetch("http://localhost:8080/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
});
const data = await res.json();
if (!res.ok) throw new Error(data.error);
localStorage.setItem("trueid_token", data.token);
localStorage.setItem("trueid_user", JSON.stringify(data.user));
```

Upload a document (do NOT set the `Content-Type` header yourself; the browser sets it for `FormData`):
```js
const form = new FormData();
form.append("documentType", "Aadhaar");
form.append("purpose", "Identity Verification");
form.append("document", file);

const res = await fetch("http://localhost:8080/api/screening", {
  method: "POST",
  headers: { Authorization: `Bearer ${localStorage.getItem("trueid_token")}` },
  body: form,
});
const result = await res.json();
```

On any `401` response from a protected endpoint, clear the stored token and send the user to the Sign In page.
