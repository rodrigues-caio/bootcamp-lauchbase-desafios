const user = {
  name: "Caio",
  transactions: [],
  balance: 0,
};

function createTransaction(transaction) {
  if (transaction.type == "credit") {
    user.balance = user.balance + transaction.value;
  } else {
    user.balance = user.balance - transaction.value;
  }

  user.transactions.push(transaction);
}

function getHigherTransactionByType(typeName) {
  let valueHeight = 0;
  let transactionHeight;

  for (let transaction of user.transactions) {
    if (transaction.type == typeName && transaction.value > valueHeight) {
      valueHeight = transaction.value;
      transactionHeight = transaction;
    }
  }

  return transactionHeight;
}

function getAverageTransactionValue() {
  let soma = 0;

  for (let transaction of user.transactions) {
    soma = soma + transaction.value;
  }

  const media = soma / user.transactions.length;

  return media;
}

function getTransactionsCount() {
  let numberOfCredit = 0;
  let numberOfDebit = 0;

  for (let transaction of user.transactions) {
    if (transaction.type == "credit") {
      numberOfCredit = numberOfCredit + 1;
    } else {
      numberOfDebit = numberOfDebit + 1;
    }
  }

  const numberOfEachType = {
    credit: numberOfCredit,
    debit: numberOfDebit,
  };

  return numberOfEachType;
}

createTransaction({ type: "credit", value: 50 });
createTransaction({ type: "credit", value: 120 });
createTransaction({ type: "debit", value: 80 });
createTransaction({ type: "debit", value: 30 });

console.log(user.balance);

console.log(getHigherTransactionByType("credit"));
console.log(getHigherTransactionByType("debit"));

console.log(getAverageTransactionValue());

console.log(getTransactionsCount());
