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
    if (typeof google === 'undefined') {
        setTimeout(loadGoogleMaps, 100);
        return;
    }

    function initMap() {
        const map = new google.maps.Map(document.getElementById("service-area-map"), {
            center: { lat: 29.7381, lng: -95.425 },
            zoom: 9.5,
        });

        const zipCodeData = [
            {
                zip: "77092",
                coords: [
                    { lat: 29.8501, lng: -95.4875 },
                    { lat: 29.8501, lng: -95.4475 },
                    { lat: 29.8101, lng: -95.4475 },
                    { lat: 29.8101, lng: -95.4875 },
                    { lat: 29.8501, lng: -95.4875 },
                ],
            },
            {
                zip: "77008",
                coords: [
                    { lat: 29.8101, lng: -95.4225 },
                    { lat: 29.8101, lng: -95.3825 },
                    { lat: 29.7701, lng: -95.3825 },
                    { lat: 29.7701, lng: -95.4225 },
                    { lat: 29.8101, lng: -95.4225 },
                ],
            },
            {
                zip: "77018",
                coords: [
                    { lat: 29.8466, lng: -95.4456 },
                    { lat: 29.8466, lng: -95.4056 },
                    { lat: 29.8066, lng: -95.4056 },
                    { lat: 29.8066, lng: -95.4456 },
                    { lat: 29.8466, lng: -95.4456 },
                ],
            },
            {
                zip: "77005",
                coords: [
                    { lat: 29.7165, lng: -95.4300 },
                    { lat: 29.7165, lng: -95.4000 },
                    { lat: 29.6865, lng: -95.4000 },
                    { lat: 29.6865, lng: -95.4300 },
                    { lat: 29.7165, lng: -95.4300 },
                ],
            },
            {
                zip: "77006",
                coords: [
                    { lat: 29.7520, lng: -95.4000 },
                    { lat: 29.7520, lng: -95.3700 },
                    { lat: 29.7220, lng: -95.3700 },
                    { lat: 29.7220, lng: -95.4000 },
                    { lat: 29.7520, lng: -95.4000 },
                ],
            },
            {
                zip: "77007",
                coords: [
                    { lat: 29.7700, lng: -95.4200 },
                    { lat: 29.7700, lng: -95.3800 },
                    { lat: 29.7400, lng: -95.3800 },
                    { lat: 29.7400, lng: -95.4200 },
                    { lat: 29.7700, lng: -95.4200 },
                ],
            },
            {
                zip: "77009",
                coords: [
                    { lat: 29.7900, lng: -95.3700 },
                    { lat: 29.7900, lng: -95.3300 },
                    { lat: 29.7600, lng: -95.3300 },
                    { lat: 29.7600, lng: -95.3700 },
                    { lat: 29.7900, lng: -95.3700 },
                ],
            },
            {
                zip: "77581",
                coords: [
                    { lat: 29.6000, lng: -95.3000 },
                    { lat: 29.6000, lng: -95.2600 },
                    { lat: 29.5600, lng: -95.2600 },
                    { lat: 29.5600, lng: -95.3000 },
                    { lat: 29.6000, lng: -95.3000 },
                ],
            },
            {
                zip: "77584",
                coords: [
                    { lat: 29.5800, lng: -95.3800 },
                    { lat: 29.5800, lng: -95.3400 },
                    { lat: 29.5400, lng: -95.3400 },
                    { lat: 29.5400, lng: -95.3800 },
                    { lat: 29.5800, lng: -95.3800 },
                ],
            },
        ];

        zipCodeData.forEach((zip) => {
            const polygon = new google.maps.Polygon({
                paths: zip.coords,
                strokeColor: "#000000",
                strokeOpacity: 0,
                strokeWeight: 0,
                fillColor: "#FFA500",
                fillOpacity: 0.35,
            });
            polygon.setMap(map);
        });
    }

    initMap();
}

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
                        <li><a href="./FAQs.html">Emergency Service</a></li>
                       
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

// Flag to prevent double initialization
let isInitialized = false;

function initializeNavigation() {
    if (isInitialized) {
        return;
    }

    let mobileBtn = document.querySelector('.garage-header__mobile-btn');
    const navList = document.querySelector('.garage-header__nav-list');
    
    console.log('Mobile button found:', mobileBtn);
    console.log('Nav list found:', navList);

    if (mobileBtn && navList) {
        // Reset the display style based on window width
        navList.style.display = window.innerWidth <= 1024 ? 'none' : 'flex';
        
        mobileBtn.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent any default button behavior
            console.log('Button clicked');
            
            // Toggle display and update button state
            if (navList.style.display === 'none' || !navList.style.display) {
                navList.style.display = 'flex';
                mobileBtn.classList.add('active');
            } else {
                navList.style.display = 'none';
                mobileBtn.classList.remove('active');
            }
        });

        // Handle window resize
        window.addEventListener('resize', function() {
            navList.style.display = window.innerWidth <= 1024 ? 'none' : 'flex';
        });

        isInitialized = true;
    }
}

// Single initialization point
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        initializeNavigation();
        insertFooter();
    });
} else {
    initializeNavigation();
    insertFooter();
}

// Keep Maps separate
window.addEventListener('load', loadGoogleMaps);