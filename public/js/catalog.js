const bookapi = "";
const bookurl = `https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=${bookapi}`;

async function getRandomBook() {
    console.log("fetching")
    var res = await fetch(`http://localhost:3000/randombooktitle`, {
        method: 'GET',
        headers: {
            "Content-type": "text/plain"
        }
    });

    var bookTitle = await res.text();
    console.log(bookTitle);
    const titleDiv = document.createElement('div');
    titleDiv.textContent = bookTitle;
    const randomBookDiv = document.getElementById('randomBookContainer');
    const prevTitleDiv = randomBookDiv.querySelector('.book-title');
    if (prevTitleDiv) {
        randomBookDiv.removeChild(prevTitleDiv);
    }
    titleDiv.classList.add('book-title'); 
    randomBookDiv.appendChild(titleDiv);
}

async function getFavorites(){
    //console.log('Creating Favorite')
    var test = await fetch(`http://localhost:3000/favorites`, {
        method: 'GET',
        headers: {
            "Content-type": "application/json"
        }
    })
    
        .then(async res => {
            const element = document.getElementById('errorBox')
            
            if (res.status != 200 || res.status != 304) {
                return res.json()
            }else{
                res.json()
            }
        })
        .then((res) => {
            const element = document.getElementById("favorites");
            element.innerHTML = '';
            const addedTitles = [];

            for (i = 0; i < res.length; i++) {
                if(addedTitles.includes(res[i].title)){continue;}
                const bookDiv = document.createElement("div");

                const imageLink = document.createElement("a");
                const linkArray = JSON.parse(res[i].link);

                if (linkArray && linkArray.length > 0) {
                    imageLink.href = linkArray[0].url;

                }
                const image = document.createElement("img");
                image.src = res[i].image;
                image.alt = res[i].title;
                image.width = 100;
                image.height = 130;

                // hover to see description
                image.title = ` Title: ${res[i].title}\nAuthor: ${res[i].author}\nGenre: ${res[i].genre}\nDescription: ${res[i].description}`;
                imageLink.appendChild(image);

                const overlayDiv = document.createElement("div");
                overlayDiv.classList.add('overlay');

                const addButton = document.createElement("img");
                addButton.src = "../images/smallplus.png";
                addButton.alt = "Add";
                addButton.classList.add('add-button');
                overlayDiv.appendChild(addButton);

                bookDiv.appendChild(imageLink);
                bookDiv.appendChild(overlayDiv);

                element.appendChild(bookDiv);
                addedTitles.push(res[i].title)
            }
        })
        .catch((error) => {
            var errorDiv = document.createElement('div')
            errorDiv.setAttribute('class', 'errorBox');
            errorDiv.setAttribute('id', 'errorBox')

            var h1 = document.createElement('h1');
            h1.innerHTML = `Error Ocurred:`

            var p = document.createElement('p');
            p.innerHTML = `${JSON.parse(error.message).message}`

            errorDiv.appendChild(h1);
            errorDiv.appendChild(p);
            document.body.appendChild(errorDiv)
        })
}

function getbooklist() {
    fetch(bookurl)
    .then((res) => res.json())
    .then((data) => {
        const bookContainer = document.querySelector('.book-container');
        const genrelists = data.results.lists
        genrelists.forEach((genre) => {
            genre.books.forEach((book) => {
                const bookDiv = document.createElement("div");
                bookDiv.classList.add('book-item');

                const imageLink = document.createElement("a");
                if (book.buy_links && book.buy_links.length > 0) {
                    imageLink.href = book.buy_links[0].url; 
                }
                const image = document.createElement("img");
                image.src = book.book_image;
                image.alt = book.title;
                image.width = 100;
                image.height = 130;

                // hover to see description
                image.title = ` Title: ${book.title}\nAuthor: ${book.author}\nGenre: ${genre.display_name}\nDescription: ${book.description}`;
                imageLink.appendChild(image);

                const overlayDiv = document.createElement("div");
                overlayDiv.classList.add('overlay');

                const likeButton = document.createElement("img");
                likeButton.src = "../images/smallthumb.png";
                likeButton.alt = "Like";
                likeButton.classList.add('like-button');
                overlayDiv.appendChild(likeButton);

                likeButton.addEventListener('click', async () => {
                    await addFavorites(book.title, genre.display_name, book.description, book.author, book.book_image, book.buy_links);
                });

                bookDiv.appendChild(imageLink);
                bookDiv.appendChild(overlayDiv);

                bookContainer.appendChild(bookDiv);
            })
        })
    })
}

async function addFavorites(title, genre, description, author, image, link) {
    var host = window.location.origin;

    var test = await fetch(`http://localhost:3000/favorite`, {
        method: 'POST',
        body: JSON.stringify({
            'title': title,
            'genre': genre,
            'description': description,
            'author': author,
            'image': image,
            'link': link
        }),
        headers: {
            "Content-type": "application/json"
        }
    })
    await getFavorites();
}

getbooklist();
window.onload = getFavorites;