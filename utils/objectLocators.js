let objectLocators = function() {

    var webElement = null;
    //find locator using provided locator type and locator value
    this.findLocator = function(loc) {
        var locatorType = loc[0];
        var locatorValue = loc[1];
        if (typeof locatorType !== 'undefined') {
            if (locatorType == 'id') {
                this.webElement = element(by.id(locatorValue));
            }
            else if (locatorType == 'className') {
                this.webElement = element.all(by.className(locatorValue));
            }
            else if (locatorType == 'xpath') {
                this.webElement = element(by.xpath(locatorValue));
            }
            else if (locatorType == 'tagName') {
                this.webElement = element.all(by.tagName(locatorValue));
            }
            else if (locatorType == 'model') {
                this.webElement = element(by.model(locatorValue));
            }
            else if (locatorType == 'repeater') {
                this.webElement = element.all(by.repeater(locatorValue));
            }
            else if (locatorType == 'click') {
                var b = "[ng-click=";
                var c = '"';
                var d = "]";
                var x = b + c + locatorValue + c + d;
                this.webElement = element(by.css(x));
            }
            else if (locatorType == 'type') {
                var b = "[type = ";
                var c = '"';
                var d = "]";
                var x = b + c + locatorValue + c + d;
                this.webElement = element(by.css(x));
            }
            else if (locatorType == 'other') {
                this.webElement = locatorValue;
            }
            return this.webElement;
        };
    };
};
module.exports = new objectLocators();