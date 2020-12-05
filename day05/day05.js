function generateSeatID(){
    var inputValues = document.getElementById('input').value;
    var inputArray = inputValues.match(/[^\r\n]+/g);
    var boardingPasses = new Array();
    var seatId;
    
    const LOWER = ["L", "F"];
    const UPPER = ["R", "B"];
    const LOW_ROW = 0;
    const HIGH_ROW = 128;
    const LOW_SEAT = 0;
    const HIGH_SEAT = 8;

    inputArray.forEach(function(boardingPass){
        var currentRowLow = LOW_ROW;
        var currentRowHigh = HIGH_ROW;
        var currentSeatLow = LOW_SEAT;
        var currentSeatHigh = HIGH_SEAT;
        var seatId;
        var completedBoardingPass = new Object();

        for (i = 0; i < boardingPass.length; i++){
            if (currentRowHigh - 1 == currentRowLow){
                if (UPPER.includes(boardingPass[i])){
                    currentSeatLow = currentSeatLow + ((currentSeatHigh - currentSeatLow) / 2);
                } else {
                    currentSeatHigh = currentSeatHigh - ((currentSeatHigh - currentSeatLow) / 2);
                }
            }
            else if (UPPER.includes(boardingPass[i])){
                currentRowLow = currentRowLow + ((currentRowHigh - currentRowLow) / 2);
            } else {
                currentRowHigh = currentRowHigh - ((currentRowHigh - currentRowLow) / 2);
            }
        }

        seatId = currentRowLow * 8 + currentSeatLow;
        completedBoardingPass = {
            raw: boardingPass,
            id: seatId,
            row: currentRowLow,
            column: currentSeatLow
        };
        boardingPasses.push(completedBoardingPass);
    });

    boardingPasses = boardingPasses.sort((a, b) => parseInt(a.id) - parseInt(b.id));
    for(i = 1; i < boardingPasses.length - 1; i++){
        prev = boardingPasses[i-1].id;
        curr = boardingPasses[i].id;
        next = boardingPasses[i+1].id;

        if (curr - prev != 1 && next - prev != 2) {
            seatId = curr - 1;
        }
    }

    let maxId = boardingPasses.reduce((max, passes) => max.id > passes.id ? max : passes);

    document.getElementById('result').innerText = maxId.id + " is the highest seat ID! Your seatId is " + seatId;
    document.getElementById('result2').innerText = JSON.stringify(boardingPasses);
}