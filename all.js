/*  完成條件
    1. TodoList: 可新增和刪除待辦事項。
    2. TodoList: 待辦事項會有狀態（完成與否），可透過 checkbox 來切換。
    3. TodoList: 待辦清單列表會有『全部』、『完成』、『未完成』Tab 來做篩選切換。
    4. TodoList: 可以清除全部已完成功能。
    5. TodoList: 會顯示出待完成的待辦有幾項。 */

// TodoList資料 (陣列 -> 物件)
let data = [];
// DOM
const addInput = document.querySelector(".add_input");
const addBtn = document.querySelector(".btn_add");
const tab = document.querySelector(".tab");
const list = document.querySelector(".list");
const todoNum = document.querySelector(".todo_num");
const clearList = document.querySelector(".clear_list");

// 渲染資料
function render(showData = data) {
  let str = "";
  showData.forEach((i) => {
    str += `<li data-id="${i.id}">
              <label class="checkbox">
                <input type="checkbox" ${i.status}>
                <span>${i.content}</span>
              </label>
              <a href="#" class="delete">🅧</a>
            </li>`;
  });
  list.innerHTML = str;
  // 待完成項目數
  todoNum.textContent = data.filter((i) => i.status === "").length;
}

// 新增 List
function addTodo() {
  let newTodo = {
    id: new Date().getTime(),
    content: addInput.value.trim(),
    status: "",
  };
  if (addInput.value.trim() === "") {
    alert("待辦事項不能留白～");
    return;
  }
  data.push(newTodo);
  render();
  addInput.value = ""; // 重置 input 欄位
}
addBtn.addEventListener("click", () => addTodo());
addInput.addEventListener("keyup", (e) =>
  e.key == "Enter" ? addTodo() : null
);

// 刪除 List
list.addEventListener("click", (e) => {
  let id = e.target.closest("li").dataset.id;
  if (e.target.getAttribute("class") == "delete") {
    e.preventDefault();
    let dataIndex;
    data.forEach((i, index) => (i.id == id ? (dataIndex = index) : null));
    data.splice(dataIndex, 1);
    render();
  } else {
    data.forEach((i) => {
      if (i.id != id) return;
      i.status === "checked" ? (i.status = "") : (i.status = "checked");
    });
    render();
  }
});

// 清除已完成 List
clearList.addEventListener("click", (e) => {
  e.preventDefault();
  // data 重新賦予篩選的資料
  data = data.filter((i) => i.status !== "checked");
  render();
});

// 切換 Tab
tab.addEventListener("click", (e) => {
  let tabs = document.querySelectorAll(".tab li");
  let status = e.target.dataset.status;
  let filterData = data;

  tabs.forEach((i) => i.classList.remove("active"));
  if (status === "done") {
    filterData = data.filter((i) => i.status === "checked");
  } else if (status === "undone") {
    filterData = data.filter((i) => i.status !== "checked");
  }
  e.target.classList.add("active");
  render((showData = filterData));
});
