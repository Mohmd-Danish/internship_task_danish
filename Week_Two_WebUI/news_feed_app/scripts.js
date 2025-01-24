document.addEventListener('DOMContentLoaded', () => {
    let articles = [
        { title: "Article 1", description: "Description for article 1", imageUrl: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        { title: "Article 2", description: "Description for article 2", imageUrl: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        { title: "Article 3", description: "Description for article 3", imageUrl: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        { title: "Article 4", description: "Description for article 4", imageUrl: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        { title: "Article 5", description: "Description for article 5", imageUrl: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        { title: "Article 6", description: "Description for article 6", imageUrl: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        { title: "Article 7", description: "Description for article 7", imageUrl: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        { title: "Article 8", description: "Description for article 8", imageUrl: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" }
    ];

    let currentPage = 1;
    const articlesPerPage = 4;

    document.getElementById('addArticle').addEventListener('click', addArticle);

    // Function to add a new article
    function addArticle() {
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const imageUrl = document.getElementById('imageUrl').value;

        if (title && description) {
            const article = { title, description, imageUrl };
            articles.push(article);
            document.getElementById('title').value = '';
            document.getElementById('description').value = '';
            document.getElementById('imageUrl').value = '';
            renderArticles();
        } else {
            alert('Please fill in the title and description.');
        }
    }

    // Function to render articles on the page
    function renderArticles() {
        const newsFeed = document.getElementById('newsFeed');
        newsFeed.innerHTML = '';

        const start = (currentPage - 1) * articlesPerPage;
        const end = start + articlesPerPage;
        const paginatedArticles = articles.slice(start, end);

        paginatedArticles.forEach(article => {
            const articleDiv = document.createElement('div');
            articleDiv.className = 'article';
            articleDiv.innerHTML = `
                <h2>${article.title}</h2>
                <p>${article.description}</p>
                ${article.imageUrl ? `<img src="${article.imageUrl}" alt="Article Image" style="width:100%;">` : ''}
            `;
            newsFeed.appendChild(articleDiv);
        });

        renderPagination();
    }

    // Function to render pagination controls
    function renderPagination() {
        const pagination = document.getElementById('pagination');
        pagination.innerHTML = '';

        const totalPages = Math.ceil(articles.length / articlesPerPage);

        if (currentPage > 1) {
            const prevButton = document.createElement('button');
            prevButton.innerText = 'Previous';
            prevButton.onclick = () => {
                currentPage--;
                renderArticles();
            };
            pagination.appendChild(prevButton);
        }

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.innerText = i;
            pageButton.onclick = () => {
                currentPage = i;
                renderArticles();
            };
            pagination.appendChild(pageButton);
        }

        if (currentPage < totalPages) {
            const nextButton = document.createElement('button');
            nextButton.innerText = 'Next';
            nextButton.onclick = () => {
                currentPage++;
                renderArticles();
            };
            pagination.appendChild(nextButton);
        }
    }

    // Initial render of articles
    renderArticles();
});