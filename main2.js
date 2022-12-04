let AnchorTag = document.createElement("a");
AnchorTag.innerText = "a-tag";
AnchorTag.onclick = "goToListWords(this.id, this.className)";
AnchorTag.className = 'headline-anchor-tag';
AnchorTag.id = 'anchor-tag';
document.getElementById("the-cell").appendChild(AnchorTag);

function iconBtnClick(btnId) {
    console.log(btnId);
    console.log(document.getElementById(btnId).parentElement.parentElement.children[0].firstChild);
}

Object.keys(obj_setToShow).forEach((key) => {
    console.log(key);
    let newWordRow = document.createElement("tr");
    let newWordCell = document.createElement("td");
    let explanationCell = document.createElement("td");
    let binCell = document.createElement("td");
    newWordCell.innerText = key;
    explanationCell.innerText = obj_setToShow[key];
    let deleteBtn = document.createElement("button");
    deleteBtn.className = 'icon-btn';
    deleteBtn.onclick = 'deletePair()';
    deleteBtn.innerHTML = "<span class='material-symbols-outlined'>delete</span>";
    binCell.appendChild(deleteBtn);
    newWordRow.appendChild(newWordCell);
    newWordRow.appendChild(explanationCell);
    newWordRow.appendChild(binCell);
    wordsTable.appendChild(newWordRow);
})
