// ===============================================
// API SERVICE - Handles all backend API calls
// ===============================================

const API_BASE_URL = 'http://localhost:8080/api';

// ============ TOKEN MANAGEMENT ============
const TokenManager = {
  setToken(token) {
    localStorage.setItem('authToken', token);
  },
  
  getToken() {
    return localStorage.getItem('authToken');
  },
  
  removeToken() {
    localStorage.removeItem('authToken');
  },
  
  setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  },
  
  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  
  removeUser() {
    localStorage.removeItem('user');
  },
  
  isLoggedIn() {
    return !!this.getToken();
  },
  
  logout() {
    this.removeToken();
    this.removeUser();
    window.location.href = 'index.html';
  }
};

// ============ HTTP CLIENT ============
async function apiRequest(endpoint, method = 'GET', body = null) {
  const headers = {
    'Content-Type': 'application/json',
  };
  
  const token = TokenManager.getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const config = {
    method,
    headers,
    credentials: 'include',
  };
  
  if (body) {
    config.body = JSON.stringify(body);
    console.log('Request Body:', config.body); // Log exact JSON being sent
  }
  
  try {
    console.log(`API Request: ${method} ${API_BASE_URL}${endpoint}`);
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      if (response.status === 401) {
        TokenManager.logout();
        throw new Error('Unauthorized - Please login again');
      }
      
      // Try to get detailed error message from backend
      try {
        const errorData = await response.json();
        const errorMessage = errorData.message || errorData.error || `Request failed with status ${response.status}`;
        console.error('Backend Error:', errorData);
        
        // Create a proper Error object with the backend message
        const error = new Error(errorMessage);
        error.status = response.status;
        error.data = errorData;
        throw error;
      } catch (parseError) {
        // If JSON parsing fails, throw generic error
        if (parseError instanceof Error && parseError.message !== `Request failed with status ${response.status}`) {
          throw parseError; // Re-throw if it's our custom error
        }
        throw new Error(`Request failed with status ${response.status}`);
      }
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// ============ USER API ============
const UserAPI = {
  async register(userData) {
    // Transform frontend format to backend format
    const backendData = {
      name: userData.name,
      email: userData.email,
      mobile: userData.mobile || userData.phone, // Support both field names
      password: userData.password,
      userType: userData.userType || userData.role || 'Investor'
    };
    return apiRequest('/users/register', 'POST', backendData);
  },
  
  async login(email, password) {
    const response = await apiRequest('/users/login', 'POST', { email, password });
    if (response && response.id) {
      TokenManager.setToken(response.id); // Using ID as token for now
      TokenManager.setUser(response);
    }
    return response;
  },
  
  async getUserById(userId) {
    return apiRequest(`/users/${userId}`, 'GET');
  },
  
  async updateUser(userId, userData) {
    return apiRequest(`/users/${userId}`, 'PUT', userData);
  },
  
  async deleteUser(userId) {
    return apiRequest(`/users/${userId}`, 'DELETE');
  }
};

// ============ COURSES API ============
const CoursesAPI = {
  async getAllCourses() {
    return apiRequest('/courses', 'GET');
  },
  
  async getCourseById(courseId) {
    return apiRequest(`/courses/${courseId}`, 'GET');
  },
  
  async getCoursesByCategory(category) {
    return apiRequest(`/courses/category/${category}`, 'GET');
  },
  
  async searchCourses(keyword) {
    return apiRequest(`/courses/search?keyword=${encodeURIComponent(keyword)}`, 'GET');
  },
  
  async createCourse(courseData) {
    return apiRequest('/courses', 'POST', courseData);
  },
  
  async updateCourse(courseId, courseData) {
    return apiRequest(`/courses/${courseId}`, 'PUT', courseData);
  },
  
  async deleteCourse(courseId) {
    return apiRequest(`/courses/${courseId}`, 'DELETE');
  }
};

// ============ BLOGS API ============
const BlogsAPI = {
  async getAllBlogs() {
    return apiRequest('/blogs', 'GET');
  },
  
  async getBlogById(blogId) {
    return apiRequest(`/blogs/${blogId}`, 'GET');
  },
  
  async getBlogsByCategory(category) {
    return apiRequest(`/blogs/category/${category}`, 'GET');
  },
  
  async searchBlogs(keyword) {
    return apiRequest(`/blogs/search?keyword=${encodeURIComponent(keyword)}`, 'GET');
  },
  
  async createBlog(blogData) {
    return apiRequest('/blogs', 'POST', blogData);
  },
  
  async updateBlog(blogId, blogData) {
    return apiRequest(`/blogs/${blogId}`, 'PUT', blogData);
  },
  
  async deleteBlog(blogId) {
    return apiRequest(`/blogs/${blogId}`, 'DELETE');
  }
};

// ============ DICTIONARY API ============
const DictionaryAPI = {
  async getAllTerms() {
    return apiRequest('/dictionary', 'GET');
  },
  
  async getTermById(termId) {
    return apiRequest(`/dictionary/${termId}`, 'GET');
  },
  
  async getTermByName(termName) {
    return apiRequest(`/dictionary/term/${encodeURIComponent(termName)}`, 'GET');
  },
  
  async searchTerms(keyword) {
    return apiRequest(`/dictionary/search?keyword=${encodeURIComponent(keyword)}`, 'GET');
  },
  
  async createTerm(termData) {
    return apiRequest('/dictionary', 'POST', termData);
  },
  
  async updateTerm(termId, termData) {
    return apiRequest(`/dictionary/${termId}`, 'PUT', termData);
  },
  
  async deleteTerm(termId) {
    return apiRequest(`/dictionary/${termId}`, 'DELETE');
  }
};

// ============ SUBSCRIPTIONS API ============
const SubscriptionsAPI = {
  async getAllSubscriptions() {
    return apiRequest('/subscriptions', 'GET');
  },
  
  async getSubscriptionById(subscriptionId) {
    return apiRequest(`/subscriptions/${subscriptionId}`, 'GET');
  },
  
  async getSubscriptionsByUserId(userId) {
    return apiRequest(`/subscriptions/user/${userId}`, 'GET');
  },
  
  async createSubscription(subscriptionData) {
    return apiRequest('/subscriptions', 'POST', subscriptionData);
  },
  
  async updateSubscription(subscriptionId, subscriptionData) {
    return apiRequest(`/subscriptions/${subscriptionId}`, 'PUT', subscriptionData);
  },
  
  async deleteSubscription(subscriptionId) {
    return apiRequest(`/subscriptions/${subscriptionId}`, 'DELETE');
  }
};

// ============ UTILITY FUNCTIONS ============
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = message.replace(/\n/g, '<br>'); // Support line breaks
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 20px 30px;
    max-width: 400px;
    background: ${type === 'error' ? '#ff6b6b' : type === 'success' ? '#51cf66' : '#339af0'};
    color: white;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    z-index: 10000;
    animation: slideIn 0.3s ease;
    font-size: 0.95rem;
    line-height: 1.6;
    text-align: left;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 5000); // Show longer for error messages
}

function showLoader() {
  const loader = document.createElement('div');
  loader.id = 'global-loader';
  loader.innerHTML = '<div class="spinner"></div>';
  loader.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99999;
  `;
  document.body.appendChild(loader);
}

function hideLoader() {
  const loader = document.getElementById('global-loader');
  if (loader) loader.remove();
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(400px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(400px); opacity: 0; }
  }
  .spinner {
    border: 4px solid rgba(255,255,255,0.3);
    border-top: 4px solid white;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);
