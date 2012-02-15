describe "AttachmentImage", ->

    it "saves the entry it is assigned on create", ->
        entry = new Entry()
        image = new AttachmentImage({entry:entry})
        expect(image.get('entry')).toNotBe undefined

    it "saves the edit url to the entry on save", ->
        mock_upload_result = Object()
        mock_upload_result.response = 'http://theedituri'

        entry = new Entry()
        entry.updateOnMasas = -> 'stub'
        image = new AttachmentImage({entry:entry})
        image.uploadSuccess(mock_upload_result)
        expect(entry.get('edit_uri')).toMatch 'http://theedituri'
        
