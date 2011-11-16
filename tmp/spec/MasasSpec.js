describe("MasasEntry", function() {
    describe(".post_xml", function() {
        it("contains the status", function() {
            var masas = new MasasEntry;
            var rawXml = MasasEntry.post_xml("Test");
            var xmlDoc = $($.parseXML(xml));
            expect($xmlDoc.find("status")).toEqual("Test");
        });
        it("returns true", function() {
            expect(true).toBeTruthy
        });
    });

    describe(".post", function() {
        it("calls the MASAS server", function() {
            expect(false).toBeTruthy    
        });
    });
});
