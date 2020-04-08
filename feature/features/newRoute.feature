Feature: NewRoute
 
Scenario: Trying to create a route
  Given I am a user trying to create a route
  When  Fill out the form
  And   Putting the markers
  Then  Redirect to my routes page
