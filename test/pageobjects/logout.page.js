import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LogoutPage extends Page {
    constructor(browserName) {
        super(browserName);
    }
    //get Button Delete Appointment
    get btnDeleteAppointment(){
        return this._browser.$('.menu_item:nth-child(2) a')
    }
    
    //Get Radio Delete Appointment
    get radioDeleteAppointment(){
        return this._browser.$(".radiobutton_base_grn input[id='1']");
    }

    //get Confirm Delete Appointment
    get confirmDeleteAppointment(){
        return this._browser.$('#schedule_button_save a');
    }
    //Get Icon User
    get selectIcon () {
        return this._browser.$(".cloudHeader-dropdownMenu-grn button[id='cloudHeader-userName-grn']");
    }
    //Get Button Logout
    get buttonLogout(){
        return this._browser.$('#com-header-logout-link');
    }
    get buttonNew(){
        return this._browser.$("#smart_main_menu_part .menu_item:nth-child(1)");
    }
    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async logout () {

        // await this.btnDeleteAppointment.click()
        // // await this.radioDeleteAppointment.click()
        // await this.confirmDeleteAppointment.click()
        // await this.confirmDeleteAppointment.waitForDisplayed({ reverse: true })
   
        
        await this.buttonNew.waitForDisplayed()
        await this.selectIcon.click()

        await this.buttonLogout.waitForClickable()
        await this.buttonLogout.click()
    }
}

export default LogoutPage;