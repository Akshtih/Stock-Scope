// ===============================================
// SUBSCRIPTION PAGE LOGIC
// ===============================================

// Check authentication
if (!TokenManager.isLoggedIn()) {
  window.location.href = 'auth.html';
}

const currentUser = TokenManager.getUser();

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  loadUserInfo();
});

// ============ LOAD USER INFO ============
function loadUserInfo() {
  // Just show "User" for all logged-in users
  document.getElementById('user-name').textContent = 'User';
}

// ============ BILLING TOGGLE ============
function toggleBilling() {
  const isYearly = document.getElementById('billing-toggle').checked;
  const amountElements = document.querySelectorAll('.amount');
  
  amountElements.forEach(element => {
    const monthly = element.getAttribute('data-monthly');
    const yearly = element.getAttribute('data-yearly');
    
    if (monthly && yearly) {
      element.textContent = isYearly ? yearly : monthly;
    }
  });
  
  // Update period text
  document.querySelectorAll('.period').forEach(element => {
    element.textContent = isYearly ? '/year' : '/month';
  });
}

// ============ SUBSCRIBE TO PLAN ============
async function subscribeToPlan(planType) {
  const isYearly = document.getElementById('billing-toggle').checked;
  
  const subscriptionData = {
    userId: currentUser.id,
    planType: planType,
    status: 'ACTIVE',
    startDate: new Date().toISOString(),
    endDate: getEndDate(isYearly),
    autoRenew: true
  };
  
  try {
    showLoader();
    
    // Create subscription
    const subscription = await SubscriptionsAPI.createSubscription(subscriptionData);
    
    hideLoader();
    
    // Show success message
    showNotification(`Successfully subscribed to ${planType} plan!`, 'success');
    
    // Show payment modal (mock)
    showPaymentModal(planType, isYearly);
    
  } catch (error) {
    hideLoader();
    console.error('Error subscribing:', error);
    showNotification(error.message || 'Subscription failed. Please try again.', 'error');
  }
}

// ============ GET END DATE ============
function getEndDate(isYearly) {
  const endDate = new Date();
  if (isYearly) {
    endDate.setFullYear(endDate.getFullYear() + 1);
  } else {
    endDate.setMonth(endDate.getMonth() + 1);
  }
  return endDate.toISOString();
}

// ============ SHOW PAYMENT MODAL ============
function showPaymentModal(planType, isYearly) {
  const prices = {
    'PREMIUM': { monthly: 499, yearly: 4790 },
    'PRO': { monthly: 999, yearly: 9590 }
  };
  
  const price = isYearly ? prices[planType].yearly : prices[planType].monthly;
  const period = isYearly ? 'year' : 'month';
  
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.style.display = 'block';
  modal.innerHTML = `
    <div class="modal-content" style="max-width: 500px;">
      <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
      <div style="padding: 40px; text-align: center;">
        <i class="fas fa-check-circle" style="font-size: 4rem; color: #51cf66; margin-bottom: 20px;"></i>
        <h2 style="color: #432818; margin-bottom: 15px;">Subscription Confirmed!</h2>
        <p style="color: #666; margin-bottom: 30px;">
          You have successfully subscribed to the <strong>${planType}</strong> plan.
        </p>
        
        <div style="background: #fff8e1; padding: 20px; border-radius: 15px; margin-bottom: 30px;">
          <h3 style="color: #d4a373; margin-bottom: 10px;">Payment Summary</h3>
          <div style="display: flex; justify-content: space-between; margin: 10px 0; color: #666;">
            <span>Plan:</span>
            <strong>${planType}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; margin: 10px 0; color: #666;">
            <span>Billing:</span>
            <strong>${isYearly ? 'Yearly' : 'Monthly'}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; margin: 20px 0 0; padding-top: 15px; border-top: 2px solid #ffe6a7; color: #432818; font-size: 1.3rem;">
            <strong>Total:</strong>
            <strong>₹${price}/${period}</strong>
          </div>
        </div>
        
        <button class="btn-primary" style="width: 100%; padding: 15px; font-size: 1.1rem;" 
                onclick="this.closest('.modal').remove(); window.location.href='dashboard.html'">
          <i class="fas fa-home"></i> Go to Dashboard
        </button>
        
        <p style="color: #999; font-size: 0.85rem; margin-top: 20px;">
          A confirmation email has been sent to ${currentUser.email}
        </p>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Close on outside click
  modal.onclick = function(event) {
    if (event.target === modal) {
      modal.remove();
    }
  };
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
