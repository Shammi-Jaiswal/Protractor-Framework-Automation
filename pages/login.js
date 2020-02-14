"use strict";

let locators = require('../resources/locators.json');
let objectLocator = require('../utils/objectLocators.js');
let clickAction  = require('../utils/clickAction.js');
let highlightObject  = require('../utils/highlightObject.js');



let bank_manager_button = objectLocator.findLocator(locators.login.bankManagerButton);//element(by.css('[ng-click="manager()"]'));
let bank_customer_button = objectLocator.findLocator(locators.login.bankCustomerButton);//element(by.css('[ng-click="customer()"]'));
let submit_account_button = objectLocator.findLocator(locators.login.submitAccountButton);//element(by.css('[type = "submit"]'));
let customer_dropdown = objectLocator.findLocator(locators.login.customerDropdown);
let home_button = objectLocator.findLocator(locators.login.homeButton);

let login = function(){


	this.goToHomePage = function(url,logMessage){
		highlightObject.highlight("btn home[0]","class");
		clickAction.click(home_button,"THE HOME BUTTON IS DISPLAYED","THE HOME BUTTON HAS BEEN CLICKED");
	}
	
	this.clickManagerButton = function(){
		highlightObject.highlight("btn btn-primary btn-lg[1]","class");
		clickAction.click(bank_manager_button,"THE BANK MANAGER BUTTON IS DISPLAYED","THE BANK MANAGER LOGIN BUTTON HAS BEEN CLICKED");
	}

	this.clickCustomerButton = function(){
		highlightObject.highlight("btn btn-primary btn-lg[0]","class");
		clickAction.click(bank_customer_button,"THE BANK CUSTOMER BUTTON IS DISPLAYED","THE BANK CUTOMER BUTTON HAS BEEN CLICKED");
	}

	this.loginCustomer = function(firstName,lastName){
		var name = firstName+" "+lastName;
		highlightObject.highlight("userSelect","id");
		clickAction.click(customer_dropdown,"THE CUSTOMER DROPDOWN IS DISPLAYED","THE LIST OF CUSTOMER DROPDOWN IS OPENED");
        element(by.cssContainingText('option', name)).click().then(function(){
			console.log("THE NAME '"+name+"' HAS BEEN SELECTED");
		});
		browser.sleep(1000);
		highlightObject.highlight("btn btn-default[0]","class");
		clickAction.click(submit_account_button,"THE CUSTOMER LOGIN BUTTON IS DISPLAYED","THE CUSTOMER LOGIN BUTTON IS DISPLAYED");
	}
};
module.exports = new login();