(function() {
  describe("AttachmentImage", function() {
    it("saves the entry it is assigned on create", function() {
      var entry, image;
      entry = new Entry();
      image = new AttachmentImage({
        entry: entry
      });
      return expect(image.get('entry')).toNotBe(void 0);
    });
    return it("saves the edit url to the entry on save", function() {
      var entry, image, mock_upload_result;
      mock_upload_result = Object();
      mock_upload_result.response = 'http://theedituri';
      entry = new Entry();
      entry.updateOnMasas = function() {
        return 'stub';
      };
      image = new AttachmentImage({
        entry: entry
      });
      image.uploadSuccess(mock_upload_result);
      return expect(entry.get('edit_uri')).toMatch('http://theedituri');
    });
  });
}).call(this);
