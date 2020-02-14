let clickAction = function(){
	this.click = function(element, displayMessage, clickMessage) {
    if (typeof element !== 'undefined') {
		element.isDisplayed().then(function() {
    		console.log(displayMessage);
			});
		element.click().then(function() {
    		console.log(clickMessage);
			});
		browser.sleep(1000);
    	}
	}
}
module.exports = new clickAction();

