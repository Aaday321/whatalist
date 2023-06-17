const list_UL_element = document.getElementById('list');
const input_element = document.getElementById('mainInput');
document.getElementById('submit').addEventListener('click', handleInputSubmit);


function newToDo(content){
    const wetNewLi = document.createElement('li');
    const contentP = document.createElement('p');
    contentP.innerText = content;
    wetNewLi.appendChild(contentP);
    wetNewLi.addEventListener('click',()=>list_UL_element.removeChild(wetNewLi));
    console.log(wetNewLi);
    
    list_UL_element.appendChild(wetNewLi);
    //return new_li;
};

function newElement({ tagName, contents, listenerArgs }){

    //Create new element
    const myElement = document.createElement(tagName);

    //Handle DOM elements and text as content
    if(contents){
        if(Array.isArray(contents)) {
            for(let i of contents) {
                if(i instanceof HTMLElement) myElement.appendChild(i);
                else if(typeof i === 'string') myElement.appendChild(newElement({ tagName: 'p', contents: i }));
            }
        } else if(typeof contents === 'string') myElement.innerText = contents;
        else if(contents instanceof HTMLElement) myElement.appendChild(contents);
    }

    //register event listeners if we have any
    if(listenerArgs){
        //Handle many event listeners
        if(Array.isArray(listenerArgs[0])){
            const arrayOfListeners = listenerArgs;
            for(let i of arrayOfListeners){
                const [ eventType, action ] = i;
                myElement.addEventListener(eventType, action);
            }
        //Handle a single event lister
        } else {
            const [ eventType, action ] = listenerArgs;
            myElement.addEventListener(eventType, action);
        }
    }

    return myElement;
};

function handleInputSubmit(e){
    e.preventDefault();
    const text = input_element.value;
    newToDo(text);
    input_element.value = "";
};

async function fetchToDos(){
    const toDos = await fetch('http://127.0.0.1:3000/');
    console.log(toDos);
};

fetchToDos();