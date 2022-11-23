var newHeadline = '';
var headline_submitMode = true;
var newWord = '';
var newExplanation = '';
var obj_sets = {};
var obj_allSets = {};
var var_newWord_explanation_class = document.getElementsByClassName("newWord_explanation_class");

function openPage(url){
    document.location.href = url;
}

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
    document.getElementById('textinput_headline').value = "";
}




var submitHeadlineBtn = document.getElementById("submitHeadlineBtn");
if(submitHeadlineBtn){
    submitHeadlineBtn.addEventListener('keypress', function(a) {
        if(a.key === "Enter"){
            submitHeadlineBtn.click();
        }
    });
} else {
    console.log('It is somehow null');
}