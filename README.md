# 🍔 FoodExpress - Food Delivery Application

FoodExpress is a full-stack MERN food delivery application that provides a modern and responsive online food ordering experience.

Users can explore restaurants, search and filter food options, view restaurant menus, add food items to their cart, manage their wishlist, submit reviews, complete online payments using Razorpay, place orders, and view their order history.

The application follows a real-world food delivery workflow with React frontend, Node.js/Express backend, MongoDB database integration, JWT authentication, and Razorpay payment gateway integration.

---

# 🚀 Features

## 🏠 Home Page

* Modern hero section with food background
* Order Now and Explore Restaurants buttons
* Popular restaurants showcase
* Food category section
* Responsive design for desktop, tablet, and mobile devices

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
* Restaurant food item selection

---

# 🛒 Cart Features

* Add food items to cart
* Remove cart items
* Increase/decrease quantity
* Cart item count badge
* Automatic price calculation
* Cart persistence using Local Storage
* Checkout flow
* Order confirmation

---

# 💳 Online Payment

FoodExpress is integrated with the Razorpay payment gateway.

### Payment Features

* Razorpay Checkout integration
* Razorpay Test Mode support
* Create Razorpay payment orders from backend
* Secure Razorpay Key Secret stored in backend environment variables
* Frontend Razorpay Key ID configuration
* Payment amount calculation
* Payment success handling
* Payment failure handling
* Payment cancellation handling
* Order creation after successful payment

### Payment Flow

```text
Food Items
    ↓
Cart
    ↓
Checkout
    ↓
Create Razorpay Order
    ↓
Razorpay Checkout
    ↓
Payment
    ↓
Payment Verification
    ↓
Order Confirmation
```

> ⚠️ Razorpay Test Mode should be used during development. Never expose the Razorpay Key Secret in the frontend or GitHub repository.

---

# ❤️ Wishlist Features

* Add restaurants to wishlist
* Remove restaurants from wishlist
* Wishlist persistence using Local Storage
* Wishlist page

---

# ⭐ Review System

* Add restaurant reviews
* Star rating system
* Display customer reviews
* Reviews stored using Local Storage

---

# 📦 Order Management

* Checkout page
* Online payment
* Order success page
* Order history page
* View previous orders
* Order details
* Order status display

---

# 👤 User Authentication

* User registration
* User login
* JWT authentication
* Protected routes
* User profile page
* Secure password handling using bcryptjs
* Authentication state management
* Logout functionality

---

# 🔐 Demo Credentials

Use the following demo account to test the FoodExpress application:

**Email:** [demo@example.com](mailto:demo@example.com)
**Password:** Demo@123

> Make sure this demo account exists in the deployed application before submitting the project.

---

# 🌙 UI Features

* Dark mode support
* Responsive navigation bar
* Mobile hamburger menu
* Toast notifications
* Smooth animations
* Modern food delivery UI
* Responsive layout
* User-friendly checkout interface

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
* Axios
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
* Razorpay

## Database

* MongoDB
* MongoDB Atlas for production

## Payment Gateway

* Razorpay

---

# 🌐 Deployment

## Frontend Deployment

Deployed using Netlify:

```text
https://foodexpress-mern-app.netlify.app/
```

## Backend Deployment

Deployed using Render:

```text
https://foodexpress-backend-p9dv.onrender.com
```

## Database

MongoDB Atlas is used as the production database.

---

# 📂 Project Structure

```text
food-delivery-app
│
├── client
│   │
│   ├── public
│   │   └── _redirects
│   │
│   ├── src
│   │   │
│   │   ├── components
│   │   │   ├── Navbar.jsx
│   │   │   ├── RestaurantCard.jsx
│   │   │   ├── ReviewForm.jsx
│   │   │   ├── CheckoutForm.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── pages
│   │   │   ├── Home.jsx
│   │   │   ├── Restaurants.jsx
│   │   │   ├── RestaurantDetails.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── OrderSuccess.jsx
│   │   │   ├── OrderHistory.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Wishlist.jsx
│   │   │   └── NotFound.jsx
│   │   │
│   │   ├── context
│   │   │   ├── CartContext.jsx
│   │   │   ├── WishlistContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   │
│   │   └── services
│   │       └── api.js
│   │
│   ├── .env
│   ├── index.html
│   └── package.json
│
├── backend
│   │
│   ├── config
│   │   ├── db.js
│   │   └── razorpay.js
│   │
│   ├── controllers
│   │   ├── authController.js
│   │   ├── restaurantController.js
│   │   └── paymentController.js
│   │
│   ├── models
│   │   ├── User.js
│   │   └── Restaurant.js
│   │
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── restaurantRoutes.js
│   │   └── paymentRoutes.js
│   │
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── .gitignore
├── netlify.toml
├── package.json
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

Navigate to the client folder:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `client` folder:

```env
VITE_API_URL=http://localhost:5000
VITE_RAZORPAY_KEY_ID=your_razorpay_test_key_id
```

> The Razorpay Key ID is safe to use in the frontend, but the Razorpay Key Secret must never be placed in the frontend `.env` file.

Start the frontend:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# 🔥 Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

RAZORPAY_KEY_ID=your_razorpay_test_key_id

RAZORPAY_KEY_SECRET=your_razorpay_test_key_secret
```

> ⚠️ Never commit the backend `.env` file to GitHub.

Start the backend:

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

# 🔗 API Features

## Authentication

```text
POST /api/auth/register

POST /api/auth/login
```

## Restaurants

```text
GET /api/restaurants

GET /api/restaurants/:id
```

## Payments

### Create Razorpay Order

```text
POST /api/payment/create-order
```

### Verify Payment

```text
POST /api/payment/verify-payment
```

> Payment endpoints require the backend Razorpay configuration to be correctly configured in `.env`.

---

# 💳 Razorpay Configuration

For local development, use Razorpay Test Mode credentials.

### Frontend

```env
VITE_RAZORPAY_KEY_ID=your_test_key_id
```

### Backend

```env
RAZORPAY_KEY_ID=your_test_key_id
RAZORPAY_KEY_SECRET=your_test_key_secret
```

The Key Secret must remain on the backend and must never be exposed to the browser.

---

# 🔐 Environment Variables

The project uses environment variables for sensitive configuration.

### Frontend `.env`

```env
VITE_API_URL=http://localhost:5000
VITE_RAZORPAY_KEY_ID=your_razorpay_test_key_id
```

### Backend `.env`

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
RAZORPAY_KEY_ID=your_razorpay_test_key_id
RAZORPAY_KEY_SECRET=your_razorpay_test_key_secret
```

Never commit real credentials, database passwords, JWT secrets, or Razorpay Key Secrets to GitHub.

---

# 📱 Responsive Design

FoodExpress supports:

* ✅ Desktop
* ✅ Tablet
* ✅ Mobile Devices

---

# 🛡️ Security

The application follows basic security practices including:

* JWT-based authentication
* Password hashing using bcryptjs
* Protected frontend routes
* Environment variables for sensitive configuration
* Razorpay Key Secret stored only on the backend
* CORS configuration
* Server-side payment order creation

---

# 🔮 Future Enhancements

* Live order tracking
* Restaurant owner dashboard
* Admin dashboard
* Cloud image storage
* Real-time order updates
* Advanced address management
* Delivery partner module
* Order notifications

---

# 👩‍💻 Developer

**Keerthika R**

FoodExpress - MERN Full Stack Food Delivery Application

---

# ⭐ Project Status

* Frontend Completed ✅
* Backend Completed ✅
* JWT Authentication Completed ✅
* MongoDB Integration Completed ✅
* Restaurant APIs Completed ✅
* Cart Functionality Completed ✅
* Wishlist Functionality Completed ✅
* Review System Completed ✅
* Order Management Completed ✅
* Razorpay Payment Gateway Integrated ✅
* Razorpay Test Payment Successfully Tested ✅
* Responsive UI Completed ✅
* Netlify Deployment Completed ✅
* Render Deployment Completed ✅
* Full Stack MERN Application Completed 🚀

