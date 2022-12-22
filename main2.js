// When an element is clicked
document.addEventListener("click", e => {
    const isDropdown = e.target.matches("[data-dropdown-button]");
    if(!isDropdown && e.target.closest("[data-dropdown]") != null) {
        return;
    }
    // if the clicked element is the dropdown, toggle the active-mode.
    let currentDropdown;
    if(isDropdown) {
        currentDropdown = e.target.closest("[data-dropdown]");
        currentDropdown.classList.toggle("active");
    }

    // find all the active elements with the data-type '[data-dropdown]'. 
    // Do nothing if it is the current dropdown.
    // If it is another dropdown, close it.
    document.querySelectorAll("[data-dropdown].active").forEach(dropdown => {
        if(dropdown === currentDropdown){
            return;
        }
        dropdown.classList.remove("active");
    })
})