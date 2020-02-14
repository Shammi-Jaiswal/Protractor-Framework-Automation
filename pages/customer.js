"use strict";

let locators = require('../resources/locators.json');
let objectLocator = require('../utils/objectLocators.js');
let clickAction  = require('../utils/clickAction.js');
let highlightObject  = require('../utils/highlightObject.js');

let customer = function() {

    let account_number_dropdown = objectLocator.findLocator(locators.customer.accountNumberDropdown); //element(by.id('accountSelect'));
    let deposit_button = objectLocator.findLocator(locators.customer.depositButton); //element(by.css('[ng-click="deposit()"]'));
    let withdrawl_button = objectLocator.findLocator(locators.customer.withdrawlButton); //element(by.css('[ng-click="withdrawl()"]'));
    let transactions_button = objectLocator.findLocator(locators.customer.transactionsButton); //element(by.css('[ng-click="transactions()"]'));
    let total_amount_after_deposit = objectLocator.findLocator(locators.customer.totalAmountAfterDeposit); //element(by.xpath('//html/body/div[3]/div/div[2]/div/div[2]/strong[2]'));
    let transactionList = objectLocator.findLocator(locators.customer.transactionList); //element.all(by.repeater('tx in transactions | orderBy:sortType:sortReverse | sDate:startDate:end'));
    var x = 197;
    var y = 100;
    let optionTagName = objectLocator.findLocator(locators.customer.optionTagName); //element.all(by.tagName('option'));
    let amountObj = objectLocator.findLocator(locators.customer.amountObj); //element(by.model('amount'));
    let buttonObj = objectLocator.findLocator(locators.customer.buttonObj); //element.all(by.className('btn btn-default'));


    this.selectAccount = function(i) {
        highlightObject.highlight("accountSelect","id");
        clickAction.click(account_number_dropdown,"THE ACCOUNT NUMBER DROPDOWN IS DISPLAYED","THE ACCOUNT NUMBER DROPDOWN HAS BEEN OPENED");
        optionTagName.then(function(items) {
            expect(items.length).toBe(3);
            items[i].click();
        });
        browser.sleep(2000);

    };

    this.clickDepositButton = function() {
        highlightObject.highlight("btn btn-lg tab[1]","class");
        clickAction.click(deposit_button,"THE DEPOSIT BUTTON IS DISPLAYED","THE DEPOSIT BUTTON HAS BEEN CLICKED");
    };

    this.submitDeposit = function(i) {
        var deposit = x + i;
        amountObj.sendKeys(deposit);
        browser.sleep(1000);
        //clickAction.click(buttonObj.get(0),"","DEPOSIT FOR AMOUNT '" + deposit + "' HAVE BEEN SUBMITTED");
        highlightObject.highlight("btn btn-default[0]","class");
        buttonObj.get(0).click().then(function() {
            console.log("DEPOSIT FOR AMOUNT '" + deposit + "' HAVE BEEN SUBMITTED");
        });
        browser.sleep(1000);
        expect(total_amount_after_deposit.getText()).toBe(deposit.toString()).then(function() {
            console.log("DEPOSIT BALANCE FOR THE ACCOUNT IS CORRECT");
        });
    };

    this.clickWithdrawlButton = function() {
        highlightObject.highlight("btn btn-lg tab[2]","class");
        clickAction.click(withdrawl_button,"THE WITHDRAWL BUTTON IS DISPLAYED","THE WITHDRAWL BUTTON HAS BEEN CLICKED");
    };

    this.submitWithdrawl = function(i) {
        var withdrawl = y + i;
        amountObj.sendKeys(withdrawl);
        browser.sleep(1000);
        highlightObject.highlight("btn btn-default[0]","class");
        buttonObj.get(0).click().then(function() {
            console.log("WITHDRAWL FOR AMOUNT '" + withdrawl + "' HAVE BEEN SUBMITTED");
        });
        browser.sleep(1000);
        expect(total_amount_after_deposit.getText()).toBe('97').then(function() {
            console.log("WITHDRAWL BALANCE FOR THE ACCOUNT IS CORRECT");
        });
    };

    this.clickTransactionsButton = function() {
        highlightObject.highlight("btn btn-lg tab[0]","class");
        clickAction.click(transactions_button,"THE TRANSACTION BUTTON IS DISPLAYED","THE TRANSACTION BUTTON HAS BEEN CLICKED");
    };

    this.verifyTransactions = function() {
        expect(transactionList.count()).toBe(2).then(function() {
            console.log("THE TRANSACTION LIST IS CORRECT");
        });
    };

};
module.exports = new customer();