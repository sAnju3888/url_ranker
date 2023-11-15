let arr = [];
const inputEl = document.getElementById("input-el");
const saveEl = document.getElementById("input-btn");
const tabEl = document.getElementById("tab-btn");
const deleteEl = document.getElementById("delete-btn");
const ulEl = document.getElementById("ul-tag");
const sitesFromLocalStorage = JSON.parse( localStorage.getItem("mysites") );



if (sitesFromLocalStorage) {
    arr = sitesFromLocalStorage;
    render(arr);
}
tabEl.addEventListener("click",function(){
   
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        console.log("prine");
        arr.push(tabs[0].url);

        localStorage.setItem("mysites", JSON.stringify(arr) );
        render(arr);
    })
})
function swap(i,j,array){
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}
function insertion_sort(array){
    console.log(array.length)
    for(let i=1;i<=array.length;i++){
        let curr  = i;
        while (curr!=0){
            swap(curr,curr-1,array);
            curr -= 1;
        }

    }
    
}
function render(array){
    let items = ""
    if (array.length>1){
        //insertion_sort(array);
    }
    for(let i=0;i<array.length;i++){
        if (array[i]==""){
            array.pop(i);
            break;
        }
        items += `
        <li>
              <a target="_blank" href="${array[i]}">${array[i]}
              </a>

        </li>
        `;
    }
    ulEl.innerHTML = items;
}

saveEl.addEventListener("click",function(){
    arr.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("mysites", JSON.stringify(arr));
    render(arr);

})

deleteEl.addEventListener("click",function(){
    localStorage.clear();
    arr = [];
    render(arr);
})




