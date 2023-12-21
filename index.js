
let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.querySelector("#input-btn")
const ulEl = document.getElementById("ul-el")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
let deleteBtn = document.getElementById("delete-btn")
let tabBtn = document.getElementById("tab-btn")

if (leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}


tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render(myLeads)
    })
})

function render(lead){
    let listItems = ""
    for (let i = 0; i < lead.length ; i++){
        listItems += `
        <li>
            <a target='_blank' href='${lead[i]}'>
            ${lead[i]}
            </a>
        </li>
        ` 
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads)
})




