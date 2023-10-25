import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class AddAppointment extends Page {
   
    constructor(browserName) {
        super(browserName);
    }

    //get element StartHour
    get selectStartHour () {
        return this._browser.$('#start_hour');
    }
    //get element Title
    get txtTitle(){
        return this._browser.$('.fleft > input');
    }

    
    get inputAttendees() {
        return this._browser.$('#keyword_user');
    }

    get btnSearch() {
        return this._browser.$('#searchbox-submit-user');
    }
    get btnAddAttendees() {
        return this._browser.$('#btn_add_sUID');
    }
    get SpinnerSearch(){
        return this._browser.$('//span[@id="spinner_selectlist_CID"]/img');
    }
    //get element Add appointment
    get btnAddAppointment(){
        return this._browser.$('#schedule_submit_button a');
    }
    
    chooseAttendees(user) {
        return this._browser.$(`//*[@id='ul_selectlist_CID']//li//span[2][text()='${user}']`);
    }

    async searchAttendee(user) {
        await this.inputAttendees.setValue(user);
        await this.btnSearch.click();
        await this.chooseAttendees(user).waitForClickable();
        await this.SpinnerSearch.waitForDisplayed({ reverse: true });
        await this.chooseAttendees(user).click();
    }

    async addAttendees() {
        await this.btnAddAttendees.click();
    }
   /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async addappointment (start_hour,title_app,attendee) {
        //select Hour
        await this.selectStartHour.selectByAttribute('value',start_hour);

        //type Title
        await this.txtTitle.setValue(title_app);

        //click btn Add Appoinment
        await this.searchAttendee(attendee);
        await this.addAttendees();
        await this.btnAddAppointment.click();
    }
    

    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        
        return super.open('schedule/add');
    }
}

export default AddAppointment;