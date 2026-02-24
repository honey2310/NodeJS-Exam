# 🍳 Kitchen Manuscript – Recipe Sharing App

A full-stack MERN (MongoDB, Express, React, Node.js) recipe sharing application where users can create, edit, delete, and explore delicious recipes.

---

## 🚀 Features

### 👤 Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes

### 🍲 Recipes
- Create new recipe
- View all recipes
- View single recipe details
- Edit recipe (owner only)
- Delete recipe (owner only)

### 💬 Comments
- Add comments to recipes
- Authenticated users only

---

## 🛠 Tech Stack

### Frontend
- React
- React Router DOM
- Axios
- Inline CSS Styling

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt (Password Hashing)

---

## 📁 Project Structure

```
Kitchen-Manuscript/
│
├── Backend/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── Frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── api/
│   └── App.jsx
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 2️⃣ Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file inside Backend:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

---

## 🔐 Authentication Flow

1. User registers
2. Password is hashed using bcrypt
3. JWT token is generated on login
4. Token is stored on frontend
5. Protected routes verify token via middleware

---

## 📌 API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Recipes
- `GET /api/recipes`
- `GET /api/recipes/:id`
- `POST /api/recipes` (Protected)
- `PUT /api/recipes/:id` (Owner only)
- `DELETE /api/recipes/:id` (Owner only)

### Comments
- `POST /api/recipes/:id/comment` (Protected)

---

## 🎯 Future Improvements

- 🔎 Search & Filter
- 📂 Categories
- ☁️ Image Upload 
- 📱 Responsive UI Improvements

---

## 🧠 Learning Outcomes

- Full CRUD operations
- JWT Authentication
- Protected backend routes
- React state management
- REST API design
- Clean UI structuring

---

## 📸 video
https://drive.google.com/file/d/1y3ftBbE0UyeoL-UNBfQIa-O_oqWQsrZ9/view?usp=sharing

## 📜 License

This project is licensed under the MIT License.
