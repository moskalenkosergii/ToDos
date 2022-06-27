const todosNode = document.querySelector('#jsTodos')
const todoInputText = document.querySelector('#todoText')
const checkBox = todosNode.getElementsByTagName('input')
const childTodosNode = todosNode.childNodes;




let todos = [];

function addTodo(text) {


    const todo = {
        text,
        done: false,
        id: `${Math.random()}`
    }
    todos.push(todo);

    render(todo);
}



function deleteTodo(id) {
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id === id) {
            todos.splice(i, 1);
            for (const deleteNode of childTodosNode) {
                const idBtn = deleteNode.querySelector('button').id
                if (idBtn === id) {
                    deleteNode.remove();

                }
            }
        }
    }
}

function doneTodo(id, checked) {
    todos.forEach(todo => {
        if (todo.id === id) {
            for (const el of childTodosNode) {
                const pTag = el.querySelector('p');
                const idEl = el.querySelector('input').id;
                if (idEl === id) {
                    if (checked) {
                        todo.done = true;
                        pTag.style.textDecoration = "line-through"
                    } else {
                        todo.done = false;
                        pTag.style.textDecoration = 'none'
                    }
                    todosChangePosition(el);
                }
            }
        }
    })
}

function todosChangePosition(mainEl) {
    for (const childEl of childTodosNode) {
        const checkedBox = childEl.firstChild.checked;
        if (mainEl !== childEl) {
            if (checkedBox) {
                todosNode.insertBefore(mainEl, childEl);
                return;
            } else {
                todosNode.append(mainEl)
            }
        }
    }
}


function render(todo) {
    // todosNode.innerHTML = "";

    //create btn "Done"

    const doneBtn = document.createElement('input')
    doneBtn.id = todo.id
    doneBtn.type = 'checkbox'
    doneBtn.className = 'form-check-input m-2 align-self-center'

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.id = todo.id;
    deleteBtn.className = 'btn btn-danger align-self-center';

    //create btn "li" & "p" and add elements
    const liTag = document.createElement('li')
    const pTag = document.createElement('p');
    pTag.id = todo.id;
    pTag.className = 'm-auto col-10'
    liTag.classList = 'list-group-item d-flex justify-content-between '
    pTag.append(todo.text);
    liTag.append(doneBtn);
    liTag.append(pTag);
    liTag.append(deleteBtn)
    todosNode.prepend(liTag)
    // }

}

function editText(id) {

    todos.forEach(todo => {
        if (todo.id === id) {
            for (const el of childTodosNode) {
                const pTag = el.querySelector('p');
                const pTagId = pTag.id;
                if (pTagId === id) {
                    let val = pTag.innerHTML;
                    let input = document.createElement('textarea');
                    input.className = 'm-auto col-10 '
                    input.contentEditable = 'true'
                    input.value = val;
                    input.onblur = function () {

                        let val = this.value;
                        if (val !== '') {
                            this.parentNode.innerHTML = val;
                            todo.text = val;
                        }

                    }
                    pTag.innerHTML = '';
                    pTag.append(input);
                    input.focus();


                }
            }


        }
    })

}


todosNode.addEventListener('click', (e) => {
    const tagName = e.target.tagName;
    const id = e.target.id;
    const check = e.target.checked;

    if (tagName !== 'BUTTON' && tagName !== 'INPUT') {
        return;
    }

    if (e.target.textContent === 'X') {
        deleteTodo(id)

    }
    if (tagName === 'INPUT') {

        doneTodo(id, check);
    }


})

todosNode.addEventListener('dblclick', (e) => {
    if (e.target.tagName === 'BUTTON' && e.target.tagName === 'INPUT') {
        return;
    }
    const id = e.target.id;
    if (e.target.tagName === 'P') editText(id)
})


todoInputText.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        if (todoInputText.value !== '') {
            todoInputText.placeholder = 'please enter text';
            todoInputText.classList = 'mx-auto form-control'
            addTodo(todoInputText.value);
            todoInputText.value = '';
        } else {
            // todoInputText.className = 'border border-4 border-danger'
            todoInputText.classList = 'mx-auto form-control is-invalid'
            todoInputText.placeholder = 'please repeat enter text';
        }
    }


})

console.log('Test git')




/*


Планы и залачи на завтра
+++ 1. Решить вопрос с опусканием задачи вниз при выполнении, 
а если эта задача снова нуждается в выполнении то она подымается выше всех уже выполненых задач.

+++ 2.Сделать проверку на написание текста, чтобы текст невозможно было ввести пустой

3. Постаратся сделать красивый внешний вид Тудушки

++++ 4. Установить GIT

++++ 5. Зарегистрироватся в GitHub и залить работу туда...

и уже в будущем пользоватся гитом для добовления своих работ...


*/





