Feature: MyRoute
 
Scenario: Trying to edit a route
  Given I am a user trying to edit one of my routes
  When  Pressing edit button
  Then  I edit the route and save it
