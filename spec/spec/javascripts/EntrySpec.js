(function() {
  describe("Entry", function() {
    it("can have values set on create", function() {
      var entry;
      entry = new window.Entry({
        status: 'Something'
      });
      return expect(entry.get('status')).toEqual('Something');
    });
    return describe(".generate_entry_xml", function() {
      var $xml, masas_entry;
      masas_entry = null;
      $xml = null;
      beforeEach(function() {
        var xmlDoc;
        masas_entry = new window.Entry({
          status: new Status({
            name: 'Test'
          }),
          severity: new Severity({
            name: 'Extreme'
          }),
          certainty: new Certainty({
            name: 'Possibly'
          }),
          category: new Category({
            name: 'Roadway',
            event_code: 'Transport'
          }),
          subcategory: new SubCategory({
            name: 'Hazardous Code',
            event_code: 'rdCondition'
          }),
          title: 'Some Test Post',
          description: 'My description',
          location: new window.GoogleGeolocation({
            longitude: -78.3,
            latitude: 45.8
          }),
          expires: '2011-11-11 11:11:12'
        });
        xmlDoc = $.parseXML(masas_entry.generate_entry_xml());
        return $xml = $(xmlDoc);
      });
      it("is bounded by an entry tag", function() {
        var $title;
        $title = $xml.find("entry");
        return expect($title.attr('xmlns')).toEqual("http://www.w3.org/2005/Atom");
      });
      it("has a status category", function() {
        var $category;
        $category = $xml.find("category[label='Status']");
        expect($category.attr('term')).toEqual("Test");
        return expect($category.attr('scheme')).toEqual("masas:category:status");
      });
      it("has a severity category", function() {
        var $category;
        $category = $xml.find("category[label='Severity']");
        expect($category.attr('term')).toEqual("Extreme");
        return expect($category.attr('scheme')).toEqual("masas:category:severity");
      });
      it("has a certainty category", function() {
        var $category;
        $category = $xml.find("category[label='Certainty']");
        expect($category.attr('term')).toEqual("Possibly");
        return expect($category.attr('scheme')).toEqual("masas:category:certainty");
      });
      it("has a 'category' category", function() {
        var $category;
        $category = $xml.find("category[label='Category']");
        expect($category.attr('term')).toEqual("Transport");
        return expect($category.attr('scheme')).toEqual("masas:category:category");
      });
      it("has an icon", function() {
        var $category;
        $category = $xml.find("category[label='Icon']");
        expect($category.attr('term')).toEqual("rdCondition");
        return expect($category.attr('scheme')).toEqual("masas:category:icon");
      });
      it("has a title", function() {
        var $title;
        $title = $xml.find("title");
        expect($title.attr('type')).toEqual("xhtml");
        expect($title.find('div').attr('xmlns')).toEqual("http://www.w3.org/1999/xhtml");
        expect($title.find('div').find('div').attr('xml:lang')).toEqual("en");
        return expect($title.find('div').find('div').text()).toEqual("Some Test Post");
      });
      it("has content", function() {
        var $content;
        $content = $xml.find("content");
        expect($content.attr('type')).toEqual("xhtml");
        expect($content.find('div').attr('xmlns')).toEqual("http://www.w3.org/1999/xhtml");
        expect($content.find('div').find('div').attr('xml:lang')).toEqual("en");
        return expect($content.find('div').find('div').text()).toEqual("My description");
      });
      it("has a point", function() {
        var $point;
        $point = $xml.find("point");
        expect($point.attr('xmlns')).toEqual("http://www.georss.org/georss");
        return expect($point.text()).toEqual("45.8 -78.3");
      });
      return it("expires", function() {
        var $expires;
        $expires = $xml.find("expires");
        expect($expires.attr('xmlns')).toEqual("http://purl.org/atompub/age/1.0");
        return expect($expires.text()).toEqual(Date.today().add(7).days().toISOString());
      });
    });
  });
}).call(this);
