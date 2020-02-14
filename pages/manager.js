"use strict";

let locators = require('../resources/locators.json');
let objectLocator = require('../utils/objectLocators.js');
let clickAction  = require('../utils/clickAction.js');
let highlightObject  = require('../utils/highlightObject.js');

let manager = function(){
	
	let customers_button = objectLocator.findLocator(locators.manager.customersButton);//element(by.css('[ng-click="showCust()"]'));//$('[ng-click="showCust()"]');//element(by.css('[ng-click="showCust()"]'))
	let add_customer_button = objectLocator.findLocator(locators.manager.addCustomerButton);//element(by.css('[ng-click="addCust()"]'));//$('[ng-click="addCust()"]');
	let customerListObj = objectLocator.findLocator(locators.manager.customerListObj);//element.all(by.repeater('cust in Customers | orderBy:sortType:sortReverse | filter:searchCustomer'));//$('[ng-click="manager()"]');//element(by.css('[ng-click="manager()"]'))
	let paramJs='';
	let add_account_button = objectLocator.findLocator(locators.manager.addAccountButton);//element(by.css('[ng-click="openAccount()"]'));
	let firstNameObj = objectLocator.findLocator(locators.manager.firstName);//element(by.model('fName'));
	let lastNameObj = objectLocator.findLocator(locators.manager.lastName);//element(by.model('lName'));
	let postCodeObj = objectLocator.findLocator(locators.manager.postCode);//element(by.model('postCd'));
	let button = objectLocator.findLocator(locators.manager.buttonObj);//element.all(by.className('btn btn-default'));
	let first_dropdown = objectLocator.findLocator(locators.manager.firstDropdown);//element(by.id('userSelect'));
	let second_dropdown = objectLocator.findLocator(locators.manager.secondDropdown);//element(by.id('currency'));
	let submit_account_button = objectLocator.findLocator(locators.manager.submitAccountButton);//element(by.css('[type = "submit"]'));
	let account_number = objectLocator.findLocator(locators.manager.accountNumber);
	let search_customer = objectLocator.findLocator(locators.manager.searchCustomer);//element(by.model('searchCustomer'))

		
	this.getNumberOfExistingCustomer = function(){
        var numberOfCust = browser.executeScript("return (document.getElementsByTagName('tr').length)-1;");
        expect(customerListObj.count()).toBe(numberOfCust);
        return numberOfCust;
	};

	this.clickAddCustomerButton = function(){
		highlightObject.highlight("btn btn-lg tab[0]","class");
		clickAction.click(add_customer_button,"THE ADD CUSTOMER BUTTON IS DISPLAYED","THE ADD CUSTOMER BUTTON HAS BEEN CLICKED");
	};

	this.enterCustomerDetails = function(firstName,lastName,postCode){
		firstNameObj.sendKeys(firstName);
        lastNameObj.sendKeys(lastName);
        postCodeObj.sendKeys(postCode);
        highlightObject.highlight("btn btn-default[0]","class");
        clickAction.click(button.get(0),"THE CUSTOMER BUTTON IS DISPLAYED","CUSTOMER DETAILS HAVE BEEN SUBMITTED");
        browser.switchTo().alert().getText().then(console.log);
        browser.switchTo().alert().accept().then(function(){
            console.log("ALERT HAS BEEN ACCEPTED AND THE ALERT BOX IS CLOSED");
        });
        browser.sleep(2000);
	};

	this.clickShowCustomersButton = function(){
		highlightObject.highlight("btn btn-lg tab[2]","class");
		clickAction.click(customers_button,"THE CUSTOMERS TAB IS DISPLAYED","THE CUSTOMERS TAB IS CLICKED");
	};

	this.searchCustomer = function(firstName,lastName,postCode){
		highlightObject.highlight("form-control ng-pristine ng-untouched ng-valid[0]","class");
		search_customer.isDisplayed().then(function(){
        	console.log("THE SEARCH FIELD IS DISPLAYED");
        });
		search_customer.sendKeys(firstName);
        browser.sleep(1000);
        expect(customerListObj.count()).toBe(1).then(function(){
            console.log("ONLY 1 ROW OF RESULT FOUND FOR THE CUSTOMER");
        });
        paramJs= browser.executeScript("return document.getElementsByTagName('tr')[1].querySelectorAll('td')[1].innerText");
        expect(paramJs).toBe(lastName).then(function(){
            console.log("THE LAST NAME = '"+lastName+"' IN SEARCH RESULT IS CORRECT");
        });
        paramJs= browser.executeScript("return document.getElementsByTagName('tr')[1].querySelectorAll('td')[2].innerText");
        expect(paramJs).toBe(postCode).then(function(){
            console.log("THE POST CODE = '"+postCode+"' IN SEARCH RESULT IS CORRECT");
        });
	};

	this.clickAddAccountButton = function(){
		highlightObject.highlight("btn btn-lg tab[1]","class");
		clickAction.click(add_account_button,"THE ADD ACCOUNT TAB IS DISPLAYED","THE ADD ACCOUNT TAB IS CLICKED");
	};

	this.selectAccountFromDropdown = function(firstName,lastName,currency){
		var name = firstName+" "+lastName;
		highlightObject.highlight("userSelect","id");
		clickAction.click(first_dropdown,"THE FIRST DROPDOWN IS DISPLAYED","THE FIRST DROPDOWN HAS BEEN CLICKED");
		element(by.cssContainingText('option', name)).click().then(function(){
			console.log("THE NAME = '"+name+"' HAS BEEN SELECTED");
		});
		browser.sleep(2000);
		highlightObject.highlight("currency","id");
		clickAction.click(second_dropdown,"THE SECOND DROPDOWN IS DISPLAYED","THE SECOND DROPDOWN HAS BEEN CLICKED");
		element(by.cssContainingText('option', currency)).click().then(function(){
			console.log("THE CURRENCY = '"+currency+"' HAS BEEN SELECTED");
		});
		browser.sleep(2000);
	};

	this.processNewAccountAdded = function(){
		clickAction.click(submit_account_button,"THE ADD NEW ACCOUNT FOR THE CUSTOMER IS DISPLAYED","THE ADD NEW ACCOUNT FOR THE CUSTOMER HAS BEEN CLICKED");
		browser.switchTo().alert().getText().then(console.log);
        browser.switchTo().alert().accept().then(function(){
            console.log("ALERT HAS BEEN ACCEPTED AND THE ALERT BOX IS CLOSED");
        });
        browser.sleep(2000);
	};

	this.getAccountNumber = function(firstName){
		search_customer.isDisplayed().then(function(){
        	console.log("THE SEARCH FIELD IS DISPLAYED");
        });
		search_customer.sendKeys(firstName);
        browser.sleep(2000);
        expect(customerListObj.count()).toBe(1).then(function(){
            console.log("ONLY 1 ROW OF RESULT FOUND FOR THE CUSTOMER");
        });
        //paramJs= browser.executeScript("return document.getElementsByTagName('tr')[1].querySelectorAll('td')[3].innerText");
        let x = account_number.getText();
        //account_number.getText().then(console.log);
        expect(account_number.getText()).not.toBe(undefined).then(function(text){
            console.log("THE ACCOUNT NUMBER IN SEARCH RESULT IS BELOW :");
            account_number.getText().then(console.log);
        });
	};
};
module.exports = new manager();