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

**TODO**
- add user auth!

## Frontend

**TODO**

- consider auth options
- more error handling, especially for timeouts
- fix isResponseOk function not logging error...
- work on cross-site cookies settings
- fix message when a setlist is empty
- pagination for seach results
- pagination for library songs
- infinite scroll for pagination
- fix add to setlist state bug (need to disbale select options after state change)

### UI/UX
- Build out SPA nav style architecture
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
