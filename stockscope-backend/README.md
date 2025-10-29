# 📈 StockScope Backend - Java Full Stack with MongoDB

A complete RESTful API backend for the StockScope stock market learning platform, built with **Spring Boot** and **MongoDB Atlas**.

---

## 🚀 **Features**

- ✅ **Course Management** - CRUD operations for stock market courses
- ✅ **Blog/Content Management** - Manage blogs, stories, and what's brewing
- ✅ **Financial Dictionary** - Store and search financial terms
- ✅ **User Registration & Login** - User authentication with mobile/email
- ✅ **Newsletter Subscriptions** - Manage email subscriptions
- ✅ **MongoDB Atlas Integration** - Cloud database support
- ✅ **CORS Enabled** - Frontend integration ready
- ✅ **RESTful APIs** - Clean and organized endpoints

---

## 📁 **Project Structure**

```
stockscope-backend/
├── src/
│   ├── main/
│   │   ├── java/com/stockscope/
│   │   │   ├── StockscopeApplication.java    # Main application
│   │   │   ├── config/                        # Configuration files
│   │   │   │   ├── CorsConfig.java
│   │   │   │   └── MongoConfig.java
│   │   │   ├── controller/                    # REST Controllers
│   │   │   │   ├── CourseController.java
│   │   │   │   ├── BlogController.java
│   │   │   │   ├── DictionaryController.java
│   │   │   │   ├── UserController.java
│   │   │   │   └── SubscriptionController.java
│   │   │   ├── model/                         # MongoDB Documents
│   │   │   │   ├── Course.java
│   │   │   │   ├── Blog.java
│   │   │   │   ├── Dictionary.java
│   │   │   │   ├── User.java
│   │   │   │   └── Subscription.java
│   │   │   ├── repository/                    # MongoDB Repositories
│   │   │   │   ├── CourseRepository.java
│   │   │   │   ├── BlogRepository.java
│   │   │   │   ├── DictionaryRepository.java
│   │   │   │   ├── UserRepository.java
│   │   │   │   └── SubscriptionRepository.java
│   │   │   └── service/                       # Business Logic
│   │   │       ├── CourseService.java
│   │   │       ├── BlogService.java
│   │   │       ├── DictionaryService.java
│   │   │       ├── UserService.java
│   │   │       └── SubscriptionService.java
│   │   └── resources/
│   │       └── application.properties         # Configuration
│   └── test/                                  # Test files
└── pom.xml                                    # Maven dependencies
```

---

## ⚙️ **Setup Instructions**

### **1. Prerequisites**
- ✅ Java JDK 17 or higher
- ✅ Maven 3.6+
- ✅ MongoDB Atlas account (free tier)
- ✅ IDE (IntelliJ IDEA, Eclipse, or VS Code)

### **2. MongoDB Atlas Setup**

1. **Create MongoDB Atlas Account**
   - Go to: https://www.mongodb.com/cloud/atlas
   - Sign up for free

2. **Create a Cluster**
   - Choose **FREE** M0 tier
   - Select a cloud provider and region
   - Click "Create Cluster"

3. **Set up Database Access**
   - Go to "Database Access" in left menu
   - Click "Add New Database User"
   - Create username and password (remember these!)
   - Set "Database User Privileges" to "Atlas Admin"

4. **Set up Network Access**
   - Go to "Network Access" in left menu
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" in left menu
   - Click "Connect" on your cluster
   - Select "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/`

### **3. Configure Backend**

1. **Open `application.properties`** file at:
   ```
   src/main/resources/application.properties
   ```

2. **Update MongoDB Connection String**:
   ```properties
   spring.data.mongodb.uri=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/stockscope?retryWrites=true&w=majority
   ```
   
   Replace:
   - `YOUR_USERNAME` with your MongoDB username
   - `YOUR_PASSWORD` with your MongoDB password
   - `cluster0.xxxxx` with your actual cluster URL

3. **Save the file**

### **4. Run the Application**

#### **Option A: Using Maven Command**
```bash
cd stockscope-backend
mvn spring-boot:run
```

#### **Option B: Using IDE**
- Open project in IntelliJ IDEA or Eclipse
- Right-click on `StockscopeApplication.java`
- Select "Run"

#### **Option C: Build JAR and Run**
```bash
mvn clean package
java -jar target/stockscope-backend-1.0.0.jar
```

### **5. Verify Backend is Running**

Open browser and visit:
```
http://localhost:8080/api/courses
```

If you see `[]` (empty array), the backend is working! ✅

---

## 📡 **API Endpoints**

### **Base URL**: `http://localhost:8080/api`

### **📚 Courses**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/courses` | Get all courses |
| GET | `/courses/{id}` | Get course by ID |
| GET | `/courses/category/{category}` | Get courses by category (Novice/Investor/Trader) |
| GET | `/courses/active` | Get only active courses |
| GET | `/courses/difficulty/{difficulty}` | Get courses by difficulty |
| POST | `/courses` | Create new course |
| PUT | `/courses/{id}` | Update course |
| DELETE | `/courses/{id}` | Delete course |

**Sample Course JSON:**
```json
{
  "title": "Stock Market Basics",
  "description": "Learn the fundamentals of stock trading",
  "category": "Novice",
  "imageUrl": "https://example.com/image.jpg",
  "difficulty": "Beginner",
  "duration": 120,
  "isActive": true
}
```

---

### **📝 Blogs**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/blogs` | Get all blogs |
| GET | `/blogs/{id}` | Get blog by ID |
| GET | `/blogs/category/{category}` | Get blogs by category |
| GET | `/blogs/published` | Get only published blogs |
| GET | `/blogs/author/{author}` | Get blogs by author |
| POST | `/blogs` | Create new blog |
| PUT | `/blogs/{id}` | Update blog |
| DELETE | `/blogs/{id}` | Delete blog |

**Sample Blog JSON:**
```json
{
  "title": "Understanding Bull Markets",
  "content": "Full blog content here...",
  "category": "Blogs",
  "author": "John Doe",
  "imageUrl": "https://example.com/blog.jpg",
  "summary": "A comprehensive guide to bull markets",
  "readTime": 5,
  "isPublished": true
}
```

---

### **📖 Dictionary**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/dictionary` | Get all terms |
| GET | `/dictionary/{id}` | Get term by ID |
| GET | `/dictionary/search?q={query}` | Search terms |
| GET | `/dictionary/category/{category}` | Get terms by category |
| GET | `/dictionary/term/{term}` | Get exact term |
| POST | `/dictionary` | Add new term |
| PUT | `/dictionary/{id}` | Update term |
| DELETE | `/dictionary/{id}` | Delete term |

**Sample Dictionary JSON:**
```json
{
  "term": "Bull Market",
  "definition": "A market condition where prices are rising or expected to rise",
  "category": "Stock Market",
  "example": "The market experienced a strong bull market in 2021",
  "relatedTerms": "Bear Market, Market Trend"
}
```

---

### **👤 Users**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | Get all users |
| GET | `/users/{id}` | Get user by ID |
| GET | `/users/email/{email}` | Get user by email |
| POST | `/users/register` | Register new user |
| POST | `/users/login` | User login |
| PUT | `/users/{id}` | Update user |
| DELETE | `/users/{id}` | Delete user |

**Sample Registration JSON:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "mobile": "+919876543210",
  "password": "securepassword123",
  "userType": "Novice"
}
```

**Sample Login JSON:**
```json
{
  "mobile": "+919876543210",
  "password": "securepassword123"
}
```

---

### **📧 Subscriptions**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/subscriptions` | Get all subscriptions |
| GET | `/subscriptions/active` | Get active subscriptions |
| POST | `/subscriptions` | Subscribe email |
| PUT | `/subscriptions/unsubscribe` | Unsubscribe email |
| DELETE | `/subscriptions/{id}` | Delete subscription |

**Sample Subscription JSON:**
```json
{
  "email": "user@example.com"
}
```

---

## 🧪 **Testing APIs with Postman**

1. **Install Postman** from: https://www.postman.com/downloads/

2. **Create a new request**:
   - Method: `GET`
   - URL: `http://localhost:8080/api/courses`
   - Click "Send"

3. **Create a course** (POST example):
   - Method: `POST`
   - URL: `http://localhost:8080/api/courses`
   - Body → raw → JSON:
   ```json
   {
     "title": "Beginner Trading",
     "description": "Start your trading journey",
     "category": "Novice",
     "imageUrl": "https://example.com/image.jpg",
     "difficulty": "Beginner",
     "duration": 60,
     "isActive": true
   }
   ```
   - Click "Send"

---

## 🔗 **Frontend Integration**

### **Update your Frontend JavaScript**

Replace the `Dashboard.js` content with:

```javascript
const API_BASE_URL = 'http://localhost:8080/api';

// Fetch all courses
async function fetchCourses() {
    try {
        const response = await fetch(`${API_BASE_URL}/courses/active`);
        const courses = await response.json();
        console.log('Courses:', courses);
        // Use courses to update your frontend
        displayCourses(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
    }
}

// Fetch blogs
async function fetchBlogs() {
    try {
        const response = await fetch(`${API_BASE_URL}/blogs/published`);
        const blogs = await response.json();
        console.log('Blogs:', blogs);
        displayBlogs(blogs);
    } catch (error) {
        console.error('Error fetching blogs:', error);
    }
}

// Subscribe newsletter
async function subscribeNewsletter(email) {
    try {
        const response = await fetch(`${API_BASE_URL}/subscriptions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
        });
        const result = await response.json();
        console.log('Subscription result:', result);
        alert('Successfully subscribed!');
    } catch (error) {
        console.error('Error subscribing:', error);
        alert('Subscription failed. Please try again.');
    }
}

// User registration
async function registerUser(userData) {
    try {
        const response = await fetch(`${API_BASE_URL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        const result = await response.json();
        console.log('Registration result:', result);
        return result;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
}

// Call functions when page loads
document.addEventListener('DOMContentLoaded', function() {
    fetchCourses();
    fetchBlogs();
});
```

---

## 🛠️ **Troubleshooting**

### **Problem: Cannot connect to MongoDB**
**Solution:** 
- Check your MongoDB Atlas connection string
- Ensure Network Access allows your IP (0.0.0.0/0)
- Verify username and password are correct

### **Problem: Port 8080 already in use**
**Solution:** 
Change port in `application.properties`:
```properties
server.port=8081
```

### **Problem: CORS errors in frontend**
**Solution:** 
Update CORS origins in `application.properties`:
```properties
cors.allowed.origins=http://localhost:3000,http://127.0.0.1:5500
```

### **Problem: Maven build fails**
**Solution:** 
Clean and rebuild:
```bash
mvn clean install
```

---

## 📚 **Technologies Used**

- **Spring Boot 3.1.5** - Application framework
- **Spring Data MongoDB** - Database access
- **MongoDB Atlas** - Cloud database
- **Maven** - Dependency management
- **Lombok** - Reduce boilerplate code
- **Java 17** - Programming language

---

## 📝 **Sample Data for Testing**

### **Add Sample Courses via Postman:**

```json
[
  {
    "title": "Novice Stock Trading",
    "description": "Learn the basics of stock market trading",
    "category": "Novice",
    "imageUrl": "https://www.5paisa.com/finschool/wp-content/uploads/2021/10/pana-1.svg",
    "difficulty": "Beginner",
    "duration": 120,
    "isActive": true
  },
  {
    "title": "Investor Fundamentals",
    "description": "Master investment strategies and analysis",
    "category": "Investor",
    "imageUrl": "https://www.5paisa.com/finschool/wp-content/uploads/2025/07/Investor-courses-cat.png",
    "difficulty": "Intermediate",
    "duration": 180,
    "isActive": true
  },
  {
    "title": "Advanced Trading Techniques",
    "description": "Advanced technical analysis and trading strategies",
    "category": "Trader",
    "imageUrl": "https://www.5paisa.com/finschool/wp-content/uploads/2025/07/trader-courses-cat.png",
    "difficulty": "Advanced",
    "duration": 240,
    "isActive": true
  }
]
```

---

## 🎯 **Next Steps**

1. ✅ Set up MongoDB Atlas
2. ✅ Configure application.properties
3. ✅ Run the backend
4. ✅ Test APIs with Postman
5. ✅ Add sample data
6. ✅ Connect your frontend
7. ✅ Build your full-stack application!

---

## 📞 **Support**

If you encounter any issues:
1. Check the console logs for error messages
2. Verify MongoDB connection
3. Ensure all dependencies are installed
4. Check if port 8080 is available

---

## 📄 **License**

This project is open source and available for educational purposes.

---

**Happy Coding! 🚀📈**
