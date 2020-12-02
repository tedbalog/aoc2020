function validatePasswords(){
    var inputValues = document.getElementById('input').value;
    var inputArray = inputValues.match(/[^\r\n]+/g);
    var numberOfPasswords = inputArray.length;
    var validPasswords = new Array();
    var validPasswordsV2 = new Array();

    for(i = 0; i < numberOfPasswords; i++){
        var rawValue = inputArray[i];
        var splitValue = rawValue.split(" ");
        var rangeSplit = splitValue[0].split("-");

        var passwordRecord = {
            letter: splitValue[1].substring(0,1),
            minimum: parseInt(rangeSplit[0]),
            maximum: parseInt(rangeSplit[1]),
            value: splitValue[2]
        }

        if (passwordRecord.value.includes(passwordRecord.letter)){
            var count = 0;
            var validForSecondCase = 0;
            for(j = 0; j < passwordRecord.value.length; j++){
                if (passwordRecord.value[j] == passwordRecord.letter){
                    count++;
                }
                if (j == passwordRecord.minimum - 1 || j == passwordRecord.maximum - 1){
                    if (passwordRecord.value[j] == passwordRecord.letter){
                        validForSecondCase++;
                    }
                }
            }

            if(count >= passwordRecord.minimum && count <= passwordRecord.maximum){
                validPasswords.push(passwordRecord);
            }
            if(validForSecondCase == 1) {
                validPasswordsV2.push(passwordRecord);
            }
        }
    }
    document.getElementById('result').innerText = "There are " + validPasswords.length + " valid 1st case passwords. ";
    document.getElementById('result2').innerText = "There are " + validPasswordsV2.length + " valid 2nd case passwords. ";

}