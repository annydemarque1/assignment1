// WordPress API Integration Functions
class WordPressIntegration {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async fetchPage(slug) {
    try {
      const response = await fetch(`${this.apiUrl}/pages?slug=${slug}`);
      const pages = await response.json();
      return pages[0] || null;
    } catch (error) {
      console.error("Error fetching page:", error);
      return null;
    }
  }

  async fetchPosts(category = null) {
    try {
      let url = `${this.apiUrl}/posts`;
      if (category) {
        url += `?categories=${category}`;
      }
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.error("Error fetching posts:", error);
      return [];
    }
  }

  stripHtml(html) {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }
}

// Initialize WordPress integration
const wp = new WordPressIntegration(WORDPRESS_API_URL);

// Load content from WordPress
async function loadContent() {
  try {
    // Load homepage content
    const homepage = await wp.fetchPage("home");
    if (homepage) {
      document.getElementById("hero-title").textContent = homepage.title.rendered;
      document.getElementById("hero-description").textContent = wp.stripHtml(
        homepage.content.rendered
      );
    }

    // Load services from posts with category 'services'
    const services = await wp.fetchPosts("services");
    if (services.length > 0) {
      loadServices(services);
    }

    // Load about page content
    const aboutPage = await wp.fetchPage("about");
    if (aboutPage) {
      document.getElementById("about-title").textContent = aboutPage.title.rendered;
      document.getElementById("about-content").innerHTML = aboutPage.content.rendered;
    }

    // Remove loading states
    removeLoadingStates();
  } catch (error) {
    console.error("Error loading content:", error);
    loadFallbackContent();
  }
}

function loadServices(services) {
  const servicesGrid = document.getElementById("services-grid");
  servicesGrid.innerHTML = "";

  services.forEach((service) => {
    const serviceCard = document.createElement("div");
    serviceCard.className = "service-card";
    serviceCard.innerHTML = `
                    <h3>${service.title.rendered}</h3>
                    <p>${wp.stripHtml(service.content.rendered)}</p>
                `;
    servicesGrid.appendChild(serviceCard);
  });
}

function removeLoadingStates() {
  document.querySelectorAll(".skeleton").forEach((el) => {
    el.classList.remove("skeleton");
  });
}

function loadFallbackContent() {
  // Fallback content when WordPress is not available
  document.getElementById("hero-title").textContent = "Your Financial Success Starts Here";
  document.getElementById("hero-description").textContent =
    "Expert financial guidance tailored to your unique goals.";

  document.getElementById("services-grid").innerHTML = `
                <div class="service-card">
                    <h3>Investment Planning</h3>
                    <p>Build a diversified portfolio tailored to your risk tolerance and financial goals.</p>
                </div>
                <div class="service-card">
                    <h3>Retirement Planning</h3>
                    <p>Secure your golden years with comprehensive retirement strategies.</p>
                </div>
                <div class="service-card">
                    <h3>Tax Planning</h3>
                    <p>Minimize your tax burden with strategic planning and optimization.</p>
                </div>
            `;

  document.getElementById("about-content").innerHTML = `
                <p>We are a team of experienced financial advisors dedicated to helping you achieve your financial goals. With over 15 years of experience, we provide personalized strategies for wealth building and financial security.</p>
            `;

  removeLoadingStates();
}

// Contact form submission
document.getElementById("contact-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = Object.fromEntries(formData);

  try {
    // Submit to WordPress (requires Contact Form 7 or similar plugin)
    const response = await fetch(
      `${WORDPRESS_API_URL.replace("/wp/v2", "")}/contact-form-7/v1/contact-forms/1/feedback`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      alert("Message sent successfully!");
      this.reset();
    } else {
      throw new Error("Failed to send message");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("Thank you for your message! We will get back to you soon.");
    this.reset();
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Load content when page loads
document.addEventListener("DOMContentLoaded", loadContent);
