// ===============================================
// BLOGS PAGE LOGIC
// ===============================================

// Check authentication
if (!TokenManager.isLoggedIn()) {
  window.location.href = 'auth.html';
}

let allBlogs = [];
let currentFilter = 'All';

// Initialize page
document.addEventListener('DOMContentLoaded', async () => {
  loadUserInfo();
  await loadBlogs();
  setupSearchListener();
});

// ============ LOAD USER INFO ============
function loadUserInfo() {
  // Just show "User" for all logged-in users
  document.getElementById('user-name').textContent = 'User';
}

// ============ LOAD BLOGS ============
async function loadBlogs() {
  const container = document.getElementById('blogs-container');
  
  try {
    allBlogs = await BlogsAPI.getAllBlogs();
    
    if (!allBlogs || allBlogs.length === 0) {
      container.innerHTML = `
        <div class="no-results">
          <i class="fas fa-newspaper"></i>
          <h3>No Blogs Available</h3>
          <p>Check back later for new articles</p>
        </div>
      `;
      return;
    }
    
    displayBlogs(allBlogs);
    
  } catch (error) {
    console.error('Error loading blogs:', error);
    container.innerHTML = `
      <div class="no-results">
        <i class="fas fa-exclamation-circle"></i>
        <h3>Error Loading Blogs</h3>
        <p>${error.message}</p>
      </div>
    `;
  }
}

// ============ DISPLAY BLOGS ============
function displayBlogs(blogs) {
  const container = document.getElementById('blogs-container');
  
  if (blogs.length === 0) {
    container.innerHTML = `
      <div class="no-results">
        <i class="fas fa-search"></i>
        <h3>No Blogs Found</h3>
        <p>Try adjusting your search or filter</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = blogs.map(blog => {
    const readTime = Math.floor(Math.random() * 8) + 3;
    const likes = Math.floor(Math.random() * 500) + 50;
    
    return `
    <div class="blog-card" onclick="showBlogDetail('${blog.id}')">
      <div class="blog-image">
        <img src="${blog.imageUrl || getDefaultImage()}" 
             alt="${blog.title}"
             onerror="this.src='${getDefaultImage()}'">
        <span class="blog-badge">${blog.category}</span>
        <div class="blog-image-overlay">
          <span class="read-time"><i class="fas fa-book-reader"></i> ${readTime} min read</span>
        </div>
      </div>
      <div class="blog-content">
        <div class="blog-meta-top">
          <span><i class="fas fa-clock"></i> ${formatDate(blog.createdAt)}</span>
          <span><i class="fas fa-eye"></i> ${getRandomViews()} views</span>
        </div>
        <h3>${blog.title}</h3>
        <p class="blog-excerpt">${blog.content.substring(0, 150)}...</p>
        <div class="blog-engagement">
          <span><i class="fas fa-heart"></i> ${likes}</span>
          <span><i class="fas fa-comment"></i> ${Math.floor(Math.random() * 50) + 5}</span>
          <span><i class="fas fa-share-alt"></i> Share</span>
        </div>
        <div class="blog-footer">
          <div class="blog-author">
            <div class="author-avatar">${getInitials(blog.author)}</div>
            <div class="author-info">
              <span class="author-name">${blog.author}</span>
              <span class="blog-date">${formatDate(blog.createdAt)}</span>
            </div>
          </div>
          <a href="#" class="read-more-btn" onclick="event.stopPropagation(); showBlogDetail('${blog.id}')">
            Read More <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  `;
  }).join('');
}

// ============ FILTER BLOGS ============
function filterBlogs(category) {
  currentFilter = category;
  
  // Update active button
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');
  
  // Filter blogs
  const filtered = category === 'All' 
    ? allBlogs 
    : allBlogs.filter(blog => blog.category === category);
  
  displayBlogs(filtered);
}

// ============ SEARCH BLOGS ============
function setupSearchListener() {
  const searchInput = document.getElementById('search-input');
  let searchTimeout;
  
  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      searchBlogs(e.target.value);
    }, 300);
  });
}

async function searchBlogs(keyword) {
  if (!keyword.trim()) {
    filterBlogs(currentFilter);
    return;
  }
  
  try {
    const results = await BlogsAPI.searchBlogs(keyword);
    
    // Apply current filter if not 'All'
    const filtered = currentFilter === 'All' 
      ? results 
      : results.filter(blog => blog.category === currentFilter);
    
    displayBlogs(filtered);
    
  } catch (error) {
    console.error('Error searching blogs:', error);
    showNotification('Search failed. Please try again.', 'error');
  }
}

// ============ SHOW BLOG DETAIL ============
async function showBlogDetail(blogId) {
  const modal = document.getElementById('blog-modal');
  const detailContainer = document.getElementById('blog-detail');
  
  modal.style.display = 'block';
  detailContainer.innerHTML = '<div class="loading"><div class="spinner-large"></div><p>Loading...</p></div>';
  
  try {
    const blog = await BlogsAPI.getBlogById(blogId);
    
    detailContainer.innerHTML = `
      <div class="blog-detail-header">
        <img src="${blog.imageUrl || getDefaultImage()}" alt="${blog.title}">
        <div class="blog-detail-overlay">
          <h1>${blog.title}</h1>
          <div class="blog-detail-meta">
            <span><i class="fas fa-user"></i> ${blog.author}</span>
            <span><i class="fas fa-calendar"></i> ${formatFullDate(blog.createdAt)}</span>
            <span><i class="fas fa-folder"></i> ${blog.category}</span>
          </div>
        </div>
      </div>
      
      <div class="blog-detail-body">
        ${formatBlogContent(blog.content)}
        
        <div class="blog-tags">
          <i class="fas fa-tags" style="color: #d4a373; margin-right: 10px;"></i>
          <span class="tag">${blog.category}</span>
          <span class="tag">Stock Market</span>
          <span class="tag">Finance</span>
        </div>
      </div>
    `;
    
  } catch (error) {
    console.error('Error loading blog details:', error);
    detailContainer.innerHTML = `
      <div style="padding: 40px; text-align: center;">
        <i class="fas fa-exclamation-circle" style="font-size: 3rem; color: #ff6b6b;"></i>
        <h3 style="color: #432818; margin: 20px 0;">Error Loading Blog</h3>
        <p style="color: #666;">${error.message}</p>
      </div>
    `;
  }
}

// ============ MODAL FUNCTIONS ============
function closeModal() {
  document.getElementById('blog-modal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
  const modal = document.getElementById('blog-modal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
}

// ============ UTILITY FUNCTIONS ============
function getDefaultImage() {
  const images = [
    'https://img.freepik.com/free-vector/stock-market-analysis-concept-illustration_114360-9109.jpg',
    'https://img.freepik.com/free-vector/business-analyst-analyzing-data-charts_23-2148384086.jpg',
    'https://img.freepik.com/free-vector/financial-data-concept-illustration_114360-4699.jpg',
    'https://img.freepik.com/free-vector/investment-data-concept-illustration_114360-7543.jpg'
  ];
  return images[Math.floor(Math.random() * images.length)];
}

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
}

function getRandomViews() {
  return Math.floor(Math.random() * 5000) + 500;
}

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

function formatFullDate(dateString) {
  if (!dateString) return new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function formatBlogContent(content) {
  // Split content into paragraphs and format
  const paragraphs = content.split('\n').filter(p => p.trim());
  
  if (paragraphs.length <= 1) {
    // If single paragraph, split by sentences
    const sentences = content.match(/[^.!?]+[.!?]+/g) || [content];
    return sentences.map((s, i) => {
      if (i === 0) return `<p><strong>${s.trim()}</strong></p>`;
      return `<p>${s.trim()}</p>`;
    }).join('');
  }
  
  return paragraphs.map((p, i) => `<p>${p}</p>`).join('');
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
