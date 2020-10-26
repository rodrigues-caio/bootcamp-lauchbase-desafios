const nome = "Caio";
const idade = 70;
const sexo = "M";
const contribuicao = 35;

const calculoContribuicao = idade + contribuicao;

const homemPdAposentar =
  sexo === "M" && contribuicao >= 35 && calculoContribuicao >= 95;
const mulherPdAposentar =
  sexo === "F" && contribuicao >= 30 && calculoContribuicao >= 85;

if (homemPdAposentar || mulherPdAposentar) {
  console.log(`${nome}, você pode aposentar!`);
} else {
  console.log(`${nome}, você não pode se aposentar!`);
}
