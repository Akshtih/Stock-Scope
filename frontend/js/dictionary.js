// ===============================================
// DICTIONARY PAGE LOGIC
// ===============================================

// Check authentication
if (!TokenManager.isLoggedIn()) {
  window.location.href = 'auth.html';
}

let allTerms = [];
let currentLetter = null;

// Initialize page
document.addEventListener('DOMContentLoaded', async () => {
  loadUserInfo();
  createAlphabetFilter();
  await loadTerms();
});

// ============ LOAD USER INFO ============
function loadUserInfo() {
  // Just show "User" for all logged-in users
  document.getElementById('user-name').textContent = 'User';
}

// ============ CREATE ALPHABET FILTER ============
function createAlphabetFilter() {
  const container = document.getElementById('alphabet-filter');
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  
  // Add "All" button
  const allBtn = document.createElement('button');
  allBtn.className = 'alphabet-btn active';
  allBtn.textContent = 'All';
  allBtn.onclick = () => filterByLetter(null);
  container.appendChild(allBtn);
  
  // Add alphabet buttons
  alphabet.forEach(letter => {
    const btn = document.createElement('button');
    btn.className = 'alphabet-btn';
    btn.textContent = letter;
    btn.onclick = () => filterByLetter(letter);
    container.appendChild(btn);
  });
}

// ============ LOAD TERMS ============
async function loadTerms() {
  const container = document.getElementById('terms-container');
  
  try {
    allTerms = await DictionaryAPI.getAllTerms();
    
    if (!allTerms || allTerms.length === 0) {
      container.innerHTML = `
        <div class="no-results">
          <i class="fas fa-book"></i>
          <h3>No Terms Available</h3>
          <p>Dictionary is being updated</p>
        </div>
      `;
      return;
    }
    
    displayTerms(allTerms);
    updateTermsCount(allTerms.length);
    updateAlphabetAvailability();
    
  } catch (error) {
    console.error('Error loading terms:', error);
    container.innerHTML = `
      <div class="no-results">
        <i class="fas fa-exclamation-circle"></i>
        <h3>Error Loading Dictionary</h3>
        <p>${error.message}</p>
      </div>
    `;
  }
}

// ============ DISPLAY TERMS ============
function displayTerms(terms) {
  const container = document.getElementById('terms-container');
  
  if (!terms || terms.length === 0) {
    container.innerHTML = `
      <div class="no-results">
        <i class="fas fa-search"></i>
        <h3>No Terms Found</h3>
        <p>Try searching for a different term</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = terms.map(term => {
    // Safely get term name and first letter
    const termName = term.termName || term.term || 'Unknown Term';
    const firstLetter = termName && termName.length > 0 ? termName[0].toUpperCase() : '?';
    const definition = term.definition || 'No definition available';
    const category = term.category || 'Financial Term';
    const termId = term.id || term._id || '';
    
    return `
    <div class="term-card" onclick="showTermDetail('${termId}')">
      <div class="term-header">
        <div>
          <h3 class="term-name">${termName}</h3>
          <span class="term-category">${category}</span>
        </div>
        <div class="term-letter">${firstLetter}</div>
      </div>
      <p class="term-definition">${definition}</p>
      <div class="term-footer">
        <span class="term-examples">
          <i class="fas fa-lightbulb"></i> ${term.example ? 'Example available' : 'Learn more'}
        </span>
        <a href="#" class="view-term-btn" onclick="event.stopPropagation(); showTermDetail('${termId}')">
          View Details <i class="fas fa-arrow-right"></i>
        </a>
      </div>
    </div>
  `;
  }).join('');
}

// ============ FILTER BY LETTER ============
function filterByLetter(letter) {
  currentLetter = letter;
  
  // Update active button
  document.querySelectorAll('.alphabet-btn').forEach(btn => {
    btn.classList.remove('active');
    if ((letter === null && btn.textContent === 'All') || btn.textContent === letter) {
      btn.classList.add('active');
    }
  });
  
  // Filter terms
  const filtered = letter === null 
    ? allTerms 
    : allTerms.filter(term => {
        const termName = term.termName || term.term || '';
        return termName.length > 0 && termName[0].toUpperCase() === letter;
      });
  
  displayTerms(filtered);
  updateTermsCount(filtered.length, letter);
}

// ============ UPDATE ALPHABET AVAILABILITY ============
function updateAlphabetAvailability() {
  const availableLetters = new Set(
    allTerms
      .filter(term => (term.termName || term.term) && (term.termName || term.term).length > 0)
      .map(term => {
        const termName = term.termName || term.term;
        return termName[0].toUpperCase();
      })
  );
  
  document.querySelectorAll('.alphabet-btn').forEach(btn => {
    const letter = btn.textContent;
    if (letter !== 'All' && !availableLetters.has(letter)) {
      btn.classList.add('disabled');
      btn.onclick = null;
    }
  });
}

// ============ SEARCH TERMS ============
function searchTerms() {
  const searchInput = document.getElementById('search-input');
  const keyword = searchInput.value.trim();
  
  if (!keyword) {
    filterByLetter(currentLetter);
    return;
  }
  
  performSearch(keyword);
}

async function performSearch(keyword) {
  const container = document.getElementById('terms-container');
  
  try {
    showLoader();
    const results = await DictionaryAPI.searchTerms(keyword);
    hideLoader();
    
    displayTerms(results);
    updateTermsCount(results.length, null, keyword);
    
  } catch (error) {
    hideLoader();
    console.error('Error searching terms:', error);
    showNotification('Search failed. Please try again.', 'error');
  }
}

// Setup search listener
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      searchTerms();
    }
  });
  
  // Live search with debounce
  let searchTimeout;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    if (e.target.value.trim()) {
      searchTimeout = setTimeout(() => {
        performSearch(e.target.value.trim());
      }, 500);
    } else {
      filterByLetter(currentLetter);
    }
  });
});

// ============ SHOW TERM DETAIL ============
async function showTermDetail(termId) {
  if (!termId) {
    console.error('No term ID provided');
    return;
  }
  
  const modal = document.getElementById('term-modal');
  const detailContainer = document.getElementById('term-detail');
  
  modal.style.display = 'block';
  detailContainer.innerHTML = '<div class="loading"><div class="spinner-large"></div><p>Loading...</p></div>';
  
  try {
    const term = await DictionaryAPI.getTermById(termId);
    
    const termName = term.termName || term.term || 'Unknown Term';
    const definition = term.definition || 'No definition available';
    const category = term.category || 'Financial Term';
    
    detailContainer.innerHTML = `
      <div class="term-detail-container">
        <div class="term-detail-header">
          <h2 class="term-detail-title">${termName}</h2>
          <span class="term-detail-category">${category}</span>
        </div>
        
        <div class="term-detail-body">
          <div class="term-detail-section">
            <h3><i class="fas fa-book-open"></i> Definition</h3>
            <p>${definition}</p>
          </div>
          
          ${term.example ? `
            <div class="term-detail-section">
              <h3><i class="fas fa-lightbulb"></i> Example</h3>
              <p><em>"${term.example}"</em></p>
            </div>
          ` : ''}
          
          <div class="term-detail-section">
            <h3><i class="fas fa-info-circle"></i> Key Points</h3>
            <ul>
              <li><i class="fas fa-check"></i> Essential concept in ${category}</li>
              <li><i class="fas fa-check"></i> Used frequently in stock market analysis</li>
              <li><i class="fas fa-check"></i> Important for investors and traders</li>
            </ul>
          </div>
          
          <div class="term-detail-section" style="text-align: center; margin-top: 40px;">
            <button class="btn-primary" style="padding: 12px 30px; font-size: 1.1rem;" onclick="closeModal()">
              Got it! <i class="fas fa-check"></i>
            </button>
          </div>
        </div>
      </div>
    `;
    
  } catch (error) {
    console.error('Error loading term details:', error);
    detailContainer.innerHTML = `
      <div style="padding: 40px; text-align: center;">
        <i class="fas fa-exclamation-circle" style="font-size: 3rem; color: #ff6b6b;"></i>
        <h3 style="color: #432818; margin: 20px 0;">Error Loading Term</h3>
        <p style="color: #666;">${error.message}</p>
      </div>
    `;
  }
}

// ============ UPDATE COUNTS ============
function updateTermsCount(count, letter = null, keyword = null) {
  const countElement = document.getElementById('terms-count');
  
  if (keyword) {
    countElement.textContent = `Found ${count} term${count !== 1 ? 's' : ''} for "${keyword}"`;
  } else if (letter) {
    countElement.textContent = `${count} term${count !== 1 ? 's' : ''} starting with "${letter}"`;
  } else {
    countElement.textContent = `${count} financial terms available`;
  }
}

// ============ MODAL FUNCTIONS ============
function closeModal() {
  document.getElementById('term-modal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
  const modal = document.getElementById('term-modal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
}

// ============ UTILITY FUNCTIONS ============
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
