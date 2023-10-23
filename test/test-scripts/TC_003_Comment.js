import LoginPage from '../pageobjects/login.page.js'
import AddAppointment from '../pageobjects/add.appointment.js'
import logoutPage from '../pageobjects/logout.page.js';
import verifyAppointment from '../pageobjects/verify.appointment.js';
import detailAppointment from '../pageobjects/detail.appointment.js';


describe('My Login application', () => {
    before(function () {
        LoginPage.open()
        LoginPage.login('user1','1')
      });
    
      it('Create new appointment with user1 and comment', async () => {
        await AddAppointment.open()
        await AddAppointment.addappointment(7,'Test','Administrator')      
        await verifyAppointment.verifyappointment('user1','Administrator') 
        await detailAppointment.comment('comment1') 
        await detailAppointment.verifyComment('comment1') 

        await logoutPage.logout()
    })
      it('Like comment with Administrator', async () => {
        LoginPage.login('Administrator','cybozu')
        await detailAppointment.open()    
        await detailAppointment.likeComment('Test','comment1')   
        await logoutPage.logout()

    })
    it('Check like with user1', async () => {
      LoginPage.login('user1','1')
      await detailAppointment.open()    
      await detailAppointment.verifyLike('Test')    
      await detailAppointment.delete() 
      // await logoutPage.logout()
  })
    //   it('Like comment with Administrator', async () => {
    //     // LoginPage.login('Administrator','cybozu')
    //     // await detailAppointment.open()    
    //     // for(var i =0; i<=20; i++)
    //       await detailAppointment.delete() 
    //     // await logoutPage.logout()
    // })
      after(async function () {
        await logoutPage.logout()
        await browser.pause(1000)
      });

})


