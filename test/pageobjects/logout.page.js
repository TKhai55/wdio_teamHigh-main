import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LogoutPage extends Page {
   
    //get Button Delete Appointment
    get btnDeleteAppointment(){
        return $('.menu_item:nth-child(2) a')
    }
    
    //Get Radio Delete Appointment
    get radioDeleteAppointment(){
        return $(".radiobutton_base_grn input[id='1']");
    }

    //get Confirm Delete Appointment
    get confirmDeleteAppointment(){
        return $('#schedule_button_save a');
    }
    //Get Icon User
    get selectIcon () {
        return $(".cloudHeader-dropdownMenu-grn button[id='cloudHeader-userName-grn']");
    }
    //Get Button Logout
    get buttonLogout(){
        return $('#com-header-logout-link');
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
        
        await this.selectIcon.waitForDisplayed()
        await this.selectIcon.click()

        await this.buttonLogout.click()
    }
}

export default new LogoutPage();