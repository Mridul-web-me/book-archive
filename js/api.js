const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.visibility = displayStyle;
}

const searchBook = () => {
    const searchText = document.getElementById('search-field').value;
    loadBook(searchText);
    document.getElementById('search-field').value = '';

    toggleSpinner('initial');
    document.getElementById('search-result').innerText = '';
    document.getElementById('error-message').style.display = 'none';
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
    container.textContent = '';
    document.getElementById('search-number').innerText = `${books.docs}`;

    if(books.length === 0){
        document.getElementById('error-message').style.display = 'block'
    }
    else{
        books.forEach(book => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div class="card-body">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" alt="...">
                   
                    <h4 class="card-title">${book.title}</h4>
                    <h5 class="card-title">${book.author_name}</h5>
                    <p class="card-text"> ${book.first_publish_year}</p>
            </div>
            `;
            container.appendChild(div);
        });
    }
    toggleSpinner('hidden');
}