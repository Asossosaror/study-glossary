var headline = '';
var headline_submitted = false;
var newWord = '';
var newExplanation = '';
var obj_sets = {};
var obj_allSets = {};
var var_newWord_explanation_class = document.getElementsByClassName("newWord_explanation_class");

//This code will be executed last.
$(document).ready(function() {
    $("#submitButton").click(function() {
        if(headline_submitted = false){
            $(".newWord_explanation_class").show();
            $(".headline_class").hide();
            $('#submitButton').text("Submit pair");
            $("#headline-form").submit();
        }
        if(headline_submitted = true){
            $("#word-form").submit();
        }
    });
});

function openPage(url){
    document.location.href = url;
}

function createPair() {
    if(headline == ''){
        //Store the headline.
        newHeadline = document.getElementById('textinput_headline');
        console.log(newHeadline.value);
        localStorage.setItem("headline", headline.value);
        //Hide the headline input field.
        $('#textinput_headline').hide();
        $('#textinput_headline_label').hide();
        //Show the input fields for new words and explanations.
    }
    newWord = document.getElementById('textinput_newword');
    console.log(newWord.value);
    newExplanation = document.getElementById('textinput_explanation');
    console.log(newExplanation.value);
    if(newWord.value != "" && newExplanation.value != ''){
        obj_sets = JSON.parse(localStorage.getItem("obj_sets")) || {};
        obj_sets[newWord.value] = newExplanation.value;
        console.log(obj_sets);
        obj_sets_serialized = JSON.stringify(obj_sets);
        localStorage.setItem("obj_sets", obj_sets_serialized);
    }
}

function createSet(){
    obj_allSets = JSON.parse(localStorage.getItem("obj_allSets"));
    obj_sets = JSON.parse(localStorage.getItem("obj_sets"));
    headline = localStorage.getItem("headline");
    countObj_allSets = 0;
    for (const property in obj_allSets){
        countObj_allSets += 1;
    }
    if(obj_sets != {}){
        console.log(typeof(obj_allSets));
        if(obj_allSets == {}){
            obj_allSets[headline] = obj_sets;
            JSON.stringify(localStorage.setItem("obj_allSets", obj_allSets));
            console.log(JSON.parse(localStorage.getItem("obj_allSets")));
            localStorage.setItem("headline", '');
        }
        else{
            if(headline in obj_allSets == false){
                obj_allSets[headline] = obj_sets;
                JSON.stringify(localStorage.setItem("obj_allSets", obj_allSets));
                console.log(JSON.parse(localStorage.getItem("obj_allSets")));
                localStorage.setItem("headline", '');
            }
        }
    }
}

function resetStorage(){
    obj_sets_serialized = JSON.stringify({});
    localStorage.setItem("obj_sets", obj_sets_serialized);
    console.log(JSON.parse(localStorage.getItem("obj_sets")));
}