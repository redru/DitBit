/**
 * Created by v.leonetti on 07/03/2016.
 */
var Bank = require('../bank').Bank;

BankDao = function() {
};

BankDao.save = function (objData, callbackFunction){
    var objResponse = {};
    var newBank = new Bank;
    newBank.name = objData.name;
    newBank.code = objData.code;
    newBank.colorLabel = objData.colorLabel;
    newBank.save(function (err, newObj) {
        if (err){
            console.log("BankDao - Save error! --> " + err);
            objResponse.esito = 'KO';
            objResponse.error = err;
            callbackFunction(err, objResponse);
        }
        else{
            console.log("BankDao - Save correct! --> " + newObj.code + " - " + newObj.name + " - " + + newObj._id);
            objResponse.esito = 'OK';
            objResponse.info = newObj;
            callbackFunction(null, objResponse);
        }
    });
};

BankDao.update = function (objData, callbackFunction){
    var objResponse = {};
    Bank.update({code:objData.code}, objData, function (err, updBank) {
        if (err){
            console.log("BankDao - Update error! --> " + err);
            objResponse.esito = 'KO';
            objResponse.error = err;
            callbackFunction(err, objResponse);
        }
        else{
            console.log("BankDao - Update correct! --> Number of item updated " + updBank.nModified + " - esito " + updBank.ok);
            objResponse.esito = 'OK';
            objResponse.info = updBank;
            callbackFunction(null, objResponse);
        }
    });
};

BankDao.delete = function (objData, callbackFunction){
    var objResponse = {};
    Bank.remove({code:objData.code}, function (err, delBank) {
        if (err){
            console.log("BankDao - Delete error! --> " + err);
            objResponse.esito = 'KO';
            objResponse.error = err;
            callbackFunction(err, objResponse);
        }
        else{
            console.log("BankDao - Delete correct! --> Number of item removed " + delBank.result.ok);
            objResponse.esito = 'OK';
            objResponse.info = delBank;
            callbackFunction(null, objResponse);
        }
    });
};

BankDao.findByCode = function (codeValue, callbackFunction){
    var objResponse = {};
    Bank.find({code: codeValue}, function (err, banksFound) {
        if (err){
            console.log("BankDao - Find err! --> " + err);
            objResponse.esito = 'KO';
            objResponse.error = err;
            callbackFunction(err, objResponse);
        }
        else{
            console.log("BankDao - Find correct! --> " + banksFound);
            objResponse.esito = 'OK';
            objResponse.result = banksFound;
            objResponse.error = null;
            callbackFunction(null, objResponse);
        }
    });
};

BankDao.find = function (objData, callbackFunction){
    var objResponse = {};
    Bank.find(objData, function (err, banks) {
        if (err){
            console.log("BankDao - Find Bank err! --> " + err);
            objResponse.esito = 'KO';
            objResponse.error = err;
            callbackFunction(err, objResponse);
        }
        else{
            console.log("BankDao - Find Bank correct! --> " + banks);
            objResponse.esito = 'OK';
            objResponse.result = banks;
            callbackFunction(null, objResponse);
        }
    });
};

exports.BankDao = BankDao;