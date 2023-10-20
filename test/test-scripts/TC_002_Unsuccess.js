import LoginPage from '../pageobjects/login.page.js'
import addAppointmentUnsuccess from '../pageobjects/add.appointment.unsuccess.js';

// import SecurePage from '../pageobjects/secure.page.js'

describe('My Login application', () => {
    before(async function () {
        await LoginPage.open()
        await LoginPage.login('Administrator','cybozu')
      });

      it('Should login with valid credentials', async () => {
        
        await browser.pause(2000);
        await addAppointmentUnsuccess.open();
        await addAppointmentUnsuccess.appointment('2013','9','TEST');
  
        await addAppointmentUnsuccess.addAppointment();
  
        //verify
        await expect(addAppointmentUnsuccess.errCode).toHaveTextContaining('GRN_SCHD_13012');
        await expect(addAppointmentUnsuccess.errMessage).toHaveTextContaining('Date and time are invalid');
  
        await addAppointmentUnsuccess.acceptAlert();
        await browser.pause(1000)
    })
  
})


