const bookapi = "";
const bookurl = `https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=${bookapi}`;

function getbooklist() {
    const authors = [];
    const count = [];

    fetch(bookurl)
        .then((res) => res.json())
        .then((data) => {
            const genrelists = data.results.lists;
            genrelists.forEach((genre) => {
                genre.books.forEach((book) => {
                    authors.push(book.author);
                });
            });

            for (let a of authors) {
                if (count[a]) {
                    count[a] += 1;
                } else {
                    count[a] = 1;
                }
            }
            for (let key in count) {
                if (count[key] < 4) {
                    delete count[key];
                }
            }
            author_names = Object.keys(count);
            author_counts = Object.values(count);
            const ctx = document.getElementById('myChart');
            let chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: author_names,
                    datasets: [{
                        data: author_counts,
                        backgroundColor: [
                            'rgba(218, 165, 32, 0.2)',
                            'rgba(139, 69, 19, 0.2)',
                            'rgba(205, 92, 92, 0.2)',
                            'rgba(244, 164, 96, 0.2)',
                            'rgba(184, 115, 51, 0.2)',
                            'rgba(188, 143, 143, 0.2)'
                        ],
                        borderColor: [
                            'rgb(218, 165, 32)',
                            'rgb(139, 69, 19)',
                            'rgb(205, 92, 92)',
                            'rgb(244, 164, 96)',
                            'rgb(184, 115, 51)',
                            'rgb(188, 143, 143)'
                        ],
                        borderWidth: 1
                    }],
                },
                options: {
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });
        });
}

window.onload = getbooklist;
