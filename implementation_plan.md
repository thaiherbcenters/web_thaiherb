# Debug Product Update Issue

The user is reporting that product updates in the Admin panel are not saving to the database. I will add logging to the backend to verify the data received and the result of the SQL update.

## User Review Required

> [!NOTE]
> This is a debugging step. I am adding logs to the backend to trace the data flow.

## Proposed Changes

### Backend

#### [MODIFY] [admin.js](file:///c:/test_ai/thaiherb/backend/routes/admin.js)
- Add `console.log` in `PUT /products/:id` to show `req.body` and `req.params`.
- Add `console.log` to show the result of the update query.

## Verification Plan

### Manual Verification
1.  I will use `curl` to simulate a product update and check the server logs.
