README

# Group 4 - Interesting Book Catalog #

### Group Members: James van Doorn, Sophia Chen ###

Description of your project: The Interesting Book Catalog identifies the 
bestselling books listed by the New York Times and displays them in an 
eye-catching format. Our website includes the following pages:
1. sign-in: allows for input of a username and password and takes the 
user to the homepage upon submission.
2. home: the page to which the user arrives after sign in; giving a welcome 
to the user.
3. catalog: displays the books and their relevant information.
4. about us: the backstory to the application and its design.
5. help: allows for submission of a help request to the site owners.

Description of target browsers: Our website is best equipped to run on PC 
and Mac. Mobile users may run our site as well, however, they may encounter
challenges with website display and interaction. The site works best on Google
Chrome and other browsers may face limited functionality.

## Link to User Manual: ##
1. To use the site, go to http://localhost:3000/ and add in the page you want to visit after the /, or use the navigation buttons at the top of the page.
2. Page link directory
    - http://localhost:3000/ - sign-in page
        - Enter any username and password combination and click submit to be taken to the home page!
    - http://localhost:3000/about - about us page
        - Visit to learn more about the site and its development.
    - http://localhost:3000/help - help page
        - Visit to submit a help request.
    - http://localhost:3000/bookchart for book chart page
        - Visit to see a chart of the authors with the most appearances in the catalog.
    - http://localhost:3000/catalog for catalog page
        - Visit to see the catalog. Hover over any book and press the thumbs up image to add it to the others’ favorites box, showing all the favorites of all site users. You can also
        click the search icon in the top right to generate a random book title.
    - http://localhost:3000/home for home page
        - Our welcome page.

## Developer Manual: ##
1. To install application and dependencies: 
    1. Download all files from github and open in Visual Studio Code within a folder. 
    2. Create an account on and generate a new API key from https://developer.nytimes.com/docs/books-product/1/overview.
    3. Fill in the quotes after const bookapi = "" in the files
    bookchart.js, index.js, and catalog.js with your API key.
    4. Setting Up Supabase:
        1. Create an account on https://supabase.com/, then navigate to https://supabase.com/dashboard/projects and create a new project. 
        2. Go to Table Editor and create a table called "Favorites", with columns: 'id' (int8), 'title' (text), 'created_at' (timestamptz), 'image (text), 'genre' (text), 'description' (text), 'author' (text), and 'link' (text). Additionally, deselect "Enable Row Level Security (RLS)"
        3. Within you project copy supabase url and API key from Settings > API and in index.js, add them inside the quotes of const supabaseUrl = '' and const supabaseKey = '' respectively.

2. To run the application on a server: enter npm start in Visual Studio Code, and navigate to http://localhost:3000/. To terminate the batch job, press Ctrl + C while in the VSCode terminal
and enter 'Y' for yes. From there, you can run npm start again.
3. Tests written for software: No tests
4. API and endpoints
    - Books API - https://developer.nytimes.com/docs/books-product/1/overview
    - Endpoint 1: randombooktitle
        - Generates a random book title from the catalog
        - This is done using GET endpoint
    - Endpoint 2: favorites
        - Using supabase, a book from the catalog is added to the "What Have Others Liked" box when the thumbs up image is clicked.
        - This is done using a GET and POST endpoint.
5. Expectations regarding bugs and future development
    - Add onto pages css and functionality.
    - Create a larger array of various categories, not limited to like different genres, book lengths
    - Sign-in page currently accepts any username and password combination, so future developers will need to implement account creation functionality.
    - Once account creation functionality is added, a “my books” page can be implemented so that users can add their personal favorites from the catalog.
    - The contact button currently is not implemented
    - Current Bugs Detected:
        - Hover element for book information in main catalog bar doesn't appear in Microsoft Edge.
        - Random book title generation is sometimes unreliable and varies between users.
        - Server crashes sporadically. 