# WealthWise Financial Website

A modern, responsive financial services website built with vanilla HTML, CSS, and JavaScript that integrates with WordPress as a headless CMS.

## What This App Does

This app solves the challenge of creating a professional financial services website that combines the flexibility of custom development with the content management capabilities of WordPress. It addresses the common problem where financial advisors and firms need a high-performing, SEO-optimized website but also want non-technical team members to easily update content.

The solution provides a fast-loading, mobile-responsive website that can operate independently while seamlessly pulling dynamic content from WordPress when available. This hybrid approach ensures maximum uptime and performance - if WordPress goes down, the site continues to function with fallback content, maintaining professional credibility.

Key benefits:
- **Eliminates downtime concerns** - Site works even if WordPress is unavailable
- **Improves performance** - Static frontend loads faster than traditional WordPress themes
- **Maintains content flexibility** - Non-technical staff can update content via familiar WordPress interface
- **Reduces maintenance overhead** - Separates presentation from content management

This is a professional financial services website featuring:
- **Dynamic Hero Section** with compelling messaging and call-to-action
- **Services Showcase** displaying 6 key financial services with icons
- **About Section** with company information and professional imagery
- **Contact Form** with client-side validation and WordPress integration
- **Responsive Design** optimized for all devices
- **WordPress Integration** for dynamic content management
- **Fallback Content** ensures the site works even without WordPress

## Key Features

- **WordPress REST API Integration**: Dynamically fetches content from WordPress
- **Graceful Fallback**: Works offline with comprehensive default content
- **Responsive Design**: Mobile-first approach using CSS Grid and Flexbox
- **Modern Styling**: Gradient backgrounds, hover effects, and Font Awesome icons
- **Smooth Navigation**: Animated scrolling between sections
- **Clean Architecture**: Separated CSS, JavaScript, and HTML files

## Setup Instructions

### 1. Basic Setup
1. Clone or download the project files
2. Ensure all files maintain the directory structure
3. Open `index.html` in a web browser to view the site with fallback content

### 2. WordPress Integration Setup

#### Configure API URL
Edit the `WORDPRESS_API_URL` variable in `src/scripts/app.js`:
```javascript
// Replace with your WordPress site URL
const WORDPRESS_API_URL = 'https://your-wordpress-site.com/wp-json/wp/v2';

// For local development:
// const WORDPRESS_API_URL = 'http://localhost/your-site/wp-json/wp/v2';
```

#### Enable CORS (Required for API Access)
Add this code to your WordPress theme's `functions.php` file:
```php
function add_cors_http_header(){
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
}
add_action('init','add_cors_http_header');
```

### 3. WordPress Content Setup

#### Required Pages
Create the following pages in your WordPress admin:

1. **Home Page**
   - Title: Your main headline (e.g., "Your Financial Success Starts Here")
   - Slug: `home`
   - Content: Hero section description text

2. **About Page**
   - Title: About section heading (e.g., "About WealthWise Financial")
   - Slug: `about`
   - Content: Company description, team information, philosophy

#### Required Categories and Posts
1. **Create Services Category**
   - Go to Posts → Categories
   - Create a new category named "Services"

2. **Create Service Posts**
   Create individual posts for each service with the "Services" category:
   - Investment Planning
   - Retirement Planning
   - Tax Planning
   - Estate Planning
   - Insurance Planning
   - Financial Education
## WordPress API Endpoints Used

- **Pages**: `/wp-json/wp/v2/pages?slug={slug}` - Used for home and about page content
- **Posts**: `/wp-json/wp/v2/posts?categories={category_id}` - Used for services content
- **Contact Form**: `/wp-json/contact-form-7/v1/contact-forms/{id}/feedback` - Used for form submissions

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Icons**: Font Awesome 6.4.0
- **Images**: Unsplash (via CDN)
- **CMS**: WordPress REST API
- **Styling**: CSS Grid, Flexbox, Custom Properties
