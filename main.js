var newHeadline = '';
var newWord = '';
var newExplanation = '';
var obj_sets = {};
var obj_allSets = {};
var var_newWord_explanation_class = document.getElementsByClassName("newWord_explanation_class");
var words_done = 0;
var correct_answers = 0;

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
        if(window.location.href == 'https://asossosaror.github.io/study-glossary/studyGlossary.html' || window.location.href == 'https://asossosaror.github.io/study-glossary/studyGlossary.html?'){
            document.getElementById("study-submit-btn").click();
        }
    }
});

window.addEventListener('load', onPageLoad_studyGlossary, false);

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
    document.getElementById("textinput_newword").focus();
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

function chooseRandomSet(){
    obj_allSets = JSON.parse(localStorage.getItem("obj_allSets")) || {};
    if(obj_allSets == {}){
        alert("Please submit a set of words to start practicing.");
    }
    var headline_array = Object.keys(obj_allSets);
    console.log(headline_array);
    var random_headline = headline_array[Math.floor(Math.random() * headline_array.length)];
    console.log(random_headline);
    var set_to_study = obj_allSets[random_headline];
    console.log(set_to_study);
    localStorage.setItem("random_headline", random_headline);
    document.location.href = 'https://asossosaror.github.io/study-glossary/studyGlossary.html';
}

function onPageLoad_studyGlossary(){
    if(document.location.href == 'https://asossosaror.github.io/study-glossary/studyGlossary.html') {
        obj_allSets = JSON.parse(localStorage.getItem("obj_allSets"));
        study_headline = localStorage.getItem("random_headline");
        var entries_array = Object.entries(obj_allSets[study_headline]);
        console.log(entries_array);
        var yourWord = entries_array[words_done][0];
        document.getElementById("your-word").innerHTML = yourWord;
        console.log(yourWord);
        yourWord_serialized = JSON.stringify(yourWord);
        localStorage.setItem("yourWord", yourWord_serialized);
        document.getElementById("your-headline").innerHTML = study_headline;
    }
}

function studyNewWord() {
    document.getElementById("your-answer-input").focus();
    obj_allSets = JSON.parse(localStorage.getItem("obj_allSets"));
    study_headline = localStorage.getItem("random_headline");
    var entries_array = Object.entries(obj_allSets[study_headline]);
    console.log(entries_array);
    var yourWord = entries_array[words_done][0];
    document.getElementById("your-word").innerHTML = yourWord;
    console.log(yourWord);
    yourWord_serialized = JSON.stringify(yourWord);
    localStorage.setItem("yourWord", yourWord_serialized);
    document.getElementById("your-headline").innerHTML = study_headline;
}

function submitAnswer() {
    var yourAnswer = document.getElementById("your-answer-input").value;
    console.log(yourAnswer);
    yourWord = JSON.parse(localStorage.getItem("yourWord"));
    console.log(entries_array[words_done][1]);
    if(yourAnswer == entries_array[words_done][1]){
        document.getElementById("your-answer-input").style.backgroundColor = "green";
        correct_answers = correct_answers + 1;
    }
    words_done = words_done + 1;
    studyNewWord();
}

function testing(){
    document.getElementById('testp2').innerHTML = localStorage.getItem("obj_allSets");
}

function another(){
    var cracked = JSON.parse(localStorage.getItem("obj_allSets"));
    document.getElementById("testp2").innerHTML = Object.keys(cracked);
    console.log(Object.keys(cracked).includes("blabla"));
}