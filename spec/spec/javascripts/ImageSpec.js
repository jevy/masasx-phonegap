(function() {
  describe("Image", function() {
    it("saves the entry it is assigned on create", function() {
      var entry, image;
      entry = new Entry();
      image = new Image(entry);
      return expect(image.get('entry')).toNotBe(null);
    });
    return it("saves the edit url to the entry on save", function() {
      var entry, image;
      entry = new Entry();
      image = new Image(entry);
      mock(response).response = 'http://theedituri';
      image.uploadSuccess(mock_response);
      return expect(entry.get('editUri')).toMatch('http://sandbox');
    });
  });
}).call(this);
