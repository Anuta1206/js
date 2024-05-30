document.addEventListener('DOMContentLoaded', async () => {
    const pageParams = new URLSearchParams(window.location.search);
    const postId = pageParams.get('id');
    const articleTitle = document.getElementById('article-title');
    const articleBody = document.getElementById('article-body');
    const commentsList = document.getElementById('comments-list');
    const POST_URL = `https://gorest.co.in/public-api/posts/${postId}`;
    const COMMENTS_URL = `https://gorest.co.in/public-api/comments?post_id=${postId}`;

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

    const postData = await get(POST_URL);
    if (postData) {
        const article = postData.data;
        articleTitle.textContent = article.title;
        articleBody.textContent = article.body;
    }

    const commentsData = await get(COMMENTS_URL);
    if (commentsData) {
        commentsData.data.forEach(comment => {
            const commentItem = document.createElement('li');
            commentItem.className = 'list-group-item';
            commentItem.innerHTML = `<strong>${comment.name}:</strong> ${comment.body}`;
            commentsList.appendChild(commentItem);
        });
    }
});
