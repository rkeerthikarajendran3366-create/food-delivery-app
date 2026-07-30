# 🍔 FoodExpress - Food Delivery Application

FoodExpress is a full-stack MERN food delivery application that provides a modern online food ordering experience.

Users can explore restaurants, search and filter food options, view menus, add items to cart, manage wishlist, submit reviews, place orders, and manage their profile.

The application is built with a responsive UI and follows a real-world food delivery workflow with frontend and backend integration.

---

# 🚀 Features

## 🏠 Home Page

* Modern hero section with food background
* Order Now and Explore Restaurants buttons
* Popular restaurants showcase
* Food category section
* Responsive design for all devices

---

# 🍽️ Restaurant Features

* View all restaurants
* Search restaurants by name
* Filter restaurants by cuisine
* Sort restaurants by:

  * ⭐ Rating
  * 💰 Cost
  * 🚴 Delivery time
* Restaurant details page
* Dynamic restaurant menu display

---

# 🛒 Cart Features

* Add food items to cart
* Remove cart items
* Increase/decrease quantity
* Cart item count badge
* Price calculation
* Checkout flow
* Order confirmation page

---

# ❤️ Wishlist Features

* Add restaurants to wishlist
* Remove restaurants from wishlist
* Wishlist persistence using Local Storage

---

# ⭐ Review System

* Add restaurant reviews
* Star rating system
* Display customer reviews
* Reviews stored using Local Storage

---

# 📦 Order Management

* Checkout page
* Order success page
* Order history page
* View previous orders

---

# 👤 User Authentication

* User registration
* User login
* JWT authentication
* Protected routes
* User profile page

---

# 🌙 UI Features

* Dark mode support
* Responsive navigation bar
* Mobile hamburger menu
* Toast notifications
* Smooth animations
* Modern food delivery UI

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Vite
* JavaScript
* Tailwind CSS
* React Router DOM
* Context API
* React Hot Toast
* Local Storage

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* REST API
* bcryptjs
* Multer

---

# 📂 Project Structure

```
food-delivery-app

│
├── client
│   │
│   ├── src
│   │   ├── components
│   │   │   ├── Navbar.jsx
│   │   │   ├── RestaurantCard.jsx
│   │   │   ├── ReviewForm.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── pages
│   │   │   ├── Home.jsx
│   │   │   ├── Restaurants.jsx
│   │   │   ├── RestaurantDetails.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Profile.jsx
│   │   │
│   │   ├── context
│   │   │   ├── CartContext.jsx
│   │   │   ├── WishlistContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   │
│   │   └── services
│   │       └── api.js
│   │
│   └── package.json
│
├── backend
│   │
│   ├── config
│   │   └── db.js
│   │
│   ├── controllers
│   │   ├── authController.js
│   │   └── restaurantController.js
│   │
│   ├── models
│   │   ├── User.js
│   │   └── Restaurant.js
│   │
│   ├── routes
│   │   ├── authRoutes.js
│   │   └── restaurantRoutes.js
│   │
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/rkeerthikarajendran3366-create/food-delivery-app.git
```

## Go Inside Project

```bash
cd food-delivery-app
```

---

# 💻 Frontend Setup

Navigate to client:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start frontend:

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# 🔥 Backend Setup

Navigate to backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```
PORT=5000

MONGODB_URI=mongodb://127.0.0.1:27017/fooddelivery

JWT_SECRET=your_secret_key
```

Start backend:

```bash
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

# 🔗 API Features

## Authentication

```
POST /api/auth/register

POST /api/auth/login
```

## Restaurants

```
GET /api/restaurants

GET /api/restaurants/:id
```

---

# 📱 Responsive Design

FoodExpress supports:

✅ Desktop
✅ Tablet
✅ Mobile Devices

---

# 🔮 Future Enhancements

* Online payment gateway
* Live order tracking
* Restaurant owner dashboard
* Admin dashboard
* Cloud image storage
* Real-time order updates

---

# 👩‍💻 Developer

**Keerthika R**

FoodExpress - MERN Full Stack Food Delivery Application

---

# ⭐ Project Status

Frontend Completed ✅

Backend Completed ✅

MongoDB Integration Completed ✅

Full Stack MERN Application Completed 🚀
