var newHeadline = '';
var newWord = '';
var newExplanation = '';
var obj_sets = {};
var obj_allSets = {};
var var_newWord_explanation_class = document.getElementsByClassName("newWord_explanation_class");
var words_done = 0;
var correct_answers = 0;
var yourWord;
var yourExplanation;
var btnNum = 0;

function openPage(url){
    document.location.href = url;
}

document.addEventListener("keydown", function(event){
    if(event.key == "Enter"){
        event.preventDefault();
        if(window.location.href == 'https://asossosaror.github.io/study-glossary/createHeadline.html'){
            createHeadline();
        } else if(window.location.href == 'https://asossosaror.github.io/study-glossary/createPair.html' || window.location.href == 'https://asossosaror.github.io/study-glossary/createPair.html?'){
            document.getElementById('submitPairBtn').click();
        } else if(window.location.href == 'https://asossosaror.github.io/study-glossary/studyGlossary.html' || window.location.href == 'https://asossosaror.github.io/study-glossary/studyGlossary.html?'){
            document.getElementById("study-submit-btn").click();
        }
    }
});

document.getElementsByClassName("headlineAnchorTag").addEventListener("click", testEventlistener);

function testEventlistener(e) {
    console.log("an a-tag was clicked");
    console.log(e.target.id);
    openPage("https://www.google.com/");
}

window.addEventListener('load', onLoadRedirector, false);

function onLoadRedirector() {
    if(document.location.href == 'https://asossosaror.github.io/study-glossary/studyGlossary.html') {
        onPageLoad_studyGlossary();
    } else if(document.location.href == 'https://asossosaror.github.io/study-glossary/results.html') {
        displayResults();
    } else if(document.location.href == 'https://asossosaror.github.io/study-glossary/chooseSet.html') {
        hideTwoButtons();
    } else if(window.location.href == 'https://asossosaror.github.io/study-glossary/changeHeadline.html') {
        listHeadlines();
    } else if(window.location.href == 'https://asossosaror.github.io/study-glossary/changeWords.html') {
        listWords();
    }
}

function createHeadline() {
    newHeadline = document.getElementById('textinput_headline');
    obj_allSets = JSON.parse(localStorage.getItem("obj_allSets")) || {};
    console.log(Object.keys(obj_allSets).includes(newHeadline.value) || {});
    if(newHeadline.value != "" && Object.keys(obj_allSets).includes(newHeadline.value) == false){
        console.log(newHeadline.value);
        localStorage.setItem("headline", newHeadline.value);
        document.location.href = 'https://asossosaror.github.io/study-glossary/createPair.html';
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
        return;
    }
    var headline_array = Object.keys(obj_allSets);
    if(headline_array.length == 0) {
        alert("Please submit a set of words to start practicing.");
        return;
    }
    console.log(headline_array);
    var random_headline = headline_array[Math.floor(Math.random() * headline_array.length)];
    console.log(random_headline);
    var set_to_study = obj_allSets[random_headline];
    console.log(set_to_study);
    localStorage.setItem("random_headline", random_headline);
    document.getElementById('choose-new-word').style.visibility = 'visible';
    document.getElementById('choose-explanation').style.visibility = 'visible';
    document.getElementById('random-set-btn').style.visibility = 'hidden';
}

function onPageLoad_studyGlossary(){
    words_done = 0;
    obj_allSets = JSON.parse(localStorage.getItem("obj_allSets"));
    study_headline = localStorage.getItem("random_headline");
    var entries_array = Object.entries(obj_allSets[study_headline]);
    var entries_array_serialized = JSON.stringify(entries_array);
    localStorage.setItem("entries_array", entries_array_serialized);
    console.log(entries_array);
    yourWord = entries_array[words_done][0];
    yourExplanation = entries_array[words_done][1];
    answer_is_new_word = JSON.parse(localStorage.getItem("answer_is_new_word"));
    if(answer_is_new_word) {
        document.getElementById("your-word").innerHTML = yourExplanation;
        document.getElementById("what-p").innerHTML = "What is the word for this?";
    } else {
        document.getElementById("your-word").innerHTML = yourWord;
    }
    yourWord_serialized = JSON.stringify(yourWord);
    localStorage.setItem("yourWord", yourWord_serialized);
    yourExplanation_serialized = JSON.stringify(yourExplanation);
    localStorage.setItem("yourExplanation", yourExplanation_serialized);
    document.getElementById("your-headline").innerHTML = study_headline;
}

function studyNewWord() {
    console.log("this is the headline: " + study_headline);
    document.getElementById("your-answer-input").focus();
    obj_allSets = JSON.parse(localStorage.getItem("obj_allSets"));
    study_headline = localStorage.getItem("random_headline");
    entries_array = JSON.parse(localStorage.getItem("entries_array"));
    console.log(entries_array);
    yourWord = entries_array[words_done][0];
    yourExplanation = entries_array[words_done][1];
    answer_is_new_word = JSON.parse(localStorage.getItem("answer_is_new_word"));
    if(answer_is_new_word) {
        document.getElementById("your-word").innerHTML = yourExplanation;
    } else {
        document.getElementById("your-word").innerHTML = yourWord;
    }
    yourWord_serialized = JSON.stringify(yourWord);
    localStorage.setItem("yourWord", yourWord_serialized);
    yourExplanation_serialized = JSON.stringify(yourExplanation);
    localStorage.setItem("yourExplanation", yourExplanation_serialized);
    document.getElementById("your-headline").innerHTML = study_headline;
}

function submitAnswer() {
    var yourAnswer = document.getElementById("your-answer-input").value;
    obj_allSets = JSON.parse(localStorage.getItem("obj_allSets"));
    yourWord = JSON.parse(localStorage.getItem("yourWord"));
    yourExplanation = JSON.parse(localStorage.getItem("yourExplanation"));
    console.log("yourExplanation");
    console.log(yourExplanation);
    answer_is_new_word = JSON.parse(localStorage.getItem("answer_is_new_word"));
    entries_array = JSON.parse(localStorage.getItem("entries_array"));
    if(!answer_is_new_word) {
        if(yourAnswer == yourExplanation){
            document.getElementById("your-answer-input").style.backgroundColor = "rgb(56, 252, 3)";
            correct_answers = correct_answers + 1;
            console.log(correct_answers);
        } else {
            document.getElementById("your-answer-input").style.backgroundColor = "rgb(255, 80, 80)";
            document.getElementById("your-answer-input").value = yourExplanation;
        }
    } else {
        if(yourAnswer == yourWord){
            document.getElementById("your-answer-input").style.backgroundColor = "rgb(56, 252, 3)";
            correct_answers = correct_answers + 1;
            console.log(correct_answers);
        } else {
            document.getElementById("your-answer-input").style.backgroundColor = "rgb(255, 80, 80)";
            document.getElementById("your-answer-input").value = yourWord;
        }
    }
    setTimeout(resetColorAndText, 1000);
    words_done = words_done + 1;
    // Saving the numbers to display on the results page.
    var correct_answers_serialized = JSON.stringify(correct_answers);
    localStorage.setItem("correct_answers", correct_answers_serialized);
    var words_done_serialized = JSON.stringify(words_done);
    localStorage.setItem("words_done", words_done_serialized);
    if(words_done >= entries_array.length) {
        document.location.href = 'https://asossosaror.github.io/study-glossary/results.html';
    } else {
        studyNewWord();
    }
}

function resetColorAndText() {
    document.getElementById("your-answer-input").style.backgroundColor = "rgb(0, 241, 241)";
    document.getElementById("your-answer-input").value = "";
}

function displayResults() {
    correct_answers = JSON.parse(localStorage.getItem("correct_answers"));
    words_done = JSON.parse(localStorage.getItem("words_done"));
    document.getElementById("results-p").innerHTML = String(correct_answers) + " / " + String(words_done);
    results_percent = (correct_answers / words_done) * 100;
    if(results_percent >= 95){
        document.getElementById("conclusion-p").innerHTML = "Amazing!";
    } else if(results_percent >= 85) {
        document.getElementById("conclusion-p").innerHTML = "Great!";
    } else if(results_percent >= 75) {
        document.getElementById("conclusion-p").innerHTML = "Well done!";
    } else if(results_percent >= 50) {
        document.getElementById("conclusion-p").innerHTML = "There's always room for improvement.";
    } else {
        document.getElementById("conclusion-p").innerHTML = "Don't give up! Anything is possible with a bit of practice.";
    }
}

function newWordOrAnswer(which) {
    // This function is for deciding wether one should answer with the explanation or the new word.
    if(which == "newWord"){
        answer_is_new_word = true;
    } else if(which == "answer"){
        answer_is_new_word = false;
    }
    localStorage.setItem("answer_is_new_word", JSON.stringify(answer_is_new_word));
    document.location.href = 'https://asossosaror.github.io/study-glossary/studyGlossary.html';
}

function hideTwoButtons() {
    document.getElementById('choose-new-word').style.visibility = 'hidden';
    document.getElementById('choose-explanation').style.visibility = 'hidden';
    document.getElementById('random-set-btn').style.visibility = 'visible';
}

function testing(){
    document.getElementById('testp2').innerHTML = localStorage.getItem("obj_allSets");
}

function another(){
    var cracked = JSON.parse(localStorage.getItem("obj_allSets"));
    document.getElementById("testp2").innerHTML = Object.keys(cracked);
    console.log(Object.keys(cracked).includes("blabla"));
}

//Set the items of the headline table.
function listHeadlines() {
    //Variable to count the number of deleteBtns that have been created.
    btnNum += 1;
    obj_allSets = JSON.parse(localStorage.getItem("obj_allSets"));
    const headlineTable = document.getElementById("headline-table-body");
    Object.keys(obj_allSets).forEach((value) => {
        console.log(value);
        const newHeadlineRow = document.createElement("tr");
        const headlineCell = document.createElement("td");
        const headlineAnchorTag = document.createElement("a");
        headlineAnchorTag.innerText = value;
        headlineAnchorTag.className = 'headline-anchor-tag';
        headlineAnchorTag.id = 'headline-anchor-tag' + String(btnNum);
        headlineAnchorTag.href = "#";
        headlineCell.appendChild(headlineAnchorTag);
        const deleteBtn = document.createElement("button");
        deleteBtn.className = 'icon-btn';
        deleteBtn.id = 'icon-btn' + String(btnNum);
        deleteBtn.setAttribute("onClick", "iconBtnClick(this.id, this.className)");
        deleteBtn.innerHTML = "<span class='material-symbols-outlined'>delete</span>";
        headlineCell.appendChild(deleteBtn);
        newHeadlineRow.appendChild(headlineCell);
        headlineTable.appendChild(newHeadlineRow);
    })
}

function iconBtnClick(btnId, btnClass) {
    console.log(btnId);
    console.log(btnClass);
    var headline = document.getElementById(btnId).parentElement.parentElement.children[0].firstChild;
    console.log(headline);
    localStorage.setItem("headlineToDelete", headline);
    deleteHeadline();
}

function deleteHeadline() {
    let confirmDelete = confirm("Are you sure you want to delete this set?");
    if(confirmDelete == true) {
        let setToDelete = localStorage.getItem("headlineToDelete");
        obj_allSets = JSON.parse(localStorage.getItem("obj_allSets"));
        delete obj_allSets[setToDelete];
        console.log(obj_allSets);
    } else {
        document.location.href = 'https://asossosaror.github.io/study-glossary/changeHeadline.html';
        return;
    }
    //headline = document.getElementById("icon-btn1").parentElement.parentElement.children[0].firstChild;
}

function deletePair() {
    alert("Are you sure you want to delete this pair?");
}

function goToListWords(btnId, btnClass) {
    console.log(btnId);
    console.log(btnClass);
    let headlineToShow = document.getElementById(btnId).parentElement.parentElement.children[0].firstChild;
    console.log("Headline to show: " + headlineToShow);
    localStorage.setItem("setToShow", headlineToShow);
    document.location.href = "https://asossosaror.github.io/study-glossary/changeWords.html";
}

function listWords() {
    obj_allSets = JSON.parse(localStorage.getItem("obj_allSets"));
    headlineToShow = localStorage.getItem("setToShow");
    console.log(headlineToShow);
    obj_setToShow = obj_allSets[headlineToShow];
    const wordsTable = document.getElementById("headline-table");
}