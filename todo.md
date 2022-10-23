# Lyric Library

## Backend

**Done**
- set up django backend
- create song and setlist models
- set up index view function with JSON response
- set up song view function with JSON response
- populate DB with seed data
- edit song function
- add song
- delete song function
- connect Genius API
- use API to add lyrics to new song
- reorganize views and url paths to make more sense
- create setlist
- change genius api endpoiint responses to Json
- change database endpoints responses to json
- add to setlists function
- edit/remove from setlist 
- Add foreign key links to Artist and Album when creating a Song in the database.
- convert edit functions to PUT routes, using json.loads to access data from request.body
- Add user session based auth
- Create session check on load route
- Create get_csrf route and hit whenever a change to auth for new token
- Adjust sessions and re-migrate database accordingly
- Rewrite backend logic to handle user libraries
- 

**TODO**

## Frontend

**TODO**

- Pagination:
    - for seach results
    - for library songs
    - infinite scroll for pagination

- Responsive layout:
    - Check and fix responsive layout for each page/component

- Bugs:
    - Search component: timeout error, button disappears
    - On refresh, losing some user state.

- Setlist edit/new form:
    - larger select area, or
    - checkbox song-cards or similar...
    - 



**DONE**
- consider which method to connect Django and React
- create-react-app
- plan site architecture
- plan design of major components/routes
- add submit handler and subsequent fetch call to search form
- set up context for handling song library information
- set up basic setlists route and fetch call
- useParams() for nested routes with ids
- move add to library button inside <SongItem /> component
- Edit and Delete functions
- edit and delete setlist function
- create re-useable setlist edit form component
- add ability to search by title AND artist
- add dynamic back button component
- fix add to setlist state bug (need to disbale select options after state change)
- fix message when a setlist is empty
- fix isResponseOk function not logging error...
- more error handling, especially for timeouts
- work on cross-site cookies settings
- consider auth options
- Add session based user auth
- Build out SPA nav style architecture
- add bootstrap
