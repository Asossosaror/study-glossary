var newHeadline = '';
var headline_submitMode = true;
var newWord = '';
var newExplanation = '';
var obj_sets = {};
var obj_allSets = {};
var var_newWord_explanation_class = document.getElementsByClassName("newWord_explanation_class");

//This code will be executed last.
$(document).ready(function() {
    if(headline_submitMode = true){
        $(".newWord_explanation_class").hide();
    } else {
        $(".newWord_explanation_class").show();
    }
    $("#submitButton").click(function() {
        $(".textinput").val("");
        if(headline_submitMode = false){
            $(".newWord_explanation_class").show();
        }
        if(headline_submitMode = true){
            $(".newWord_explanation_class").show();
            $(".headline_class").hide();
            $('#submitButton').text("Submit pair");
            headline_submitMode = false;
        }
    });
});

function openPage(url){
    document.location.href = url;
}

function createPair() {
    if(newHeadline == ''){
        //Store the headline.
        newHeadline = document.getElementById('textinput_headline');
        console.log(newHeadline.value);
        localStorage.setItem("headline", newHeadline.value);
        //Hide the headline input field.
        $('#textinput_headline').hide();
        $('#textinput_headline_label').hide();
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
        console.log(JSON.parse(localStorage.getItem("obj_sets")));
    }
}

function createSet(){
    obj_allSets = JSON.parse(localStorage.getItem("obj_allSets")) || {};
    obj_sets = JSON.parse(localStorage.getItem("obj_sets")) || {};
    newHeadline = localStorage.getItem("headline");

    if(obj_sets === {}){
        alert("You haven't submitted any words. Submit words to create a studyset.");
    } else {
        if(newHeadline in Object.keys(obj_allSets)) {
            alert("There is already a headline like the one you've submitted.")
        } else {
            obj_allSets[newHeadline] = obj_sets;
            console.log(obj_allSets);
            console.log(Object.keys(obj_allSets));
            console.log(obj_sets);
            obj_sets = {};
            obj_sets_serialized = JSON.stringify(obj_sets);
            localStorage.setItem("obj_sets", obj_sets_serialized);
            obj_allSets_serialized = JSON.stringify(obj_allSets);
            localStorage.setItem("obj_allSets", obj_allSets_serialized);
        }
    }
    headline_submitMode = true;
}


function resetStorage(){
    obj_sets_serialized = JSON.stringify({});
    obj_allSets_serialized = JSON.stringify({});
    localStorage.setItem("obj_sets", obj_sets_serialized);
    localStorage.setItem("obj_allSets", obj_allSets_serialized)
    console.log(JSON.parse(localStorage.getItem("obj_sets")));
    console.log(JSON.parse(localStorage.getItem("obj_allSets")));
}