const programador = {
  nome: "Caio",
  idade: 23,
  tecnologias: [
    {
      nome: "Javascript",
      especialidade: "Desktop",
    },
    {
      nome: "Python",
      especialidade: "Ciência de Dados",
    },
    {
      nome: "C++",
      especialidade: "Mobile",
    },
  ],
};

console.log(
  `O usuário ${programador.nome} tem ${programador.idade} anos e usa a tecnologia ${programador.tecnologias[0].nome} com especialidade ${programador.tecnologias[0].especialidade}`
);
