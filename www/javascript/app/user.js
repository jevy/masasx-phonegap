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
    User.currentUser = function() {
      var full_id, store_id, user;
      if (localStorage.length === 0 || localStorage.length === 1) {
        return null;
      }
      store_id = window.localStorage.getItem('UserLocalStore');
      full_id = 'UserLocalStore-' + store_id;
      return user = new User(JSON.parse(window.localStorage.getItem(full_id)));
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
