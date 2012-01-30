(function() {
  describe("User", function() {
    beforeEach(function() {
      return localStorage.clear();
    });
    it("saves to localStorage", function() {
      var user;
      user = new User();
      user.login('abc123');
      return expect(localStorage.length).toEqual(1);
    });
    it("removes user from localstorage on logout", function() {
      var user;
      user = new User();
      user.login('abc123');
      user.logout();
      return expect(localStorage.length).toEqual(0);
    });
    it("currentUser returns the logged in user", function() {
      var user;
      user = new User();
      user.login('abc123');
      return expect(user.currentUser()).toEqual('abc123');
    });
    it("returns null if there never was a logged in user", function() {
      var user;
      user = new User();
      return expect(user.currentUser()).toBeNull();
    });
    it("returns null if a user logged out", function() {
      var user;
      user = new User();
      user.login('abc123');
      user.logout();
      return expect(user.currentUser()).toBeNull();
    });
    return it(".logout does not throw error if already signed out", function() {
      var user;
      user = new User();
      user.login('abc123');
      user.logout();
      user.logout();
      return expect(user.currentUser()).toBeNull();
    });
  });
}).call(this);
