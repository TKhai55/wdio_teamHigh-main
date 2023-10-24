import { browser } from '@wdio/globals'

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default class Page {

    constructor(browserName) {
        this.browser = browser.getInstance(browserName);
    }
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */

    

    open (path) {
        if(process.env.G_TYPE === 'linux'){
            return browser.url(`/cgi-bin/cbgrn/grn.cgi/${path}`)     
        }
        return browser.url(`/g/${path}`)
    }
}
