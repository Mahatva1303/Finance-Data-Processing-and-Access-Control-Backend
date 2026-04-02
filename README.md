# Finance-Data-Processing-and-Access-Control-Backend
A backend system for managing financial records with role-based access control and dashboard analytics.   This project demonstrates backend architecture, API design, and data processing using Node.js and MongoDB.

---

## 🚀 Features

### 👤 User & Role Management
- Create and manage users
- Role-based access control:
  - **Viewer** → Read-only access
  - **Analyst** → Read + analytics access
  - **Admin** → Full access (CRUD + users)

---

### 💸 Financial Records
- Create, Read, Update, Delete (CRUD)
- Fields:
  - Amount
  - Type (income / expense)
  - Category
  - Date
  - Notes
- Filtering support:
  - By type
  - By category
  - By date range

---

### 📊 Dashboard Analytics
- Total Income
- Total Expense
- Net Balance
- Category-wise totals
- Recent activity (latest transactions)
- Monthly trends

---

### 🔐 Access Control
- Role-based middleware
- API restrictions based on user roles

---

### ⚠️ Validation & Error Handling
- Required field validation
- Proper HTTP status codes
- Error handling for invalid operations

---

### 📊 Pagination
- Paginated record listing

#### Example:
 - GET /api/records?page=1&limit=2

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- Postman (API testing)

---

### 💰 Records

- POST `/api/records` → Create record (Admin)
- GET `/api/records` → Get records (All roles)
- PUT `/api/records/:id` → Update (Admin)
- DELETE `/api/records/:id` → Delete (Admin)

---

### 📊 Dashboard

- GET `/api/records/summary`
- GET `/api/records/categories`
- GET `/api/records/recent`
- GET `/api/records/trends/monthly`

 ---

## 🧠 Assumptions

- Role is passed via headers (temporary)
- Authentication is not implemented (can be added)
- Single user system for simplicity

---

## 🚀 Future Improvements

- JWT Authentication
- Search functionality
- Frontend integration

---

## 🎯 Conclusion

This project demonstrates:
- Backend architecture
- API design
- Role-based access control
- Data processing & aggregation

---

## 👨‍💻 Author

Mahatva Agarwal
