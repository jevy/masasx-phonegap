(function() {
  window.User = (function() {
    function User() {}
    User.prototype.currentUser = function() {
      return localStorage.getItem('currentAccessCode');
    };
    User.prototype.login = function(access_code) {
      return localStorage.setItem('currentAccessCode', access_code);
    };
    User.prototype.logout = function() {
      return localStorage.removeItem('currentAccessCode');
    };
    return User;
  })();
}).call(this);
