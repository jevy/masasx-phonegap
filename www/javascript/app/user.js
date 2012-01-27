(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  window.User = (function() {
    __extends(User, Backbone.Model);
    function User() {
      this.logout = __bind(this.logout, this);
      this.login = __bind(this.login, this);
      User.__super__.constructor.apply(this, arguments);
    }
    User.prototype.localStorage = new Store('UserLocalStore');
    User.currentUser = function() {
      var full_id, new_user;
      if (localStorage.length === 0 || localStorage.length === 1) {
        return null;
      }
      full_id = 'UserLocalStore-' + localStorage.getItem('UserLocalStore');
      new_user = new User(JSON.parse(localStorage.getItem(full_id)));
      return new_user;
    };
    User.prototype.login = function() {
      return this.save();
    };
    User.prototype.logout = function() {
      return this.destroy();
    };
    return User;
  })();
}).call(this);
