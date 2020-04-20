Feature: MyRoute
 
Scenario: Trying to view a route
  Given I am a user trying to view my routes
  When  Pressing view route button
  Then  It shows the map with the route drawn
