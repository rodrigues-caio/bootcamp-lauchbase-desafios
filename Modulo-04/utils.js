module.exports = {
  age: (timestamp) => {
    const today = new Date();
    const birthDay = new Date(timestamp);

    const year = today.getUTCFullYear() - birthDay.getUTCFullYear();
    const month = today.getUTCMonth() - birthDay.getUTCMonth();

    let age = year;

    if (
      month < 0 ||
      (month == 0 && today.getUTCDate() < birthDay.getUTCDate())
    ) {
      age = age - 1;
    }

    return age;

    // 9 - 10 = -1 // ainda nao fiz 24
    // 10 - 10 = 0 // mês de aniversário
    // 11 - 10 = 1 // fiz 24 anos

    // 4 - 5 = -1 // ainda não fiz 24
    // 5 - 5 = 0 // fiz 24
    // 6 - 5 = 1
  },
};
