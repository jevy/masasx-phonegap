(function() {
  describe("Status", function() {
    return it("can have a name and id on create", function() {
      var status;
      status = new window.Status({
        id: 0,
        name: 'Test'
      });
      expect(status.get('name')).toEqual('Test');
      return expect(status.get('id')).toEqual(0);
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
      expect(statuses.length).toEqual(2);
      return expect(statuses.at(0) instanceof window.Status).toBeTruthy();
    });
  });
}).call(this);
