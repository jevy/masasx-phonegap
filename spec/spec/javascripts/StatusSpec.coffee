describe "Status", ->
    it "can have a name and id on create", ->
        status = new window.Status({id: 0, name: 'Test'})
        expect(status.get('name')).toEqual('Test')
        expect(status.get('id')).toEqual(0)

describe "Statuses", ->
    it "has two models", ->
        statuses = new window.Statuses([new Status({name: 'Test'}), new Status({name: 'Actual'})])
        expect(statuses.length).toEqual(2)
        expect(statuses.at(0) instanceof window.Status).toBeTruthy();
