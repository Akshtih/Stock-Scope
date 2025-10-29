// ===============================================
// COURSES PAGE LOGIC
// ===============================================

// Check authentication
if (!TokenManager.isLoggedIn()) {
  window.location.href = 'auth.html';
}

let allCourses = [];
let currentFilter = 'All';

// Initialize page
document.addEventListener('DOMContentLoaded', async () => {
  loadUserInfo();
  await loadCourses();
  setupSearchListener();
});

// ============ LOAD USER INFO ============
function loadUserInfo() {
  // Just show "User" for all logged-in users
  document.getElementById('user-name').textContent = 'User';
}

// ============ LOAD COURSES ============
async function loadCourses() {
  const container = document.getElementById('courses-container');
  
  try {
    allCourses = await CoursesAPI.getAllCourses();
    
    if (!allCourses || allCourses.length === 0) {
      container.innerHTML = `
        <div class="no-results">
          <i class="fas fa-book-open"></i>
          <h3>No Courses Available</h3>
          <p>Check back later for new courses</p>
        </div>
      `;
      return;
    }
    
    displayCourses(allCourses);
    
  } catch (error) {
    console.error('Error loading courses:', error);
    container.innerHTML = `
      <div class="no-results">
        <i class="fas fa-exclamation-circle"></i>
        <h3>Error Loading Courses</h3>
        <p>${error.message}</p>
      </div>
    `;
  }
}

// ============ DISPLAY COURSES ============
function displayCourses(courses) {
  const container = document.getElementById('courses-container');
  
  if (courses.length === 0) {
    container.innerHTML = `
      <div class="no-results">
        <i class="fas fa-search"></i>
        <h3>No Courses Found</h3>
        <p>Try adjusting your search or filter</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = courses.map(course => {
    const enrolledCount = Math.floor(Math.random() * 5000) + 500;
    const rating = (4.0 + Math.random() * 1).toFixed(1);
    const lessons = Math.floor(Math.random() * 20) + 10;
    
    return `
    <div class="course-card" onclick="showCourseDetail('${course.id}')">
      <div class="course-image">
        <img src="${course.imageUrl || getDefaultImage(course.category)}" 
             alt="${course.title}"
             onerror="this.src='${getDefaultImage(course.category)}'">
        <span class="course-badge">${course.category}</span>
        <div class="course-overlay">
          <span class="course-rating"><i class="fas fa-star"></i> ${rating}</span>
        </div>
      </div>
      <div class="course-content">
        <h3>${course.title}</h3>
        <p class="course-description">${course.description.substring(0, 120)}...</p>
        <div class="course-stats">
          <span><i class="fas fa-users"></i> ${enrolledCount.toLocaleString()} enrolled</span>
          <span><i class="fas fa-book-open"></i> ${lessons} lessons</span>
        </div>
        <div class="course-details">
          <div class="course-info-item">
            <i class="fas fa-clock"></i>
            <span>${course.duration || '4 weeks'}</span>
          </div>
          <div class="course-info-item">
            <i class="fas fa-signal"></i>
            <span>${course.level || course.category}</span>
          </div>
        </div>
        <button class="enroll-btn" onclick="event.stopPropagation(); enrollCourse('${course.id}')">
          <i class="fas fa-check-circle"></i> Enroll Now
        </button>
      </div>
    </div>
  `;
  }).join('');
}

// ============ FILTER COURSES ============
function filterCourses(category) {
  currentFilter = category;
  
  // Update active button
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');
  
  // Filter courses
  const filtered = category === 'All' 
    ? allCourses 
    : allCourses.filter(course => course.category === category);
  
  displayCourses(filtered);
}

// ============ SEARCH COURSES ============
function setupSearchListener() {
  const searchInput = document.getElementById('search-input');
  let searchTimeout;
  
  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      searchCourses(e.target.value);
    }, 300);
  });
}

async function searchCourses(keyword) {
  if (!keyword.trim()) {
    filterCourses(currentFilter);
    return;
  }
  
  try {
    const results = await CoursesAPI.searchCourses(keyword);
    
    // Apply current filter if not 'All'
    const filtered = currentFilter === 'All' 
      ? results 
      : results.filter(course => course.category === currentFilter);
    
    displayCourses(filtered);
    
  } catch (error) {
    console.error('Error searching courses:', error);
    showNotification('Search failed. Please try again.', 'error');
  }
}

// ============ SHOW COURSE DETAIL ============
async function showCourseDetail(courseId) {
  const modal = document.getElementById('course-modal');
  const detailContainer = document.getElementById('course-detail');
  
  modal.style.display = 'block';
  detailContainer.innerHTML = '<div class="loading"><div class="spinner-large"></div><p>Loading...</p></div>';
  
  try {
    const course = await CoursesAPI.getCourseById(courseId);
    
    detailContainer.innerHTML = `
      <div class="course-detail-header">
        <img src="${course.imageUrl || getDefaultImage(course.category)}" alt="${course.title}">
        <div class="course-detail-info">
          <h2>${course.title}</h2>
          <p><i class="fas fa-tag"></i> ${course.category} Level</p>
        </div>
      </div>
      
      <div class="course-detail-body">
        <h3><i class="fas fa-info-circle"></i> Course Overview</h3>
        <p>${course.description}</p>
        
        <h3><i class="fas fa-list"></i> What You'll Learn</h3>
        <ul>
          <li><i class="fas fa-check"></i> Comprehensive understanding of ${course.category.toLowerCase()} level concepts</li>
          <li><i class="fas fa-check"></i> Practical strategies and real-world examples</li>
          <li><i class="fas fa-check"></i> Interactive exercises and assessments</li>
          <li><i class="fas fa-check"></i> Certificate upon completion</li>
        </ul>
        
        <h3><i class="fas fa-graduation-cap"></i> Course Details</h3>
        <ul>
          <li><i class="fas fa-clock"></i> Duration: ${course.duration || '4 weeks'}</li>
          <li><i class="fas fa-signal"></i> Level: ${course.category}</li>
          <li><i class="fas fa-globe"></i> Language: English</li>
          <li><i class="fas fa-certificate"></i> Certificate: Yes</li>
        </ul>
        
        <button class="enroll-btn" style="width: 100%; padding: 15px; font-size: 1.1rem;" onclick="enrollCourse('${course.id}')">
          <i class="fas fa-check-circle"></i> Enroll in This Course
        </button>
      </div>
    `;
    
  } catch (error) {
    console.error('Error loading course details:', error);
    detailContainer.innerHTML = `
      <div style="padding: 40px; text-align: center;">
        <i class="fas fa-exclamation-circle" style="font-size: 3rem; color: #ff6b6b;"></i>
        <h3 style="color: #432818; margin: 20px 0;">Error Loading Course</h3>
        <p style="color: #666;">${error.message}</p>
      </div>
    `;
  }
}

// ============ ENROLL IN COURSE ============
function enrollCourse(courseId) {
  showNotification('Enrollment feature coming soon! Course saved to your list.', 'success');
  closeModal();
}

// ============ MODAL FUNCTIONS ============
function closeModal() {
  document.getElementById('course-modal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
  const modal = document.getElementById('course-modal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
}

// ============ UTILITY FUNCTIONS ============
function getDefaultImage(category) {
  const images = {
    'Novice': 'https://img.freepik.com/free-vector/hand-drawn-flat-design-stock-market-concept_23-2149164676.jpg',
    'Investor': 'https://img.freepik.com/free-vector/investor-with-laptop-monitoring-growth-dividends-trader-sitting-stack-money-investing-capital-analyzing-profit-graphs-vector-illustration-finance-stock-trading-investment_74855-8432.jpg',
    'Trader': 'https://img.freepik.com/free-vector/stock-exchange-data-concept_23-2148590818.jpg'
  };
  return images[category] || images['Novice'];
}

function viewProfile() {
  alert('Profile page coming soon!');
}

function toggleUserMenu() {
  document.getElementById('user-dropdown').classList.toggle('show');
}

function logout() {
  if (confirm('Are you sure you want to logout?')) {
    TokenManager.logout();
  }
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  const userMenu = document.querySelector('.user-menu');
  if (userMenu && !userMenu.contains(e.target)) {
    document.getElementById('user-dropdown').classList.remove('show');
  }
});
