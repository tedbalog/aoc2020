function countQuestionAnswers(){
    var inputValues = document.getElementById('input').value;
    var inputArray = inputValues.split(/\n{2,}/g);
    var questionsAnswered = new Array();
    var uniqueAnswers = 0;
    var questionsEveryoneAnswered = 0;

    inputArray.forEach(function(group){
        var groupParticipants = group.match(/[^\r\n]+/g);
        var groupAnswers = new Object();

        groupParticipants.forEach(function(participant){
            for(i = 0; i < participant.length; i++){
                if(groupAnswers.hasOwnProperty(participant[i])){
                    groupAnswers[participant[i]] += 1;
                } else {
                    groupAnswers[participant[i]] = 1;
                    uniqueAnswers++;
                }
            }
        });
        groupAnswers["participants"] = groupParticipants.length;
        questionsAnswered.push(groupAnswers);
    });

    questionsAnswered.forEach(function(group){
        var counts = Object.values(group);
        var numberOfParticipants = group["participants"];

        var count = counts.reduce((a, v) => (v == numberOfParticipants ? a + 1 : a), 0) - 1; // - 1 because it's always matching on the # of participants
        questionsEveryoneAnswered += count;
    });

    document.getElementById('result').innerText = uniqueAnswers + " unique answers! The sum of all questions answered by everyone in a given group is " + questionsEveryoneAnswered;
    document.getElementById('result2').innerText = JSON.stringify(questionsAnswered);
}