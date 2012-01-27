# You creating a user, Backbone automatically adds one value
# with the storage key

describe "User", ->
    it "saves to localStorage", ->
        window.localStorage.clear()
        user = new User({access_code: 'abc123'})
        user.login()
        expect(window.localStorage.length).toEqual(2)

    it "removes user from localstorage on logout", ->
        window.localStorage.clear()
        user = new User({access_code: 'abc123'})
        user.login()
        user.logout()
        expect(window.localStorage.length).toEqual(1)

    it "currentUser returns the logged in user", -> 
        window.localStorage.clear()
        user = new User({access_code: 'abc123'})
        user.login()
        expect(user).toEqual(User.currentUser())

    #it ".logout does not throw error if already signed out", ->
    #    expect(user.logout()).toBeTruthy()

    #it "shows the current user if logged in", ->
    #    user = new User({access_code: 'abc123'})
    #    user.login()

    it "returns null if there never was a logged in user", ->
        window.localStorage.clear()
        expect(User.currentUser()).toBeNull()

    it "returns null if a user logged out", ->
        window.localStorage.clear()
        user = new User({access_code: 'abc123'})
        user.login()
        user.logout()
        expect(User.currentUser()).toBeNull()
