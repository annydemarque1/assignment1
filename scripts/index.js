// Configure your WordPress site URL here
const WORDPRESS_API_URL = 'https://your-wordpress-site.com/wp-json/wp/v2';

const wp = new WordPressIntegration(WORDPRESS_API_URL);
async function loadContent() {
  console.log('Loading content from WordPress...');

  try {
    let hasWordPressContent = false;

    // Try to load homepage content
    const homepage = await wp.fetchPage('home');
    if (homepage && homepage.title && homepage.title.rendered) {
      document.getElementById('hero-title').textContent = homepage.title.rendered;
      document.getElementById('hero-description').textContent = wp.stripHtml(homepage.content.rendered);
      hasWordPressContent = true;
    }
    const services = await wp.fetchPosts('services');
    if (services && services.length > 0) {
      loadServices(services);
      hasWordPressContent = true;
      console.log('Loaded services content from WordPress');
    }

    // Try to load about page content
    const aboutPage = await wp.fetchPage('about');
    if (aboutPage && aboutPage.title && aboutPage.title.rendered) {
      document.getElementById('about-title').textContent = aboutPage.title.rendered;
      document.getElementById('about-content').innerHTML = aboutPage.content.rendered;
      hasWordPressContent = true;
      console.log('Loaded about content from WordPress');
    }

    // If no WordPress content was loaded, use fallback
    if (!hasWordPressContent) {
      console.log('No WordPress content available, using fallback content');
      // Fallback content is already in the HTML, so we don't need to do anything
    } else {
      console.log('WordPress content loaded successfully');
    }

  } catch (error) {
    console.error('Error loading content:', error);
    console.log('Using fallback content due to error');
    // Fallback content is already in the HTML
  }
}

function loadServices(services) {
  const servicesGrid = document.getElementById('services-grid');
  servicesGrid.innerHTML = '';

  services.forEach(service => {
    const serviceCard = document.createElement('div');
    serviceCard.className = 'service-card';
    serviceCard.innerHTML = `
            <h3>${service.title.rendered}</h3>
            <p>${wp.stripHtml(service.content.rendered)}</p>
        `;
    servicesGrid.appendChild(serviceCard);
  });
}
document.getElementById('contact-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = Object.fromEntries(formData);

  try {
    const response = await fetch(`${WORDPRESS_API_URL.replace('/wp/v2', '')}/contact-form-7/v1/contact-forms/1/feedback`, {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      alert('Message sent successfully!');
      this.reset();
    } else {
      throw new Error('Failed to send message');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('Thank you for your message! We have received your inquiry and will get back to you within 24 hours.');
    this.reset();
  }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM loaded, initializing content...');
  loadContent();
});
