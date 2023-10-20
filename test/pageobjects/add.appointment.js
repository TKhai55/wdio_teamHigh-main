import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class AddAppointment extends Page {
   
    //get element StartHour
    get selectStartHour () {
        return $('#start_hour');
    }
    //get element Title
    get txtTitle(){
        return $('.fleft > input');
    }

    
    get inputAttendees() {
        return $('#keyword_user');
    }

    get btnSearch() {
        return $('#searchbox-submit-user');
    }
    get btnAddAttendees() {
        return $('#btn_add_sUID');
    }
    get SpinnerSearch(){
        return $('//span[@id="spinner_selectlist_CID"]/img');
    }
    //get element Add Attendees (u3)
    // get selectUser(){
    //     return $('#selectlist_CID_member_user_30 > .selectlist_text_grn');
    // }
    // get btnAddUser(){
    //     return $('#btn_add_sUID');
    // }
    //get element Facilities (HA GIANG)
    // get selectFacilities(){
    //     return $('.selectlist_text2_grn');
    // }
    // get btnAddFacilities(){
    //     return $('#btn_add_cITEM');
    // }

    //get element Add appointment
    get btnAddAppointment(){
        return $('#schedule_submit_button a');
    }
    
    chooseAttendees(user) {
        return $(`//*[@id='ul_selectlist_CID']//li//span[2][text()='${user}']`);
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

        //add Facilities
        // await this.selectFacilities.click();
        // await this.btnAddFacilities.click();

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

export default new AddAppointment();