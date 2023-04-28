let curr_one = document.getElementById("currency-one");
let amount_one = document.getElementById("amount-one");
let curr_two = document.getElementById("currency-two");
let amount_two = document.getElementById("amount-two");

let rates = document.getElementById("rate");
let swap = document.getElementById("swap");

// Fetch exchange rates and update the Document Object Model (DOM)
function caclulate() {
  // Get the currency values for currency 1 and currency 2
  let currency_one = curr_one.value;
  let currency_two = curr_two.value;

  // dynamic api to change different currency
  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then((res) => res.json())
    .then((data) => {
      let rate = data.rates[currency_two];

      rates.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
      // calculate the amount of currency 2 based on the rate with 2 decimal places
      amount_two.value = (amount_one.value * rate).toFixed(2);
    });
}

// call calculate function when currency change or amount change
curr_one.addEventListener("change", caclulate);
amount_one.addEventListener("input", caclulate);
curr_two.addEventListener("change", caclulate);
amount_two.addEventListener("input", caclulate);

// Swap currency
swap.addEventListener("click", () => {
  // store the value of currency 1 in temp
  let temp = curr_one.value;
  curr_one.value = curr_two.value;
  curr_two.value = temp;
  caclulate();
});

caclulate();
