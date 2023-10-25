import LoginPage from "../pageobjects/login.page.js";
import AddAppointment from "../pageobjects/add.appointment.js";
import logoutPage from "../pageobjects/logout.page.js";
import verifyAppointment from "../pageobjects/verify.appointment.js";
import detailAppointment from "../pageobjects/detail.appointment.js";
import LogoutPage from "../pageobjects/logout.page.js";

describe("My Login application", () => {
  before(async function () {
    const OpenBothBrowser = new LoginPage();
    await OpenBothBrowser.open();
  });
  it("User1 creates a comment, Administrator likes it, User1 checks like", async () => {

    // Login to user
    const loginPageFirefox = new LoginPage("myFirefoxBrowser");
    const loginPageEdge = new LoginPage("myEdgeBrowser");
    await Promise.all([
      loginPageFirefox.login("user1", "1"),
      loginPageEdge.login("Administrator", "cybozu"),
    ]);

    //create appointment by user1 in firefox
    const AddAptPageFirefox = new AddAppointment("myFirefoxBrowser");
    await AddAptPageFirefox.open();
    await AddAptPageFirefox.addappointment(10,"Test","Administrator")

    // verify appointment in firefox
    const VerifyAptPageFirefox = new verifyAppointment("myFirefoxBrowser");
    await VerifyAptPageFirefox.verifyappointment("user1","Administrator");

    //Add comment by user1 in firefox
    const AddCmtPageFirefox = new detailAppointment("myFirefoxBrowser");
    await AddCmtPageFirefox.comment("Test Comment")

    //verify comment in firefox
    await AddCmtPageFirefox.verifyComment("Test Comment")

    //Like comment by Administrator in Edge
    const LikeCmtPageEdge = new detailAppointment("myEdgeBrowser");
    await LikeCmtPageEdge.open()
    await LikeCmtPageEdge.likeComment("Test","Test Comment")

    //Check like and delete in firefox
    await browser.getInstance("myFirefoxBrowser").refresh();
    await AddCmtPageFirefox.verifyLike("Test")
    await AddCmtPageFirefox.delete()
  });
  after(async function () {
    // Log out in 2 browser
    const OpenBothBrowser = new LogoutPage();
    await OpenBothBrowser.logout();
  });
});
