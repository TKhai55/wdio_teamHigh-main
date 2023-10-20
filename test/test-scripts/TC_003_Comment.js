import LoginPage from '../pageobjects/login.page.js'
import AddAppointment from '../pageobjects/add.appointment.js'
import logoutPage from '../pageobjects/logout.page.js';
import verifyAppointment from '../pageobjects/verify.appointment.js';

// import SecurePage from '../pageobjects/secure.page.js'

describe('My Login application', () => {
    before(function () {
        LoginPage.open()
        LoginPage.login('user1','1')
      });
    
      it('Create new appointment with user1', async () => {
        await AddAppointment.open()
        await AddAppointment.addappointment(7,'Test','Administrator')      
        await verifyAppointment.verifyappointment('user1','Administrator') 
        await logoutPage.logout()
    })
      after(async function () {
        await logoutPage.logout()
        await browser.pause(1000)
      });

})


