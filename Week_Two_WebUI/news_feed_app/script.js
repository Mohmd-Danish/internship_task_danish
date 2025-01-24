let articles = [];
let currentPage = 1;
const articlesPerPage = 4;

document.getElementById('addArticle').addEventListener('click', addArticle);

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
            ${article.imageUrl ? `<img src="${article.imageUrl}" alt="Article Image" style="width:80%;">` : ''}
        `;
        newsFeed.appendChild(articleDiv);
    });

    renderPagination();
}

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