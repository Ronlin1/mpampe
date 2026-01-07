// Navigation Component for MpaMpe
// This creates a consistent navigation across all pages

function createNavigation(currentPage = '') {
    return `
    <header class="main-header-three">
        <div class="main-header-three__top">
            <div class="container">
                <div class="main-header-three__top-inner">
                    <div class="main-header-three__top-icon-box">
                        <div class="main-header-three__top-icon">
                            <span class="icon-shield"></span>
                        </div>
                        <p class="main-header-three__top-icon-text">
                            Explore active campaigns today.
                            <a href="campaigns.html">View All <i class="icon-arrow-right"></i></a>
                        </p>
                    </div>
                    <div class="main-header-three__contact">
                        <div class="main-header-three__contact-icon">
                            <span class="icon-headphone"></span>
                        </div>
                        <div class="main-header-three__contact-text">
                            <a href="tel:+256757163101"><span>Talk to Us:</span> (+256) 757 163 101</a>
                        </div>
                    </div>
                    <div class="main-header-three__search-box" id="auth-section">
                        <!-- Auth buttons will be inserted here -->
                    </div>
                </div>
            </div>
        </div>
        <nav class="main-menu main-menu-three">
            <div class="main-menu-three__wrapper">
                <div class="container">
                    <div class="main-menu-three__wrapper-inner">
                        <div class="main-menu-three__logo">
                            <a href="index.html"><img src="images/logo-1.png" alt="MpaMpe"></a>
                        </div>
                        <div class="main-menu-three__left">
                            <div class="main-menu-three__main-menu-box">
                                <a href="#" class="mobile-nav__toggler"><i class="fa fa-bars"></i></a>
                                <ul class="main-menu__list">
                                    <li class="${currentPage === 'home' ? 'current' : ''}">
                                        <a href="index.html">Home</a>
                                    </li>
                                    <li class="${currentPage === 'campaigns' ? 'current' : ''}">
                                        <a href="campaigns.html">Campaigns</a>
                                    </li>
                                    <li class="${currentPage === 'blog' ? 'current' : ''}">
                                        <a href="blog.html">Blog</a>
                                    </li>
                                    <li class="dropdown">
                                        <a href="#">About <i class="fa fa-angle-down"></i></a>
                                        <ul>
                                            <li><a href="team.html">Our Team</a></li>
                                            <li><a href="mavericks.html">Mavericks</a></li>
                                            <li><a href="awards.html">Awards</a></li>
                                            <li><a href="gallery.html">Gallery</a></li>
                                        </ul>
                                    </li>
                                    <li class="${currentPage === 'xmas' ? 'current' : ''}">
                                        <a href="xmas.html">Xmas Mission</a>
                                    </li>
                                    <li>
                                        <a href="#contact">Contact</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="main-menu-three__right">
                            <div class="main-menu-three__btn-box">
                                <a href="create-campaign.html" class="thm-btn main-menu-three__btn">Start Campaign</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </header>

    <div class="stricky-header stricked-menu main-menu main-menu-three">
        <div class="sticky-header__content"></div>
    </div>
    `;
}

function createFooter() {
    return `
    <footer class="site-footer-two">
        <div class="site-footer-two__shape-1 float-bob-x">
            <img src="images/footer-shape-1.png" alt="">
        </div>
        <div class="site-footer-two__top">
            <div class="container">
                <div class="site-footer-two__top-inner">
                    <div class="row">
                        <div class="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="100ms">
                            <div class="footer-widget__column footer-widget__about">
                                <div class="footer-widget__logo">
                                    <a href="index.html"><img src="images/logo-1.png" alt="MpaMpe"></a>
                                </div>
                                <p class="footer-widget__about-text">
                                    MpaMpe is Uganda's leading crowdfunding platform, empowering communities through transparent and accountable fundraising.
                                </p>
                                <div class="site-footer-two__social">
                                    <a href="https://twitter.com/mpampe" target="_blank"><i class="fab fa-twitter"></i></a>
                                    <a href="https://facebook.com/mpampe" target="_blank"><i class="fab fa-facebook"></i></a>
                                    <a href="https://instagram.com/mpampe" target="_blank"><i class="fab fa-instagram"></i></a>
                                    <a href="https://linkedin.com/company/mpampe" target="_blank"><i class="fab fa-linkedin"></i></a>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="200ms">
                            <div class="footer-widget__column footer-widget__links">
                                <div class="footer-widget__title-box">
                                    <h3 class="footer-widget__title">Quick Links</h3>
                                </div>
                                <ul class="footer-widget__links-list list-unstyled">
                                    <li><a href="index.html">Home</a></li>
                                    <li><a href="campaigns.html">Browse Campaigns</a></li>
                                    <li><a href="create-campaign.html">Start a Campaign</a></li>
                                    <li><a href="blog.html">Blog & Stories</a></li>
                                    <li><a href="xmas.html">Xmas Mission</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="300ms">
                            <div class="footer-widget__column footer-widget__links">
                                <div class="footer-widget__title-box">
                                    <h3 class="footer-widget__title">About Us</h3>
                                </div>
                                <ul class="footer-widget__links-list list-unstyled">
                                    <li><a href="team.html">Our Team</a></li>
                                    <li><a href="mavericks.html">MpaMpe Mavericks</a></li>
                                    <li><a href="awards.html">Awards & Recognition</a></li>
                                    <li><a href="gallery.html">Photo Gallery</a></li>
                                    <li><a href="terms.html">Terms & Conditions</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="400ms">
                            <div class="footer-widget__column footer-widget__newsletter">
                                <div class="footer-widget__title-box">
                                    <h3 class="footer-widget__title">Newsletter</h3>
                                </div>
                                <p class="footer-widget__newsletter-text">Subscribe to get updates on new campaigns</p>
                                <form class="footer-widget__newsletter-form" id="footer-newsletter-form">
                                    <div class="footer-widget__newsletter-input-box">
                                        <input type="email" placeholder="Email Address" name="email" required>
                                        <button type="submit" class="footer-widget__newsletter-btn">
                                            <i class="icon-paper-plane"></i>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="site-footer-two__bottom">
            <div class="container">
                <div class="site-footer-two__bottom-inner">
                    <p class="site-footer-two__bottom-text">© ${new Date().getFullYear()} MpaMpe. All Rights Reserved. | <a href="terms.html">Terms & Conditions</a></p>
                </div>
            </div>
        </div>
    </footer>
    `;
}

// Initialize navigation and footer
function initializeNavFooter(currentPage = '') {
    // Insert navigation if there's a nav-placeholder
    const navPlaceholder = document.getElementById('nav-placeholder');
    if (navPlaceholder) {
        navPlaceholder.innerHTML = createNavigation(currentPage);
    }
    
    // Insert footer if there's a footer-placeholder
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = createFooter();
    }
    
    // Add auth buttons
    updateAuthUI();
    
    // Initialize footer newsletter
    const footerForm = document.getElementById('footer-newsletter-form');
    if (footerForm) {
        footerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = footerForm.querySelector('input[name="email"]').value;
            
            if (typeof subscribeToNewsletter === 'function') {
                const result = await subscribeToNewsletter(email);
                if (result.success) {
                    alert('Thank you for subscribing!');
                    footerForm.reset();
                } else {
                    alert(result.error || 'Subscription failed. Please try again.');
                }
            }
        });
    }
}

// Update auth UI based on login status
function updateAuthUI() {
    const authSection = document.getElementById('auth-section');
    if (!authSection) return;
    
    const user = getCurrentUser();
    
    if (user) {
        authSection.innerHTML = `
            <div style="display: flex; align-items: center; gap: 15px;">
                <span style="color: #267369; font-weight: 600;">Welcome, ${user.user_metadata?.name || user.email}</span>
                ${user.user_metadata?.role === 'admin' ? '<a href="admin.html" class="thm-btn" style="padding: 8px 20px; font-size: 14px;">Admin</a>' : ''}
                <button onclick="handleLogout()" class="thm-btn" style="padding: 8px 20px; font-size: 14px; background: #ff6600;">Sign Out</button>
            </div>
        `;
    } else {
        authSection.innerHTML = `
            <button onclick="showSignInModal()" class="thm-btn" style="padding: 8px 20px; font-size: 14px;">Sign In</button>
        `;
    }
}

// Handle logout
async function handleLogout() {
    if (typeof supabase !== 'undefined') {
        await supabase.auth.signOut();
        window.location.reload();
    }
}
