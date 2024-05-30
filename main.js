document.addEventListener('DOMContentLoaded', async () => {
    const pageParams = new URLSearchParams(window.location.search);
    const page = pageParams.get('page') || 1;
    const articlesList = document.getElementById('articles-list');
    const pagination = document.getElementById('pagination');
    const API_URL = `https://gorest.co.in/public-api/posts?page=${page}`;

    const get = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to load data');
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    };

    const data = await get(API_URL);
    if (data) {
        data.data.forEach(article => {
            const articleItem = document.createElement('a');
            articleItem.href = `post.html?id=${article.id}`;
            articleItem.className = 'list-group-item list-group-item-action';
            articleItem.textContent = article.title;
            articlesList.appendChild(articleItem);
        });

        for (let i = 1; i <= data.meta.pagination.pages; i++) {
            const pageItem = document.createElement('li');
            pageItem.className = 'page-item';
            const pageLink = document.createElement('a');
            pageLink.className = 'page-link';
            pageLink.textContent = i;
            pageLink.href = i === 1 ? 'index.html' : `index.html?page=${i}`;
            pageItem.appendChild(pageLink);
            pagination.appendChild(pageItem);
        }
    }
});
