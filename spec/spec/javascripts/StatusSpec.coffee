describe "Status", ->
    it "can have a name on create", ->
        status = new window.Status({name: 'Test'})
        expect(status.get('name')).toEqual('Test')

describe "Statuses", ->
    it "has two models", ->
        statuses = new window.Statuses([new Status({name: 'Test'}), new Status({name: 'Actual'})])
        expect(statuses.length).toEqual(2)
