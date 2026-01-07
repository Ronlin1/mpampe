/**
 * MpaMpe Authentication Modal
 * Sign in and sign up modals matching existing design
 */

// Create authentication modals
function createAuthModals() {
    const modalsHTML = `
        <!-- Sign In Modal -->
        <div id="signin-modal" class="auth-modal" style="display: none;">
            <div class="auth-modal-content">
                <span class="close" onclick="hideSignInModal()">&times;</span>
                <div class="auth-modal-header">
                    <h2>Welcome Back to MpaMpe</h2>
                    <p>Sign in to continue supporting campaigns</p>
                </div>
                
                <form id="signin-form" class="auth-form">
                    <div class="form-group">
                        <label>Email Address</label>
                        <input type="email" id="signin-email" name="email" placeholder="your@email.com" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" id="signin-password" name="password" placeholder="Enter your password" required>
                    </div>
                    
                    <button type="submit" class="btn-auth btn-primary">Sign In</button>
                    
                    <div class="auth-divider">
                        <span>OR</span>
                    </div>
                    
                    <button type="button" class="btn-auth btn-google" onclick="handleGoogleSignIn()">
                        <i class="fab fa-google"></i> Continue with Google
                    </button>
                    
                    <div class="auth-footer">
                        <p>Don't have an account? <a href="#" onclick="showSignUpModal(); hideSignInModal(); return false;">Sign Up</a></p>
                    </div>
                </form>
            </div>
        </div>
        
        <!-- Sign Up Modal -->
        <div id="signup-modal" class="auth-modal" style="display: none;">
            <div class="auth-modal-content">
                <span class="close" onclick="hideSignUpModal()">&times;</span>
                <div class="auth-modal-header">
                    <h2>Join MpaMpe</h2>
                    <p>Create an account to start making a difference</p>
                </div>
                
                <form id="signup-form" class="auth-form">
                    <div class="form-group">
                        <label>Full Name</label>
                        <input type="text" id="signup-name" name="fullName" placeholder="John Doe" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Email Address</label>
                        <input type="email" id="signup-email" name="email" placeholder="your@email.com" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" id="signup-password" name="password" placeholder="Create a password (min 6 characters)" required minlength="6">
                    </div>
                    
                    <div class="form-group">
                        <label>Confirm Password</label>
                        <input type="password" id="signup-confirm-password" name="confirmPassword" placeholder="Confirm your password" required>
                    </div>
                    
                    <button type="submit" class="btn-auth btn-primary">Create Account</button>
                    
                    <div class="auth-divider">
                        <span>OR</span>
                    </div>
                    
                    <button type="button" class="btn-auth btn-google" onclick="handleGoogleSignIn()">
                        <i class="fab fa-google"></i> Sign up with Google
                    </button>
                    
                    <div class="auth-footer">
                        <p>Already have an account? <a href="#" onclick="showSignInModal(); hideSignUpModal(); return false;">Sign In</a></p>
                    </div>
                </form>
            </div>
        </div>
        
        <style>
            .auth-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
            }
            
            .auth-modal-content {
                background: white;
                padding: 40px;
                border-radius: 20px;
                max-width: 500px;
                width: 90%;
                position: relative;
                animation: slideIn 0.3s ease-out;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateY(-50px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            
            .auth-modal-content .close {
                position: absolute;
                top: 20px;
                right: 20px;
                font-size: 28px;
                font-weight: bold;
                color: #999;
                cursor: pointer;
                transition: color 0.3s;
            }
            
            .auth-modal-content .close:hover {
                color: #ff6600;
            }
            
            .auth-modal-header {
                text-align: center;
                margin-bottom: 30px;
            }
            
            .auth-modal-header h2 {
                font-size: 28px;
                color: #267369;
                margin-bottom: 10px;
                font-family: 'DM Sans', sans-serif;
            }
            
            .auth-modal-header p {
                color: #666;
                font-size: 16px;
            }
            
            .auth-form .form-group {
                margin-bottom: 20px;
            }
            
            .auth-form label {
                display: block;
                margin-bottom: 8px;
                color: #333;
                font-weight: 500;
                font-family: 'DM Sans', sans-serif;
            }
            
            .auth-form input {
                width: 100%;
                padding: 12px 15px;
                border: 2px solid #e0e0e0;
                border-radius: 10px;
                font-size: 16px;
                transition: border-color 0.3s;
                font-family: 'DM Sans', sans-serif;
            }
            
            .auth-form input:focus {
                outline: none;
                border-color: #ff6600;
            }
            
            .btn-auth {
                width: 100%;
                padding: 14px;
                border: none;
                border-radius: 10px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s;
                font-family: 'DM Sans', sans-serif;
            }
            
            .btn-auth.btn-primary {
                background: linear-gradient(135deg, #ff6600, #ffa415);
                color: white;
                margin-bottom: 15px;
            }
            
            .btn-auth.btn-primary:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(255, 102, 0, 0.3);
            }
            
            .btn-auth.btn-google {
                background: white;
                color: #333;
                border: 2px solid #e0e0e0;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
            }
            
            .btn-auth.btn-google:hover {
                border-color: #ff6600;
                color: #ff6600;
            }
            
            .auth-divider {
                text-align: center;
                margin: 20px 0;
                position: relative;
            }
            
            .auth-divider::before {
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                width: 100%;
                height: 1px;
                background: #e0e0e0;
            }
            
            .auth-divider span {
                background: white;
                padding: 0 15px;
                position: relative;
                color: #999;
                font-size: 14px;
            }
            
            .auth-footer {
                text-align: center;
                margin-top: 20px;
            }
            
            .auth-footer p {
                color: #666;
                font-size: 14px;
            }
            
            .auth-footer a {
                color: #ff6600;
                text-decoration: none;
                font-weight: 600;
            }
            
            .auth-footer a:hover {
                text-decoration: underline;
            }
        </style>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalsHTML);
    initializeAuthForms();
}

// Show/hide modals
function showSignInModal() {
    document.getElementById('signin-modal').style.display = 'flex';
}

function hideSignInModal() {
    document.getElementById('signin-modal').style.display = 'none';
}

function showSignUpModal() {
    document.getElementById('signup-modal').style.display = 'flex';
}

function hideSignUpModal() {
    document.getElementById('signup-modal').style.display = 'none';
}

// Initialize auth forms
function initializeAuthForms() {
    // Sign in form
    document.getElementById('signin-form').addEventListener('submit', handleSignIn);
    
    // Sign up form
    document.getElementById('signup-form').addEventListener('submit', handleSignUp);
}

// Handle sign in
async function handleSignIn(e) {
    e.preventDefault();
    
    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;
    
    Swal.fire({
        title: 'Signing in...',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
    
    const result = await signInWithEmail(email, password);
    
    if (result.success) {
        Swal.fire({
            icon: 'success',
            title: 'Welcome Back!',
            text: 'You have successfully signed in.',
            timer: 2000,
            showConfirmButton: false
        });
        hideSignInModal();
        document.getElementById('signin-form').reset();
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Sign In Failed',
            text: result.error || 'Invalid email or password. Please try again.'
        });
    }
}

// Handle sign up
async function handleSignUp(e) {
    e.preventDefault();
    
    const fullName = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    
    // Validate passwords match
    if (password !== confirmPassword) {
        Swal.fire({
            icon: 'error',
            title: 'Passwords Don\'t Match',
            text: 'Please make sure your passwords match.'
        });
        return;
    }
    
    Swal.fire({
        title: 'Creating account...',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
    
    const result = await signUpWithEmail(email, password, fullName);
    
    if (result.success) {
        Swal.fire({
            icon: 'success',
            title: 'Account Created!',
            text: 'Welcome to MpaMpe! Please check your email to verify your account.',
            timer: 3000,
            showConfirmButton: false
        });
        hideSignUpModal();
        document.getElementById('signup-form').reset();
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Sign Up Failed',
            text: result.error || 'Something went wrong. Please try again.'
        });
    }
}

// Handle Google sign in
async function handleGoogleSignIn() {
    const result = await signInWithGoogle();
    
    if (!result.success) {
        Swal.fire({
            icon: 'error',
            title: 'Google Sign In Failed',
            text: result.error || 'Something went wrong. Please try again.'
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    createAuthModals();
    
    // Add click handlers to existing auth buttons
    document.querySelectorAll('[data-auth="signin"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showSignInModal();
        });
    });
    
    document.querySelectorAll('[data-auth="signup"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showSignUpModal();
        });
    });
});
