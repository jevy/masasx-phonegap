# You creating a user, Backbone automatically adds one value
# with the storage key

describe "User", ->

    beforeEach ->
        localStorage.clear()

    it "saves to localStorage", ->
        user = new User()
        user.login('abc123')
        expect(localStorage.length).toEqual(1)

    it "removes user from localstorage on logout", ->
        user = new User()
        user.login('abc123')
        user.logout()
        expect(localStorage.length).toEqual(0)

    it "currentUser returns the logged in user", -> 
        user = new User()
        user.login('abc123')
        expect(user.currentUser()).toEqual('abc123')

    it "returns null if there never was a logged in user", ->
        user = new User()
        expect(user.currentUser()).toBeNull()

    it "returns null if a user logged out", ->
        user = new User()
        user.login('abc123')
        user.logout()
        expect(user.currentUser()).toBeNull()

    it ".logout does not throw error if already signed out", ->
        user = new User()
        user.login('abc123')
        user.logout()
        user.logout()
        expect(user.currentUser()).toBeNull()
