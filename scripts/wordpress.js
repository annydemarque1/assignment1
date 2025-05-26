// WordPress API Integration Functions
class WordPressIntegration {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    async fetchPage(slug) {
        try {
            const response = await fetch(`${this.apiUrl}/pages?slug=${slug}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const pages = await response.json();
            return pages[0] || null;
        } catch (error) {
            console.error('Error fetching page:', error);
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
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching posts:', error);
            return [];
        }
    }

    stripHtml(html) {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    }
}

window.WordPressIntegration = WordPressIntegration;