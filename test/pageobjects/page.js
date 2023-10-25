import { browser } from '@wdio/globals'

class Page {
    constructor(browserName) {
        if (browserName) {
            this._browser = browser.getInstance(browserName);
        } else {
            this._browser = browser;
        }
    }

    open(path) {
        if (process.env.G_TYPE === 'linux') {
            return this._browser.url(`/cgi-bin/cbgrn/grn.cgi/${path}`);
        }
        return this._browser.url(`/g/${path}`);
    }
}

export default Page;
