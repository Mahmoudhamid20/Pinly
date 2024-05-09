let myInput = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myInput") )
const tabBtn = document.getElementById("tab-btn")

if (leadsFromLocalStorage) {
    myInput = leadsFromLocalStorage
    render(myInput)
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myInput.push(tabs[0].url)
        localStorage.setItem("myInput", JSON.stringify(myInput) )
        render(myInput)
    })
})

function render(input) {
    let listItems = ""
    for (let i = 0; i < input.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${input[i]}'>
                    ${input[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myInput = []
    render(myInput)
})

inputBtn.addEventListener("click", function() {
    myInput.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myInput", JSON.stringify(myInput) )
    render(myInput)
})