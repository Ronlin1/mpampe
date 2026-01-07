/**
 * MpaMpe Campaigns API
 * Functions for managing campaigns dynamically from Supabase
 */

// Fetch all active campaigns
async function fetchActiveCampaigns() {
    try {
        const { data, error } = await supabase
            .from('campaigns')
            .select(`
                *,
                category:categories(name, slug, color),
                creator:users(full_name, email)
            `)
            .in('status', ['active', 'completed'])
            .order('created_at', { ascending: false });
        
        if (error) throw error;
        return { success: true, campaigns: data };
    } catch (error) {
        console.error('Error fetching campaigns:', error);
        return { success: false, error: error.message };
    }
}

// Fetch single campaign by slug
async function fetchCampaignBySlug(slug) {
    try {
        const { data, error } = await supabase
            .from('campaigns')
            .select(`
                *,
                category:categories(name, slug, color),
                creator:users(full_name, email),
                donations(amount, donor_name, is_anonymous, message, created_at)
            `)
            .eq('slug', slug)
            .single();
        
        if (error) throw error;
        
        // Increment view count
        await supabase
            .from('campaigns')
            .update({ view_count: data.view_count + 1 })
            .eq('id', data.id);
        
        return { success: true, campaign: data };
    } catch (error) {
        console.error('Error fetching campaign:', error);
        return { success: false, error: error.message };
    }
}

// Create new campaign
async function createCampaign(campaignData) {
    const user = getCurrentUser();
    if (!user) {
        return { success: false, error: 'You must be logged in to create a campaign' };
    }
    
    try {
        const { data, error } = await supabase
            .from('campaigns')
            .insert({
                creator_id: user.id,
                title: campaignData.title,
                slug: campaignData.slug || generateSlug(campaignData.title),
                short_description: campaignData.shortDescription,
                story: campaignData.story,
                goal_amount: campaignData.goalAmount,
                currency: campaignData.currency || 'UGX',
                category_id: campaignData.categoryId,
                featured_image: campaignData.featuredImage,
                beneficiary_name: campaignData.beneficiaryName,
                status: 'pending' // All campaigns start as pending for admin approval
            })
            .select()
            .single();
        
        if (error) throw error;
        return { success: true, campaign: data };
    } catch (error) {
        console.error('Error creating campaign:', error);
        return { success: false, error: error.message };
    }
}

// Fetch campaigns by category
async function fetchCampaignsByCategory(categorySlug) {
    try {
        const { data, error } = await supabase
            .from('campaigns')
            .select(`
                *,
                category:categories!inner(name, slug, color)
            `)
            .eq('category.slug', categorySlug)
            .in('status', ['active', 'completed'])
            .order('created_at', { ascending: false });
        
        if (error) throw error;
        return { success: true, campaigns: data };
    } catch (error) {
        console.error('Error fetching campaigns by category:', error);
        return { success: false, error: error.message };
    }
}

// Fetch user's campaigns
async function fetchUserCampaigns() {
    const user = getCurrentUser();
    if (!user) {
        return { success: false, error: 'You must be logged in' };
    }
    
    try {
        const { data, error } = await supabase
            .from('campaigns')
            .select(`
                *,
                category:categories(name, slug, color)
            `)
            .eq('creator_id', user.id)
            .order('created_at', { ascending: false });
        
        if (error) throw error;
        return { success: true, campaigns: data };
    } catch (error) {
        console.error('Error fetching user campaigns:', error);
        return { success: false, error: error.message };
    }
}

// Fetch all categories
async function fetchCategories() {
    try {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('name');
        
        if (error) throw error;
        return { success: true, categories: data };
    } catch (error) {
        console.error('Error fetching categories:', error);
        return { success: false, error: error.message };
    }
}

// Calculate campaign progress percentage
function calculateProgress(currentAmount, goalAmount) {
    if (!goalAmount || goalAmount === 0) return 0;
    const progress = (currentAmount / goalAmount) * 100;
    return Math.min(Math.round(progress), 100);
}

// Format currency
function formatCurrency(amount, currency = 'UGX') {
    if (currency === 'UGX') {
        return `${Math.round(amount).toLocaleString()} UGX`;
    } else if (currency === 'USD') {
        return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    }
    return `${amount.toLocaleString()} ${currency}`;
}

// Generate slug from title
function generateSlug(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

// Render campaign card (preserving existing design)
function renderCampaignCard(campaign) {
    const progress = calculateProgress(campaign.current_amount, campaign.goal_amount);
    const statusBadge = campaign.status === 'completed' ? '100% Raised - COMPLETED' : 'ACTIVE';
    const statusClass = campaign.status === 'completed' ? 'completed' : 'active';
    
    return `
        <div class="campaign-card">
            <div class="campaign-image">
                <img src="${campaign.featured_image || '/images/default-campaign.jpg'}" alt="${campaign.title}">
            </div>
            <div class="campaign-content">
                <h4>Goal: ${formatCurrency(campaign.goal_amount, campaign.currency)}</h4>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progress}%"></div>
                    <span class="progress-text">${progress} %</span>
                </div>
                <div class="status-badge ${statusClass}">${statusBadge}</div>
                <h3>
                    <a href="/campaign.html?slug=${campaign.slug}">
                        # ${campaign.category?.name || 'General'}
                    </a>
                </h3>
                <h2>
                    <a href="/campaign.html?slug=${campaign.slug}">${campaign.title}</a>
                </h2>
                <p>${campaign.short_description || campaign.story.substring(0, 150) + '...'}</p>
                <a href="/campaign.html?slug=${campaign.slug}" class="btn-read-more">Read More</a>
            </div>
        </div>
    `;
}

// Load and display campaigns on homepage
async function loadHomepageCampaigns() {
    const campaignsContainer = document.getElementById('campaigns-container');
    if (!campaignsContainer) return;
    
    // Show loading state
    campaignsContainer.innerHTML = '<div class="loading">Loading campaigns...</div>';
    
    const result = await fetchActiveCampaigns();
    
    if (result.success && result.campaigns.length > 0) {
        campaignsContainer.innerHTML = result.campaigns
            .slice(0, 6) // Show first 6 campaigns
            .map(campaign => renderCampaignCard(campaign))
            .join('');
    } else {
        campaignsContainer.innerHTML = '<div class="no-campaigns">No active campaigns at the moment. Check back soon!</div>';
    }
}

// Initialize campaigns on page load
document.addEventListener('DOMContentLoaded', () => {
    // Load campaigns if on homepage
    if (document.getElementById('campaigns-container')) {
        loadHomepageCampaigns();
    }
});
