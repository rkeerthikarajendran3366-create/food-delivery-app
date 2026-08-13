# 🍔 FoodExpress - Food Delivery Application

FoodExpress is a **full-stack MERN food delivery application** that provides a modern, responsive, and user-friendly online food ordering experience.

Users can explore restaurants, search and filter food options, view restaurant menus, add food items to their cart, manage their wishlist, submit restaurant reviews, place orders, make online payments using **Razorpay**, and view their order history.

The application is built using **React.js, Node.js, Express.js, MongoDB, JWT Authentication, and Razorpay**.

---

## 🚀 Features

### 🏠 Home Page

* Modern hero section with food background
* Order Now button
* Explore Restaurants button
* Popular restaurants showcase
* Food category section
* Responsive design
* Desktop, tablet, and mobile support

### 🍽️ Restaurant Features

* View all restaurants
* Search restaurants by name
* Filter restaurants by cuisine
* Sort restaurants by rating
* Sort restaurants by cost
* Sort restaurants by delivery time
* Restaurant details page
* Dynamic restaurant menu display
* Food item selection

### 🛒 Cart Features

* Add food items to cart
* Increase and decrease item quantity
* Remove individual cart items
* Clear cart
* Cart item count badge
* Automatic price calculation
* Automatic total calculation
* Cart persistence using Local Storage
* Checkout flow
* Order confirmation

### ❤️ Wishlist Features

* Add restaurants to wishlist
* Remove restaurants from wishlist
* Wishlist persistence using Local Storage
* Wishlist page
* Wishlist status display

### ⭐ Review System

* Add restaurant reviews
* Star rating system
* Display customer reviews
* Restaurant-specific reviews
* Review persistence using Local Storage

### 📦 Order Management

* Checkout page
* Cash on Delivery support
* Online payment support
* Order success page
* Order history page
* View previous orders
* View order details
* Order status display
* Automatic cart clearing after successful order

### 👤 User Authentication

* User registration
* User login
* JWT authentication
* Protected routes
* User profile page
* Secure password hashing using bcryptjs
* Authentication state management
* Logout functionality
* User information management

### 👑 Admin Features

* Admin login
* Role-based access control
* Protected admin routes
* Admin dashboard
* Admin-only page access
* User and admin role identification

---

# 💳 Online Payment - Razorpay

FoodExpress is integrated with the **Razorpay payment gateway** for online payments.

### Payment Features

* Razorpay Checkout integration
* Razorpay Test Mode support
* Backend Razorpay order creation
* Secure server-side payment configuration
* Frontend Razorpay Key ID configuration
* Payment amount calculation
* Payment success handling
* Payment failure handling
* Payment cancellation handling
* Payment verification
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

### 🔐 Razorpay Security

> ⚠️ **Razorpay Test Mode should be used during development.**

> 🔐 **Never expose the Razorpay Key Secret in the frontend or GitHub repository.**

The **Razorpay Key ID** may be used in the frontend.

The **Razorpay Key Secret must remain securely stored in the backend environment variables** and must never be exposed to the browser.

---

# 🔐 Demo Credentials

## 👤 User Demo Account

```text
Email: demo@example.com
Password: Demo@123
```

## 👑 Admin Demo Account

```text
Email: admin@foodexpress.com
Password: Admin@123
Role: admin
```

### Admin Dashboard

```text
/admin
```

The admin account is provided for **project demonstration and mentor testing**.

> For production applications, demo credentials should not be publicly exposed.

---

# 🌙 UI & User Experience

FoodExpress provides a modern and responsive user interface with:

* Dark mode support
* Responsive navigation bar
* Mobile hamburger menu
* Toast notifications
* Smooth UI interactions
* Modern food delivery interface
* Responsive layout
* User-friendly checkout interface
* Empty cart state
* Loading states
* Error handling
* Responsive desktop, tablet, and mobile layouts

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
* CORS
* dotenv

## Database

* MongoDB
* MongoDB Atlas

## Payment Gateway

* Razorpay

---

# 🌐 Live Deployment

## Frontend - Netlify

**FoodExpress Frontend**

https://foodexpress-mern-app.netlify.app/

## Backend - Render

**FoodExpress Backend**

https://foodexpress-backend-p9dv.onrender.com

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
│   │   │   ├── Footer.jsx
│   │   │   ├── RestaurantCard.jsx
│   │   │   ├── ReviewForm.jsx
│   │   │   ├── ReviewList.jsx
│   │   │   ├── CheckoutForm.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── AdminRoute.jsx
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
│   │   │   ├── AdminDashboard.jsx
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
│   ├── createAdmin.js
│   ├── server.js
│   └── package.json
│
├── .gitignore
├── netlify.toml
├── package.json
└── README.md
```

---

# ⚙️ Installation & Setup

## 1. Clone the Repository

```bash
git clone https://github.com/rkeerthikarajendran3366-create/food-delivery-app.git
```

## 2. Navigate to the Project

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

Start the frontend:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

> The Vite development server may use another available port if port `5173` is already occupied.

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

Start the backend:

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

### ⚠️ Environment Variable Security

Never commit `.env` files containing real credentials to GitHub.

Do not expose:

* MongoDB passwords
* JWT secrets
* Razorpay Key Secret
* Other private API credentials

---

# 🔐 Admin Setup

The admin account is already configured for the application.

```text
Email: admin@foodexpress.com
Password: Admin@123
Role: admin
```

Admin Dashboard:

```text
/admin
```

The admin account can be used for **project demonstration and testing**.

---

# 🔗 API Endpoints

## Authentication

### Register User

```http
POST /api/auth/register
```

### Login User

```http
POST /api/auth/login
```

## Restaurants

### Get All Restaurants

```http
GET /api/restaurants
```

### Get Restaurant by ID

```http
GET /api/restaurants/:id
```

## Payments

### Create Razorpay Order

```http
POST /api/payment/create-order
```

### Verify Razorpay Payment

```http
POST /api/payment/verify-payment
```

---

# 💳 Razorpay Configuration

For local development, use **Razorpay Test Mode credentials**.

## Frontend

```env
VITE_RAZORPAY_KEY_ID=your_test_key_id
```

## Backend

```env
RAZORPAY_KEY_ID=your_test_key_id
RAZORPAY_KEY_SECRET=your_test_key_secret
```

### Important Security Rule

The Razorpay **Key Secret must only exist on the backend**.

Never add the following to frontend code:

```text
RAZORPAY_KEY_SECRET
```

Never commit the real secret to:

* GitHub
* Frontend source code
* Browser/client-side JavaScript
* Public repositories
* Screenshots

---

# 🔐 Environment Variables

## Frontend `.env`

```env
VITE_API_URL=http://localhost:5000
VITE_RAZORPAY_KEY_ID=your_razorpay_test_key_id
```

## Backend `.env`

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
RAZORPAY_KEY_ID=your_razorpay_test_key_id
RAZORPAY_KEY_SECRET=your_razorpay_test_key_secret
```

> Never commit real credentials, database passwords, JWT secrets, or Razorpay Key Secrets to GitHub.

---

# 📱 Responsive Design

FoodExpress is designed to work across:

* 💻 Desktop
* 📱 Mobile
* 📲 Tablet

The interface adapts to different screen sizes for a consistent user experience.

---

# 🛡️ Security

The application follows basic security practices including:

* JWT-based authentication
* Password hashing using bcryptjs
* Protected frontend routes
* Admin role-based route protection
* Environment variables for sensitive configuration
* Razorpay Key Secret stored only on the backend
* Server-side Razorpay order creation
* CORS configuration
* Password excluded from authentication responses

---

# 🔮 Future Enhancements

Planned improvements include:

* 📍 Live order tracking
* 🏪 Restaurant owner dashboard
* ☁️ Cloud image storage
* 🔄 Real-time order updates
* 📍 Advanced address management
* 🚴 Delivery partner module
* 🔔 Order notifications
* ⚙️ Advanced admin management
* 🍽️ Restaurant management from admin dashboard

---

# 👩‍💻 Developer

**Keerthika R**

FoodExpress - MERN Full Stack Food Delivery Application

---

# ⭐ Project Status

| Feature                     | Status       |
| --------------------------- | ------------ |
| Frontend                    | ✅ Completed  |
| Backend                     | ✅ Completed  |
| JWT Authentication          | ✅ Completed  |
| MongoDB Integration         | ✅ Completed  |
| Restaurant APIs             | ✅ Completed  |
| Cart Functionality          | ✅ Completed  |
| Quantity Management         | ✅ Completed  |
| Remove Cart Functionality   | ✅ Completed  |
| Wishlist Functionality      | ✅ Completed  |
| Review System               | ✅ Completed  |
| Order Management            | ✅ Completed  |
| Razorpay Integration        | ✅ Completed  |
| Razorpay Test Payment       | ✅ Tested     |
| Admin Authentication        | ✅ Completed  |
| Admin Dashboard             | ✅ Completed  |
| Protected Routes            | ✅ Completed  |
| Responsive UI               | ✅ Completed  |
| Netlify Deployment          | ✅ Completed  |
| Render Deployment           | ✅ Completed  |
| Full Stack MERN Application | 🚀 Completed |

---

# 🎉 Conclusion

FoodExpress is a complete **MERN Stack Food Delivery Application** demonstrating modern frontend development, backend REST API development, database integration, authentication, authorization, cart and order management, wishlist and review functionality, Razorpay payment integration, and cloud deployment.

The project demonstrates the complete flow of an online food ordering application:

```text
User
 ↓
Browse Restaurants
 ↓
Select Food
 ↓
Add to Cart
 ↓
Checkout
 ↓
Cash on Delivery / Razorpay
 ↓
Payment Verification
 ↓
Place Order
 ↓
Order Confirmation
 ↓
Order History
```

---

## ⭐ Thank You

Thank you for reviewing the **FoodExpress Food Delivery Application**.

**Built with ❤️ using the MERN Stack**
