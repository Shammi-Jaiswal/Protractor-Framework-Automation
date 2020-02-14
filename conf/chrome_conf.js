// An example configuration file.
let testData = require('../resources/testdata.json');
let HtmlReporter = require('protractor-beautiful-reporter');

exports.config = {
    directConnect: true,

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'chrome'
    },

    onPrepare: function() {
        jasmine.getEnv().addReporter(new HtmlReporter({
            baseDirectory: '../report',
            docTitle: 'Protractor Reporter'
        }).getJasmine2Reporter());
        browser.driver.get(testData.login.baseUrl);
        browser.driver.manage().window().maximize();
        browser.sleep(2000);
        browser.manage().timeouts().implicitlyWait(60000);
        browser.ignoreSynchronization = true;
    },

    onComplete: function() {
        var path = process.cwd();
        path = path.substring(0, path.length - 4);
        path = path.replace(/\\/g, "/");
        path = "file://" + path + "report/report.html"
        console.log("You can find the Report at : " + path);
        browser.driver.get(path);
        browser.sleep(20000);
    },

    // Framework to use. Jasmine is recommended.
    framework: 'jasmine',

    // Spec patterns are relative to the current working directory when
    // protractor is called.
    specs: ['../tests/spec_manager.js', '../tests/spec_customer.js'],

    // Options to be passed to Jasmine.
    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }
    //Params represent the global variables

};