describe "Entry", ->
    it "can be created", ->
        entry = new window.Entry()

    describe ".generate_entry_xml", ->
        masas_entry = null
        $xml = null

        beforeEach ->
            masas_entry = new window.Entry()
            xmlDoc = $.parseXML( masas_entry.generate_entry_xml() )
            $xml = $( xmlDoc )

        it "is bounded by an entry tag", ->
            $title = $xml.find "entry"
            expect($title.attr('xmlns')).toEqual("http://www.w3.org/2005/Atom")

        it "has a status category", ->
            $category = $xml.find( "category[label='Status']" )
            expect($category.attr('term')).toEqual("Test")
            expect($category.attr('scheme')).toEqual("http://masas.ca/categories/status")

        it "has a severity category", ->
            $category = $xml.find( "category[label='Severity']" )
            expect($category.attr('term')).toEqual("Minor")
            expect($category.attr('scheme')).toEqual("http://masas.ca/categories/severity")

        it "has a certainty category", ->
            $category = $xml.find( "category[label='Certainty']" )
            expect($category.attr('term')).toEqual("Observed")
            expect($category.attr('scheme')).toEqual("http://masas.ca/categories/certainty")
        
        it "has a 'category' category", ->
            $category = $xml.find( "category[label='Category']" )
            expect($category.attr('term')).toEqual("Other")
            expect($category.attr('scheme')).toEqual("http://masas.ca/categories/category")

        it "has an icon", ->
            $category = $xml.find( "category[label='Icon']" )
            expect($category.attr('term')).toEqual("incident/roadway")
            expect($category.attr('scheme')).toEqual("http://masas.ca/categories/icon")

        it "has a title", ->
            $title = $xml.find( "title" )
            expect($title.attr('type')).toEqual("xhtml")
            expect($title.find('div').attr('xmlns')).toEqual("http://www.w3.org/1999/xhtml")
            expect($title.find('div').find('div').attr('xml:lang')).toEqual("en")
            expect($title.find('div').find('div').text()).toEqual("My Test Post")

        it "has content", ->
            $content = $xml.find( "content" )
            expect($content.attr('type')).toEqual("xhtml")
            expect($content.find('div').attr('xmlns')).toEqual("http://www.w3.org/1999/xhtml")
            expect($content.find('div').find('div').attr('xml:lang')).toEqual("en")
            expect($content.find('div').find('div').text()).toEqual("Description of the event")

        it "has a point", ->
            $point = $xml.find( "point" )
            expect($point.attr('xmlns')).toEqual("http://www.georss.org/georss")
            expect($point.text()).toEqual("45.8 -78.2")

        it "expires", ->
            $expires = $xml.find( "expires" )
            expect($expires.attr('xmlns')).toEqual("http://purl.org/atompub/age/1.0")
            expect($expires.text()).toEqual("2011-11-11 11:11:11")
