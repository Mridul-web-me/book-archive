// Spinner
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.visibility = displayStyle;
}

// Input Field

const searchBook = () => {
    const searchText = document.getElementById('search-field').value;
    loadBook(searchText);
    document.getElementById('search-field').value = '';

    toggleSpinner('initial');
    document.getElementById('search-result').innerText = '';
    document.getElementById('error-message').style.display = 'none';
}

const loadBook = searchText => {
    const url = `https://openlibrary.org/search.json?q=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayLoad(data))
}

// Display Book

 const displayLoad = data => {
    //  Result Number
    console.log(data);
    const numFound = data.numFound;
    document.getElementById('search-number').innerText = `${numFound}`;

    const container = document.getElementById('search-result');
    container.textContent = '';
    const books = data.docs;
    const imgUrl = document.getElementsByClassName('imgUrl');
    if(books.length === 0){
        document.getElementById('error-message').style.display = 'block'
    }
    else if(imgUrl === null){
        imgUrl = "./default.jpg"
    }
    else{
        books.forEach(book => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div class="card-body">
                <img class="border border-secondary p-3" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" alt="..." height="300px" width="300px">
                    <h4 class="card-title">${book.title}</h4>
                    <p class="card-title">Author name: ${book.author_name}</p>
                    <p class="card-title">Publisher: ${book.publisher}</p>
                    <p class="card-text"> Publish Year: ${book.first_publish_year}</p>
            </div>
            `;
            container.appendChild(div);
        });
    }
    toggleSpinner('hidden');
}