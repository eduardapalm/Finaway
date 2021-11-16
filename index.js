const newRegisterBtn = document.querySelectorAll(".newRegister");
const gainsBtn = document.querySelector(".green-choice");
const expensesBtn = document.querySelector(".red-choice");
const formTitle = document.querySelector(".form-title");
const originText = document.querySelector(".origin");
const originInput = document.querySelector(".entrie-origin");
const valueInput = document.querySelector(".entrie-value");
const dateInput = document.querySelector(".entrie-date");
const cancelBtn = document.querySelector(".cancel");
const registerBtn = document.querySelector(".register");
const modalForm = document.querySelector(".modal-form");
const liOriginGains = document.querySelector(".gains-origin-li");
const liValueGains = document.querySelector(".gains-value-li");
const liDateGains = document.querySelector(".gains-date-li");
const liOriginExpenses = document.querySelector(".expenses-origin-li");
const liValueExpenses = document.querySelector(".expenses-value-li");
const liDateExpenses = document.querySelector(".expenses-date-li");
const allInput = document.querySelectorAll(".inputs");
const gainsHistory = document.querySelector(".gains-list");
const expensesHistory = document.querySelector(".expenses-list");
const gains = [];
const expenses = [];
let registered = false;

const modifyClassList = (element, action, classTitle) => {
  if (action === "remove") {
    document.querySelector(element).classList.remove(classTitle);
  }
  if (action === "add") {
    document.querySelector(element).classList.add(classTitle);
  }
};

const activateForms = (type) => {
  modifyClassList(".modal-choices", "add", "hidden");
  modifyClassList(".modal-form", "remove", "hidden");
  modifyClassList(".modal-form", "add", type);
  if (type === "expenses") {
    modifyClassList(".modal-form", "remove", "gains");
  } else {
    modifyClassList(".modal-form", "remove", "expenses");
  }
};

const pushData = () => {
  if (modalForm.classList.contains("gains")) {
    return gains.push({
      Origin: originInput.value,
      Value: valueInput.value,
      Date: dateInput.value,
    });
  }
  if (modalForm.classList.contains("expenses")) {
    return expenses.push({
      Origin: originInput.value,
      Value: valueInput.value,
      Date: dateInput.value,
    });
  }
};

const clearInput = () => {
  return allInput.forEach((item) => (item.value = null));
};

const showGains = () => {
  gains.map((item) => {
    const originH3 = document.createElement("h3");
    originH3.innerHTML = item.Origin;
    originH3.classList.add("origin-show");

    const valueP = document.createElement("p");
    valueP.innerHTML = `R$ ${item.Value.replace(".", ",")}`;
    valueP.classList.add("value-show");

    const dateP = document.createElement("p");
    dateP.innerHTML = item.Date;
    dateP.classList.add("date-show");

    gainsHistory.appendChild(originH3);
    gainsHistory.appendChild(valueP);
    gainsHistory.appendChild(dateP);
  });
};

const showExpenses = () => {
  expenses.map((item) => {
    const originH3 = document.createElement("h3");
    originH3.innerHTML = item.Origin;
    originH3.classList.add("origin-show");

    const valueP = document.createElement("p");
    valueP.innerHTML = `R$ ${item.Value.replace(".", ",")}`;
    valueP.classList.add("value-show");

    const dateP = document.createElement("p");
    dateP.innerHTML = item.Date;
    dateP.classList.add("date-show");

    expensesHistory.appendChild(originH3);
    expensesHistory.appendChild(valueP);
    expensesHistory.appendChild(dateP);
  });
};

const calcGains = () => {
  const gainsValues = [];
  gains.map((item) => {
    gainsValues.push(item.Value);
  });
  const totalGains = gainsValues.reduce((acc, item) => {
    const values = Number(item);
    return (acc += values);
  }, 0);
  return totalGains;
};

const calcExpenses = () => {
  const expensesValues = [];
  expenses.map((item) => {
    expensesValues.push(item.Value);
  });
  const totalExpenses = expensesValues.reduce((acc, item) => {
    const values = Number(item);
    return (acc += values);
  }, 0);
  return totalExpenses;
};

const getDate = () => {
  const momentOfSave = new Date();
  const gnsDate = { date: "" };
  const expDate = { date: "" };
  if (modalForm.classList.contains("gains")) {
    gnsDate.date = `${momentOfSave.getHours()}:${momentOfSave.getMinutes()}:${momentOfSave.getSeconds()}`;
  } else {
    expDate.date = `${momentOfSave.getHours()}:${momentOfSave.getMinutes()}:${momentOfSave.getSeconds()}`;
  }
  const lastDate = { gnsDate, expDate };
  console.log(lastDate);
  return lastDate;
};

const showSummary = () => {
  const dates = getDate();
  const totalGains = document.querySelector(".gns-sumary");
  const totalExpenses = document.querySelector(".exp-sumary");
  const lastRegistryGns = document.querySelector(".gns-lastRegistry");
  const lastRegistryExp = document.querySelector(".exp-lastRegistry");
  totalGains.innerHTML = `R$ ${calcGains()}`;
  totalExpenses.innerHTML = `R$ ${calcExpenses()}`;
  if (dates.gnsDate.date !== "") {
    lastRegistryGns.innerHTML = `Última modificação: ${dates.gnsDate.date}`;
  }

  if (dates.expDate.date !== "") {
    lastRegistryExp.innerHTML = `Última modificação: ${dates.expDate.date}`;
  }
};

newRegisterBtn.forEach((item) => {
  item.addEventListener("click", () => {
    modifyClassList(".no-registers", "add", "hidden");
    modifyClassList(".modal", "remove", "hidden");
    modifyClassList(".modal-choices", "remove", "hidden");
    modifyClassList(".modal-form", "add", "hidden");
  });
});

gainsBtn.addEventListener("click", () => {
  activateForms("gains");
  formTitle.textContent = "Ganhos";
  originText.textContent = "Origem do Ganho:";
  clearInput();
});

expensesBtn.addEventListener("click", () => {
  activateForms("expenses");
  formTitle.textContent = "Despesas";
  originText.textContent = "Origem da Despesa:";
  clearInput();
});
console.log(gains, expenses);

cancelBtn.addEventListener("click", () => {
  modifyClassList(".modal", "add", "hidden");
  if(registered === false) {
    modifyClassList(".no-registers", "remove", "hidden");
  }
});

registerBtn.addEventListener("click", () => {
  gainsHistory.innerHTML = null;
  expensesHistory.innerHTML = null;
  if (
    originInput.value === "" ||
    valueInput.value === "" ||
    dateInput.value === ""
  ) {
    modifyClassList(".warning", "remove", "hidden");
  } else {
    modifyClassList(".modal", "add", "hidden");
    modifyClassList(".registers-board", "remove", "hidden");
    pushData();
    showGains();
    showExpenses();
    showSummary();
    registered = true;
  }
});
