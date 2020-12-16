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

  date: (timestamp) => {
    const birthDate = new Date(timestamp);

    const year = birthDate.getUTCFullYear();
    const month = `0${Number(birthDate.getUTCMonth() + 1)}`.split(-2);
    const day = `0${birthDate.getUTCDate()}`.slice(-2);

    return `${year}-${month}-${day}`;
  },
};
