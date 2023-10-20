import { $ } from '@wdio/globals'
import Page from './page.js';


const END_YEAR_SELECTOR = '#end_year';
const START_HOUR_SELECTOR = '#start_hour';

const SUBJECT = '.event_add_base_grn > div > input';


const USER_SELECTOR = '#keyword_user';
const SEARCH = '#searchbox-submit-user';

const ADD_ATTENDEES_BTN = '#btn_add_sUID';

const FACILITY_SELECTOR = '#keyword_facilities';
const ADD_FACILITY_BTN = '#btn_add_cITEM';

const ADD_APPOINTMENT_BTN = '#schedule_submit_button > a';
const ALERT = '#invalid_date';

const ERR_CODE = '.bold:nth-child(2)';
const ERR_MESSAGE = '.error_diagnosis';
const OK_BTN = '#msgbox_btn_ok>a';


class AddAppointmentUnsuccess extends Page {

    
    get inputEndYear() {
        return $(END_YEAR_SELECTOR);
    }

    get inputStartHour() {
        return $(START_HOUR_SELECTOR);
    }

    get alertText() {
        return $(ALERT);
    }
    //verify errcode
    get errCode() {
        return $(ERR_CODE);
    }

    //verify errmess

    get errMessage() {
        return $(ERR_MESSAGE);
    }

    get okBtn() {
        return $(OK_BTN);
    }

    get inputSubject() {
        return $(SUBJECT);
    }

    get userSelector() {
        return $(USER_SELECTOR);
    }

    get attendeesBtn() {
        return $(ADD_ATTENDEES_BTN);
    }

    get clickFacility() {
        return $(FACILITY_SELECTOR);
    }

    get addFacility() {
        return $(ADD_FACILITY_BTN);
    }

    get addButton() {
        return $(ADD_APPOINTMENT_BTN);
    }

    open() {
        return super.open('schedule/add');
    }

    async newBtn() {
        await this.clickNew.click();
    }


    async appointment(inputEndYear, inputStartHour, inputSubject) {
       
        await this.inputEndYear.selectByVisibleText(inputEndYear);
        await this.inputStartHour.selectByVisibleText(inputStartHour);
        await this.inputSubject.setValue(inputSubject);
    }

    async addAppointment() {
        await this.addButton.click();
    }

    //verify ok

    async acceptAlert() {
        await this.okBtn.click();
    }
}

export default new AddAppointmentUnsuccess();
