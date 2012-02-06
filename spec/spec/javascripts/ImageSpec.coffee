describe "Image", ->

    it "saves the entry it is assigned on create", ->
        entry = new Entry()
        image = new Image(entry)
        expect(image.get('entry')).toNotBe null

    it "saves the edit url to the entry on save", ->
        entry = new Entry()
        image = new Image(entry)
        mock(response).response = 'http://theedituri'
        image.uploadSuccess(mock_response)
        expect(entry.get('editUri')).toMatch 'http://sandbox'
        
