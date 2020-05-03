Feature: UploadRoute
 
Scenario: Trying to upload a route with a file
  Given I am a user trying to create a route with a geojson fle
  When  Fill out the form of upload route view
  And   Upload the file and save route
  Then  It shows the route I had crated at my routes
