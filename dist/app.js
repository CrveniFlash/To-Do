let addBtn = document.querySelector(".add-item")
let delBtn = document.querySelector(".del-item")
let todosAdd = document.querySelector(".todos-add")
let items = document.querySelector(".items")
let todoItems = document.querySelectorAll(".todo-item")

addBtn.addEventListener("click", addTodo)
delBtn.addEventListener("click", clearAllTodos)


function clearAllTodos() {
    return todosAdd.innerHTML = ``
}

function addTodo() {
    let userInput = document.querySelector(".user-input").value
    let errorMsg = document.querySelector(".error-msg")

    if (userInput === "") {
        errorMsg.classList.remove("hidden")
    } else {
        errorMsg.classList.add("hidden")

        todosAdd.innerHTML += `<li class="todo-item flex items-center justify-between border-b-[1px] border-gray-500 py-4">
        <div class="flex items-center space-x-4 my-2">
            <input type="checkbox" checked="unchecked" class="user-input checkbox" />
            <span class="todo-text text-lg">${userInput}</span>
        </div>
        <div>
            <div class="dropdown dropdown-hover">
                <label tabindex="0" class="btn btn-ghost btn-sm m-1">...</label>
                <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><button id="" class="mark-todo-done todo-done">Done</button></li>
                    <li><button id="" class="del-todo-btn delete-todo">Delete</button></li>
                </ul>
            </div>
        </div>
    </li>`
    }
}

items.addEventListener("click", (e) => {
    let todo = document.querySelector(".todo-text")
    let item = e.target.closest(".todo-item")
    let todoText = document.querySelectorAll(".todo-text")

    if (e.target && e.target.classList.contains("del-todo-btn")) {
        item.remove()
    }
    if (e.target && e.target.classList.contains("mark-todo-done")) {
        let mkDone = e.target
        if (mkDone.closest(".todo-item") === item) {
            item.classList.add("line-through")
        }

    }
})










//kako profesionalac radi















const items = document.querySelector(".items");
const errorMsg = document.querySelector(".error-msg");

const create = (tag = "div", options = {}, children = []) => {
    const node = Object.assign(document.createElement(tag), options);
    if (children.length) node.append(...children);
    return node;
}
const clearAllTodos = () => [...todos.children].forEach(child => child.remove());

document.querySelector(".del-item").addEventListener("click", clearAllTodos, { passive: true })

document.querySelector("form#newTask").addEventListener("submit", e => {
    e.preventDefault();
    const input = new FormData(e.target);
    errorMsg.classList.toggle("hidden", input.get("task")); /* in reality I'd just use a "required" attribute on the input */
    if (!input.get("task")) return;
    items.append(
        create("li", {
            className: "todo-item flex items-center justify-between border-b-[1px] border-gray-500 py-4"
        }, [
            create("div", {
                className: "flex items-center space-x-4 my-2"
            }, [
                create("input", { type: "checkbox", className: "user-input checkbox" }),
                create("span", { className: "todo-text text-lg", textContent: input.get("task") })
            ]),
            create("div", {}, [
                create("div", { className: "dropdown dropdown-hover" }, [
                    create("label", { tabindex: 0, className: "btn btn-ghost btn-sm m-1", textContent: "..." }),
                    create("ul", { tabindex: 0, className: "dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52" }, [
                        create("li", {}, [
                            create("button", { className: "todo-done", textContent: "Done" }),
                        ]),
                        create("li", {}, [
                            create("button", { className: "delete-todo", textContent: "Delete" }),
                        ]),
                    ])
                ])
            ])
        ])
    )
})

items.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const li = btn.closest("li.todo-item");
    if (btn.classList.contains("delete-todo")) li.remove();
    else if (btn.classList.contains("todo-done")) li.querySelector("span.todo-text").classList.toggle("line-through");
}, { passive: true });