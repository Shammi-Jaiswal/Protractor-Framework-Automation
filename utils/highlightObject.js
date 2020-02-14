let highlightObject = function() {

    this.highlight = function(element, type) {
        if (typeof element !== 'undefined') {
            if (type == "id") {
                var idjS_color = 'document.getElementById("' + element + '").style.border="solid #FF0000"';
                var idJs = 'document.getElementById("' + element + '").style.border=""';
                browser.executeScript(idjS_color);
                browser.sleep(1000);
                browser.executeScript(idJs);
                browser.sleep(1000);
            } else if (type == "class") {
                var x = element.split('[');
                element = x[0];
                var y = x[1].split(']');
                var index = y[0];
                var idjS_color = 'document.getElementsByClassName("' + element + '")[' + index + '].style.border="solid #FF0000"';
                var idJs = 'document.getElementsByClassName("' + element + '")[' + index + '].style.border=""';
                browser.executeScript(idjS_color);
                browser.sleep(1000);
                browser.executeScript(idJs);
                browser.sleep(1000);
            }
        }
    }
}
module.exports = new highlightObject();