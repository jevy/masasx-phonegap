function MasasEntry() {
}

MasasEntry.prototype.generate_entry_xml = function() {
    return "<?xml version=\"1.0\" encoding=\"UTF-8\"?><entry xmlns=\"http://www.w3.org/2005/Atom\">" +
      "<category label=\"Status\" scheme=\"http://masas.ca/categories/status\" term=\"Test\" />" +
      "<category label=\"Severity\" scheme=\"http://masas.ca/categories/severity\" term=\"Minor\" />" +
      "<category label=\"Certainty\" scheme=\"http://masas.ca/categories/certainty\" term=\"Observed\" />" +
      "<category label=\"Category\" scheme=\"http://masas.ca/categories/category\" term=\"Other\" />" +
      "<category label=\"Icon\" scheme=\"http://masas.ca/categories/icon\" term=\"incident/roadway\" />" +
      "<title type=\"xhtml\"/>" +
      "</entry>";
};
