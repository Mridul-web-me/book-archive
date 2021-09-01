const searchBook = () => {
    const searchText = document.getElementById('search-field').value;
    loadBook(searchText);
}

const loadBook = searchText => {
    const url = `http://openlibrary.org/search.json?q=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayLoad(data.docs))
}

const displayLoad = books => {
    const container = document.getElementById('search-result');
    console.log(books);
    books.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <img src="${book.cover_i}"
            <div class="card-body">
                <p class="card-text"> ${book.numFound}</p>
                <h4 class="card-title">${book.title}</h4>
                <h5 class="card-title">${book.author_name}</h5>
                <p class="card-text"> ${book.first_publish_year}</p>
        </div>
        `;
        container.appendChild(div);
    });
}