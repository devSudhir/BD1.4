const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

function getWelcomeMsg() {
  return 'Welcome to our service!';
}

app.get('/welcome', (req, res) => {
  res.send(getWelcomeMsg());
});

function greetMessage(userName) {
  return `Hello ${userName}!`;
}

app.get('/greet', (req, res) => {
  const { username } = req.query;
  res.send(greetMessage(username));
});

function checkPassword(password) {
  return `Password is ${password.length > 15 ? 'strong' : 'weak'}`;
}
app.get('/check-password', (req, res) => {
  const { password } = req.query;
  res.send(checkPassword(password));
});

function sumOfTwo(num1, num2) {
  return (parseFloat(num1) + parseFloat(num2)).toString();
}

app.get('/sum', (req, res) => {
  const { num1, num2 } = req.query;
  res.send(sumOfTwo(num1, num2));
});

function isUserSubscribed(userNmae, isSubScribed) {
  return isSubScribed === 'true'
    ? `${userNmae} is Subscribed`
    : `${userNmae} is not Subscribed`;
}

app.get('/subscription-status', (req, res) => {
  const { userName, isSubscribed } = req.query;
  res.send(isUserSubscribed(userName, isSubscribed));
});

function calculateDiscountedPrice(price, discount) {
  return price - (price * discount) / 100;
}

app.get('/discounted-price', (req, res) => {
  const { price, discount } = req.query;
  res.send(
    calculateDiscountedPrice(parseFloat(price), parseFloat(discount)).toString()
  );
});

function personalizedGreeting(name, age, gender) {
  return `Hello, ${name}! You are a ${age} year old ${gender}.`;
}

app.get('/personalized-greeting', (req, res) => {
  const { name, age, gender } = req.query;
  res.send(personalizedGreeting(name, age, gender));
});

function addTaxOverDiscountedPrice(discountedPrice, tax) {
  return discountedPrice + (discountedPrice * tax) / 100;
}

app.get('/final-price', (req, res) => {
  const { price, discount, tax } = req.query;
  res.send(
    addTaxOverDiscountedPrice(
      calculateDiscountedPrice(parseFloat(price), parseFloat(discount)),
      parseFloat(tax)
    ).toString()
  );
});

app.get('/total-exercise', (req, res) => {
  const { running, cycling, swiming } = req.query;
  res.send(sumOfTwo(sumOfTwo(running, cycling), swiming));
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
