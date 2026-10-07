# 🍔 FoodExpress - Food Delivery Application

FoodExpress is a **full-stack MERN food delivery application** that provides a modern, responsive, and user-friendly online food ordering experience.

Users can explore restaurants, search and filter food options, view restaurant menus, add food items to their cart, manage their wishlist, submit restaurant reviews, place orders, make online payments using **Razorpay**, and view their order history.

Restaurant owners can **register their business**, get approved by the admin, and then manage their own restaurant, **menu (with dish images)**, and **customer orders** from a dedicated **Restaurant Owner Dashboard**.

The application also includes a dedicated **Admin Dashboard** with user management, restaurant/menu viewing, **business application approval**, and customer order management.

---

# 🚀 Features

## 🏠 Home Page

- Modern hero section
- Food background image
- Order Now button
- Explore Restaurants button
- Popular Restaurants section
- Food Categories section
- Responsive design
- Desktop, tablet, and mobile support

---

## 🍽️ Restaurant Features

- View all restaurants
- Search restaurants by name
- Filter restaurants by cuisine
- Sort restaurants by rating
- Sort restaurants by cost
- Sort restaurants by delivery time
- Restaurant details page
- Dynamic restaurant menu display
- Restaurants registered through the platform are loaded from the backend database
- Menu items added by restaurant owners appear on the restaurant details page
- Default image shown when a dish has no image
- Food item selection
- Restaurant reviews

---

## 🛒 Cart Features

- Add food items to cart
- Increase item quantity
- Decrease item quantity
- Remove individual cart items
- Clear cart
- Cart quantity badge
- Automatic price calculation
- Automatic total calculation
- Cart persistence using Local Storage
- Checkout flow
- Order confirmation

### Cart Quantity

The cart badge displays the **total quantity of food items**, not only the number of unique products.

Example:

```text
Pizza × 3
Burger × 2
Cart Badge = 5
```

---

## ❤️ Wishlist Features

- Add restaurants to wishlist
- Remove restaurants from wishlist
- Wishlist persistence using Local Storage
- Wishlist page
- Wishlist status display

---

## ⭐ Review System

- Add restaurant reviews
- Star rating system
- Display customer reviews
- Restaurant-specific reviews
- Review persistence using Local Storage

---

## 📦 Order Management

- Checkout page
- Delivery details
- Cash on Delivery
- Razorpay online payment
- Payment success handling
- Payment failure handling
- Order confirmation
- Order history
- View previous orders
- View order details
- Order status display
- Automatic cart clearing after successful order
- Customer-specific order history
- Account-based order separation

---

## 👤 User Authentication

- User registration
- User login
- JWT authentication (7-day token)
- Protected routes
- Customer-only routes
- User profile page
- Profile update (name, phone, address)
- Secure password hashing using bcryptjs
- Authentication state management
- Logout functionality
- User information management
- Role-based access: `user`, `restaurantOwner`, `admin`

---

## 🏪 Business Registration (Restaurant Owner Onboarding)

Any logged-in customer can apply to become a restaurant owner.

Customers can:

- Submit a business registration application
- Provide business name, owner name, email, and phone
- Provide restaurant name and cuisine
- Provide address and city
- Provide restaurant description
- Provide opening and closing time
- View the status of their application (pending, approved, rejected)

Validation and safety:

- Required fields are validated on the server
- Only normal users can submit an application
- A user cannot submit a second application while one is pending
- Email is normalized before saving

### Onboarding Flow

```text
Customer
   ↓
Business Registration Form
   ↓
Application Status: Pending
   ↓
Admin Reviews Application
   ↓
Approve ───────────────► Restaurant is created
   │                      User role becomes restaurantOwner
   │                      Restaurant is linked to the owner
   ↓
Reject (with reason)
```

---

## 🧑‍🍳 Restaurant Owner Dashboard

Approved restaurant owners get a dedicated dashboard.

### Restaurant Management

Owners can:

- View their restaurant details
- Edit restaurant name
- Edit cuisine
- Edit delivery time
- Edit rating
- Edit description
- Upload a restaurant image from their device, or paste an image URL
- See a live preview of the restaurant image

### Menu Management

Owners can:

- Add dishes with name, price, and image
- Upload a dish image from their device, or paste an image URL
- See a preview of the dish image before saving
- View all dishes in their menu
- Remove dishes from the menu
- Dishes appear on the customer-facing restaurant details page
- Existing dish IDs are preserved when the menu is updated, so customer carts keep working
- Invalid dishes (empty name or price of zero) are rejected by the server

### Order Management

Owners can:

- View total orders for their restaurant
- View customer name, phone, and delivery address
- View ordered items, quantities, and prices
- View total order amount
- Update order status

Available order statuses:

```text
Confirmed
Preparing
Out for Delivery
Delivered
Cancelled
```

### Image Upload

- Images are selected from the owner's device
- Images are resized and compressed in the browser before upload
- Compressed images are stored with the restaurant record in MongoDB
- The backend accepts request bodies up to 10 MB

### Owner Security

- Owner-only routes
- Each owner can only update their own restaurant
- Restaurant ownership is verified on the server

---

## 👑 Admin Features

FoodExpress includes a dedicated Admin Dashboard with role-based access control.

**Admin Dashboard:** `/admin`

The Admin Dashboard provides access to:

```text
Admin Dashboard
│
├── 👥 Users
│
├── 🍔 Restaurants
│
├── 🏪 Business Applications
│
└── 📦 Orders
```

### 👥 Admin Users

Admin can:

- View all registered users
- View user name
- View user email
- View user phone
- View user role
- Assign the Restaurant Owner role to a user (linked to a restaurant)
- Remove the Restaurant Owner role
- Prevent one restaurant from being assigned to two owners
- Refresh user list
- View total registered users

### 🍔 Admin Restaurants

Admin can:

- View all restaurants
- View restaurant images
- View restaurant name
- View cuisine
- View rating
- View delivery time
- View cost for two
- View restaurant menu items
- View menu item prices
- View restaurant statistics (total restaurants, restaurants with owners)

### 🏪 Admin Business Applications

Admin can:

- View all business applications
- View applicant details (name, email, phone, role)
- View restaurant name, cuisine, address, and description
- View application status
- **Approve** an application
  - Creates the restaurant
  - Changes the applicant's role to `restaurantOwner`
  - Links the restaurant to the user
  - Records the review date
- **Reject** an application with a reason
- Already approved applications cannot be approved again (prevents duplicate restaurants)

### 📦 Admin Orders

Admin can:

- View all customer orders
- View total order count
- Refresh orders
- View order ID
- View order date
- View order status
- View customer name
- View customer phone
- View delivery address
- View payment method
- View customer account email
- View ordered food items
- View item quantities
- View item prices
- View total order amount

### 🔐 Admin Security

- Admin-only authentication
- Role-based access control
- Protected Admin routes
- Customer users cannot access Admin Dashboard
- Admin users have separate navigation

---

## 💳 Online Payment - Razorpay

FoodExpress is integrated with the Razorpay payment gateway for online payments.

### Payment Features

- Razorpay Checkout integration
- Razorpay Test Mode
- Backend Razorpay order creation
- Secure server-side payment configuration
- Frontend Razorpay Key ID configuration
- Payment amount calculation
- Payment success handling
- Payment failure handling
- Payment cancellation handling
- Payment verification
- Order creation after successful payment

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

⚠️ Razorpay Test Mode should be used during development.

🔐 Never expose the Razorpay Key Secret in the frontend or GitHub repository.

- The Razorpay Key ID may be used in the frontend.
- The Razorpay Key Secret must remain securely stored in backend environment variables.

---

## 🔐 Demo Credentials

### 👤 User Demo Account

```text
Email: demo@example.com
Password: Demo@123
```

### 👑 Admin Demo Account

```text
Email: admin@foodexpress.com
Password: Admin@123
Role: admin
Admin Dashboard: /admin
```

The admin account is provided for project demonstration and mentor testing.

> For production applications, demo credentials should not be publicly exposed.

---

## 🌙 UI & User Experience

FoodExpress provides a modern and responsive user interface with:

- Dark mode support
- Responsive navigation bar
- Mobile hamburger menu
- Toast notifications
- Smooth UI interactions
- Modern food delivery interface
- Responsive layout
- User-friendly checkout interface
- Empty cart state
- Loading states
- Error handling
- Responsive desktop, tablet, and mobile layouts

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Vite
- JavaScript
- Tailwind CSS
- React Router DOM
- Context API
- React Hot Toast
- Axios
- Local Storage

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- REST API
- bcryptjs
- Multer
- Razorpay
- CORS
- dotenv

## Database

- MongoDB
- MongoDB Atlas

## Payment Gateway

- Razorpay

---

# 🌐 Live Deployment

## Frontend - Netlify

**FoodExpress Frontend**

```text
https://foodexpress-mern-app.netlify.app/
```

## Backend - Render

**FoodExpress Backend**

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
│   │   │   ├── Footer.jsx
│   │   │   ├── RestaurantCard.jsx
│   │   │   ├── ReviewForm.jsx
│   │   │   ├── ReviewList.jsx
│   │   │   ├── CheckoutForm.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── CustomerRoute.jsx
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
│   │   │   ├── BusinessRegistration.jsx
│   │   │   ├── RestaurantOwnerDashboard.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminUsers.jsx
│   │   │   ├── AdminRestaurants.jsx
│   │   │   ├── AdminBusinessApplications.jsx
│   │   │   ├── AdminOrders.jsx
│   │   │   └── NotFound.jsx
│   │   │
│   │   ├── context
│   │   │   ├── CartContext.jsx
│   │   │   ├── WishlistContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   │
│   │   ├── data
│   │   │   └── restaurants.js
│   │   │
│   │   └── services
│   │       └── api.js
│   │
│   ├── .env               # not committed — see Environment Variables section
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
│   │   ├── businessApplicationController.js
│   │   ├── paymentController.js
│   │   └── orderController.js
│   │
│   ├── middleware
│   │   └── authMiddleware.js
│   │
│   ├── models
│   │   ├── User.js
│   │   ├── Restaurant.js
│   │   ├── BusinessApplication.js
│   │   └── Order.js
│   │
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── restaurantRoutes.js
│   │   ├── businessApplicationRoutes.js
│   │   ├── paymentRoutes.js
│   │   └── orderRoutes.js
│   │
│   ├── .env               # not committed — see Environment Variables section
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

# 🗄️ Data Models

## Restaurant

```text
name           String (required)
cuisine        String (required)
image          String (URL or uploaded image data, required)
rating         Number (default 4.5)
deliveryTime   String (required)
description    String
location       String
costForTwo     String
ownerId        User reference (null when no owner)
menu           List of dishes
  ├── id       String (auto-generated)
  ├── name     String (required)
  ├── price    Number (required)
  └── image    String
createdAt / updatedAt
```

## Business Application

```text
userId            User reference
businessName
ownerName
email
phone
restaurantName
cuisine
address
city
description
openingTime
closingTime
status            pending | approved | rejected
rejectionReason
reviewedAt
```

## User Roles

```text
user              Normal customer
restaurantOwner   Approved restaurant owner (linked to one restaurant)
admin             Platform administrator
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

> The Vite development server may use another available port if port 5173 is already occupied.

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

---

# ⚠️ Environment Variable Security

Never commit `.env` files containing real credentials to GitHub.

Do not expose:

- MongoDB passwords
- JWT secrets
- Razorpay Key Secret
- Private API credentials
- Production database credentials

---

# 🔐 Admin Setup

The admin account is already configured for the application.

```text
Email: admin@foodexpress.com
Password: Admin@123
Role: admin
```

Admin Dashboard: `/admin`

The admin account can be used for project demonstration and mentor testing.

---

# 🔗 API Endpoints

## Authentication

### Register User

```text
POST /api/auth/register
```

### Login User

```text
POST /api/auth/login
```

### Get Users

```text
GET /api/auth/users
```

> Admin authentication is required to access the users endpoint.

Additional authentication routes (in `authRoutes.js`) handle business registration, restaurant owner role assignment, and profile update.

## Restaurants

### Get All Restaurants

```text
GET /api/restaurants
```

### Get Restaurant by ID

```text
GET /api/restaurants/:id
```

### Create Restaurant

```text
POST /api/restaurants
```

> Admin authentication is required.

### Restaurant Statistics

```text
GET /api/restaurants/stats
```

> Admin authentication is required.

### Get My Restaurant (Owner)

```text
GET /api/restaurants/owner/my-restaurant
```

> Restaurant owner authentication is required.

### Update My Restaurant and Menu (Owner)

```text
PUT /api/restaurants/owner/my-restaurant
```

> Restaurant owner authentication is required. Updatable fields: name, cuisine, image, rating, deliveryTime, description, location, costForTwo, menu.

## Business Applications

All business application routes are under:

```text
/api/business-applications
```

- Customer: view own application
- Admin: view all applications
- Admin: approve an application
- Admin: reject an application with a reason

> Admin authentication is required for admin routes.

## Orders

### Create Order

```text
POST /api/orders
```

### Get User Orders

```text
GET /api/orders
```

### Get All Orders

```text
GET /api/orders/admin
```

> Admin authentication is required for the admin orders endpoint.

### Get Restaurant Owner Orders

```text
GET /api/orders/owner
```

> Restaurant owner authentication is required.

### Update Order Status

```text
PUT /api/orders/:id/status
```

> Restaurant owner authentication is required.

## Payments

### Create Razorpay Order

```text
POST /api/payment/create-order
```

### Verify Razorpay Payment

```text
POST /api/payment/verify-payment
```

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

### Important Security Rule

The Razorpay Key Secret must only exist on the backend.

Never add the following to frontend code:

```text
RAZORPAY_KEY_SECRET
```

Never commit the real secret to:

- GitHub
- Frontend source code
- Browser/client-side JavaScript
- Public repositories
- Screenshots

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

Never commit real credentials, database passwords, JWT secrets, or Razorpay Key Secrets to GitHub.

---

# 📱 Responsive Design

FoodExpress is designed to work across:

- 💻 Desktop
- 📱 Mobile
- 📲 Tablet

The interface adapts to different screen sizes for a consistent user experience.

---

# 🛡️ Security

The application follows basic security practices including:

- JWT-based authentication
- Password hashing using bcryptjs
- Protected frontend routes
- Customer route protection
- Admin role-based route protection
- Restaurant owner role-based route protection
- Owners can only modify their own restaurant
- Duplicate approval protection for business applications
- Server-side validation of business applications and menu items
- Environment variables for sensitive configuration
- Razorpay Key Secret stored only on the backend
- Server-side Razorpay order creation
- CORS configuration
- Password excluded from authentication responses
- Admin-only access to admin features

---

# ✅ Mentor Feedback Fixes

The major mentor feedback items have been addressed.

## Cart Improvements

- ✅ Add to Cart works correctly
- ✅ Quantity controls are displayed
- ✅ Increase quantity works
- ✅ Decrease quantity works
- ✅ Remove cart item works
- ✅ Cart badge displays total quantity
- ✅ Unwanted page scrolling issue fixed

## Admin Improvements

- ✅ Admin Dashboard implemented
- ✅ Admin login and role detection
- ✅ Admin-only route protection
- ✅ Admin Users page
- ✅ Admin Restaurants page
- ✅ Restaurant menu display
- ✅ Admin Orders page
- ✅ Customer order details
- ✅ Order refresh functionality
- ✅ Admin navigation separated from customer navigation
- ✅ Admin demo credentials provided

## Home Page

- ✅ Food Categories section
- ✅ Popular Restaurants section
- ✅ Category navigation
- ✅ Restaurant navigation
- ✅ Home page layout completed
- ✅ Unwanted markdown/code fence issue removed

---

# 🐞 Bug Fixes (Restaurant Onboarding)

- ✅ Fixed duplicate restaurants being created for a single approved hotel
- ✅ Fixed "Restaurant Not Found" on View Details for backend-registered restaurants
- ✅ Restaurant details page now loads restaurants from the backend when they are not in the built-in list
- ✅ Added loading state on the restaurant details page
- ✅ Approving an already approved application is blocked
- ✅ Menu items keep their IDs across updates, so customer carts are not broken

---

# 🔮 Future Enhancements

Possible future improvements include:

- 📍 Live order tracking
- 🔄 Real-time order updates
- ☁️ Cloud image storage (for example Cloudinary) for faster image loading
- ✏️ Edit existing dishes in the owner dashboard
- 🚴 Delivery partner module
- 🔔 Order notifications
- ⚙️ Advanced admin management
- 🍽️ Restaurant management from admin dashboard
- 📊 Admin analytics and statistics
- 📈 Owner sales analytics

---

# 👩‍💻 Developer

**Keerthika R**

FoodExpress - MERN Full Stack Food Delivery Application

---

# ⭐ Project Status

| Feature | Status |
|---|---|
| Frontend | ✅ Completed |
| Backend | ✅ Completed |
| JWT Authentication | ✅ Completed |
| MongoDB Integration | ✅ Completed |
| Restaurant APIs | ✅ Completed |
| Restaurant Listing | ✅ Completed |
| Search & Filtering | ✅ Completed |
| Cart Functionality | ✅ Completed |
| Quantity Management | ✅ Completed |
| Remove Cart Functionality | ✅ Completed |
| Cart Quantity Badge | ✅ Completed |
| Wishlist Functionality | ✅ Completed |
| Review System | ✅ Completed |
| Checkout | ✅ Completed |
| Order Management | ✅ Completed |
| Customer Order History | ✅ Completed |
| Razorpay Integration | ✅ Completed |
| Razorpay Test Payment | ✅ Tested |
| Admin Authentication | ✅ Completed |
| Admin Dashboard | ✅ Completed |
| Admin Users | ✅ Completed |
| Admin Restaurants | ✅ Completed |
| Admin Menu Display | ✅ Completed |
| Admin Orders | ✅ Completed |
| Business Registration | ✅ Completed |
| Admin Business Application Approval | ✅ Completed |
| Restaurant Owner Role | ✅ Completed |
| Restaurant Owner Dashboard | ✅ Completed |
| Owner Menu Management | ✅ Completed |
| Restaurant and Dish Image Upload | ✅ Completed |
| Owner Order Status Management | ✅ Completed |
| Protected Routes | ✅ Completed |
| Customer Route Protection | ✅ Completed |
| Responsive UI | ✅ Completed |
| Dark Mode | ✅ Completed |
| Netlify Deployment | ✅ Completed |
| Render Deployment | ✅ Completed |
| Mentor Feedback Fixes | ✅ Completed |
| Full Stack MERN Application | 🚀 Completed |

---

# 🎉 Conclusion

FoodExpress is a complete MERN Stack Food Delivery Application demonstrating modern frontend development, backend REST API development, database integration, authentication, authorization, cart and order management, wishlist and review functionality, Razorpay payment integration, admin management, restaurant owner onboarding, and cloud deployment.

The project demonstrates the complete flow of an online food ordering application:

```text
User
 ↓
Login / Register
 ↓
Browse Restaurants
 ↓
Search / Filter
 ↓
Select Food
 ↓
Add to Cart
 ↓
Manage Quantity
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

The Restaurant Owner flow:

```text
Customer Login
 ↓
Business Registration
 ↓
Admin Approval
 ↓
Role becomes Restaurant Owner
 ↓
Owner Dashboard
 ↓
Edit Restaurant Details and Image
 ↓
Add Dishes with Images
 ↓
Customers See Menu
 ↓
Receive Orders
 ↓
Update Order Status
```

The Admin flow:

```text
Admin Login
 ↓
Admin Dashboard
 ↓
View Users
 ↓
View Restaurants
 ↓
View Menus
 ↓
Review Business Applications
 ↓
Approve / Reject
 ↓
View Customer Orders
 ↓
Manage / Monitor Orders
```

---

# ⭐ Thank You

Thank you for reviewing the FoodExpress Food Delivery Application.

Built with ❤️ using the MERN Stack