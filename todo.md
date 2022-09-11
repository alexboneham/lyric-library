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

**TODO**
- add user auth!
- add conditional checks from request body before updating/deleting a song (would have to send from React too then...)
- convert edit functions to PUT routes, using json.loads to access data from request.body

## Frontend

**TODO**
- create-react-app
- build UI for index/library
- build UI for song view
- build UI for set list view
- make fetch calls to API for server data
