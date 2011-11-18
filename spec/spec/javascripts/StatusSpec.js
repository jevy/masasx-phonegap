(function() {
  describe("Status", function() {
    return it("can have a name on create", function() {
      var status;
      status = new window.Status({
        name: 'Test'
      });
      return expect(status.get('name')).toEqual('Test');
    });
  });
  describe("Statuses", function() {
    return it("has two models", function() {
      var statuses;
      statuses = new window.Statuses([
        new Status({
          name: 'Test'
        }), new Status({
          name: 'Actual'
        })
      ]);
      return expect(statuses.length).toEqual(2);
    });
  });
}).call(this);
