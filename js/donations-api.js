/**
 * MpaMpe Donations API
 * Functions for managing donations dynamically from Supabase
 */

// Create a donation
async function createDonation(donationData) {
    try {
        const user = getCurrentUser();
        
        const { data, error } = await supabase
            .from('donations')
            .insert({
                campaign_id: donationData.campaignId,
                donor_id: user ? user.id : null,
                amount: donationData.amount,
                tip_amount: donationData.tipAmount || 0,
                total_amount: parseFloat(donationData.amount) + parseFloat(donationData.tipAmount || 0),
                currency: donationData.currency || 'UGX',
                payment_method: donationData.paymentMethod,
                payment_status: 'pending',
                is_anonymous: donationData.isAnonymous || false,
                donor_name: donationData.donorName,
                donor_email: donationData.donorEmail,
                message: donationData.message
            })
            .select()
            .single();
        
        if (error) throw error;
        
        // Update campaign current amount
        await updateCampaignAmount(donationData.campaignId, donationData.amount);
        
        return { success: true, donation: data };
    } catch (error) {
        console.error('Error creating donation:', error);
        return { success: false, error: error.message };
    }
}

// Update campaign current amount
async function updateCampaignAmount(campaignId, amount) {
    try {
        // Get current campaign
        const { data: campaign, error: fetchError } = await supabase
            .from('campaigns')
            .select('current_amount')
            .eq('id', campaignId)
            .single();
        
        if (fetchError) throw fetchError;
        
        // Update with new amount
        const newAmount = parseFloat(campaign.current_amount) + parseFloat(amount);
        
        const { error: updateError } = await supabase
            .from('campaigns')
            .update({ current_amount: newAmount })
            .eq('id', campaignId);
        
        if (updateError) throw updateError;
        
        return { success: true };
    } catch (error) {
        console.error('Error updating campaign amount:', error);
        return { success: false, error: error.message };
    }
}

// Fetch donations for a campaign
async function fetchCampaignDonations(campaignId) {
    try {
        const { data, error } = await supabase
            .from('donations')
            .select('*')
            .eq('campaign_id', campaignId)
            .eq('payment_status', 'completed')
            .order('created_at', { ascending: false });
        
        if (error) throw error;
        return { success: true, donations: data };
    } catch (error) {
        console.error('Error fetching donations:', error);
        return { success: false, error: error.message };
    }
}

// Fetch user's donations
async function fetchUserDonations() {
    const user = getCurrentUser();
    if (!user) {
        return { success: false, error: 'You must be logged in' };
    }
    
    try {
        const { data, error } = await supabase
            .from('donations')
            .select(`
                *,
                campaign:campaigns(title, slug, featured_image)
            `)
            .eq('donor_id', user.id)
            .order('created_at', { ascending: false });
        
        if (error) throw error;
        return { success: true, donations: data };
    } catch (error) {
        console.error('Error fetching user donations:', error);
        return { success: false, error: error.message };
    }
}

// Show donation modal
function showDonationModal(campaignId, campaignTitle) {
    const modal = document.getElementById('donation-modal');
    if (!modal) {
        createDonationModal();
    }
    
    document.getElementById('donation-campaign-title').textContent = campaignTitle;
    document.getElementById('donation-campaign-id').value = campaignId;
    document.getElementById('donation-modal').style.display = 'flex';
}

// Hide donation modal
function hideDonationModal() {
    document.getElementById('donation-modal').style.display = 'none';
}

// Create donation modal HTML
function createDonationModal() {
    const modalHTML = `
        <div id="donation-modal" class="modal" style="display: none;">
            <div class="modal-content">
                <span class="close" onclick="hideDonationModal()">&times;</span>
                <h2>Support: <span id="donation-campaign-title"></span></h2>
                
                <form id="donation-form">
                    <input type="hidden" id="donation-campaign-id" name="campaignId">
                    
                    <div class="form-group">
                        <label>Donation Amount (UGX)</label>
                        <div class="amount-buttons">
                            <button type="button" class="amount-btn" data-amount="10000">10,000</button>
                            <button type="button" class="amount-btn" data-amount="50000">50,000</button>
                            <button type="button" class="amount-btn" data-amount="100000">100,000</button>
                            <button type="button" class="amount-btn" data-amount="500000">500,000</button>
                        </div>
                        <input type="number" id="donation-amount" name="amount" placeholder="Or enter custom amount" required>
                    </div>
                    
                    <div class="form-group">
                        <label>
                            <input type="checkbox" id="add-tip" name="addTip">
                            Add a tip to support MpaMpe platform
                        </label>
                        <div id="tip-options" style="display: none;">
                            <div class="tip-buttons">
                                <button type="button" class="tip-btn" data-tip="1000">1,000</button>
                                <button type="button" class="tip-btn" data-tip="2000">2,000</button>
                                <button type="button" class="tip-btn" data-tip="5000">5,000</button>
                            </div>
                            <input type="number" id="tip-amount" name="tipAmount" placeholder="Or enter custom tip">
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>
                            <input type="checkbox" id="donate-anonymously" name="isAnonymous">
                            Donate anonymously
                        </label>
                    </div>
                    
                    <div id="donor-info" class="form-group">
                        <input type="text" id="donor-name" name="donorName" placeholder="Your Name" required>
                        <input type="email" id="donor-email" name="donorEmail" placeholder="Your Email" required>
                    </div>
                    
                    <div class="form-group">
                        <textarea id="donation-message" name="message" placeholder="Leave a message (optional)" rows="3"></textarea>
                    </div>
                    
                    <div class="total-amount">
                        <strong>Total: <span id="total-display">0</span> UGX</strong>
                    </div>
                    
                    <button type="submit" class="btn-donate">Proceed to Payment</button>
                </form>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    initializeDonationForm();
}

// Initialize donation form interactions
function initializeDonationForm() {
    // Amount buttons
    document.querySelectorAll('.amount-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.getElementById('donation-amount').value = this.dataset.amount;
            updateTotal();
        });
    });
    
    // Tip checkbox
    document.getElementById('add-tip').addEventListener('change', function() {
        document.getElementById('tip-options').style.display = this.checked ? 'block' : 'none';
        updateTotal();
    });
    
    // Tip buttons
    document.querySelectorAll('.tip-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.getElementById('tip-amount').value = this.dataset.tip;
            updateTotal();
        });
    });
    
    // Anonymous checkbox
    document.getElementById('donate-anonymously').addEventListener('change', function() {
        const donorInfo = document.getElementById('donor-info');
        donorInfo.style.display = this.checked ? 'none' : 'block';
        if (this.checked) {
            document.getElementById('donor-name').removeAttribute('required');
            document.getElementById('donor-email').removeAttribute('required');
        } else {
            document.getElementById('donor-name').setAttribute('required', 'required');
            document.getElementById('donor-email').setAttribute('required', 'required');
        }
    });
    
    // Update total on amount/tip change
    document.getElementById('donation-amount').addEventListener('input', updateTotal);
    document.getElementById('tip-amount').addEventListener('input', updateTotal);
    
    // Form submission
    document.getElementById('donation-form').addEventListener('submit', handleDonationSubmit);
}

// Update total display
function updateTotal() {
    const amount = parseFloat(document.getElementById('donation-amount').value) || 0;
    const tip = document.getElementById('add-tip').checked ? 
        (parseFloat(document.getElementById('tip-amount').value) || 0) : 0;
    const total = amount + tip;
    document.getElementById('total-display').textContent = total.toLocaleString();
}

// Handle donation form submission
async function handleDonationSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const donationData = {
        campaignId: formData.get('campaignId'),
        amount: formData.get('amount'),
        tipAmount: formData.get('tipAmount') || 0,
        isAnonymous: formData.get('isAnonymous') === 'on',
        donorName: formData.get('donorName'),
        donorEmail: formData.get('donorEmail'),
        message: formData.get('message'),
        paymentMethod: 'pending', // Will be updated after payment gateway integration
        currency: 'UGX'
    };
    
    // Show loading
    Swal.fire({
        title: 'Processing...',
        text: 'Please wait while we process your donation',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
    
    const result = await createDonation(donationData);
    
    if (result.success) {
        Swal.fire({
            icon: 'success',
            title: 'Thank You!',
            text: 'Your donation has been recorded. Payment gateway integration coming soon!',
            confirmButtonText: 'OK'
        });
        hideDonationModal();
        e.target.reset();
        
        // Reload campaign data to show updated amount
        if (typeof loadCampaignDetail === 'function') {
            loadCampaignDetail();
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: result.error || 'Something went wrong. Please try again.'
        });
    }
}
