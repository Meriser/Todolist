// todolist (陣列 -> 物件)
let data = [];

// 1.渲染資料
const list = document.querySelector(".list");

function render(showData) {
  let str = "";
  showData.forEach((i) => {
    str += `<li data-id="${i.id}">
              <label class="checkbox">
                <input type="checkbox" ${i.status}>
                <span>${i.content}</span>
              </label>
              <a href="#" class="delete">X</a>
            </li>`;
  });
  list.innerHTML = str;
}

// 2.更新資料
const todoNum = document.querySelector(".todo_num");
let status = "all";

function update() {
  let showList = [];
  if (status === "done") {
    showList = data.filter((i) => i.status === "checked");
  } else if (status === "undone") {
    showList = data.filter((i) => i.status !== "checked");
  } else {
    showList = data;
  }
  // 待完成項目數
  todoNum.textContent = data.filter((i) => i.status === "").length;
  render(showList);
}

// 3.新增待辦事項
const addInput = document.querySelector(".add_input");
const addBtn = document.querySelector(".btn_add");

function addTodo() {
  let newTodo = {
    id: new Date().getTime(),
    content: addInput.value.trim(),
    status: ""
  };
  if (addInput.value.trim() === "") {
    alert("待辦事項不能留白～");
    return;
  }
  data.push(newTodo);
  update();
  addInput.value = "";
}
// 點擊按鈕、Enter鍵：新增待辦
addBtn.addEventListener("click", () => addTodo());
addInput.addEventListener("keyup", (e) =>
  e.key === "Enter" ? addTodo() : null
);

// 4.刪除 List、切換 checkbox
list.addEventListener("click", (e) => {
  let id = e.target.closest("li").dataset.id;
  let itemIndex = data.findIndex((i) => i.id == id);
  if (e.target.getAttribute("class") === "delete") {
    e.preventDefault();
    data.splice(itemIndex, 1);
    update();
  } else {
    data[itemIndex].status =
      data[itemIndex].status === "checked" ? "" : "checked";
  }
  update();
});

// 5.清除已完成項目
const clearList = document.querySelector(".clear_list");

clearList.addEventListener("click", (e) => {
  e.preventDefault();
  // data 賦予 篩選”待完成資料“
  data = data.filter((i) => i.status === "");
  update();
});

// 6.切換 Tab
const tabs = document.querySelectorAll(".tab li");
const tab = document.querySelector(".tab");

tab.addEventListener("click", (e) => {
  status = e.target.dataset.status;
  tabs.forEach((i) => i.classList.remove("active"));
  e.target.classList.add("active");
  update();
});

// 優化建議：
// ✅ 在已完成頁籤下取消勾選待辦事項後，沒有重新渲染（待完成事項不應出現在已完成頁籤）
// ✅ 更改勾選狀態的部分可透過 data[itemIndex].status 將狀態反轉，不需再跑 forEach
// ✅ 新增待辦事項後切到 "待完成" 頁籤，再切到 "全部" 的頁籤會顯是空的（不應是空的）
// ✅ 在待完成頁籤下勾選待辦事項後會渲染全部的待辦事項（應只渲染待完成的待辦事項）