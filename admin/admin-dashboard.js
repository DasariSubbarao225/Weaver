// Admin Dashboard Module

// API_BASE_URL is defined in admin-auth.js

// Default site configuration
const DEFAULT_SITE_CONFIG = {
    site: {
        name: "Weaver Interiors",
        tagline: "Transforming spaces, enriching lives.",
        description: "Weaver Interiors - Transform your space with exceptional interior design services"
    },
    hero: {
        title: "Transform Your Space",
        subtitle: "Expert interior design that brings your vision to life",
        buttonText: "Get Started",
        buttonLink: "#contact",
        backgroundImage: ""
    },
    about: {
        title: "About Us",
        paragraphs: [
            "Weaver Interiors is a premier interior design firm dedicated to creating beautiful, functional spaces that reflect your unique style and personality.",
            "With years of experience and a passion for design excellence, we transform ordinary spaces into extraordinary environments that inspire and delight."
        ],
        features: [
            { icon: "✨", title: "Creative Design", description: "Innovative solutions tailored to your needs" },
            { icon: "🎯", title: "Professional Service", description: "Expert guidance from concept to completion" },
            { icon: "💎", title: "Quality Materials", description: "Premium selections for lasting beauty" }
        ]
    },
    services: {
        title: "Our Services",
        items: [
            { id: 1, title: "Residential Design", description: "Complete home interior design services including living rooms, bedrooms, kitchens, and more." },
            { id: 2, title: "Commercial Spaces", description: "Professional office and retail space design that enhances productivity and customer experience." },
            { id: 3, title: "Space Planning", description: "Optimize your space layout for maximum functionality and aesthetic appeal." },
            { id: 4, title: "Color Consultation", description: "Expert color selection to create the perfect mood and atmosphere in your space." },
            { id: 5, title: "Furniture Selection", description: "Curated furniture choices that blend style, comfort, and durability." },
            { id: 6, title: "Project Management", description: "End-to-end project coordination ensuring timely and budget-friendly completion." }
        ]
    },
    portfolio: {
        title: "Our Portfolio",
        items: [
            { id: 1, title: "Modern Living Room", description: "Contemporary design with clean lines", image: "", gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", videoUrl: "" },
            { id: 2, title: "Luxury Bedroom", description: "Elegant and serene retreat", image: "", gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", videoUrl: "" },
            { id: 3, title: "Gourmet Kitchen", description: "Functional and stylish cooking space", image: "", gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", videoUrl: "" },
            { id: 4, title: "Office Space", description: "Productive work environment", image: "", gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)", videoUrl: "" },
            { id: 5, title: "Dining Area", description: "Perfect for entertaining guests", image: "", gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)", videoUrl: "" },
            { id: 6, title: "Bathroom Oasis", description: "Spa-like relaxation at home", image: "", gradient: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)", videoUrl: "" }
        ]
    },
    contact: {
        title: "Get In Touch",
        phone: "(555) 123-4567",
        email: "info@weaverinteriors.com",
        address: "123 Design Street, Creative City, ST 12345",
        businessHours: {
            title: "Business Hours",
            hours: [
                "Monday - Friday: 9:00 AM - 6:00 PM",
                "Saturday: 10:00 AM - 4:00 PM",
                "Sunday: Closed"
            ]
        }
    },
    media: {
        images: [],
        videos: []
    },
    settings: {
        primaryColor: "#667eea",
        secondaryColor: "#764ba2"
    }
};

// Get site configuration from backend API
async function getSiteConfig() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/content`);
        if (!response.ok) {
            throw new Error('Failed to fetch site config');
        }
        const data = await response.json();
        return data;
    } catch (e) {
        console.error('Error fetching site config:', e);
        showToast('Error loading configuration. Using defaults.', 'error');
        return DEFAULT_SITE_CONFIG;
    }
}

// Save site configuration to backend API
async function saveSiteConfig(config) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/content`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(config)
        });
        
        if (!response.ok) {
            throw new Error('Failed to save site config');
        }
        
        showToast('Configuration saved successfully!', 'success');
        return await response.json();
    } catch (e) {
        console.error('Error saving site config:', e);
        showToast('Error saving configuration. Please try again.', 'error');
        throw e;
    }
}

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    toast.className = `toast ${type} show`;
    
    setTimeout(() => {
        toast.className = 'toast';
    }, 3000);
}

// Generate unique ID
function generateId() {
    return Date.now() + Math.random().toString(36).substring(2, 9);
}

// Initialize dashboard
async function initDashboard() {
    if (!window.location.pathname.includes('dashboard.html')) return;
    
    const config = await getSiteConfig();
    
    // Update admin username display
    const adminUsernameDisplay = document.getElementById('adminUsername');
    if (adminUsernameDisplay) {
        adminUsernameDisplay.textContent = getSessionUsername();
    }
    
    // Update dashboard counters
    updateDashboardCounters(config);
    
    // Load content into forms
    loadContentForms(config);
    loadServices(config);
    loadPortfolio(config);
    loadMedia(config);
    loadSettings(config);
    
    // Initialize event listeners
    initNavigation();
    initContentTabs();
    initMediaTabs();
    initModals();
    initQuickActions();
    initSaveButtons();
    initExportImport();
}

// Update dashboard counters
function updateDashboardCounters(config) {
    document.getElementById('servicesCount').textContent = config.services?.items?.length || 0;
    document.getElementById('portfolioCount').textContent = config.portfolio?.items?.length || 0;
    document.getElementById('mediaCount').textContent = 
        (config.media?.images?.length || 0) + (config.media?.videos?.length || 0);
}

// Initialize navigation
function initNavigation() {
    const menuLinks = document.querySelectorAll('.menu-link');
    const sections = document.querySelectorAll('.admin-section');
    const pageTitle = document.getElementById('pageTitle');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update active menu link
            menuLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Show corresponding section
            const sectionId = link.dataset.section;
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === `${sectionId}Section`) {
                    section.classList.add('active');
                }
            });
            
            // Update page title
            pageTitle.textContent = link.textContent.replace(/^[^\s]+\s/, '');
            
            // Close sidebar on mobile
            const sidebar = document.getElementById('adminSidebar');
            if (window.innerWidth <= 992) {
                sidebar.classList.remove('active');
            }
        });
    });
    
    // Sidebar toggle
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('adminSidebar');
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }
    
    // Mobile sidebar toggle button in header
    const adminMain = document.getElementById('adminMain');
    if (adminMain && window.innerWidth <= 992) {
        const mobileToggle = document.createElement('button');
        mobileToggle.className = 'mobile-sidebar-toggle';
        mobileToggle.innerHTML = '☰';
        mobileToggle.addEventListener('click', () => sidebar.classList.toggle('active'));
        document.body.appendChild(mobileToggle);
    }
}

// Initialize content tabs
function initContentTabs() {
    const tabBtns = document.querySelectorAll('.content-tabs .tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            
            // Update active tab button
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Show corresponding tab content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(`${tabId}Tab`).classList.add('active');
        });
    });
}

// Initialize media tabs
function initMediaTabs() {
    const mediaTabBtns = document.querySelectorAll('.media-tabs .tab-btn');
    
    mediaTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.mediaTab;
            
            mediaTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            document.querySelectorAll('.media-tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(`${tabId}Tab`).classList.add('active');
        });
    });
}

// Load content into forms
function loadContentForms(config) {
    // Site Info
    document.getElementById('siteName').value = config.site?.name || '';
    document.getElementById('siteTagline').value = config.site?.tagline || '';
    document.getElementById('siteDescription').value = config.site?.description || '';
    
    // Hero
    document.getElementById('heroTitle').value = config.hero?.title || '';
    document.getElementById('heroSubtitle').value = config.hero?.subtitle || '';
    document.getElementById('heroButtonText').value = config.hero?.buttonText || '';
    document.getElementById('heroButtonLink').value = config.hero?.buttonLink || '';
    document.getElementById('heroBackgroundImage').value = config.hero?.backgroundImage || '';
    
    // About
    document.getElementById('aboutTitle').value = config.about?.title || '';
    document.getElementById('aboutParagraph1').value = config.about?.paragraphs?.[0] || '';
    document.getElementById('aboutParagraph2').value = config.about?.paragraphs?.[1] || '';
    
    // Load features
    loadFeatures(config.about?.features || []);
    
    // Contact
    document.getElementById('contactTitle').value = config.contact?.title || '';
    document.getElementById('contactPhone').value = config.contact?.phone || '';
    document.getElementById('contactEmail').value = config.contact?.email || '';
    document.getElementById('contactAddress').value = config.contact?.address || '';
    
    // Load business hours
    loadBusinessHours(config.contact?.businessHours?.hours || []);
}

// Load features editor
function loadFeatures(features) {
    const container = document.getElementById('aboutFeaturesContainer');
    container.innerHTML = '';
    
    features.forEach((feature, index) => {
        const featureItem = document.createElement('div');
        featureItem.className = 'feature-item';
        featureItem.innerHTML = `
            <div class="form-group">
                <label>Icon</label>
                <input type="text" class="feature-icon" value="${feature.icon || ''}" placeholder="✨">
            </div>
            <div class="form-group">
                <label>Title</label>
                <input type="text" class="feature-title" value="${feature.title || ''}" placeholder="Feature Title">
            </div>
            <div class="form-group">
                <label>Description</label>
                <input type="text" class="feature-desc" value="${feature.description || ''}" placeholder="Feature description">
            </div>
            <button type="button" class="btn-remove" data-index="${index}">🗑️</button>
        `;
        container.appendChild(featureItem);
    });
    
    // Add remove feature listeners
    container.querySelectorAll('.btn-remove').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.parentElement.remove();
        });
    });
}

// Add feature button handler
document.getElementById('addFeatureBtn')?.addEventListener('click', () => {
    const container = document.getElementById('aboutFeaturesContainer');
    const featureItem = document.createElement('div');
    featureItem.className = 'feature-item';
    featureItem.innerHTML = `
        <div class="form-group">
            <label>Icon</label>
            <input type="text" class="feature-icon" value="" placeholder="✨">
        </div>
        <div class="form-group">
            <label>Title</label>
            <input type="text" class="feature-title" value="" placeholder="Feature Title">
        </div>
        <div class="form-group">
            <label>Description</label>
            <input type="text" class="feature-desc" value="" placeholder="Feature description">
        </div>
        <button type="button" class="btn-remove">🗑️</button>
    `;
    container.appendChild(featureItem);
    
    featureItem.querySelector('.btn-remove').addEventListener('click', () => {
        featureItem.remove();
    });
});

// Load business hours
function loadBusinessHours(hours) {
    const container = document.getElementById('businessHoursContainer');
    container.innerHTML = '';
    
    hours.forEach((hour, index) => {
        const hourItem = document.createElement('div');
        hourItem.className = 'form-group';
        hourItem.innerHTML = `
            <div style="display: flex; gap: 10px; align-items: center;">
                <input type="text" class="business-hour" value="${hour}" style="flex: 1;">
                <button type="button" class="btn-remove" data-index="${index}">🗑️</button>
            </div>
        `;
        container.appendChild(hourItem);
        
        hourItem.querySelector('.btn-remove').addEventListener('click', () => {
            hourItem.remove();
        });
    });
    
    // Add button for adding new hours
    const addBtn = document.createElement('button');
    addBtn.type = 'button';
    addBtn.className = 'btn btn-add';
    addBtn.textContent = '➕ Add Hours';
    addBtn.addEventListener('click', () => {
        const hourItem = document.createElement('div');
        hourItem.className = 'form-group';
        hourItem.innerHTML = `
            <div style="display: flex; gap: 10px; align-items: center;">
                <input type="text" class="business-hour" value="" placeholder="Day: Hours" style="flex: 1;">
                <button type="button" class="btn-remove">🗑️</button>
            </div>
        `;
        container.insertBefore(hourItem, addBtn);
        
        hourItem.querySelector('.btn-remove').addEventListener('click', () => {
            hourItem.remove();
        });
    });
    container.appendChild(addBtn);
}

// Load services
function loadServices(config) {
    document.getElementById('servicesSectionTitle').value = config.services?.title || '';
    
    const container = document.getElementById('servicesContainer');
    container.innerHTML = '';
    
    (config.services?.items || []).forEach(service => {
        const card = createServiceCard(service);
        container.appendChild(card);
    });
}

// Create service card
function createServiceCard(service) {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.dataset.id = service.id;
    card.innerHTML = `
        <div class="item-card-content">
            <h3>${service.title}</h3>
            <p>${service.description}</p>
        </div>
        <div class="item-card-actions">
            <button class="btn-edit">✏️ Edit</button>
            <button class="btn-delete">🗑️ Delete</button>
        </div>
    `;
    
    card.querySelector('.btn-edit').addEventListener('click', () => editService(service));
    card.querySelector('.btn-delete').addEventListener('click', () => deleteService(service.id));
    
    return card;
}

// Add service button handler
document.getElementById('addServiceBtn')?.addEventListener('click', () => {
    openServiceModal();
});

// Open service modal
function openServiceModal(service = null) {
    const modal = document.getElementById('itemModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.textContent = service ? 'Edit Service' : 'Add Service';
    modalBody.innerHTML = `
        <div class="form-group">
            <label for="serviceTitle">Title</label>
            <input type="text" id="serviceTitle" value="${service?.title || ''}" placeholder="Service title">
        </div>
        <div class="form-group">
            <label for="serviceDescription">Description</label>
            <textarea id="serviceDescription" rows="4" placeholder="Service description">${service?.description || ''}</textarea>
        </div>
    `;
    
    modal.classList.add('active');
    modal.dataset.type = 'service';
    modal.dataset.editId = service?.id || '';
}

// Edit service
function editService(service) {
    openServiceModal(service);
}

// Delete service
async function deleteService(id) {
    if (confirm('Are you sure you want to delete this service?')) {
        const config = await getSiteConfig();
        config.services.items = config.services.items.filter(s => s.id !== id);
        await saveSiteConfig(config);
        loadServices(config);
        updateDashboardCounters(config);
    }
}

// Load portfolio
function loadPortfolio(config) {
    document.getElementById('portfolioSectionTitle').value = config.portfolio?.title || '';
    
    const container = document.getElementById('portfolioContainer');
    container.innerHTML = '';
    
    (config.portfolio?.items || []).forEach(item => {
        const card = createPortfolioCard(item);
        container.appendChild(card);
    });
}

// Create portfolio card
function createPortfolioCard(item) {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.dataset.id = item.id;
    
    const bgStyle = item.image 
        ? `background-image: url('${item.image}')`
        : `background: ${item.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}`;
    
    card.innerHTML = `
        <div class="item-card-image" style="${bgStyle}">
            ${item.videoUrl ? '<span class="video-indicator">🎬 Video</span>' : ''}
        </div>
        <div class="item-card-content">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
        </div>
        <div class="item-card-actions">
            <button class="btn-edit">✏️ Edit</button>
            <button class="btn-delete">🗑️ Delete</button>
        </div>
    `;
    
    card.querySelector('.btn-edit').addEventListener('click', () => editPortfolioItem(item));
    card.querySelector('.btn-delete').addEventListener('click', () => deletePortfolioItem(item.id));
    
    return card;
}

// Add portfolio button handler
document.getElementById('addPortfolioBtn')?.addEventListener('click', () => {
    openPortfolioModal();
});

// Open portfolio modal
function openPortfolioModal(item = null) {
    const modal = document.getElementById('itemModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.textContent = item ? 'Edit Portfolio Item' : 'Add Portfolio Item';
    modalBody.innerHTML = `
        <div class="form-group">
            <label for="portfolioTitle">Title</label>
            <input type="text" id="portfolioTitle" value="${item?.title || ''}" placeholder="Project title">
        </div>
        <div class="form-group">
            <label for="portfolioDescription">Description</label>
            <textarea id="portfolioDescription" rows="3" placeholder="Project description">${item?.description || ''}</textarea>
        </div>
        <div class="form-group">
            <label for="portfolioImage">Image URL</label>
            <input type="text" id="portfolioImage" value="${item?.image || ''}" placeholder="Image URL or leave empty for gradient">
        </div>
        <div class="form-group">
            <label for="portfolioGradient">Gradient (if no image)</label>
            <input type="text" id="portfolioGradient" value="${item?.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}" placeholder="CSS gradient">
        </div>
        <div class="form-group">
            <label for="portfolioVideo">Video URL (optional)</label>
            <input type="text" id="portfolioVideo" value="${item?.videoUrl || ''}" placeholder="YouTube or video URL">
        </div>
    `;
    
    modal.classList.add('active');
    modal.dataset.type = 'portfolio';
    modal.dataset.editId = item?.id || '';
}

// Edit portfolio item
function editPortfolioItem(item) {
    openPortfolioModal(item);
}

// Delete portfolio item
async function deletePortfolioItem(id) {
    if (confirm('Are you sure you want to delete this portfolio item?')) {
        const config = await getSiteConfig();
        config.portfolio.items = config.portfolio.items.filter(p => p.id !== id);
        await saveSiteConfig(config);
        loadPortfolio(config);
        updateDashboardCounters(config);
    }
}

// Load media
function loadMedia(config) {
    const imagesContainer = document.getElementById('imagesContainer');
    const videosContainer = document.getElementById('videosContainer');
    
    // Load images
    const images = config.media?.images || [];
    if (images.length > 0) {
        imagesContainer.innerHTML = '';
        images.forEach(image => {
            const item = createMediaItem(image, 'image');
            imagesContainer.appendChild(item);
        });
    }
    
    // Load videos
    const videos = config.media?.videos || [];
    if (videos.length > 0) {
        videosContainer.innerHTML = '';
        videos.forEach(video => {
            const item = createMediaItem(video, 'video');
            videosContainer.appendChild(item);
        });
    }
}

// HTML escape function to prevent XSS
function escapeHtmlAdmin(text) {
    if (text === null || text === undefined) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Create media item
function createMediaItem(media, type) {
    const item = document.createElement('div');
    item.className = 'media-item';
    item.dataset.id = media.id;
    
    const escapedUrl = escapeHtmlAdmin(media.url);
    const escapedName = escapeHtmlAdmin(media.name);
    const escapedId = escapeHtmlAdmin(media.id);
    
    if (type === 'image') {
        item.innerHTML = `
            <div class="media-item-preview" style="background-image: url('${escapedUrl}');"></div>
            <div class="media-item-info">
                <p>${escapedName || 'Image'}</p>
            </div>
            <div class="media-item-actions">
                <button class="btn-edit btn-copy-url">📋 Copy URL</button>
                <button class="btn-delete btn-delete-media" data-type="image">🗑️</button>
            </div>
        `;
    } else {
        item.innerHTML = `
            <div class="media-item-preview">🎬</div>
            <div class="media-item-info">
                <p>${escapedName || 'Video'}</p>
            </div>
            <div class="media-item-actions">
                <button class="btn-edit btn-copy-url">📋 Copy URL</button>
                <button class="btn-delete btn-delete-media" data-type="video">🗑️</button>
            </div>
        `;
    }
    
    // Add event listeners instead of inline handlers
    item.querySelector('.btn-copy-url').addEventListener('click', () => {
        copyToClipboard(media.url);
    });
    
    item.querySelector('.btn-delete-media').addEventListener('click', () => {
        deleteMedia(media.id, type);
    });
    
    return item;
}

// Copy to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('URL copied to clipboard!');
    }).catch(() => {
        showToast('Failed to copy URL', 'error');
    });
}

// Delete media
async function deleteMedia(id, type) {
    if (confirm('Are you sure you want to delete this media item?')) {
        const config = await getSiteConfig();
        if (type === 'image') {
            config.media.images = config.media.images.filter(m => m.id !== id);
        } else {
            config.media.videos = config.media.videos.filter(m => m.id !== id);
        }
        await saveSiteConfig(config);
        loadMedia(config);
        updateDashboardCounters(config);
    }
}

// Upload image button handler
document.getElementById('uploadImageBtn')?.addEventListener('click', () => {
    openMediaModal('image');
});

// Upload video button handler
document.getElementById('uploadVideoBtn')?.addEventListener('click', () => {
    openMediaModal('video');
});

// Open media modal
function openMediaModal(type) {
    const modal = document.getElementById('itemModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.textContent = type === 'image' ? 'Add Image' : 'Add Video';
    modalBody.innerHTML = `
        <div class="form-group">
            <label for="mediaName">Name</label>
            <input type="text" id="mediaName" placeholder="${type === 'image' ? 'Image name' : 'Video name'}">
        </div>
        <div class="form-group">
            <label for="mediaUrl">URL</label>
            <input type="text" id="mediaUrl" placeholder="${type === 'image' ? 'Image URL (https://...)' : 'Video URL (YouTube, Vimeo, etc.)'}">
        </div>
        ${type === 'image' ? `
        <div class="form-group">
            <label>Preview</label>
            <div id="imagePreview" style="height: 150px; background: #16213e; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #888;">
                Enter URL to preview
            </div>
        </div>
        ` : ''}
    `;
    
    // Image preview functionality
    if (type === 'image') {
        const urlInput = modalBody.querySelector('#mediaUrl');
        const preview = modalBody.querySelector('#imagePreview');
        
        urlInput.addEventListener('input', () => {
            const url = urlInput.value;
            if (url) {
                preview.style.backgroundImage = `url('${url}')`;
                preview.style.backgroundSize = 'cover';
                preview.style.backgroundPosition = 'center';
                preview.textContent = '';
            } else {
                preview.style.backgroundImage = '';
                preview.textContent = 'Enter URL to preview';
            }
        });
    }
    
    modal.classList.add('active');
    modal.dataset.type = type === 'image' ? 'media-image' : 'media-video';
}

// Load settings
function loadSettings(config) {
    const settings = config.settings || {};
    
    // Theme colors
    document.getElementById('primaryColor').value = settings.primaryColor || '#667eea';
    document.getElementById('primaryColorText').value = settings.primaryColor || '#667eea';
    document.getElementById('secondaryColor').value = settings.secondaryColor || '#764ba2';
    document.getElementById('secondaryColorText').value = settings.secondaryColor || '#764ba2';
    
    // Sync color inputs
    document.getElementById('primaryColor').addEventListener('input', (e) => {
        document.getElementById('primaryColorText').value = e.target.value;
    });
    document.getElementById('primaryColorText').addEventListener('input', (e) => {
        document.getElementById('primaryColor').value = e.target.value;
    });
    document.getElementById('secondaryColor').addEventListener('input', (e) => {
        document.getElementById('secondaryColorText').value = e.target.value;
    });
    document.getElementById('secondaryColorText').addEventListener('input', (e) => {
        document.getElementById('secondaryColor').value = e.target.value;
    });
    
    // Admin credentials
    const adminConfig = JSON.parse(localStorage.getItem('weaver_admin_config') || '{}');
    document.getElementById('adminUsername').value = adminConfig.admin?.username || 'admin';
}

// Initialize modals
function initModals() {
    const modal = document.getElementById('itemModal');
    const closeModal = document.getElementById('closeModal');
    const cancelModal = document.getElementById('cancelModal');
    const saveModal = document.getElementById('saveModal');
    
    closeModal?.addEventListener('click', () => modal.classList.remove('active'));
    cancelModal?.addEventListener('click', () => modal.classList.remove('active'));
    
    saveModal?.addEventListener('click', async () => {
        const type = modal.dataset.type;
        const editId = modal.dataset.editId;
        
        if (type === 'service') {
            await saveService(editId);
        } else if (type === 'portfolio') {
            await savePortfolioItem(editId);
        } else if (type === 'media-image' || type === 'media-video') {
            await saveMedia(type === 'media-image' ? 'image' : 'video');
        }
        
        modal.classList.remove('active');
    });
    
    // Close modal on outside click
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

// Save service
async function saveService(editId) {
    const title = document.getElementById('serviceTitle').value;
    const description = document.getElementById('serviceDescription').value;
    
    if (!title) {
        showToast('Please enter a title', 'error');
        return;
    }
    
    const config = await getSiteConfig();
    
    if (editId) {
        const index = config.services.items.findIndex(s => s.id == editId);
        if (index !== -1) {
            config.services.items[index] = { ...config.services.items[index], title, description };
        }
    } else {
        config.services.items.push({
            id: generateId(),
            title,
            description
        });
    }
    
    await saveSiteConfig(config);
    loadServices(config);
    updateDashboardCounters(config);
}

// Save portfolio item
async function savePortfolioItem(editId) {
    const title = document.getElementById('portfolioTitle').value;
    const description = document.getElementById('portfolioDescription').value;
    const image = document.getElementById('portfolioImage').value;
    const gradient = document.getElementById('portfolioGradient').value;
    const videoUrl = document.getElementById('portfolioVideo').value;
    
    if (!title) {
        showToast('Please enter a title', 'error');
        return;
    }
    
    const config = await getSiteConfig();
    
    const portfolioItem = {
        id: editId || generateId(),
        title,
        description,
        image,
        gradient,
        videoUrl
    };
    
    if (editId) {
        const index = config.portfolio.items.findIndex(p => p.id == editId);
        if (index !== -1) {
            config.portfolio.items[index] = portfolioItem;
        }
    } else {
        config.portfolio.items.push(portfolioItem);
    }
    
    await saveSiteConfig(config);
    loadPortfolio(config);
    updateDashboardCounters(config);
}

// Save media
async function saveMedia(type) {
    const name = document.getElementById('mediaName').value;
    const url = document.getElementById('mediaUrl').value;
    
    if (!url) {
        showToast('Please enter a URL', 'error');
        return;
    }
    
    const config = await getSiteConfig();
    
    const mediaItem = {
        id: generateId(),
        name: name || (type === 'image' ? 'Image' : 'Video'),
        url
    };
    
    if (type === 'image') {
        if (!config.media.images) config.media.images = [];
        config.media.images.push(mediaItem);
    } else {
        if (!config.media.videos) config.media.videos = [];
        config.media.videos.push(mediaItem);
    }
    
    await saveSiteConfig(config);
    loadMedia(config);
    updateDashboardCounters(config);
}

// Initialize quick actions
function initQuickActions() {
    document.querySelectorAll('.quick-action-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.dataset.action;
            const menuLink = document.querySelector(`.menu-link[data-section="${action}"]`);
            if (menuLink) {
                menuLink.click();
            }
            
            // Trigger specific action
            setTimeout(() => {
                if (action === 'services') {
                    document.getElementById('addServiceBtn')?.click();
                } else if (action === 'portfolio') {
                    document.getElementById('addPortfolioBtn')?.click();
                } else if (action === 'media') {
                    document.getElementById('uploadImageBtn')?.click();
                }
            }, 100);
        });
    });
}

// Initialize save buttons
function initSaveButtons() {
    // Save content button
    document.getElementById('saveContentBtn')?.addEventListener('click', async () => {
        const config = await getSiteConfig();
        
        // Site Info
        config.site.name = document.getElementById('siteName').value;
        config.site.tagline = document.getElementById('siteTagline').value;
        config.site.description = document.getElementById('siteDescription').value;
        
        // Hero
        config.hero.title = document.getElementById('heroTitle').value;
        config.hero.subtitle = document.getElementById('heroSubtitle').value;
        config.hero.buttonText = document.getElementById('heroButtonText').value;
        config.hero.buttonLink = document.getElementById('heroButtonLink').value;
        config.hero.backgroundImage = document.getElementById('heroBackgroundImage').value;
        
        // About
        config.about.title = document.getElementById('aboutTitle').value;
        config.about.paragraphs = [
            document.getElementById('aboutParagraph1').value,
            document.getElementById('aboutParagraph2').value
        ];
        
        // Features
        const features = [];
        document.querySelectorAll('.feature-item').forEach(item => {
            features.push({
                icon: item.querySelector('.feature-icon').value,
                title: item.querySelector('.feature-title').value,
                description: item.querySelector('.feature-desc').value
            });
        });
        config.about.features = features;
        
        // Contact
        config.contact.title = document.getElementById('contactTitle').value;
        config.contact.phone = document.getElementById('contactPhone').value;
        config.contact.email = document.getElementById('contactEmail').value;
        config.contact.address = document.getElementById('contactAddress').value;
        
        // Business hours
        const hours = [];
        document.querySelectorAll('.business-hour').forEach(input => {
            if (input.value) hours.push(input.value);
        });
        config.contact.businessHours.hours = hours;
        
        // Services section title
        config.services.title = document.getElementById('servicesSectionTitle').value;
        
        // Portfolio section title  
        config.portfolio.title = document.getElementById('portfolioSectionTitle').value;
        
        await saveSiteConfig(config);
    });
    
    // Save settings button
    document.getElementById('saveSettingsBtn')?.addEventListener('click', async () => {
        const config = await getSiteConfig();
        
        // Theme colors
        config.settings = config.settings || {};
        config.settings.primaryColor = document.getElementById('primaryColor').value;
        config.settings.secondaryColor = document.getElementById('secondaryColor').value;
        
        // Admin credentials
        const newUsername = document.getElementById('adminUsername').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (newPassword && newPassword !== confirmPassword) {
            showToast('Passwords do not match', 'error');
            return;
        }
        
        if (newUsername || newPassword) {
            await updateCredentials(newUsername, newPassword);
        }
        
        await saveSiteConfig(config);
    });
}

// Initialize export/import
function initExportImport() {
    // Export config
    document.getElementById('exportConfigBtn')?.addEventListener('click', async () => {
        const config = await getSiteConfig();
        const dataStr = JSON.stringify(config, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'weaver-config.json';
        link.click();
        
        URL.revokeObjectURL(url);
        showToast('Configuration exported!');
    });
    
    // Import config
    const importBtn = document.getElementById('importConfigBtn');
    const importFile = document.getElementById('importConfigFile');
    
    importBtn?.addEventListener('click', () => {
        importFile.click();
    });
    
    importFile?.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async (event) => {
                try {
                    const config = JSON.parse(event.target.result);
                    await saveSiteConfig(config);
                    showToast('Configuration imported successfully!');
                    
                    // Reload all sections
                    loadContentForms(config);
                    loadServices(config);
                    loadPortfolio(config);
                    loadMedia(config);
                    loadSettings(config);
                    updateDashboardCounters(config);
                } catch (error) {
                    showToast('Invalid configuration file', 'error');
                }
            };
            reader.readAsText(file);
        }
    });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', initDashboard);

// Make functions globally available
window.copyToClipboard = copyToClipboard;
window.deleteMedia = deleteMedia;
