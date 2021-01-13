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
    const month = `0${Number(birthDate.getUTCMonth() + 1)}`.slice(-2);
    const day = `0${birthDate.getUTCDate()}`.slice(-2);

    return {
      iso: `${year}-${month}-${day}`,
      birthDay: `${day}/${month}`,
      day: `${day}`,
      month: `${month}`,
      year: `${year}`,
      format: `${day}/${month}/${year}`,
    };
  },

  levelSchool: (schoolYear) => {
    let levelShool = '';

    switch (schoolYear) {
      case '5EF':
        levelShool = '5º ano do ensino fundamental';
        break;
      case '6EF':
        levelShool = '6º ano do ensino fundamental';
        break;
      case '7EF':
        levelShool = '7º ano do ensino fundamental';
        break;
      case '8EF':
        levelShool = '8º ano do ensino fundamental';
        break;
      case '9EF':
        levelShool = '9º ano do ensino fundamental';
        break;
      case '1EM':
        levelShool = '1º ano do ensino médio';
        break;
      case '2EM':
        levelShool = '2º ano do ensino médio';
        break;
      case '3EM':
        levelShool = '3º ano do ensino médio';
        break;
    }

    return levelShool;
  },
};
