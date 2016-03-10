var BankDao = require('./../mapper/dao/bankDao').BankDao;

BankService = function() {
};

BankService.save = function (objData, callbackFunction){
    var objResponse = {};

    BankDao.findByCode(objData.code, function(err, objectResponse) {
        if (err){
            console.log("BankService - FindByCode err! --> " + err);
            callbackFunction(err, objectResponse);
        }
        else{
            var results = objectResponse.result;
            if (results && results.length > 0){
                objResponse.esito = 'KO';
                objResponse.info = "Code bank exist!!!";
                callbackFunction(err, objResponse);
            }
            else{
                BankDao.save(objData, function (err, newObj) {
                    if (err){
                        console.log("BankService - Save error! --> " + err);
                        objResponse.esito = 'KO';
                        objResponse.error = err;
                        callbackFunction(err, objResponse);
                    }
                    else{
                        console.log("BankService - Save correct! --> " + newObj.code + " - " + newObj.name + " - " + + newObj._id);
                        objResponse.esito = 'OK';
                        objResponse.info = newObj;
                        callbackFunction(null, objResponse);
                    }
                });
            }
        }
    })
};

BankService.update = function (objData, callbackFunction){
    var objResponse = {};
    BankDao.findByCode(objData.code, function(err, objectResponse) {
        if (err){
            console.log("BankService - FindByCode err! --> " + err);
            callbackFunction(err, objectResponse);
        }
        else{
            var results = objectResponse.result;
            if (results && results.length == 0){
                objResponse.esito = 'KO';
                objResponse.info = "Code bank not exist!!!";
                callbackFunction(err, objResponse);
            }
            else{
                //var bankFinded = results[0];

                BankDao.update(objData, function (err, updBank) {
                    if (err){
                        console.log("BankService - Update error! --> " + err);
                        objResponse.esito = 'KO';
                        objResponse.error = err;
                        callbackFunction(err, objResponse);
                    }
                    else{
                        console.log("BankService - Update correct! --> Number of item updated " + updBank.info.nModified + " - esito " + updBank.info.ok);
                        objResponse.esito = 'OK';
                        objResponse.info = updBank;
                        callbackFunction(null, objResponse);
                    }
                });
            }
        }
    })
};

BankService.delete = function (objData, callbackFunction){
    var objResponse = {};
    BankDao.delete(objData, function (err, delBank) {
        if (err){
            console.log("BankService - Delete error! --> " + err);
            objResponse.esito = 'KO';
            objResponse.error = err;
            callbackFunction(err, objResponse);
        }
        else{
            console.log("BankService - Delete correct! --> Number of item removed " + delBank.info.result.ok);
            objResponse.esito = 'OK';
            objResponse.info = delBank;
            callbackFunction(null, objResponse);
        }
    });
};

module.exports = BankService;