function Omnibox() {
    this.isChrome = navigator.userAgent.indexOf("Chrome") !== -1;
    this.tagged = this.isChrome ?
        (tag, str) => `<${tag}>${str}</${tag}>` :
        (_, str) => str;
    this.browser = this.isChrome ? window.chrome : window.browser;
}

Omnibox.prototype.setupDefaultSuggestion = function() {
    this.browser.omnibox.setDefaultSuggestion({
        description: `Search Flutter docs ${ this.isChrome ? " for <match>%s</match>" : ""} on ${rootPath}`
    });
};

Omnibox.prototype.bootstrap = function() {
    this.setupDefaultSuggestion();

    this.browser.omnibox.onInputChanged.addListener((query, suggestFn) => {
        if (!query) return;

        const searchResults = window.search(query);
        this.suggestResults = [];

        for (let result of searchResults) {
            this.appendSuggestResult(result);
        }

        suggestFn(this.suggestResults);
    });

    this.browser.omnibox.onInputEntered.addListener(text => {
        this.navigateToUrl(`https://baidu.com/s?wd=${text}`);
    })

}

Omnibox.prototype.appendSuggestResult = function(item) {
    let description = this.tagged("match", item);
    this.suggestResults.push({
        content: item,
        description: description
    });
}

Omnibox.prototype.navigateToUrl = function(url) {
    if (settings.openType === "current-tab") {
        this.browser.tabs.query({active: true}, tab => {
            this.browser.tabs.update(tab.id, {url: url});
        });
    } else {
        this.browser.tabs.create({url: url});
    }
};

function escape(text) {
    text = text || "";
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}