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
      this.uploadImage = __bind(this.uploadImage, this);
      this.onPhotoURISuccess = __bind(this.onPhotoURISuccess, this);
      this.onFail = __bind(this.onFail, this);
      this.capture = __bind(this.capture, this);
      Image.__super__.constructor.apply(this, arguments);
    }
    Image.prototype.defaults = {
      "file_location": null
    };
    Image.prototype.initialize = function(entry_for_image) {
      return this.set({
        entry: entry_for_image
      });
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
      var file_uri, ft, options;
      alert('About to upload');
      options = new FileUploadOptions();
      options.fileName = 'image.jpeg';
      options.mimeType = 'image/jpeg';
      file_uri = this.get('file_location');
      alert('Passed options');
      ft = new FileTransfer();
      ft.upload(file_uri, 'https://sandbox2.masas-sics.ca/hub/feed?secret=' + app.currentAccessCode, this.uploadSuccess, this.uploadFail, options);
      return alert('Done upload');
    };
    Image.prototype.uploadSuccess = function(r) {
      return alert(r.response);
    };
    Image.prototype.uploadFail = function(error) {
      return alert('upload failed because: ' + error.code);
    };
    return Image;
  })();
}).call(this);