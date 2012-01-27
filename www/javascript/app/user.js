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
    User.prototype.login = function() {
      app.userCollection.add(this);
      return this.save();
    };
    User.prototype.logout = function() {
      return this.destroy();
    };
    return User;
  })();
  window.UserCollection = (function() {
    __extends(UserCollection, Backbone.Collection);
    function UserCollection() {
      this.currentUser = __bind(this.currentUser, this);
      UserCollection.__super__.constructor.apply(this, arguments);
    }
    UserCollection.prototype.initialize = function() {
      return this.reset();
    };
    UserCollection.prototype.localStorage = new Store('UserLocalStore');
    UserCollection.prototype.currentUser = function() {
      return this.first() || null;
    };
    return UserCollection;
  })();
}).call(this);
