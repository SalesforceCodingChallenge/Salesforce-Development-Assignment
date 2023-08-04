import { LightningElement, wire, api, track } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';

const columns = [
{ label: 'First Name', fieldName: 'FirstName'},
{ label: 'Last Name', fieldName: 'LastName' },
{ label: 'Email', fieldName: 'Email'}
];

export default class ContactList extends LightningElement {

@track error;
@track data;
@track isContactAvailable;
result;
@track page = 1; 
@track items = []; 
@track data = []; 
@track columns; 
@track startingRecord = 1;
@track endingRecord = 0; 
@track pageSize = 10; 
@track totalRecountCount = 0;
@track totalPage = 0;
isPageChanged = false;

@wire(getContacts)
wiredContacts({ error, data }) {
    if (data != null) {
        this.data = data; 
        this.processRecords(data);
        this.isContactAvailable = true;
        this.error = undefined;
    }else if (data == null) {
        this.isContactAvailable = false;
        this.error = error;
        this.data = undefined;
    }
        else if (error) {
        this.error = error;
        this.data = undefined;
    }
}

processRecords(data){
    this.items = data;
        this.totalRecountCount = data.length; 
        this.totalPage = Math.ceil(this.totalRecountCount / this.pageSize); 
        
        this.data = this.items.slice(0,this.pageSize); 
        this.endingRecord = this.pageSize;
        this.columns = columns;
}
//clicking on previous button this method will be called
previousHandler() {
    this.isPageChanged = true;
    if (this.page > 1) {
        this.page = this.page - 1; //decrease page by 1
        this.displayRecordPerPage(this.page);
    }
        
}

//clicking on next button this method will be called
nextHandler() {
    this.isPageChanged = true;
    if((this.page<this.totalPage) && this.page !== this.totalPage){
        this.page = this.page + 1; //increase page by 1
        this.displayRecordPerPage(this.page);            
    }
}

//this method displays records page by page
displayRecordPerPage(page){

    this.startingRecord = ((page -1) * this.pageSize) ;
    this.endingRecord = (this.pageSize * page);

    this.endingRecord = (this.endingRecord > this.totalRecountCount) 
                        ? this.totalRecountCount : this.endingRecord; 

    this.data = this.items.slice(this.startingRecord, this.endingRecord);
    this.startingRecord = this.startingRecord + 1;
}    


}