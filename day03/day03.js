function countTrees(){
    var inputValues = document.getElementById('input').value;
    var inputArray = inputValues.match(/[^\r\n]+/g);
    var puzzleWidth = inputArray[0].length;
    var puzzleHeight = inputArray.length;
    var puzzles = new Array();
    var puzzleResult = {
        "Puzzle One": 0,
        "Puzzle Two": 0,
        "Puzzle Three": 0,
        "Puzzle Four": 0,
        "Puzzle Five": 0
    }

    const TREE = "#";

    var puzzleData = {
        name: "Puzzle One",
        x: 1,
        y: 1,
        currentRow: 1
    }
    puzzles.push(puzzleData);
    puzzleData = {
        name: "Puzzle Two",
        x: 3,
        y: 1,
        currentRow: 1
    }
    puzzles.push(puzzleData);
    puzzleData = {
        name: "Puzzle Three",
        x: 5,
        y: 1,
        currentRow: 1
    }
    puzzles.push(puzzleData);
    puzzleData = {
        name: "Puzzle Four",
        x: 7,
        y: 1,
        currentRow: 1
    }
    puzzles.push(puzzleData);
    puzzleData = {
        name: "Puzzle Five",
        x: 1,
        y: 2,
        currentRow: 1
    }
    puzzles.push(puzzleData);


    for(i = 1; i < puzzleHeight; i++){
        puzzles.forEach(function(puzzleData){
            if(i % puzzleData.y == 0){
                var rowNumber = puzzleData.currentRow;
                var row = inputArray[rowNumber];
                var targetLocation = (rowNumber / puzzleData.y) * puzzleData.x;
                var targetCopy = Math.floor(targetLocation / puzzleWidth);
                if(targetCopy > 0){
                    targetLocation = targetLocation - puzzleWidth * targetCopy;
                }

                if(row[targetLocation] == TREE){
                    var currentValue = puzzleResult[puzzleData.name];
                    currentValue++;
                    puzzleResult[puzzleData.name] = currentValue;
                }
                puzzleData.currentRow++;
            } else {
                puzzleData.currentRow++;
            }
        });
    }

    var totalProduct = 1;
    for (var key in puzzleResult) {
        if(puzzleResult.hasOwnProperty(key)) {
            totalProduct *= puzzleResult[key];
        }
    }

    document.getElementById('result').innerText = totalProduct + " is the sum of total trees found!";
}