// ===============================================
// DASHBOARD LOGIC
// ===============================================

// Check authentication
if (!TokenManager.isLoggedIn()) {
  window.location.href = 'auth.html';
}

const currentUser = TokenManager.getUser();

// Initialize dashboard
document.addEventListener('DOMContentLoaded', async () => {
  loadUserInfo();
  await loadMyCourses();
  await loadRecentBlogs();
  await loadWordOfTheDay();
});

// ============ LOAD USER INFO ============
function loadUserInfo() {
  // Just show "User" for all logged-in users
  document.getElementById('user-name').textContent = 'User';
  document.getElementById('dashboard-user-name').textContent = 'User';
}

// ============ LOAD COURSES ============
async function loadMyCourses() {
  const container = document.getElementById('my-courses-container');
  
  try {
    const courses = await CoursesAPI.getAllCourses();
    
    if (!courses || courses.length === 0) {
      container.innerHTML = '<p class="no-data">No courses available. <a href="courses.html">Browse courses</a></p>';
      return;
    }
    
    // Show first 3 courses
    const displayCourses = courses.slice(0, 3);
    
    container.innerHTML = displayCourses.map(course => {
      const progress = Math.floor(Math.random() * 100);
      const rating = (4.0 + Math.random() * 1).toFixed(1);
      
      return `
      <div class="course-item" onclick="viewCourse('${course.id}')">
        <div class="course-img">
          <img src="${course.imageUrl || getCourseImage(course.category)}" 
               alt="${course.title}"
               onerror="this.src='${getCourseImage(course.category)}'">
          <div class="course-progress-overlay">
            <div class="progress-circle">
              <span>${progress}%</span>
            </div>
          </div>
        </div>
        <div class="course-info">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span class="course-category">${course.category}</span>
            <span class="course-rating-small"><i class="fas fa-star"></i> ${rating}</span>
          </div>
          <h3>${course.title}</h3>
          <p>${course.description.substring(0, 100)}...</p>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${progress}%"></div>
          </div>
          <div class="course-meta">
            <span class="course-duration">
              <i class="fas fa-clock"></i> ${course.duration || '4 weeks'}
            </span>
            <a href="#" class="btn-outline" onclick="event.stopPropagation(); viewCourse('${course.id}')">
              Continue
            </a>
          </div>
        </div>
      </div>
    `;
    }).join('');
    
  } catch (error) {
    console.error('Error loading courses:', error);
    container.innerHTML = '<p class="error-message">Failed to load courses. Please try again later.</p>';
  }
}

// ============ LOAD BLOGS ============
async function loadRecentBlogs() {
  const container = document.getElementById('recent-blogs-container');
  
  try {
    const blogs = await BlogsAPI.getAllBlogs();
    
    if (!blogs || blogs.length === 0) {
      container.innerHTML = '<p class="no-data">No blogs available.</p>';
      return;
    }
    
    // Show first 3 blogs
    const displayBlogs = blogs.slice(0, 3);
    
    container.innerHTML = displayBlogs.map(blog => `
      <div class="blog-item" onclick="viewBlog('${blog.id}')">
        <div class="blog-img">
          <img src="${blog.imageUrl || 'https://static.vecteezy.com/system/resources/previews/003/042/125/original/content-writer-or-blogger-start-new-blog-writing-article-online-vector.jpg'}" 
               alt="${blog.title}"
               onerror="this.src='https://static.vecteezy.com/system/resources/previews/003/042/125/original/content-writer-or-blogger-start-new-blog-writing-article-online-vector.jpg'">
        </div>
        <div class="blog-info">
          <span class="blog-category">${blog.category}</span>
          <h3>${blog.title}</h3>
          <p>${blog.content.substring(0, 120)}...</p>
          <div class="blog-meta">
            <span><i class="fas fa-user"></i> ${blog.author}</span>
            <span><i class="fas fa-clock"></i> ${formatDate(blog.createdAt)}</span>
          </div>
        </div>
      </div>
    `).join('');
    
  } catch (error) {
    console.error('Error loading blogs:', error);
    container.innerHTML = '<p class="error-message">Failed to load blogs.</p>';
  }
}

// ============ WORD OF THE DAY ============
async function loadWordOfTheDay() {
  try {
    const terms = await DictionaryAPI.getAllTerms();
    
    if (terms && terms.length > 0) {
      // Get random term as "word of the day"
      const randomTerm = terms[Math.floor(Math.random() * terms.length)];
      
      document.getElementById('word-term').textContent = randomTerm.termName;
      document.getElementById('word-definition').textContent = randomTerm.definition;
    }
    
  } catch (error) {
    console.error('Error loading word of the day:', error);
    document.getElementById('word-content').innerHTML = `
      <p>Unable to load today's term. <a href="dictionary.html" style="color: white; text-decoration: underline;">Visit dictionary</a></p>
    `;
  }
}

// ============ NAVIGATION FUNCTIONS ============
function viewCourse(courseId) {
  window.location.href = `courses.html?id=${courseId}`;
}

function viewBlog(blogId) {
  window.location.href = `blogs.html?id=${blogId}`;
}

function viewProfile() {
  showNotification('Profile page coming soon!', 'info');
}

function toggleUserMenu() {
  const dropdown = document.getElementById('user-dropdown');
  dropdown.classList.toggle('show');
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

// ============ UTILITY FUNCTIONS ============
function formatDate(dateString) {
  if (!dateString) return 'Recently';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return `${Math.floor(diffDays / 30)} months ago`;
}

function getCourseImage(category) {
  const images = {
    'Novice': 'https://img.freepik.com/free-vector/hand-drawn-flat-design-stock-market-concept_23-2149164676.jpg',
    'Investor': 'https://img.freepik.com/free-vector/investor-with-laptop-monitoring-growth-dividends-trader-sitting-stack-money-investing-capital-analyzing-profit-graphs-vector-illustration-finance-stock-trading-investment_74855-8432.jpg',
    'Trader': 'https://img.freepik.com/free-vector/stock-exchange-data-concept_23-2148590818.jpg'
  };
  return images[category] || images['Novice'];
}
