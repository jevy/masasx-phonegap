describe("MasasEntry", function() {
    var masas_entry;

    beforeEach(function() {
        masas_entry = new MasasEntry();
    });
    
    it("returns the xml", function() {
        expect(masas_entry.post_xml()).toEqual("<xml></xml>");
    });
});
