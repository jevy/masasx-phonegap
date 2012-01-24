(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  window.Image = (function() {
    __extends(Image, Backbone.Model);
    function Image() {
      Image.__super__.constructor.apply(this, arguments);
    }
    Image.prototype.defaults = {
      "file_location": null
    };
    Image.prototype.capture = function() {
      return navigator.camera.getPicture(this.onPhotoURISuccess, this.onFail, {
        quality: 40,
        destinationType: Camera.DestinationType.FILE_URI
      });
    };
    Image.prototype.onFail = function(message) {
      return alert('Failed because: ' + message);
    };
    Image.prototype.onPhotoURISuccess = function(imageURI) {
      return this.file_location = imageURI;
    };
    return Image;
  })();
}).call(this);
