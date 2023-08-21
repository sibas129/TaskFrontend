async function fetchAndRenderPostsAndComments() {
    const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
    const postsData = await postsResponse.json();
  
    const commentsResponse = await fetch('https://jsonplaceholder.typicode.com/comments');
    const commentsData = await commentsResponse.json();
  
    const postsContainer = document.getElementById('posts-container');
  
    const postsPerPage = 10;
    let currentPage = 1;
    let startIdx = (currentPage - 1) * postsPerPage;
    let endIdx = startIdx + postsPerPage;
  
    function toggleComments(postId) {
        const commentsDiv = document.getElementById(`comments-${postId}`);
        commentsDiv.classList.toggle('hidden');
    }
  
    function renderPosts() {
        postsContainer.innerHTML = '';
  
        for (let i = startIdx; i < endIdx && i < postsData.length; i++) {
            const post = postsData[i];
            const postDiv = document.createElement('div');
            postDiv.className = 'post';
            postDiv.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.body}</p>
                <button onclick="toggleComments(${post.id})">Show Comments</button>
                <div id="comments-${post.id}" class="comments hidden">
                    ${renderComments(post.id)}
                </div>
            `;
            postsContainer.appendChild(postDiv);
        }
    }
  
    function renderComments(postId) {
        const postComments = commentsData.filter(comment => comment.postId === postId).slice(0, 5);
        return postComments.map(comment => `
            <div class="comment">
                <strong>${comment.name}</strong>
                <p>${comment.body}</p>
            </div>
        `).join('');
    }
  
    function updatePagination() {
        const totalPages = Math.ceil(postsData.length / postsPerPage);
  
        const paginationDiv = document.createElement('div');
        paginationDiv.className = 'pagination';
  
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.addEventListener('click', () => {
                currentPage = i;
                startIdx = (currentPage - 1) * postsPerPage;
                endIdx = startIdx + postsPerPage;
                renderPosts();
                updatePagination();
            });
            paginationDiv.appendChild(pageButton);
        }
  
        postsContainer.appendChild(paginationDiv);
    }
  
    renderPosts();
    updatePagination();
}

fetchAndRenderPostsAndComments();