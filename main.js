var newHeadline = '';
var newWord = '';
var newExplanation = '';
var obj_sets = {};
var obj_allSets = {};
var var_newWord_explanation_class = document.getElementsByClassName("newWord_explanation_class");

function openPage(url){
    document.location.href = url;
}

document.addEventListener("keydown", function(event){
    if(event.key == "Enter"){
        event.preventDefault();
        if(window.location.href == 'https://asossosaror.github.io/study-glossary/createHeadline.html'){
            createHeadline();
        } 
        if(window.location.href == 'https://asossosaror.github.io/study-glossary/createPair.html' || window.location.href == 'https://asossosaror.github.io/study-glossary/createPair.html?'){
            document.getElementById('submitPairBtn').click();
        }
    }
});

function createHeadline() {
    newHeadline = document.getElementById('textinput_headline');
    obj_allSets = JSON.parse(localStorage.getItem("obj_allSets"));
    console.log(Object.keys(obj_allSets).includes(newHeadline.value));
    if(newHeadline.value != "" && Object.keys(obj_allSets).includes(newHeadline.value) == false){
        console.log(newHeadline.value);
        localStorage.setItem("headline", newHeadline.value);
        openPage('https://asossosaror.github.io/study-glossary/createPair.html');
    }
    if(Object.keys(obj_allSets).includes(newHeadline.value) == true){
        alert("There is already a headline like the one you've submitted. Please choose another one.")
    }
    if(newHeadline.value == ""){
        alert("Please submit a headline to create your set.");
    }
    document.getElementById('textinput_headline').value = "";
    document.getElementById("textinput_newword").focus();
}

function createPair() {
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
        if(Object.keys(obj_allSets).includes(newHeadline.value)) {
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
}


function resetStorage(){
    obj_sets_serialized = JSON.stringify({});
    obj_allSets_serialized = JSON.stringify({});
    localStorage.setItem("obj_sets", obj_sets_serialized);
    localStorage.setItem("obj_allSets", obj_allSets_serialized)
    console.log(JSON.parse(localStorage.getItem("obj_sets")));
    console.log(JSON.parse(localStorage.getItem("obj_allSets")));
}

function testing(){
    document.getElementById('testp2').innerHTML = localStorage.getItem("obj_allSets");
}

function another(){
    var cracked = JSON.parse(localStorage.getItem("obj_allSets"));
    document.getElementById("testp2").innerHTML = Object.keys(cracked);
    console.log(Object.keys(cracked).includes("blabla"));
}