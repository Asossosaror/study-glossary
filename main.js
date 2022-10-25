var newWord = '';
var newExplanation = '';
var obj_sets = {};

function openPage(url){
    document.location.href = url;
}

function createPair(){
    newHeadline = document.getElementById('textinput_headline');
    console.log(newHeadline.value);
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

function testFunction(){
    document.getElementById("test").innerHTML = JSON.stringify(localStorage.getItem("obj_sets"));
}

function resetStorage(){
    obj_sets_serialized = JSON.stringify({});
    localStorage.setItem("obj_sets", obj_sets_serialized);
    console.log(JSON.parse(localStorage.getItem("obj_sets")));
}