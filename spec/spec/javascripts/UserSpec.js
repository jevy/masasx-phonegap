(function() {
  describe("User", function() {
    beforeEach(function() {
      var userCollection;
      localStorage.clear();
      userCollection = new UserCollection();
      return window.app = {
        userCollection: userCollection
      };
    });
    it("saves to localStorage", function() {
      var user;
      user = new User({
        access_code: 'abc123'
      });
      user.login();
      return expect(app.userCollection.length).toEqual(1);
    });
    it("removes user from localstorage on logout", function() {
      var user;
      user = new User({
        access_code: 'abc123'
      });
      user.login();
      user.logout();
      return expect(app.userCollection.length).toEqual(0);
    });
    it("currentUser returns the logged in user", function() {
      var user;
      user = new User({
        access_code: 'abc123'
      });
      user.login();
      return expect(app.userCollection.currentUser()).toEqual(user);
    });
    it("returns null if there never was a logged in user", function() {
      return expect(app.userCollection.currentUser()).toBeNull();
    });
    it("returns null if a user logged out", function() {
      var user;
      user = new User({
        access_code: 'abc123'
      });
      user.login();
      user.logout();
      return expect(app.userCollection.currentUser()).toBeNull();
    });
    return it(".logout does not throw error if already signed out", function() {
      var user;
      user = new User({
        access_code: 'abc123'
      });
      user.logout();
      user.logout();
      return expect(user.logout()).toBeTruthy();
    });
  });
}).call(this);
