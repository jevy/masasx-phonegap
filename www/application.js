(function() {
  var Entry, HomeController, HomeView, app;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  $('#home').live('pagecreate', function() {
    this.template_data = _.template('<div data-role="header">\n    <h1>Sign In</h1>\n</div>\n    <h3>Welcome to the Sandbox MASAS Hub</h3>\n    <form>\n        <p>\n            <label for="entry_secret">MASAS Secret Key</label>\n            <input id="entry_secret" name="entry[secret]" size="15" type="text" minlength="4" class="required" />\n        </p> \n        <p><a href="#select_geo" id=\'next\' data-role="button">Next</a></p>\n    </form>\n</div>');
    return $('.ui-content').html(this.template_data);
  });
  app = {
    activePage: function() {
      return $(".ui-page-active");
    },
    redirectTo: function(page) {
      return $.mobile.changePage(page);
    },
    reapplyStyles: function(el) {
      el.find('div[data-role="fieldcontain"]').fieldcontain();
      el.find('button[data-role="button"]').button();
      el.find('input,textarea').textinput();
      return el.page();
    },
    goBack: function() {
      return $.historyBack();
    }
  };
  Entry = (function() {
    __extends(Entry, Backbone.Model);
    function Entry() {
      Entry.__super__.constructor.apply(this, arguments);
    }
    return Entry;
  })();
  HomeView = (function() {
    __extends(HomeView, Backbone.View);
    function HomeView() {
      this.render = __bind(this.render, this);      HomeView.__super__.constructor.apply(this, arguments);
      this.el = app.activePage();
      this.template = _.template('<div data-role="header">\n    <h1>Sign In</h1>\n</div>\n    <h3>Welcome to the Sandbox MASAS Hub</h3>\n    <form>\n        <p>\n            <label for="entry_secret">MASAS Secret Key</label>\n            <input id="entry_secret" name="entry[secret]" size="15" type="text" minlength="4" class="required" />\n        </p> \n        <p><a href="#select_geo" id=\'next\' data-role="button">Next</a></p>\n    </form>\n</div>');
      this.render();
    }
    HomeView.prototype.render = function() {
      var entry;
      return entry = new Entry;
    };
    return HomeView;
  })();
  HomeController = (function() {
    __extends(HomeController, Backbone.Router);
    HomeController.prototype.routes = {
      "home": "home"
    };
    function HomeController() {
      HomeController.__super__.constructor.apply(this, arguments);
      this._views = {};
    }
    HomeController.prototype.home = function() {
      var _base;
      return (_base = this._views)['home'] || (_base['home'] = new HomeView);
    };
    return HomeController;
  })();
  app.homeController = new HomeController();
  $(document).ready(function() {
    Backbone.history.start();
    return app.homeController.home();
  });
  this.app = app;
}).call(this);
