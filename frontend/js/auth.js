// ===============================================
// AUTHENTICATION LOGIC - FIXED FOR BACKEND
// ===============================================

// Switch between login and register tabs
function switchTab(tab) {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const tabs = document.querySelectorAll('.auth-tab');
  
  tabs.forEach(t => t.classList.remove('active'));
  
  if (tab === 'login') {
    loginForm.classList.add('active');
    registerForm.classList.remove('active');
    tabs[0].classList.add('active');
  } else {
    registerForm.classList.add('active');
    loginForm.classList.remove('active');
    tabs[1].classList.add('active');
  }
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  // Check if already logged in
  if (TokenManager.isLoggedIn()) {
    window.location.href = 'dashboard.html';
  }
});

// Password visibility toggle
function togglePassword(inputId, button) {
  const input = document.getElementById(inputId);
  const icon = button.querySelector('i');
  
  if (input.type === 'password') {
    input.type = 'text';
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
  } else {
    input.type = 'password';
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
  }
}

// ============ LOGIN HANDLER ============
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    
    if (!email || !password) {
      showNotification('Please fill in all fields', 'error');
      return;
    }
    
    try {
      showLoader();
      
      // Clear any old user data first
      TokenManager.removeUser();
      TokenManager.removeToken();
      
      const user = await UserAPI.login(email, password);
      hideLoader();
      
      console.log('Logged in user:', user);
      showNotification('Login successful! Redirecting...', 'success');
      
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1000);
      
    } catch (error) {
      hideLoader();
      showNotification(error.message || 'Login failed. Please check your credentials.', 'error');
    }
  });
}

// ============ REGISTRATION HANDLER ============
const registerForm = document.getElementById('register-form');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('register-name').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const mobile = document.getElementById('register-phone').value.trim();
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    const acceptTerms = document.getElementById('accept-terms').checked;
    
    // Basic validation
    if (!name || !email || !mobile || !password || !confirmPassword) {
      showNotification('Please fill in all fields', 'error');
      return;
    }
    
    if (!acceptTerms) {
      showNotification('Please accept the terms and conditions', 'error');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showNotification('Please enter a valid email address', 'error');
      return;
    }
    
    // Mobile validation (10 digits)
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobile)) {
      showNotification('Mobile number must be exactly 10 digits', 'error');
      return;
    }
    
    // Password validation
    if (password !== confirmPassword) {
      showNotification('Passwords do not match', 'error');
      return;
    }
    
    if (password.length < 6) {
      showNotification('Password must be at least 6 characters long', 'error');
      return;
    }
    
    // Prepare user data in the EXACT format backend expects
    const userData = {
      name: name,
      email: email,
      mobile: mobile,  // Backend expects 'mobile', not 'phone'
      password: password,
      userType: 'Investor'  // Backend expects 'userType', not 'role'
    };
    
    console.log('Registering user with data:', { ...userData, password: '***' });
    
    // Attempt registration
    try {
      showLoader();
      
      const response = await fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      
      hideLoader();
      
      if (response.ok) {
        const data = await response.json();
        console.log('Registration successful:', data);
        showNotification('✅ Registration successful! Please login.', 'success');
        
        // Clear form
        registerForm.reset();
        
        // Switch to login
        setTimeout(() => {
          switchTab('login');
          document.getElementById('login-email').value = email;
        }, 1500);
        
      } else {
        // Handle errors
        const data = await response.json();
        console.error('Registration failed:', data);
        
        let errorMessage = data.error || data.message || 'Registration failed. Please try again.';
        
        if (errorMessage.includes('Email')) {
          errorMessage = '⚠️ This email is already registered. Please use a different email or try logging in.';
        } else if (errorMessage.includes('Mobile') || errorMessage.includes('mobile')) {
          errorMessage = '⚠️ This mobile number is already registered. Please use a different number or try logging in.';
        }
        
        showNotification(errorMessage, 'error');
      }
      
    } catch (error) {
      hideLoader();
      console.error('Registration error:', error);
      showNotification('Network error. Please check if the backend is running on localhost:8080', 'error');
    }
  });
}
