// import LoginPage from '../pageobjects/login.page.js'
// import AddAppointment from '../pageobjects/add.appointment.js'
// import logoutPage from '../pageobjects/logout.page.js';
// import verifyAppointment from '../pageobjects/verify.appointment.js';
// import detailAppointment from '../pageobjects/detail.appointment.js';

describe("My Login application", () => {
  before(function () {
    browser.url("/cgi-bin/cbgrn/grn.cgi/");
  });
  it("User1 creates a comment, Administrator likes it, User1 checks like", async () => {
    const myFirefoxBrowser = browser.getInstance("myFirefoxBrowser");
    const myEdgeBrowser = browser.getInstance("myEdgeBrowser");

    await Promise.all([
      //login user1 on firefox
      myFirefoxBrowser.call(async () => {
        await myFirefoxBrowser.$(`input[name='_account']`).setValue("user1");
        await myFirefoxBrowser.$(`input[name='_password']`).setValue("1");
        await myFirefoxBrowser.$(`.login_margin`).click();
      }),

      //login Administrator on edge
      myEdgeBrowser.call(async () => {
        await myEdgeBrowser
          .$(`input[name='_account']`)
          .setValue("Administrator");
        await myEdgeBrowser.$(`input[name='_password']`).setValue("cybozu");
        await myEdgeBrowser.$(`.login_margin`).click();
      }),
    ]);

    //create appointment by user1 in firefox
    await myFirefoxBrowser.url("/cgi-bin/cbgrn/grn.cgi/schedule/add");
    await myFirefoxBrowser.$(`#start_hour`).selectByAttribute("value", 7);
    await myFirefoxBrowser.$(`.fleft > input`).setValue("Test");
    await myFirefoxBrowser.$(`#keyword_user`).setValue("Administrator");
    await myFirefoxBrowser.$(`#searchbox-submit-user`).click();
    await myFirefoxBrowser.$(`#searchbox-submit-user`).click();
    await myFirefoxBrowser
      .$(`//*[@id='ul_selectlist_CID']//li//span[2][text()='Administrator']`)
      .waitForClickable();
    await myFirefoxBrowser
      .$(`//span[@id="spinner_selectlist_CID"]/img`)
      .waitForDisplayed({ reverse: true });
    await myFirefoxBrowser
      .$(`//*[@id='ul_selectlist_CID']//li//span[2][text()='Administrator']`)
      .click();
    await myFirefoxBrowser.$(`#btn_add_sUID`).click();
    await myFirefoxBrowser.$(`#schedule_submit_button a`).click();

    // verify appointment title in firefox
    await myFirefoxBrowser.$("#event_list > h2").waitForDisplayed();
    await expect(myFirefoxBrowser.$("#event_list > h2")).toHaveText("Test");

    //verify appointment attendees in firefox
    const attendeesArray = ["user1", "Administrator"];
    attendeesArray.forEach(async (attendee) => {
      await expect(
        myFirefoxBrowser.$(
          `//span[@class='user-grn']/a[contains(text(),'${attendee}')]`
        )
      ).toHaveTextContaining(attendee);
    });

    //verify appointment registrant in firefox
    await expect(myFirefoxBrowser.$(".mRight15 > a")).toHaveTextContaining(
      "user1"
    );

    //Add comment by user1 in firefox
    await myFirefoxBrowser.$("#data_editor_id").setValue("Test comment");
    await myFirefoxBrowser.$("#schedule_button_post a").click();

    //verify comment in firefox
    await expect(
      myFirefoxBrowser.$(".margin_all .format_contents:nth-child(1)")
    ).toHaveText("Test comment");

    //Like comment by Administrator in Edge
    await myEdgeBrowser.url("/cgi-bin/cbgrn/grn.cgi/schedule/index?");
    await myEdgeBrowser
      .$(`//*[@id="event_list"]//a[contains(text(),'Test')]`)
      .click();
    await expect(
      myEdgeBrowser.$(".margin_all .format_contents:nth-child(1)")
    ).toHaveText("Test comment");
    await myEdgeBrowser
      .$(
        ".comment_footer_space_grn .mRight15 .icon_reaction_sub_grn:nth-child(2)"
      )
      .click();
    await myEdgeBrowser
      .$(".comment_footer_space_grn .mRight15 .like_btn_font_grn")
      .waitForDisplayed();
    await myEdgeBrowser.url("/cgi-bin/cbgrn/grn.cgi/schedule/index?");

    //Check like and delete in firefox
    await myFirefoxBrowser.refresh();
    await expect(
      myFirefoxBrowser.$(
        ".comment_footer_space_grn .mRight15 .like_btn_font_grn"
      )
    ).toHaveText("1");
    await myFirefoxBrowser
      .$(`//*[@id="main_menu_part"]/div[1]/span[2]/span/a`)
      .click();
    await myFirefoxBrowser
      .$(`//*[@id="schedule/delete"]/table/tbody/tr[1]/td/div[2]/span/label`)
      .click();
    await myFirefoxBrowser.$(`//*[@id="schedule_button_save"]/a`).click();
  });
  after(async function () {
    // Log out in 2 browser
    await browser
      .$(
        "#smart_main_menu_part .menu_item:nth-child(1)"
      )
      .waitForDisplayed();
    await browser
      .$(
        ".cloudHeader-dropdownMenu-grn button[id='cloudHeader-userName-grn']"
      )
      .click();
    await browser.$("#com-header-logout-link").waitForClickable();
    await browser.$("#com-header-logout-link").click();
  });
});
