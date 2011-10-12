describe("Entry", function() {
    describe("Validations", function() {
        var entry;

        beforeEach(function() {
            entry = new Entry();
        });

        it("should create error if secret is less than 5 characters", function() {
            var eventSpy = sinon.spy();
            entry.bind("error", eventSpy);
            expect(entry.set({"secret": "3422"})).toBeFalsy();
            expect(eventSpy.calledOnce).toBeTruthy();
            expect(eventSpy.calledWith(
                entry, 
                "invalid secret added"
            )).toBeTruthy();
        });

        it("should not create error if secret is more than 5 characters", function() {
            expect(entry.set({"secret": "1234567"})).toBeTruthy();
        }); 

    });
});
