var newWord = '';
var explanation = '';
var list_newWords = [];
var list_explanations = [];
var obj_sets = {};

function openPage(url){
    document.location.href = url;
}

function createPair(){
    newWord = document.getElementById('textinput_newword').ariaValueText;
}