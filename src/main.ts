class Calculator {
  constructor(
    public bill: number,
    public tipPercentage: number,
    public peopleAmount: number
  ) {}

  calc() {
    const tipResult = document.getElementById("tipPrice") as HTMLElement;
    const tipAmount =
      (this.bill * this.tipPercentage) / 100 / this.peopleAmount;
    tipResult.textContent = `$${tipAmount.toFixed(2)}`;

    const totalResult = document.getElementById("totalPrice") as HTMLElement;
    const totalAmount =
      (this.bill + (this.bill * this.tipPercentage) / 100) / this.peopleAmount;
    totalResult.textContent = `$${totalAmount.toFixed(2)}`;
  }
}

let billAmount: number = 0;
let tipAmount: number = 0;
let peopleAmount: number = 0;

const calc = () => {
  if (tipAmount && billAmount && peopleAmount) {
    const calculate = new Calculator(billAmount, tipAmount, peopleAmount);
    calculate.calc();
  }
};

const reset = document.getElementById("reset") as HTMLElement;
const billEl = document.getElementById("billInput") as HTMLInputElement;
const tips = document.querySelectorAll("input[type='radio']");
const personAmount = document.getElementById(
  "personAmount"
) as HTMLInputElement;
const custom = document.getElementById("custom") as HTMLInputElement;

billEl.addEventListener("input", () => {
  billAmount = +billEl.value;
  calc();
});

personAmount.addEventListener("input", () => {
  peopleAmount = +personAmount.value;
  const personAmountEl = document.getElementById(
    "personContainer"
  ) as HTMLElement;
  const errorZero = document.getElementById("errorZero") as HTMLElement;
  if (parseFloat(personAmount.value) === 0) {
    personAmountEl.classList.add("error");
    errorZero.classList.add("show");
    errorZero.classList.remove("hid");
    document.getElementById("tipPrice")!.textContent = "$0.00";
    document.getElementById("totalPrice")!.textContent = "$0.00";
  } else {
    personAmountEl.classList.remove("error");
    errorZero.classList.remove("show");
    errorZero.classList.add("hid");
    calc();
  }
});

custom.addEventListener("input", () => {
  if (custom.value) {
    tips.forEach((tip: any) => {
      tip.disabled = true;
    });
    tipAmount = +custom.value;
  } else {
    tips.forEach((tip: any) => {
      tip.disabled = false;
    });
  }
  calc();
});

tips.forEach((tip: any) => {
  tip.addEventListener("input", () => {
    tipAmount = +tip.value;
    calc();
  });
});

reset.addEventListener("click", () => {
  const errorZero = document.getElementById("errorZero") as HTMLElement;
  const personAmountEl = document.getElementById(
    "personContainer"
  ) as HTMLElement;
  billEl.value = "";
  personAmount.value = "";
  custom.value = "";
  tips.forEach((tip: any) => {
    tip.checked = false;
  });
  document.getElementById("tipPrice")!.textContent = "$0.00";
  document.getElementById("totalPrice")!.textContent = "$0.00";
  billAmount = 0;
  tipAmount = 0;
  peopleAmount = 0;

  window.location.reload();

  personAmountEl.classList.remove("error");
  errorZero.classList.remove("show");
  errorZero.classList.add("hid");
});
