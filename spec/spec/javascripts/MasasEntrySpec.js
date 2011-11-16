describe("MasasEntry", function() {
  describe(".generate_entry_xml", function() {
    var masas_entry;

    beforeEach(function() {
        masas_entry = new MasasEntry();
    });
    
    it("is bounded by an entry tag", function() {
      xmlDoc = $.parseXML( masas_entry.generate_entry_xml() ),
      $xml = $( xmlDoc ),
      $title = $xml.find( "entry" );
      expect($title.attr('xmlns')).toEqual("http://www.w3.org/2005/Atom");
    });

    it("has a status category", function() {
      xmlDoc = $.parseXML( masas_entry.generate_entry_xml() ),
      $xml = $( xmlDoc ),
      $category = $xml.find( "category[label='Status']" );
      expect($category.attr('term')).toEqual("Test");
      expect($category.attr('scheme')).toEqual("http://masas.ca/categories/status");
    });

    it("has a severity category", function() {
      xmlDoc = $.parseXML( masas_entry.generate_entry_xml() ),
      $xml = $( xmlDoc ),
      $category = $xml.find( "category[label='Severity']" );
      expect($category.attr('term')).toEqual("Minor");
      expect($category.attr('scheme')).toEqual("http://masas.ca/categories/severity");
    });

    it("has a certainty category", function() {
      xmlDoc = $.parseXML( masas_entry.generate_entry_xml() ),
      $xml = $( xmlDoc ),
      $category = $xml.find( "category[label='Certainty']" );
      expect($category.attr('term')).toEqual("Observed");
      expect($category.attr('scheme')).toEqual("http://masas.ca/categories/certainty");
    });

    it("has a 'category' category", function() {
      xmlDoc = $.parseXML( masas_entry.generate_entry_xml() ),
      $xml = $( xmlDoc ),
      $category = $xml.find( "category[label='Category']" );
      expect($category.attr('term')).toEqual("Other");
      expect($category.attr('scheme')).toEqual("http://masas.ca/categories/category");
    });

    it("has an icon", function() {
      xmlDoc = $.parseXML( masas_entry.generate_entry_xml() ),
      $xml = $( xmlDoc ),
      $category = $xml.find( "category[label='Icon']" );
      expect($category.attr('term')).toEqual("incident/roadway");
      expect($category.attr('scheme')).toEqual("http://masas.ca/categories/icon");
    });

    it("has a title", function() {
      xmlDoc = $.parseXML( masas_entry.generate_entry_xml() ),
      $xml = $( xmlDoc ),
      $title = $xml.find( "title" );
      expect($title.attr('type')).toEqual("xhtml");
      expect($title.find('div').attr('xmlns')).toEqual("http://www.w3.org/1999/xhtml");
      expect($title.find('div').find('div').attr('xml:lang')).toEqual("en");
      expect($title.find('div').find('div').text()).toEqual("My Test Post");
    });

    it("has content", function() {
      xmlDoc = $.parseXML( masas_entry.generate_entry_xml() ),
      $xml = $( xmlDoc ),
      $content = $xml.find( "content" );
      expect($content.attr('type')).toEqual("xhtml");
      expect($content.find('div').attr('xmlns')).toEqual("http://www.w3.org/1999/xhtml");
      expect($content.find('div').find('div').attr('xml:lang')).toEqual("en");
      expect($content.find('div').find('div').text()).toEqual("Description of the event");
    });

    it("has a point", function() {
      xmlDoc = $.parseXML( masas_entry.generate_entry_xml() ),
      $xml = $( xmlDoc ),
      $point = $xml.find( "point" );
      expect($point.attr('xmlns')).toEqual("http://www.georss.org/georss");
      expect($point.text()).toEqual("45.8 -78.2");
    });

    it("expires", function() {
      xmlDoc = $.parseXML( masas_entry.generate_entry_xml() ),
      $xml = $( xmlDoc ),
      $expires = $xml.find( "expires" );
      expect($expires.attr('xmlns')).toEqual("http://purl.org/atompub/age/1.0");
      expect($expires.text()).toEqual("2011-11-11 11:11:11");
    });
  });
});
