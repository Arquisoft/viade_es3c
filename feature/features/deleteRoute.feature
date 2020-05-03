Feature: MyRoute
 
Scenario: Trying to delete a route
  Given I am a user trying to delete one of my routes
  When  Pressing delete button
  Then  Confirm the elimination
