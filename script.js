let list_UL_element = document.getElementById('list');
const input_element = document.getElementById('mainInput');
const list_section = document.getElementById('listSection');
document.getElementById('submit').addEventListener('click', handleInputSubmit);

let toDos = [];

function newToDo(toDo, number){
    const { content, id } = toDo;
    const new_li = newElement({
        tagName: 'li',
        contents: [
            newElement({ tagName: 'p', contents: number.toString() + ') ' }),
            newElement({ tagName: 'p', contents: content }),
            newElement({ tagName: 'button', contents: '❌', listenerArgs: ['click', ()=>removeToDo(id)] }),
            newElement({ tagName: 'button', contents: '✅', listenerArgs: ['click', ()=>removeToDo(id)] })
        ],
        flex: true
    });
    return new_li;
};

function renderChildren(){
    list_section.removeChild(list_UL_element);
    list_UL_element = document.createElement('ul');
    for(let i=0; i<toDos.length; i++){
        list_UL_element.appendChild(newToDo(toDos[i], i+1));
    }
    document.getElementById('listSection').appendChild(list_UL_element);
};

function removeToDo(id){
    toDos = toDos.filter(i=>i.id!=id);
    renderChildren();
};

function newElement({ tagName, contents, listenerArgs, flex }){

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

    if(flex) myElement.style.display = "flex";   

    return myElement;
};

function handleInputSubmit(e){
    e.preventDefault();
    const content = input_element.value;
    if(!content) return;
    toDos.push({content, id: Math.floor(Math.random(10)) + Date.now()});
    list_UL_element.appendChild(newToDo(toDos[toDos.length-1], toDos.length));
    input_element.value = "";
};