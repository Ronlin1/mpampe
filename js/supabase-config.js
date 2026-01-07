/**
 * MpaMpe Supabase Configuration
 * This file initializes the Supabase client for the MpaMpe crowdfunding platform
 */

// Supabase configuration
const SUPABASE_URL = 'https://dqjmswwygjtjcfybnpir.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxam1zd3d5Z2p0amNmeWJucGlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3NDM2NzQsImV4cCI6MjA4MzMxOTY3NH0.0ZfZwbPXw5kqvve943mPopDChLqjHVaSNAgfH6JDJ1Y';

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Authentication state management
let currentUser = null;

// Initialize auth state
async function initAuth() {
    try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
            currentUser = session.user;
            updateUIForAuthenticatedUser();
        } else {
            updateUIForAnonymousUser();
        }
    } catch (error) {
        console.error('Error initializing auth:', error);
    }
}

// Listen for auth changes
supabase.auth.onAuthStateChange((event, session) => {
    if (session) {
        currentUser = session.user;
        updateUIForAuthenticatedUser();
    } else {
        currentUser = null;
        updateUIForAnonymousUser();
    }
});

// Update UI based on auth state
function updateUIForAuthenticatedUser() {
    // Update navigation to show user profile
    const authButtons = document.querySelectorAll('.auth-button');
    authButtons.forEach(btn => {
        if (btn.textContent.includes('Sign In') || btn.textContent.includes('Sign Up')) {
            btn.style.display = 'none';
        }
    });
    
    // Show user menu if it exists
    const userMenu = document.getElementById('user-menu');
    if (userMenu) {
        userMenu.style.display = 'block';
    }
}

function updateUIForAnonymousUser() {
    // Show sign in/up buttons
    const authButtons = document.querySelectorAll('.auth-button');
    authButtons.forEach(btn => {
        btn.style.display = 'inline-block';
    });
    
    // Hide user menu
    const userMenu = document.getElementById('user-menu');
    if (userMenu) {
        userMenu.style.display = 'none';
    }
}

// Sign in with email
async function signInWithEmail(email, password) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });
        
        if (error) throw error;
        return { success: true, user: data.user };
    } catch (error) {
        console.error('Sign in error:', error);
        return { success: false, error: error.message };
    }
}

// Sign up with email
async function signUpWithEmail(email, password, fullName) {
    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    full_name: fullName
                }
            }
        });
        
        if (error) throw error;
        
        // Create user profile
        if (data.user) {
            await supabase.from('users').insert({
                id: data.user.id,
                email: email,
                full_name: fullName,
                role: 'user'
            });
        }
        
        return { success: true, user: data.user };
    } catch (error) {
        console.error('Sign up error:', error);
        return { success: false, error: error.message };
    }
}

// Sign in with Google
async function signInWithGoogle() {
    try {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin
            }
        });
        
        if (error) throw error;
        return { success: true };
    } catch (error) {
        console.error('Google sign in error:', error);
        return { success: false, error: error.message };
    }
}

// Sign out
async function signOut() {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        return { success: true };
    } catch (error) {
        console.error('Sign out error:', error);
        return { success: false, error: error.message };
    }
}

// Get current user
function getCurrentUser() {
    return currentUser;
}

// Check if user is admin
async function isAdmin() {
    if (!currentUser) return false;
    
    try {
        const { data, error } = await supabase
            .from('users')
            .select('role')
            .eq('id', currentUser.id)
            .single();
        
        if (error) throw error;
        return data.role === 'admin';
    } catch (error) {
        console.error('Error checking admin status:', error);
        return false;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initAuth);
