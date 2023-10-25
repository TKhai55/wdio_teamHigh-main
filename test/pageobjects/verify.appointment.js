import Page from './page.js';
import assert from 'assert';
/**
 * sub page containing specific selectors and methods for a specific page
 */
class VerifyAppointment extends Page {
    constructor(browserName) {
        super(browserName);
    }
    //get element Title
    get txtTitle () {
        return this._browser.$('#event_list > h2');
    }

    get txtAppointmentDetails () {
        return this._browser.$('.globalNavi-item-last-grn');
    }
    get txtDateandTime(){
        return this._browser.$('.schedule_text_noticeable_grn');
    }
    get txtFacilities(){
        return this._browser.$('.facility-grn >a');
    }
    get txtAttendees(){
        return this._browser.$('.user-grn>a');
    }
    get Registrant() {
        return this._browser.$(".mRight15 > a");
    }
    
    Attendees(user){
        return this._browser.$(`//span[@class='user-grn']/a[contains(text(),'${user}')]`);
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async verifyappointment (register, attendee) {
        await myFirefoxBrowser.$("#event_list > h2").waitForDisplayed();

        // const url = await browser.getUrl();
        // await assert.strictEqual(url.includes('event='), true);

        await expect(this.txtTitle).toHaveText('Test');

        // await expect(this.txtAppointmentDetails).toHaveText('Appointment details');
        // await expect(this.txtDateandTime).toHaveText(this.getlocaldate());
        // await expect(this.txtFacilities).toHaveText('HA GIANG');
        // await expect(this.txtAttendees).toHaveText('Administrator'); 

        //verify attendees
                const attendeesArray = [register, attendee];
                attendeesArray.forEach(async attendee => {
                    const num = await this.Attendees(attendee);    
                    await expect(num).toHaveTextContaining(attendee);
                    console.log(await num.getText());
                });
            
        //verify registrant
                const registrant = await this.Registrant;
                await expect(registrant).toHaveTextContaining(register);
                console.log(await registrant.getText());
    }
    
    getlocaldate() {
        const d= new Date();  
        var month = d.toLocaleString('default', { month: 'long' }); 
        var day=(d.getDate()<10)?'0'+(d.getDate()):(d.getDate()); 
        var current_day= d.getDay(); var day_name =''; 
        switch (current_day) { 
            case 0:     day_name = "Sun";     break; 
            case 1:     day_name = "Mon";     break; 
            case 2:     day_name = "Tue";     break; 
            case 3:     day_name = "Wed";     break; 
            case 4:     day_name = "Thu";     break; 
            case 5:     day_name = "Fri";     break; 
            case 6:     day_name = "Sat"; } 
            return day_name+", "+month+" "+day + ", "+ d.getFullYear()+"07:00  -  08:00";
    }

    // verify URL include 'event='
    async isEventUrl() {
        const url = await browser.getUrl();
        return url.includes('event=');
    }
}

export default VerifyAppointment;