Feature: Delete a friend
 
Scenario: Trying to delete a friend
  Given I am a user trying to delete a friend
  When  Searching him on friends page
  Then  Pressing the delete button

