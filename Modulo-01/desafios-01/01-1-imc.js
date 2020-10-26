const nome = "Caio";
const altura = 1.78;
const peso = 150;
const sexo = "M";

const imc = peso / (altura * altura);

console.log(imc);

if (imc >= 30) {
  console.log(`${nome}, você está acima do peso!`);
} else {
  console.log(`${nome}, você não está acima do peso!`);
}
