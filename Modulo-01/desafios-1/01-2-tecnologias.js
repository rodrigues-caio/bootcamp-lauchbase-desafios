const usuarios = [
  {
    nome: "Caio",
    tecnologias: ["ReactJS", "ReactNative", "CSS", "HTML"],
  },
  {
    nome: "Jeck",
    tecnologias: ["Python", "R", "MatLab"],
  },
  {
    nome: "Mahara",
    tecnologias: ["Java", "PHP", "DotNet"],
  },
];

for (i = 0; i < usuarios.length; i++) {
  console.log(`${usuarios[i].nome} trabalha com ${usuarios[i].tecnologias} `);
}

// Buscando por tecnologia

function usuarioUsaCSS(usuario) {
  for (i = 0; i < usuario.tecnologias.length; i++) {
    if (usuario.tecnologias[i] == "CSS") {
      return true;
    }
  }

  return false;
}

for (let i = 0; i < usuarios.length; i++) {
  const usaCss = usuarioUsaCSS(usuarios[i]);

  if (usaCss) {
    console.log(`O usuário ${usuarios[i].nome} usa CSS`);
  }
}
