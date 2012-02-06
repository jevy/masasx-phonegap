(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
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
      this.uploadSuccess = __bind(this.uploadSuccess, this);
      this.uploadImage = __bind(this.uploadImage, this);
      this.onPhotoURISuccess = __bind(this.onPhotoURISuccess, this);
      this.onFail = __bind(this.onFail, this);
      this.capture = __bind(this.capture, this);
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
      this.set({
        file_location: imageURI
      });
      return this.get('entry').set({
        image: this
      });
    };
    Image.prototype.uploadImage = function() {
      var file_uri, ft, options, params, user;
      options = new FileUploadOptions();
      options.fileName = 'image.jpeg';
      options.mimeType = 'image/jpeg';
      params = new Object();
      params.access_code = "iab6m5";
      options.params = params;
      file_uri = this.get('file_location');
      user = new User();
      ft = new FileTransfer();
      return ft.upload(file_uri, 'http://masasproxy.quickjack.ca/upload', this.uploadSuccess, this.uploadFail, options);
    };
    Image.prototype.uploadSuccess = function(r) {
      this.get('entry').set({
        edit_uri: r.response
      });
      return this.get('entry').updateOnMasas();
    };
    Image.prototype.uploadFail = function(error) {
      return alert('upload failed because: ' + error.code);
    };
    return Image;
  })();
}).call(this);
