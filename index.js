const bodyParser = require('body-parser')
const express = require("express")
const supabaseClient = require('@supabase/supabase-js')
const app = express()
const port = 3000


app.use(bodyParser.json())

// this allows us to use all files in the public folder
app.use(express.static(__dirname + '/public'))

const supabaseUrl = ''
const supabaseKey = ''
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);

// GET, which serves the index.html page
app.get("/", (req, res) => {
    res.sendFile("public/html/signin.html", { root: __dirname })
})

// GET, which serves the aboutus.html page
app.get("/about", (req, res) => {
    res.sendFile("public/html/aboutus.html", { root: __dirname })
})

// GET, which serves the catalog.html page
app.get("/catalog", (req, res) => {
    res.sendFile("public/html/catalog.html", { root: __dirname })
})

// GET, which serves the home.html page
app.get("/home", (req, res) => {
    res.sendFile("public/html/home.html", { root: __dirname })
})

// GET, which serves the help.html page
app.get("/help", (req, res) => {
    res.sendFile("public/html/help.html", { root: __dirname })
})

// GET, which serves the bookchart.html page
app.get("/bookchart", (req, res) => {
    res.sendFile("public/html/bookchart.html", { root: __dirname })
})

// example GET endpoint, which returns a random book
app.get("/randombooktitle", async (req, res) => {
    console.log("here")
    const bookapi = "";
    const bookurl = `https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=${bookapi}`;
    const resp = await fetch(bookurl)
    const data = await resp.json()
    const genrelists = data.results.lists
    const genre = genrelists[Math.floor(Math.random()*genrelists.length)]
    const book = genre.books[Math.floor(Math.random()*genre.books.length)]
    console.log(book.title)
    res.send(book.title)
    })

app.get('/favorites', async (req, res) => {
    console.log(`Getting Favorites`)

    const {data, error} = await supabase
        .from('Favorites')
        .select();

    if(error) {
        console.log(error)
    } else if(data) {
        res.send(data)
    }
})

app.post('/favorite', async (req, res) => {
    console.log('Adding Favorite')

    var title = req.body.title;
    var genre = req.body.genre;
    var description = req.body.description;
    var author = req.body.author;
    var image = req.body.image;
    var link = req.body.link;

    const {data, error} = await supabase
        .from('Favorites')
        .insert([
            {'title': title, 'genre': genre, 'description': description,'author': author,'image': image, 'link': link}
        ])
        .select();

    console.log(data)
    res.header('Content-type', 'application/json')
    res.send(data)
})


app.listen(port)