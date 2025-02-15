// Fetch API key from backend and load Google Maps
document.addEventListener("DOMContentLoaded", function () {
    fetch('/api/get-key')
        .then(response => response.json())
        .then(data => {
            if (!data.GOOGLE_MAPS_API_KEY) {
                console.error("Google Maps API key is missing.");
                return;
            }

            console.log("Google Maps API Key Loaded:", data.GOOGLE_MAPS_API_KEY);

            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=${data.GOOGLE_MAPS_API_KEY}&callback=initMap`;
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);
        })
        .catch(error => console.error("Error fetching API key:", error));
});

// Booking Functions
function navigateToBooking() {
    const bookingSection = document.querySelector('.booking-form-section');
    const overlay = document.querySelector('.overlay');

    if (!bookingSection || !overlay) {
        console.error('Booking section or overlay not found!');
        return;
    }

    overlay.style.display = 'block';
    bookingSection.style.display = 'block';
}

function closeBookingForm() {
    const bookingSection = document.querySelector('.booking-form-section');
    const overlay = document.querySelector('.overlay');

    if (!bookingSection || !overlay) {
        console.error('Booking section or overlay not found!');
        return;
    }

    overlay.style.display = 'none';
    bookingSection.style.display = 'none';
}

function handleSubmit(event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
    };

    if (!validateForm(formData)) {
        return;
    }

    alert('Thank you for your booking request! We will contact you shortly.');
    event.target.reset();
    closeBookingForm();
}

function validateForm(formData) {
    if (formData.name.length < 2) {
        alert('Please enter a valid name');
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        alert('Please enter a valid email address');
        return false;
    }

    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(formData.phone)) {
        alert('Please enter a valid phone number');
        return false;
    }

    return true;
}

// Service Form Functions
function handleServiceSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log('Form submitted:', Object.fromEntries(formData));
    alert('Thank you for your request! We will contact you shortly.');
    event.target.reset();
}

// Google Maps Initialization
function loadGoogleMaps() {
    if (typeof google === 'undefined' || !google.maps) {
        console.error("Google Maps API is not loaded. Retrying...");
        setTimeout(loadGoogleMaps, 500);
        return;
    }

    console.log("Google Maps API Loaded. Initializing Map...");

    window.initMap = function() {
        const mapElement = document.getElementById("service-area-map");

        if (!mapElement) {
            console.error("Map container not found!");
            return;
        }

        const map = new google.maps.Map(mapElement, {
            center: { lat: 29.7381, lng: -95.425 },
            zoom: 9.5,
        });

        console.log("Map initialized successfully.");
    };

    initMap();
}

window.addEventListener('load', loadGoogleMaps);

// Footer Insertion
function insertFooter() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (!footerPlaceholder) return;
    
    const footerHTML = `
        <footer class="footer">
            <div class="footer-container">
                <div class="footer-section">
                    <h4>Follow Us</h4>
                    <div class="footer-social">
                        <a href="https://www.yelp.com/biz/dupree-garage-doors-houston" target="_blank">
                            <img src="./yelp.png" alt="Yelp" class="footer-social-icon">
                        </a>
                        <a href="https://www.thumbtack.com/tx/houston/garage-door-repair/dupree-garage-doors/service/453154122070786060" target="_blank">
                            <img src="./tt.png" alt="Thumbtack" class="footer-social-icon">
                        </a>
                        <a href="https://www.facebook.com/profile.php?id=61561423146575" target="_blank">
                            <img src="./2021_Facebook_icon.svg.png" alt="Facebook" class="footer-social-icon">
                        </a>
                        <a href="https://www.homeadvisor.com/rated.ProLiftGarageDoorsof.124138330.html" target="_blank">
                            <img src="./al.png" alt="HomeAdvisor" class="footer-social-icon">
                        </a>
                    </div>
                </div>
                <div class="footer-section">
                    <h4>Services</h4>
                    <ul>
                        <li><a href="./new_repair.html">Residential</a></li>
                        <li><a href="./new_install.html">Commercial</a></li>
                        <li><a href="./new_repair.html">Emergency Service</a></li>
                        <li><a href="./storefront.html">Storefront</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Areas Served</h4>
                    <ul>
                        <li><a href="./houston.html">Houston</a></li>
                        <li><a href="./katy.html">Katy</a></li>
                        <li><a href="./sugar.html">Sugar Land</a></li>
                        <li><a href="./pearland.html">Pearland</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="./warranty.html">Warranty</a></li>
                        <li><a href="./new_repairs.html">Emergency Services</a></li>
                        <li><a href="./FAQs.html">FAQs</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Contact Us</h4>
                    <p>281-924-7000</p>
                    <p>bobby@dupreegaragedoors.com</p>
                    <p>3612 Mangum St, Suite 103</p>
                    <p>Houston, TX 77092</p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 Dupree Garage Doors. All Rights Reserved.</p>
            </div>
        </footer>
    `;
    footerPlaceholder.innerHTML = footerHTML;
}

// Navigation Initialization
let isInitialized = false;
function initializeNavigation() {
    if (isInitialized) return;

    let mobileBtn = document.querySelector('.garage-header__mobile-btn');
    const navList = document.querySelector('.garage-header__nav-list');
    
    if (mobileBtn && navList) {
        navList.style.display = window.innerWidth <= 1094 ? 'none' : 'flex';
        
        mobileBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (navList.style.display === 'none' || !navList.style.display) {
                navList.style.display = 'flex';
                mobileBtn.classList.add('active');
            } else {
                navList.style.display = 'none';
                mobileBtn.classList.remove('active');
            }
        });
        
        window.addEventListener('resize', function() {
            navList.style.display = window.innerWidth <= 1200 ? 'none' : 'flex';
        });
        
        isInitialized = true;
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        initializeNavigation();
        insertFooter();
        loadGoogleMaps();
    });
} else {
    initializeNavigation();
    insertFooter();
    loadGoogleMaps();
}

window.addEventListener('load', loadGoogleMaps);
