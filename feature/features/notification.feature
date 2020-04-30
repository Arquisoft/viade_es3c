Feature: Notification
 
Scenario: Receive a notification
  Given I am a user who has received a notification
  When  Pressing notification button
  Then  I will see the route shared at pod

