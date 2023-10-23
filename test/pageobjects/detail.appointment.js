import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class DetailAppointment extends Page {
   
    //get element StartHour
    get textBox () {
        return $('#data_editor_id');
    }
    //get element Title
    get postBtn(){
        return $('#schedule_button_post a');
    }

    get attendeeComment(){
        return $('.margin_all .format_contents:nth-child(1)');
    }
     openAppointment(title){
        return $(`//*[@id="event_list"]//a[contains(text(),'${title}')]`);
    }

    get likeBtn(){
        return $('.comment_footer_space_grn .mRight15 .icon_reaction_sub_grn:nth-child(2)');
    }
    get numLikeBtn(){
        return $('.comment_footer_space_grn .mRight15 .like_btn_font_grn');
    }
    
    get deleteBtn(){
        return $('//*[@id="main_menu_part"]/div[1]/span[2]/span/a');
    }
    get radioBtn(){
        return $('//*[@id="schedule/delete"]/table/tbody/tr[1]/td/div[2]/span/label');
    }
    get deleteAptBtn(){
        return $('//*[@id="schedule_button_save"]/a');
    }
    // attendeeComment(comment) {
    //     return $(`//*[@class="margin_all"]/div/pre[text()="${comment}"]`);
    // }


    async comment (comment) {
        //comment
        await this.textBox.setValue(comment);

        //post comment
        await this.postBtn.click();
    }

    async verifyComment (comment) {
        //comment
        await expect(this.attendeeComment).toHaveText(comment);

    }

    async verifyLike (title) {
        await this.openAppointment(title).click();

        //comment
        await expect(this.numLikeBtn).toHaveText("1");

    }

    async likeComment (title,comment) {
        //open apt
        await this.openAppointment(title).click();
        await this.verifyComment (comment);
        await this.likeBtn.click();


    }

    async delete () {
        //comment
        // await this.openAppointment("Test").click();
        
        await this.deleteBtn.click();
        await this.radioBtn.click();
        await this.deleteAptBtn.click();

        


    }

    open () {
        
        return super.open('schedule/index?');
    }
}

export default new DetailAppointment();