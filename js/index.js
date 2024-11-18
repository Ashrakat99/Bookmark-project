var siteNameInput = document.getElementById("siteName");
var siteURLInput = document.getElementById("siteURL");

var requirementList = document.querySelectorAll(".requirement-list li");
var requirementList2 = document.querySelectorAll(".requirements-list li");
var siteNameWarn = document.getElementById("siteNameWarn");
var siteURLWarn = document.getElementById("siteURLWarn");

var siteList = [];

// /regex/
var nameRegex = /^[A-Z]\w{2,}(\s+\w+)*$/;
var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

const siteNameRequirements = [
{ regex: /.{3,}/, index: 0 },
{ regex: /^[A-Z][a-z]*$/, index: 1 },
];

const siteURLRequirements = [
{ regex: /.{3,}/, index: 0 },
{
    regex: /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/,
    index: 1,
},
];


if(localStorage.getItem("sites")){
    siteList = JSON.parse(localStorage.getItem("sites"));
    displaysiteList();
}   



// //validate
siteName.addEventListener("keyup", (e) => {
    let isValid = true;

    siteNameRequirements.forEach((item) => {
        const isRequirementMet = item.regex.test(e.target.value);
        const requirementItem = requirementList[item.index];

        if (isRequirementMet) {
        requirementItem.classList.add("valid");
        requirementItem.firstElementChild.className = "fa-solid fa-check"; 
        } else {
        requirementItem.classList.remove("valid");
        requirementItem.firstElementChild.className = "fa-solid fa-circle"; 
        isValid = false;
        }
    });



    if (isValid) {
        siteNameWarn.classList.add("d-none"); 
        validate(siteName, nameRegex);        
    } else {
        siteNameWarn.classList.remove("d-none"); 
        validate(siteName, nameRegex);          
    }
});

siteURL.addEventListener("keyup", (e) => {
    var isValid = true;

    siteURLRequirements.forEach((item) => {
        const isRequirementMet = item.regex.test(e.target.value);
        const requirementItem = requirementList2[item.index];

        if (isRequirementMet) {
            requirementItem.classList.add("valid");
            requirementItem.firstElementChild.className = "fa-solid fa-check"; 
        } else {
            requirementItem.classList.remove("valid");
            requirementItem.firstElementChild.className = "fa-solid fa-circle"; 
            isValid = false;
        }
});

    if (isValid) {
        siteURLWarn.classList.add("d-none"); 
        validate(siteURL, urlRegex);        
    } else {
        siteURLWarn.classList.remove("d-none"); 
        validate(siteURL, urlRegex);          
    }
});


function addBookmark(){

    const siteExists = siteList.some(bookmark => bookmark.site.toLowerCase() === siteNameInput.value.toLowerCase());

    if (siteExists) {
        alert("This site name already exists. Please enter a unique site name.");
        return; 
    }


    var object = {
        site : siteNameInput.value,
        URL : siteURLInput.value,
    }
    console.log(object);
    siteList.push(object);
    clearForm();
    localStorage.setItem("sites", JSON.stringify(siteList));
    displaysiteList()

    
}   

//Validate Function
function validate(element, regex) {
    var testRegex = regex;
    if (testRegex.test(element.value)) {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
    } else {
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
    }
}




function clearForm(){
    siteNameInput.value = "";
    siteURLInput.value = "";
    siteURL.classList.remove("is-valid");
    siteName.classList.remove("is-valid");

}


function displaysiteList() {
    var bookmarkList = document.getElementById("bookmarkList");
    bookmarkList.innerHTML = "";    

    siteList.forEach((bookmark, index) => {
        var row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${bookmark.site}</td>
            <td>
                <a href="${bookmark.URL}" target="_blank" class="btn btn-success">Visit</a>
            </td>
            <td>
                <button class="btn btn-danger" onclick="deleteBookmark(${index})">Delete</button>
            </td>
        `;
        bookmarkList.appendChild(row);
    })
}


function deleteBookmark(index){
    siteList.splice(index,1);
    localStorage.setItem("sites", JSON.stringify(siteList));
    displaysiteList();
}

