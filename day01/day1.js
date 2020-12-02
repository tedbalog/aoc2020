function sumTo2020(n){
    var inputValues = document.getElementById('input').value;
    var inputArray = inputValues.match(/[^\r\n]+/g);

    for(i = 0; i < inputArray.length; i++){
        for(j = i+1; j < inputArray.length; j++){
            firstVal = parseInt(inputArray[i]);
            secondVal = parseInt(inputArray[j]);
            if(n==2){
                if (firstVal + secondVal == 2020){
                    product = firstVal * secondVal;
                    document.getElementById('result').innerText = firstVal + " * " + secondVal + " = " + product.toLocaleString();
                }
            } else {
                for(k = j; k < inputArray.length; k++){
                    thirdVal = parseInt(inputArray[k]);
                    if (firstVal + secondVal + thirdVal == 2020){
                        product = firstVal * secondVal * thirdVal;
                        document.getElementById('result').innerText = firstVal + " * " + secondVal + " * " + thirdVal + " = " + product.toLocaleString();
                    }
                }
            }
        }
    }
}