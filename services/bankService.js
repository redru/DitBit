var Bank = require('./.').Bank;

BankService = function() {
};

BankService.save = function (objData, callbackFunction){
    var objResponse = {};
    this.findByCode(objData.code, function(err, objectResponse) {
        if (err){
            console.log("FindByCode err! --> " + err);
            callbackFunction(err, objectResponse);
        }
        else{
            if (objectResponse.result && objectResponse.result.code){
                objResponse.esito = 'KO';
                objResponse.info = "Code bank exist!!!";
            }
            else{
                var newBank = new Bank;
                newBank.name = objData.name;
                newBank.code = objData.code;
                newBank.save(function (err, newBank) {
                    if (err){
                        console.log("Save error! --> " + err);
                        objResponse.esito = 'KO';
                        objResponse.error = err;
                        callbackFunction(err, objResponse);
                    }
                    else{
                        console.log("Save correct! --> " + newBank.code + " - " + newBank.name + " - " + + newBank._id);
                        objResponse.esito = 'OK';
                        objResponse.info = newBank;
                        callbackFunction(null, objResponse);
                    }
                });
            }
        }
    })
};

BankService.findByCode = function (codeValue, callbackFunction){
    var objResponse = {};
    Bank.find({code: codeValue}, function (err, banksFound) {
        if (err){
            console.log("Find err! --> " + err);
            objResponse.esito = 'KO';
            objResponse.error = err;
            callbackFunction(err, objResponse);
        }
        else{
            console.log("Find correct! --> " + banksFound);
            objResponse.esito = 'OK';
            objResponse.result = banksFound;
            objResponse.error = null;
            callbackFunction(null, objResponse);
        }
    });
};

BankService.find = function (objData, callbackFunction){
    var objResponse = {};
    Bank.find(objData, function (err, banks) {
        if (err){
            console.log("Find Bank err! --> " + err);
            objResponse.esito = 'KO';
            objResponse.error = err;
            callbackFunction(err, objResponse);
        }
        else{
            console.log("Find Bank correct! --> " + banks);
            objResponse.esito = 'OK';
            objResponse.result = banks;
            callbackFunction(null, objResponse);
        }
    });
};