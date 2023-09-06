@authentication @my-acc
Feature:  Authorization API's [Cognito]

    @focus
    Scenario: User is able to successfully signin to a brand
        Given a user exists in a specific brand pool 
            | username           | password  |
            | testuser1@test.com | password1 |
        When the above user attempts to signin to the brand
        Then user is signed in successfully 
        # And user is able to retrieve his cart details 

    @focus
    Scenario: User is not able to signin when the user enters an incorrect password
        Given auth mock is configured to return a 400 response 
        # the above step is for local testing only -- remove before checking in
        And a user exists in a specific brand pool 
            | username           | password  |
            | testuser1@test.com | password1 |
        When user tries to signin with below details
            | username           | password  |
            | testuser1@test.com | incorrect |
        Then user is not signed in successfully 

    @focus
    Scenario: User is not able to signin when the user does not exist in the user pool for a specific brand
        Given auth mock is configured to return a 400 response
        And a user does not exist in a specific brand pool 
            | username              | 
            | doesnotexist@test.com |
        When user tries to signin with below details
            | username              | password  |
            | doesnotexist@test.com | password1 |
        Then user is not signed in successfully 
    