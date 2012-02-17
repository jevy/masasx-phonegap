(function() {
  describe("MasasGeoRssFeed", function() {
    it("extracts for a single entry", function() {
      var entries, entry, feed, rawXML, user;
      rawXML = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><feed xmlns=\"http://www.w3.org/2005/Atom\" xmlns:georss=\"http://www.georss.org/georss\" xmlns:app=\"http://www.w3.org/2007/app\" xmlns:mec=\"masas:extension:control\" xmlns:age=\"http://purl.org/atompub/age/1.0\"><author><name>Sandbox2</name><uri>https://sandbox2.masas-sics.ca/hub</uri></author><generator version=\"0.2\">MASAS Hub</generator><id>https://sandbox2.masas-sics.ca/hub/feed</id><link href=\"https://sandbox2.masas-sics.ca/hub/feed\" rel=\"self\" /><title type=\"text\">Entries</title><updated>2012-02-15T21:07:52Z</updated><entry><author><name>Darrell O'Donnell</name><uri>https://sandbox2.masas-sics.ca/user/5</uri><email>darrell.odonnell@continuumloop.com</email></author><category label=\"Status\" scheme=\"masas:category:status\" term=\"Test\" /><category label=\"Severity\" scheme=\"masas:category:severity\" term=\"Extreme\" /><category label=\"Certainty\" scheme=\"masas:category:certainty\" term=\"Likely\" /><category label=\"Category\" scheme=\"masas:category:category\" term=\"Fire\" /><category label=\"Icon\" scheme=\"masas:category:icon\" term=\"ems/incident/fire/forestFire\" /><content type=\"xhtml\"><div xmlns=\"http://www.w3.org/1999/xhtml\"><div xml:lang=\"en\">At eggs</div></div></content><id>masas:entry:c286e671-0eee-488c-b262-d0e9d511dc5f</id><link href=\"https://sandbox2.masas-sics.ca/hub/feed/c286e671-0eee-488c-b262-d0e9d511dc5f\" rel=\"edit\" type=\"application/atom+xml;type=entry\" /><link href=\"https://sandbox2.masas-sics.ca/hub/feed/c286e671-0eee-488c-b262-d0e9d511dc5f/content\" rel=\"edit-media\" /><link href=\"https://sandbox2.masas-sics.ca/hub/feed/c286e671-0eee-488c-b262-d0e9d511dc5f/content/0\" length=\"267162\" rel=\"enclosure\" title=\"Image\" type=\"image/jpeg\" /><link href=\"https://sandbox2.masas-sics.ca/hub/feed/c286e671-0eee-488c-b262-d0e9d511dc5f/history\" rel=\"history\" type=\"application/atom+xml;type=feed\" /><published>2012-02-15T18:28:11Z</published><title type=\"xhtml\"><div xmlns=\"http://www.w3.org/1999/xhtml\"><div xml:lang=\"en\">Test</div></div></title><updated>2012-02-15T18:28:12Z</updated><app:edited>2012-02-15T18:28:12Z</app:edited><georss:point>45.416482 -75.700674</georss:point><age:expires>2012-02-22T05:00:00Z</age:expires></entry></feed>";
      user = new User();
      feed = new MasasGeoRssFeed();
      entries = feed.extractEntries(rawXML);
      entry = entries[0];
      expect(entry.get('displayHtml')).toMatch("At eggs");
      expect(entry.get('icon')).toMatch("http://icon.masas.ca/ems/incident/fire/forestFire/small.png");
      expect(entry.get('location').get('latitude')).toEqual(45.416482);
      return expect(entry.get('location').get('longitude')).toEqual(-75.700674);
    });
    it("extracts for multiple entries", function() {
      var entries, entry, feed, rawXML, user;
      rawXML = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><feed xmlns=\"http://www.w3.org/2005/Atom\" xmlns:georss=\"http://www.georss.org/georss\" xmlns:app=\"http://www.w3.org/2007/app\" xmlns:mec=\"masas:extension:control\" xmlns:age=\"http://purl.org/atompub/age/1.0\"><author><name>Sandbox2</name><uri>https://sandbox2.masas-sics.ca/hub</uri></author><generator version=\"0.2\">MASAS Hub</generator><id>https://sandbox2.masas-sics.ca/hub/feed</id><link href=\"https://sandbox2.masas-sics.ca/hub/feed\" rel=\"self\" /><title type=\"text\">Entries</title><updated>2012-02-15T21:07:52Z</updated><entry><author><name>Darrell O'Donnell</name><uri>https://sandbox2.masas-sics.ca/user/5</uri><email>darrell.odonnell@continuumloop.com</email></author><category label=\"Status\" scheme=\"masas:category:status\" term=\"Test\" /><category label=\"Severity\" scheme=\"masas:category:severity\" term=\"Extreme\" /><category label=\"Certainty\" scheme=\"masas:category:certainty\" term=\"Likely\" /><category label=\"Category\" scheme=\"masas:category:category\" term=\"Fire\" /><category label=\"Icon\" scheme=\"masas:category:icon\" term=\"ems/incident/fire/forestFire\" /><content type=\"xhtml\"><div xmlns=\"http://www.w3.org/1999/xhtml\"><div xml:lang=\"en\">At eggs</div></div></content><id>masas:entry:c286e671-0eee-488c-b262-d0e9d511dc5f</id><link href=\"https://sandbox2.masas-sics.ca/hub/feed/c286e671-0eee-488c-b262-d0e9d511dc5f\" rel=\"edit\" type=\"application/atom+xml;type=entry\" /><link href=\"https://sandbox2.masas-sics.ca/hub/feed/c286e671-0eee-488c-b262-d0e9d511dc5f/content\" rel=\"edit-media\" /><link href=\"https://sandbox2.masas-sics.ca/hub/feed/c286e671-0eee-488c-b262-d0e9d511dc5f/content/0\" length=\"267162\" rel=\"enclosure\" title=\"Image\" type=\"image/jpeg\" /><link href=\"https://sandbox2.masas-sics.ca/hub/feed/c286e671-0eee-488c-b262-d0e9d511dc5f/history\" rel=\"history\" type=\"application/atom+xml;type=feed\" /><published>2012-02-15T18:28:11Z</published><title type=\"xhtml\"><div xmlns=\"http://www.w3.org/1999/xhtml\"><div xml:lang=\"en\">Test</div></div></title><updated>2012-02-15T18:28:12Z</updated><app:edited>2012-02-15T18:28:12Z</app:edited><georss:point>45.416482 -75.700674</georss:point><age:expires>2012-02-22T05:00:00Z</age:expires></entry><entry><author><name>NRCan Earthquakes</name><uri>https://sandbox2.masas-sics.ca/user/2</uri><email>info@masas-sics.ca</email></author><category label=\"Certainty\" scheme=\"masas:category:certainty\" term=\"Likely\" /><category label=\"Category\" scheme=\"masas:category:category\" term=\"Geo\" /><category label=\"Severity\" scheme=\"masas:category:severity\" term=\"Unknown\" /><category label=\"Status\" scheme=\"masas:category:status\" term=\"Actual\" /><category label=\"Icon\" scheme=\"masas:category:icon\" term=\"ems/incident/geophysical/earthquake\" /><content type=\"xhtml\"><div xmlns=\"http://www.w3.org/1999/xhtml\"><div xml:lang=\"en\">Earthquakes Canada - Earthquake M=2.8 - 173 KM W OF CAMPBELL RIVER, B.C. - Thu Feb 16 12:07:08 GMT 2012</div><div xml:lang=\"fr\">Seismes Canada - Sisme M=2.8 - 173 KM O DE CAMPBELL RIVER, C.-B. - jeudi 16 fvrier 2012 12 h 07 min 08 s GMT</div></div></content><id>masas:entry:05105021-2e2d-4842-8b0e-1f24dc455118</id><link href=\"https://sandbox2.masas-sics.ca/hub/feed/05105021-2e2d-4842-8b0e-1f24dc455118\" rel=\"edit\" type=\"application/atom+xml;type=entry\" /><link href=\"https://sandbox2.masas-sics.ca/hub/feed/05105021-2e2d-4842-8b0e-1f24dc455118/content\" rel=\"edit-media\" /><link href=\"https://sandbox2.masas-sics.ca/hub/feed/05105021-2e2d-4842-8b0e-1f24dc455118/content/0\" length=\"6806\" rel=\"enclosure\" title=\"CAP\" type=\"application/common-alerting-protocol+xml\" /><published>2012-02-16T12:12:14Z</published><title type=\"xhtml\"><div xmlns=\"http://www.w3.org/1999/xhtml\"><div xml:lang=\"en\">Earthquake - Alert</div><div xml:lang=\"fr\">Tremblement de terre - Alert</div></div></title><updated>2012-02-16T12:12:14Z</updated><georss:point>50.28 -127.72</georss:point><age:expires>2012-02-17T00:07:08Z</age:expires></entry></feed>";
      user = new User();
      feed = new MasasGeoRssFeed();
      entries = feed.extractEntries(rawXML);
      entry = entries[1];
      expect(entry.get('displayHtml')).toMatch("Earthquakes Canada - Earthquake M=2.8 - 173 KM W OF CAMPBELL RIVER, B.C. - Thu Feb 16 12:07:08 GMT 2012");
      expect(entry.get('icon')).toMatch("http://icon.masas.ca/ems/incident/geophysical/earthquake/small.png");
      expect(entry.get('location').get('latitude')).toEqual(50.28);
      return expect(entry.get('location').get('longitude')).toEqual(-127.72);
    });
    return it("skips entries with polygons", function() {
      var entries, feed, rawXML, user;
      rawXML = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><feed xmlns=\"http://www.w3.org/2005/Atom\" xmlns:georss=\"http://www.georss.org/georss\" xmlns:app=\"http://www.w3.org/2007/app\" xmlns:mec=\"masas:extension:control\" xmlns:age=\"http://purl.org/atompub/age/1.0\"><author><name>Sandbox2</name><uri>https://sandbox2.masas-sics.ca/hub</uri></author><generator version=\"0.2\">MASAS Hub</generator><id>https://sandbox2.masas-sics.ca/hub/feed</id><link href=\"https://sandbox2.masas-sics.ca/hub/feed\" rel=\"self\" /><title type=\"text\">Entries</title><updated>2012-02-15T21:07:52Z</updated><entry><author><name>Darrell O'Donnell</name><uri>https://sandbox2.masas-sics.ca/user/5</uri><email>darrell.odonnell@continuumloop.com</email></author><category label=\"Status\" scheme=\"masas:category:status\" term=\"Test\" /><category label=\"Severity\" scheme=\"masas:category:severity\" term=\"Extreme\" /><category label=\"Certainty\" scheme=\"masas:category:certainty\" term=\"Likely\" /><category label=\"Category\" scheme=\"masas:category:category\" term=\"Fire\" /><category label=\"Icon\" scheme=\"masas:category:icon\" term=\"ems/incident/fire/forestFire\" /><content type=\"xhtml\"><div xmlns=\"http://www.w3.org/1999/xhtml\"><div xml:lang=\"en\">At eggs</div></div></content><id>masas:entry:c286e671-0eee-488c-b262-d0e9d511dc5f</id><link href=\"https://sandbox2.masas-sics.ca/hub/feed/c286e671-0eee-488c-b262-d0e9d511dc5f\" rel=\"edit\" type=\"application/atom+xml;type=entry\" /><link href=\"https://sandbox2.masas-sics.ca/hub/feed/c286e671-0eee-488c-b262-d0e9d511dc5f/content\" rel=\"edit-media\" /><link href=\"https://sandbox2.masas-sics.ca/hub/feed/c286e671-0eee-488c-b262-d0e9d511dc5f/content/0\" length=\"267162\" rel=\"enclosure\" title=\"Image\" type=\"image/jpeg\" /><link href=\"https://sandbox2.masas-sics.ca/hub/feed/c286e671-0eee-488c-b262-d0e9d511dc5f/history\" rel=\"history\" type=\"application/atom+xml;type=feed\" /><published>2012-02-15T18:28:11Z</published><title type=\"xhtml\"><div xmlns=\"http://www.w3.org/1999/xhtml\"><div xml:lang=\"en\">Test</div></div></title><updated>2012-02-15T18:28:12Z</updated><app:edited>2012-02-15T18:28:12Z</app:edited><georss:point>45.416482 -75.700674</georss:point><age:expires>2012-02-22T05:00:00Z</age:expires></entry><entry><author><name>NRCan Earthquakes</name><uri>https://sandbox2.masas-sics.ca/user/2</uri><email>info@masas-sics.ca</email></author><category label=\"Certainty\" scheme=\"masas:category:certainty\" term=\"Likely\" /><category label=\"Category\" scheme=\"masas:category:category\" term=\"Geo\" /><category label=\"Severity\" scheme=\"masas:category:severity\" term=\"Unknown\" /><category label=\"Status\" scheme=\"masas:category:status\" term=\"Actual\" /><category label=\"Icon\" scheme=\"masas:category:icon\" term=\"ems/incident/geophysical/earthquake\" /><content type=\"xhtml\"><div xmlns=\"http://www.w3.org/1999/xhtml\"><div xml:lang=\"en\">Earthquakes Canada - Earthquake M=2.8 - 173 KM W OF CAMPBELL RIVER, B.C. - Thu Feb 16 12:07:08 GMT 2012</div><div xml:lang=\"fr\">Seismes Canada - Sisme M=2.8 - 173 KM O DE CAMPBELL RIVER, C.-B. - jeudi 16 fvrier 2012 12 h 07 min 08 s GMT</div></div></content><id>masas:entry:05105021-2e2d-4842-8b0e-1f24dc455118</id><link href=\"https://sandbox2.masas-sics.ca/hub/feed/05105021-2e2d-4842-8b0e-1f24dc455118\" rel=\"edit\" type=\"application/atom+xml;type=entry\" /><link href=\"https://sandbox2.masas-sics.ca/hub/feed/05105021-2e2d-4842-8b0e-1f24dc455118/content\" rel=\"edit-media\" /><link href=\"https://sandbox2.masas-sics.ca/hub/feed/05105021-2e2d-4842-8b0e-1f24dc455118/content/0\" length=\"6806\" rel=\"enclosure\" title=\"CAP\" type=\"application/common-alerting-protocol+xml\" /><published>2012-02-16T12:12:14Z</published><title type=\"xhtml\"><div xmlns=\"http://www.w3.org/1999/xhtml\"><div xml:lang=\"en\">Earthquake - Alert</div><div xml:lang=\"fr\">Tremblement de terre - Alert</div></div></title><updated>2012-02-16T12:12:14Z</updated><georss:polygon>40.739310 -75.765790 40.832000 -75.915990</georss:polygon><age:expires>2012-02-17T00:07:08Z</age:expires></entry></feed>";
      user = new User();
      feed = new MasasGeoRssFeed();
      entries = feed.extractEntries(rawXML);
      return expect(entries.length).toBe(1);
    });
  });
}).call(this);