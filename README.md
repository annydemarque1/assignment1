
# WealthWise Financial Website

A business website built with vanilla HTML, CSS, and JavaScript that integrates with WordPress as a headless CMS.

## App structure
This is financial services website featuring:
- **Hero section** with dynamic content from WordPress
- **Services showcase** displaying offerings from WordPress posts
- **About section** with company information from WordPress pages
- **Contact form** with WordPress integration
- **Responsive design** with smooth animations and modern styling

## Key Features

- **WordPress Integration**: Fetches content dynamically from WordPress REST API
- **Fallback Content**: Works offline with default content when WordPress is unavailable
- **Responsive Design**: Mobile-first approach with modern CSS Grid and Flexbox

## Setup

### 1. Configure WordPress API
Edit the `WORDPRESS_API_URL` variable in `index.html`:
```javascript
const WORDPRESS_API_URL = 'https://your-wordpress-site.com/wp-json/wp/v2';
```

### 2. Create WordPress Content
- **Home Page**: Create a page with slug `home` for hero content
- **About Page**: Create a page with slug `about` for company info
- **Services**: Create a category called "services" and add posts to it

### 3. Enable CORS (if needed)
Add to your WordPress `functions.php`:
```php
function add_cors_http_header(){
    header("Access-Control-Allow-Origin: *");
}
add_action('init','add_cors_http_header');
```

## WordPress Content Structure

- **Pages**: `/wp-json/wp/v2/pages?slug={slug}`
- **Posts**: `/wp-json/wp/v2/posts?categories={category_id}`
- **Contact**: `/wp-json/contact-form-7/v1/contact-forms/{id}/feedback`
