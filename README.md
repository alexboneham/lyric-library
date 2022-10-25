# Lyric Library

Lyric library is a web application for searching, storing, editing, and organizing song lyrics. It is designed and built with singers, songwriters and performers in mind, but works equally well for poets, lyricists, novelists, or anybody wanting to search, edit and organize short pasages of text.

# Features

- Search the web for any song
- Save songs to your library
- Edit lyrics
- Create setlists
- Create and add your own songs
- Edit your profile

# About

Lyric library was born out of a personal struggle to organize and remember songs I enjoy singing and playing. As a music enthusiast, how often do you find yourself sitting at the piano or picking up a guitar to bash through a tune, only for your mind to go blank when coming up with a song to play? Maybe you open a tab on your browser and search for the song lyrics, then another, and another. After a short practice session you have a complete mess of tabs and still no way of organizing those songs for another session later. This is where Lyric Library comes in.

The application can be used with or without creating a user account and logging in. Without an account you are limited to searching and viewing songs. After logging in, the user is able to save and edit songs, create setlists, and edit their profile.

Searching the web for song lyrics is achieved via a multi-stage process:

1. User searches for a song by title, or by title AND artist.
2. The frontend app makes a asyncronous fetch call to the backend REST API.
3. The backend API then makes a call to the [Genius API](https://docs.genius.com 'Genius API docs'), with the help of the [lyrics-genius](https://lyricsgenius.readthedocs.io/en/master/ 'lyrics-genius python package') package.
4. Lyrics-genius uses a web scraper ([Beautiful Soup](https://pypi.org/project/beautifulsoup4/)) to gather the lyrics and send them back to the Django API (Genius API returns everything but lyrics)
5. The song is parsed, packaged and returned to the frontend client to be displayed to the user.

## Design and Build

The rest of the application is essentially a CRUD app for viewing, editing and organizing the songs you've saved.

The general architecture of the app is that of a backend written in Python (Django), serving as API endpoints to be consumed by a JavaScript (React.js) frontend. Other libraries and packages help out along the way. Here is a list of some of the major components the app is built with:

- Django
- SQLite3
- React.js
- React Router
- Bootstrap
- React Bootstrap
- Lyrics genius (and Beautiful Soup)

---

<!-- # Table of contents -->

# Getting Started

## Installation

After downloading or cloning the repository...

### Backend

1. In your root directory, create a virtual environment for the python backend:

```
python3 -m venv env
```

2. Activate the environment and change into the backend folder:

```
source env/bin/activate
cd backend/
```

3. Install the required packages with pip:

```
pip install -r requirements.txt
```

4. Make Django migrations and migrate:

```
python3 manage.py makemigrations apis
python3 manage.py migrate
```

5. Start up the backend server:

```
python3 manage.py runserver
```

### Frontend

1. From the root directory, change into the frontend directory:

```
cd frontend/
```

2. Run npm install to download and install dependencies in the package.json file:

```
npm install
```

3. Start up the frontend server:

```
npm run start
```

## Usage

Navigate to [localhost:3000/](http://localhost:3000/) in your browser to begin using the app.

### Search

- Enter a song title in the nav search bar.
- Alternatively, use the more advanced search component on the homepage to search by title, or by title and artist.
- Choose your song from the results to view the lyrics, as well as other contextual information.

### Sign Up & Login

- Use the sign up form to create a new user.
- Use the login form for an existing user.

### Library

- When logged in, after searching for a song you will have to option to add it to your library.
- Once saved to your library, a song can be edited, deleted or added to setlists.
- Create your own song and save it to your library.

### Setlists

- Create setlists and use the multiple select to bulk save songs.
- Add songs individually from your library
- Click on a song in your setlist to quickly view its lyrics on the same page.

### Profile

- While logged in, click on the username or icon in the top right corner to navigate to the profile page.
- Make changes to your user profile and save them to the database.

---

# Distinctiveness and Complexity

Although sharing some common characteristics of any CRUD application, this project is **distinct** from the other projects in _CS50's Web Programming with Python and Javascript_ course in a number of major ways:

- The creation of new database model instances (ie. songs) is achieved through a call to an external API, awaiting the response, parsing the returned data and finally creating the instance. (Songs can be created manually too)
- The app does not use the django templating system. Instead the entire frontend is JavaScript built as a Single Page Application (SPA) with the React.js library.
- Cross-site reference forgery protection (CSRF) is maintained within the SPA architecture, via a dedicated API endpoint.
- User session persists after refresh also via a dedicated API endpoint.
- A user is able to change profile information.

In addition to the above points, the application's **complexity** requirement is satisfied through the design and implementation of features outlined below...

## Backend

### Models

The Django project acts as the backend to power the Lyric Library application. It consists of 5 models for storing data:

- User (extended from AbstractUser)
- Artist
- Album
- Song
- Setlist

The User, Song and Setlist models have a serialize() method on them, which returns a Python dict object that can be easily passed into a Json response.

When a song is slated to be saved to the database, the backend checks whether the song's artist or album already exist, if so it makes references to them, else new instances of the Artist and Album model are also saved to the database. Similarily, when a song is deleted, the backend checks the database for any other songs with the same artist or album and clears them from the database if no other songs exist.

### RESTful API

The Django app is designed as an API to adhere to RESTful philosophies. Each url path and view handle logic involving a similar item, with the request method determining which logic is executed. The API makes use not only of 'GET' and 'POST' requests but also 'PUT' and 'DELETE', thereby following the structure of a REST API. I deliberately chose to not use the popular _Django REST Framework_, instead opting the create my own serlializers for incoming and outgoing data, so as to obtain a deeper understanding of how a Django API works.

### Genius API

The pattern of how the Django backend makes calls the the Genius API (a great service developed by genius.com), with the help of the lyrics-genius package is outlined in the **About** section above.

### Session, CSRF, CORS, etc

The ability to create, login and logout users, as well as persisting user session information after refresh proved a challenge. The solution invloved making changes to the backend settings with the help of the [django-cors-headers](https://pypi.org/project/django-cors-headers/) package, creating dedicated endpoints for session information (to be hit on refresh) and an endpoint for getting the crsf token. The token needed to then be passed into every 'POST', 'PUT' or 'DELETE' request from the client.

## Frontend

The design and build of the **single page application** with React differs significantly from previous projects and in and of itself serves to satisfy the project's complexity requirements. However a few key features are outlined below:

### React Router

For improved user experience and navigation, the frontend uses the [react-router](https://github.com/remix-run/react-router) library, generating clear, informative URLs. By leveraging hooks within the react-router library, the application is able to generate "Back" buttons (go back in window history), and render certain elements depending on the current location.

<!-- Outline React app. **Single page application** makes calls via fetch to the Django API, which in turn interacts with the Genius API and the SQL database. -->

### Components

All React components are built as **functional components** with hooks. Components are split into two directories:

1. Routes - components that render based on a specified route from react-router,
2. Components - smaller, often reusable components that are rendered from within a parent component.

### Context

**Context providers** are used to handle state used by components across different layers of the app architecture, to avoid enless prop drilling.

### Other features

**Filtered library search** - uses state and onChange handlers to dynamically display library items

**User profile** - user profile dropdown menu improves UI/UX to allow access to profile and logout navs outside navbar.

# Examples

![alt text](https://github.com/alexboneham/lyric-library/raw/main/frontend/src/assets/images/homepage-with-border.png 'Lyric Library Homepage')

_Homepage_

![alt text](https://github.com/alexboneham/lyric-library/raw/main/frontend/src/assets/gifs/library-demo.gif 'Library demo')

_Demo of a song in user's library_

![alt text](https://github.com/alexboneham/lyric-library/raw/main/frontend/src/assets/gifs/add-to-setlist.gif 'Add to setlist')

_Add a song to a setlist_

![alt text](https://github.com/alexboneham/lyric-library/raw/main/frontend/src/assets/gifs/filter-songs.gif 'Filter songs')

_Filter library songs_

# Acknowledgements

Thanks for these awesome resources that helped along the way:

- [Lyrics Genius](https://github.com/johnwmillr/LyricsGenius)
- https://testdriven.io/blog/django-spa-auth/
- [This reddit thread](https://www.reddit.com/r/django/comments/l6tmfx/django_react_best_authentication_method/)
