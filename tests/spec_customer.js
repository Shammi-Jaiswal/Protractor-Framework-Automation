"use strict";

let login = require('../pages/login.js');
let manager = require('../pages/manager.js');
let customer = require('../pages/customer.js');
let testData = require('../resources/testdata.json');


describe('Test Suite - Customer Operations', function() {
    it('Customer goes to do a Deposits', function() {
        login.goToHomePage();
        login.clickCustomerButton();
        login.loginCustomer(testData.customerDetails.firstName, testData.customerDetails.lastName);
        for (var i = 0; i < 3; i++) {
            customer.selectAccount(i);
            customer.clickDepositButton();
            customer.submitDeposit(i);
        }
    }, 120000);

    it('Customer goes to do a Withdrawal', function() {
        for (var i = 0; i < 3; i++) {
            customer.selectAccount(i);
            customer.clickWithdrawlButton();
            customer.submitWithdrawl(i);
        }
    }, 120000);

    it('Customer goes to view the Transaction', function() {
        customer.clickTransactionsButton();
        customer.verifyTransactions();
    }, 120000);
});