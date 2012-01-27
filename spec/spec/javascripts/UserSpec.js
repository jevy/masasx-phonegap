(function() {
  describe("User", function() {
    it("saves to localStorage", function() {
      var user;
      window.localStorage.clear();
      user = new User({
        access_code: 'abc123'
      });
      user.login();
      return expect(window.localStorage.length).toEqual(2);
    });
    it("removes user from localstorage on logout", function() {
      var user;
      window.localStorage.clear();
      user = new User({
        access_code: 'abc123'
      });
      user.login();
      user.logout();
      return expect(window.localStorage.length).toEqual(1);
    });
    it("currentUser returns the logged in user", function() {
      var user;
      window.localStorage.clear();
      user = new User({
        access_code: 'abc123'
      });
      user.login();
      return expect(user).toEqual(User.currentUser());
    });
    it("returns null if there never was a logged in user", function() {
      window.localStorage.clear();
      return expect(User.currentUser()).toBeNull();
    });
    return it("returns null if a user logged out", function() {
      var user;
      window.localStorage.clear();
      user = new User({
        access_code: 'abc123'
      });
      user.login();
      user.logout();
      return expect(User.currentUser()).toBeNull();
    });
  });
}).call(this);
