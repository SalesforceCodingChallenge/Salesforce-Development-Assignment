@isTest
public class ContactControllerTest {
    @isTest
    static void testGetContacts() {
        // Create test contacts
        List<Contact> testContacts = new List<Contact>();
        for (Integer i = 0; i < 5; i++) {
            testContacts.add(new Contact(FirstName = 'TestFirstName' + i, LastName = 'TestLastName' + i, Email = 'test' + i + '@example.com'));
        }
        insert testContacts;

        // Call the getContacts method
        List<Contact> contacts = ContactController.getContacts();

        // Verify that the returned contacts match the test contacts
        System.assertEquals(testContacts.size(), contacts.size(), 'Number of returned contacts should match the number of test contacts');
        for (Integer i = 0; i < testContacts.size(); i++) {
            System.assertEquals(testContacts[i].FirstName, contacts[i].FirstName, 'First name should match');
            System.assertEquals(testContacts[i].LastName, contacts[i].LastName, 'Last name should match');
            System.assertEquals(testContacts[i].Email, contacts[i].Email, 'Email should match');
        }
    }

    @isTest
    static void testGetContactsNoRecords() {
        // Call the getContacts method when no contacts exist
        List<Contact> contacts = ContactController.getContacts();

        // Verify that null is returned when no contacts are found
        System.assertEquals(null, contacts, 'Returned contacts should be null');
    }
}