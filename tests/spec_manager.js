"use strict";

let login = require('../pages/login.js');
let manager = require('../pages/manager.js');
let customer = require('../pages/customer.js');
let testData = require('../resources/testdata.json');


describe('Test Suite - Managers Operations', function() {
    it('Manager Goes to create a new customer', function() {
        login.clickManagerButton();
        manager.clickAddCustomerButton();
        manager.enterCustomerDetails(testData.customerDetails.firstName, testData.customerDetails.lastName, testData.customerDetails.postCode);
        manager.clickShowCustomersButton();
        manager.searchCustomer(testData.customerDetails.firstName, testData.customerDetails.lastName, testData.customerDetails.postCode);
    }, 120000);

    it('Manager goes to create an account for customer', function() {
        for (var i = 0; i < 3; i++) {
            manager.clickAddAccountButton();
            manager.selectAccountFromDropdown(testData.customerDetails.firstName, testData.customerDetails.lastName, testData.customerDetails.currency[i]);
            manager.processNewAccountAdded();
            manager.clickShowCustomersButton();
            manager.getAccountNumber(testData.customerDetails.firstName);
        }
    }, 120000);
});