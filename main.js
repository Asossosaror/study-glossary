var headline = '';
var newWord = '';
var newExplanation = '';
var obj_sets = {};
var obj_allSets = {};
var var_newWord_explanation_class = document.getElementsByClassName("newWord_explanation_class");

var_newWord_explanation_class.array.forEach(element => {
    element.style.visibility = 'hidden';
});


function openPage(url){
    document.location.href = url;
}

function createPair(){
    if(headline == ''){
        //Store the headline.
        newHeadline = document.getElementById('textinput_headline');
        console.log(newHeadline.value);
        localStorage.setItem("headline", headline.value);
        //Hide the headline input field.
        document.getElementById("textinput_headline").style.visibility = 'hidden';
        document.getElementById("textinput_headline_label").style.visibility = 'hidden';
        //Show the input fields for new wrods and explanations.
        document.getElementsByClassName("newWord_explanation_class").style.visibility = 'visible';
        document.getElementById("submitButton").value = 'Submit pair';
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

function testFunction(){
    document.getElementById("test").innerHTML = JSON.stringify(localStorage.getItem("obj_sets"));
}

function resetStorage(){
    obj_sets_serialized = JSON.stringify({});
    localStorage.setItem("obj_sets", obj_sets_serialized);
    console.log(JSON.parse(localStorage.getItem("obj_sets")));
}