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
