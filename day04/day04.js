function validatePassports(){
    var inputValues = document.getElementById('input').value;
    var inputArray = inputValues.split(/\n{2,}/g);
    var numberOfPassports = inputArray.length;
    var passportData = new Array();
    var numberOfValidPassports = 0;
    var regexValidators = [
        {
            item: "hcl",
            regex: /^(#[0-9a-fA-F]{6})$/
        },
        {
            item: "pid",
            regex: /^([0-9]{9})$/
        },
        {
            item: "ecl",
            regex: /^(amb|blu|brn|gry|grn|hzl|oth)$/
        },
        {
            item: "byr",
            regex: /^(19[2-9]\d|200[0-2])$/
        },
        {
            item: "iyr",
            regex: /^(201\d|2020)$/
        },
        {
            item: "eyr",
            regex: /^(202\d|2030)$/
        },
        {
            item: "hgt",
            regex: /^(59in|[6]\din|7[0-6]in|1[5-8]\dcm|19[0-3]cm)$/
        }
    ];

    for(i = 0; i < numberOfPassports; i++){
        var passport = new Object();
        inputArray[i] = inputArray[i].replace(/(\r\n|\n|\r)/gm," ");
        var passportItems = inputArray[i].split(" ");

        passportItems.forEach(function(p){
            var passportItem = p.split(":");
            passport[passportItem[0]] = passportItem[1];
        });
        passportData.push(passport);
    }
    
    passportData.forEach(function(p){
        var pKeys = Object.keys(p).length;
        
        // Initial Validation
        if (pKeys == 8 || (pKeys == 7 && p.hasOwnProperty("cid") == false)){
            p["Initial Validation"] = true;
        } else {
            p["Initial Validation"] = false;
            return;
        }

        // Regex Validation
        regexValidators.every(function(v) {
            var value = p[v.item];
            var regexString = v["regex"];
            
            if (value.match(regexString) != null){
                p["regexValidation"] = true;
                return true;
            } else {
                p["regexValidation"] = false;
                return false;
            }
          })

        if (p["regexValidation"] == true){
            numberOfValidPassports++;
        }        
    });

    document.getElementById('result').innerText = numberOfValidPassports + " valid passports!";
    document.getElementById('result2').innerText = JSON.stringify(passportData);
}