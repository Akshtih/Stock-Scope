# 📈 StockScope - Financial Learning Platform

A comprehensive full-stack web application for stock market education, featuring courses, blogs, financial dictionary, and subscription management.

## 🌐 Live Application

- **Frontend**: https://boisterous-mochi-cfb18f.netlify.app
- **Backend API**: https://stock-scope-mmc0.onrender.com
- **Dashboard**: https://boisterous-mochi-cfb18f.netlify.app/dashboard.html

---

## 📁 Project Structure

```
Demo/
├── frontend/                    # Frontend Application (HTML/CSS/JS)
│   ├── index.html              # Landing page
│   ├── auth.html               # Login/Register page
│   ├── dashboard.html          # User dashboard
│   ├── courses.html            # Courses listing
│   ├── blogs.html              # Blog articles
│   ├── dictionary.html         # Financial dictionary
│   ├── subscription.html       # Subscription plans
│   ├── admin-debug.html        # Admin debugging tool
│   ├── css/                    # Stylesheets
│   │   ├── auth.css
│   │   ├── dashboard.css
│   │   ├── courses.css
│   │   ├── blogs.css
│   │   ├── dictionary.css
│   │   └── subscription.css
│   ├── js/                     # JavaScript modules
│   │   ├── api-service.js      # API client & utilities
│   │   ├── auth.js             # Authentication logic
│   │   ├── dashboard.js        # Dashboard logic
│   │   ├── courses.js          # Courses functionality
│   │   ├── blogs.js            # Blogs functionality
│   │   ├── dictionary.js       # Dictionary functionality
│   │   └── subscription.js     # Subscription logic
│   └── style.css               # Global styles
│
└── stockscope-backend/         # Backend Application (Spring Boot)
    ├── src/
    │   ├── main/
    │   │   ├── java/com/stockscope/
    │   │   │   ├── controller/      # REST Controllers
    │   │   │   ├── model/           # MongoDB Models
    │   │   │   ├── repository/      # Data Access Layer
    │   │   │   └── config/          # Configuration
    │   │   └── resources/
    │   │       └── application.properties
    │   └── test/
    ├── pom.xml                      # Maven dependencies
    └── README.md                    # Backend documentation
```

---

## 🚀 Quick Start

### **Prerequisites**
- Java 21 JDK
- Maven 3.8+
- Node.js (optional, for Live Server)
- MongoDB Atlas account (or local MongoDB)

### **1. Start Backend**

```bash
cd stockscope-backend
mvn spring-boot:run
```

Backend runs on: `http://localhost:8080`

### **2. Start Frontend**

```bash
cd frontend
# Open with Live Server in VS Code
# OR open index.html in browser
```

Frontend runs on: `http://localhost:5500` (or your preferred port)

### **3. Access Application**

- **Landing Page**: http://localhost:5500/index.html
- **Login/Register**: http://localhost:5500/auth.html
- **Dashboard**: http://localhost:5500/dashboard.html

---

## 🎯 Features

### **Frontend Features**
- ✅ Responsive design with modern UI
- ✅ User authentication (Login/Register)
- ✅ Protected routes with token management
- ✅ Course browsing with filters and search
- ✅ Blog reading with categories
- ✅ Financial dictionary with A-Z filtering
- ✅ Subscription plans with billing toggle
- ✅ Admin debug panel for testing

### **Backend Features**
- ✅ RESTful API with Spring Boot 3.1.5
- ✅ MongoDB Atlas integration
- ✅ User management (CRUD)
- ✅ Course management
- ✅ Blog management
- ✅ Dictionary management
- ✅ Subscription management
- ✅ CORS enabled for frontend

---

## 🔧 Technology Stack

### **Frontend**
- HTML5, CSS3, JavaScript ES6+
- Font Awesome 6.4.0 (Icons)
- Fetch API for HTTP requests
- LocalStorage for authentication

### **Backend**
- Spring Boot 3.1.5
- Java 21
- MongoDB (NoSQL Database)
- Maven (Build Tool)

### **Database**
- MongoDB Atlas (Cloud)
- Collections: Users, Courses, Blogs, Dictionary, Subscriptions

---

## 📝 API Endpoints

### **Users**
```
POST   /api/users/register    # Register new user
POST   /api/users/login       # User login
GET    /api/users             # Get all users
GET    /api/users/{id}        # Get user by ID
PUT    /api/users/{id}        # Update user
DELETE /api/users/{id}        # Delete user
```

### **Courses**
```
GET    /api/courses                    # Get all courses
GET    /api/courses/{id}               # Get course by ID
GET    /api/courses/category/{cat}     # Get by category
GET    /api/courses/search?keyword=X   # Search courses
POST   /api/courses                    # Create course
PUT    /api/courses/{id}               # Update course
DELETE /api/courses/{id}               # Delete course
```

### **Blogs**
```
GET    /api/blogs                      # Get all blogs
GET    /api/blogs/{id}                 # Get blog by ID
GET    /api/blogs/category/{cat}       # Get by category
GET    /api/blogs/search?keyword=X     # Search blogs
POST   /api/blogs                      # Create blog
PUT    /api/blogs/{id}                 # Update blog
DELETE /api/blogs/{id}                 # Delete blog
```

### **Dictionary**
```
GET    /api/dictionary                 # Get all terms
GET    /api/dictionary/{id}            # Get term by ID
GET    /api/dictionary/search?keyword=X # Search terms
POST   /api/dictionary                 # Create term
PUT    /api/dictionary/{id}            # Update term
DELETE /api/dictionary/{id}            # Delete term
```

### **Subscriptions**
```
GET    /api/subscriptions              # Get all subscriptions
GET    /api/subscriptions/{id}         # Get by ID
POST   /api/subscriptions              # Create subscription
PUT    /api/subscriptions/{id}         # Update subscription
DELETE /api/subscriptions/{id}         # Delete subscription
```

---

## 🎨 Design System

### **Color Palette**
- **Primary Brown**: `#432818`
- **Secondary Gold**: `#d4a373`
- **Light Cream**: `#fff8e1`
- **Accent Yellow**: `#FFE6A7`

### **Typography**
- Font Family: System fonts (Segoe UI, Roboto, Arial)
- Headings: Bold, larger sizes
- Body: Regular weight, 1rem base size

### **Components**
- Cards with rounded corners (15px-20px)
- Smooth transitions (0.3s)
- Hover effects on interactive elements
- Modal popups for detailed views

---

## 🛠️ Development

### **Running Backend in Development**
```bash
cd stockscope-backend
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

### **Building Backend for Production**
```bash
cd stockscope-backend
mvn clean package
java -jar target/stockscope-0.0.1-SNAPSHOT.jar
```

### **Frontend Development**
- Use Live Server extension in VS Code
- Or any local HTTP server
- No build step required (vanilla JS)

---

## 🧪 Testing

### **Manual Testing**
1. Start backend
2. Open `frontend/admin-debug.html`
3. Check backend status
4. List users, courses, blogs, etc.
5. Test CRUD operations

### **Test User Registration**
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "mobile": "9876543210",
  "password": "test123",
  "userType": "Investor"
}
```

---

## 🔐 Security Notes

**⚠️ Important for Production:**
1. Change MongoDB password from default
2. Add proper JWT authentication
3. Implement rate limiting
4. Enable HTTPS
5. Validate all user inputs
6. Use environment variables for secrets

---

## 📦 Deployment

**✅ Currently Deployed:**
- **Frontend**: Netlify - https://boisterous-mochi-cfb18f.netlify.app
- **Backend**: Render (Free Tier) - https://stock-scope-mmc0.onrender.com
- **Database**: MongoDB Atlas (Cloud)

**Note**: Backend may take 30-60 seconds to wake up from sleep on first request (free tier limitation).

---

## 🐛 Troubleshooting

### **Backend won't start**
- Verify Java 21 is installed: `java -version`
- Check MongoDB connection in `application.properties`
- Ensure port 8080 is not in use

### **Frontend can't connect**
- Verify backend is running on port 8080
- Check CORS settings in backend
- Verify API_BASE_URL in `js/api-service.js`

### **Login not working**
- Check browser console for errors (F12)
- Verify user exists in database
- Check network tab for API responses

---

## 📚 Documentation

- **Frontend README**: `frontend/README.md` (coming soon)
- **Backend README**: `stockscope-backend/README.md`
- **API Documentation**: Check backend controllers
- **Deployment Guide**: `DEPLOYMENT-GUIDE.md` (coming soon)

---

## 👥 Default Users

After initial setup, you may need to create users via registration or Postman.

**Test User Format:**
```
Name: John Doe
Email: john@example.com
Mobile: 9876543210
Password: password123
UserType: Investor
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

This project is for educational purposes.

---

## 📞 Support

For issues or questions:
- Check documentation in respective folders
- Review API endpoints above
- Test with admin-debug.html tool

---

## 🎉 Acknowledgments

- Font Awesome for icons
- MongoDB Atlas for database hosting
- Spring Boot framework
- Freepik for stock images

---

**Built with ❤️ for financial education**
