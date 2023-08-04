public with sharing class ContactController {
    
    // Exposes a method to retrieve a list of contacts, which can be called from Lightning components
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts() {
        // Create a list to store Contact records
        List<Contact> ConList = new List<Contact>();
        
        // Query up to 2000 Contact records from the database, including their Id, FirstName, LastName, and Email fields
        ConList = [SELECT Id, FirstName, LastName, Email FROM Contact LIMIT 2000];
        
        // Check if any contacts were retrieved
        if (ConList.size() != 0) {
            // If contacts were found, return the list of contacts
            return ConList;
        } else {
            // If no contacts were found, return null
            return Null;
        }
    }
}