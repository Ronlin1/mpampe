/**
 * MpaMpe Homepage - Dynamic Campaigns Loader
 * Loads campaigns from Supabase and displays them in the carousel
 */

// Load campaigns when page is ready
document.addEventListener('DOMContentLoaded', async () => {
    await loadHomepageCampaigns();
});

async function loadHomepageCampaigns() {
    try {
        // Fetch active campaigns from Supabase
        const { data: campaigns, error } = await supabase
            .from('campaigns')
            .select('*')
            .eq('status', 'approved')
            .order('created_at', { ascending: false })
            .limit(6); // Show up to 6 campaigns on homepage
        
        if (error) {
            console.error('Error loading campaigns:', error);
            return; // Keep hardcoded campaigns if error
        }
        
        if (!campaigns || campaigns.length === 0) {
            console.log('No campaigns found, keeping default campaigns');
            return; // Keep hardcoded campaigns if none in database
        }
        
        // Find the carousel container
        const carousel = document.querySelector('.case-three__carousel');
        if (!carousel) {
            console.error('Carousel container not found');
            return;
        }
        
        // Generate campaign HTML
        const campaignsHTML = campaigns.map(campaign => generateCampaignHTML(campaign)).join('');
        
        // Replace carousel content
        carousel.innerHTML = campaignsHTML;
        
        // Reinitialize Owl Carousel if it exists
        if (typeof jQuery !== 'undefined' && jQuery.fn.owlCarousel) {
            jQuery('.case-three__carousel').owlCarousel('destroy');
            jQuery('.case-three__carousel').owlCarousel({
                loop: true,
                margin: 30,
                nav: true,
                dots: false,
                autoplay: true,
                autoplayTimeout: 5000,
                autoplayHoverPause: true,
                navText: ['<span class="icon-arrow-left"></span>', '<span class="icon-arrow-right"></span>'],
                responsive: {
                    0: { items: 1 },
                    768: { items: 1 },
                    992: { items: 2 },
                    1200: { items: 2 }
                }
            });
        }
        
    } catch (error) {
        console.error('Error in loadHomepageCampaigns:', error);
    }
}

function generateCampaignHTML(campaign) {
    // Calculate progress percentage
    const progress = campaign.goal_amount > 0 
        ? Math.min(100, Math.round((campaign.current_amount / campaign.goal_amount) * 100))
        : 0;
    
    // Format amounts
    const goalUSD = formatCurrency(campaign.goal_amount);
    const raisedUSD = formatCurrency(campaign.current_amount);
    const goalUGX = formatCurrency(campaign.goal_amount * 3700, 'UGX');
    const raisedUGX = formatCurrency(campaign.current_amount * 3700, 'UGX');
    
    // Calculate days remaining or elapsed
    const endDate = new Date(campaign.end_date);
    const now = new Date();
    const daysRemaining = Math.ceil((endDate - now) / (1000 * 60 * 60 * 24));
    const daysText = daysRemaining > 0 ? `${daysRemaining} Days Left` : 'Campaign Ended';
    
    // Get category name
    const categoryName = campaign.category_name || 'General';
    
    return `
        <div class="item">
            <div class="case-three__single">
                <div class="row">
                    <div class="col-xl-6 col-lg-6">
                        <div class="case-three__img-box">
                            <div class="case-three__img">
                                <img src="${campaign.image_url || 'images/case-3-1.png'}" alt="${campaign.title}">
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6">
                        <div class="case-three__content-box">
                            <div class="case-three__progress-box">
                                <h4 class="case-three__progress-goal">Goal: $${goalUSD} (${goalUGX})</h4>
                                <div class="case-three__progress-levels">
                                    <div class="progress-box">
                                        <div class="inner count-box">
                                            <div class="bar">
                                                <div class="bar-innner count-bar" data-percent="${progress}%">
                                                    <div class="skill-percent">
                                                        <span class="count-text" data-speed="3000" data-stop="${progress}">${progress}</span>
                                                        <span class="percent">%</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="case-three__raised-and-goal">
                                    <p class="case-three__raised">Raised: <span>$${raisedUSD}</span></p>
                                    <p class="case-three__goal">Goal: <span>$${goalUSD}</span></p>
                                </div>
                            </div>
                            <div class="case-three__content">
                                <p class="case-three__tag"><a href="campaign.html?slug=${campaign.slug}"># ${categoryName}</a></p>
                                <h3 class="case-three__title"><a href="campaign.html?slug=${campaign.slug}">${campaign.title}</a></h3>
                                <p class="case-three__text">${truncateText(campaign.description, 150)}</p>
                                <a href="campaign.html?slug=${campaign.slug}" class="case-three__btn">Learn More <span class="icon-arrow-right"></span></a>
                                <ul class="case-three__days-and-count list-unstyled">
                                    <li>
                                        <div class="icon">
                                            <span class="icon-calendar"></span>
                                        </div>
                                        <div class="content">
                                            <h3>Status</h3>
                                            <p>${daysText}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="icon">
                                            <span class="icon-back-in-time"></span>
                                        </div>
                                        <div class="content">
                                            <h3>Donors</h3>
                                            <p>${campaign.donor_count || 0} Supporters</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function formatCurrency(amount, currency = 'USD') {
    if (currency === 'UGX') {
        return new Intl.NumberFormat('en-UG', {
            style: 'decimal',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount) + ' UGX';
    }
    return new Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

function truncateText(text, maxLength) {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
}
