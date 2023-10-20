import LoginPage from '../pageobjects/login.page.js'
import AddAppointment from '../pageobjects/add.appointment.js'
import VerifyAppointment from '../pageobjects/verify.appointment.js';
import logoutPage from '../pageobjects/logout.page.js';

// import SecurePage from '../pageobjects/secure.page.js'

describe('My Login application', () => {
    before(function () {
        LoginPage.open()
        LoginPage.login('Administrator','cybozu')
      });
    
      it('should login with valid credentials', async () => {
        await AddAppointment.open()
        await AddAppointment.addappointment(7,'Test')
        await VerifyAppointment.verifyappointment()
        
    })
      after(async function () {
        await logoutPage.logout()
        await browser.pause(1000)
      });

})


