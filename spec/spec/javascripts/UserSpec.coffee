# You creating a user, Backbone automatically adds one value
# with the storage key

describe "User", ->

    beforeEach ->
        localStorage.clear()
        userCollection = new UserCollection()
        window.app = 
            userCollection: userCollection

    it "saves to localStorage", ->
        user = new User({access_code: 'abc123'})
        user.login()
        expect(app.userCollection.length).toEqual(1)

    it "removes user from localstorage on logout", ->
        user = new User({access_code: 'abc123'})
        user.login()
        user.logout()
        expect(app.userCollection.length).toEqual(0)

    it "currentUser returns the logged in user", -> 
        user = new User({access_code: 'abc123'})
        user.login()
        expect(app.userCollection.currentUser()).toEqual(user)

    it "returns null if there never was a logged in user", ->
        expect(app.userCollection.currentUser()).toBeNull()

    it "returns null if a user logged out", ->
        user = new User({access_code: 'abc123'})
        user.login()
        user.logout()
        expect(app.userCollection.currentUser()).toBeNull()

    it ".logout does not throw error if already signed out", ->
        user = new User({access_code: 'abc123'})
        user.logout()
        user.logout()
        expect(user.logout()).toBeTruthy()
