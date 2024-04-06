//Array
let participantes = [
  {
    nome: "Ludimilo",
    email: "ludimilo@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 2, 25, 22, 0),
  },
  {
    nome: "Calabreso",
    email: "calabreso@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 15, 20),
    dataCheckIn: new Date(2024, 3, 18, 22, 0),
  },
  {
    nome: "João",
    email: "joao@gmail.com",
    dataInscricao: new Date(2024, 1, 10, 12, 30),
    dataCheckIn: null,
  },
  {
    nome: "Maria",
    email: "maria@gmail.com",
    dataInscricao: new Date(2024, 0, 5, 8, 10),
    dataCheckIn: new Date(2024, 1, 2, 16, 20),
  },
  {
    nome: "Pedro",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2024, 1, 15, 14, 50),
    dataCheckIn: null,
  },
  {
    nome: "Ana",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 0, 20, 17, 40),
    dataCheckIn: new Date(2024, 2, 18, 21, 15),
  },
  {
    nome: "Lucas",
    email: "lucas@gmail.com",
    dataInscricao: new Date(2024, 2, 2, 9, 0),
    dataCheckIn: new Date(2024, 2, 28, 11, 30),
  },
  {
    nome: "Juliana",
    email: "juliana@gmail.com",
    dataInscricao: new Date(2024, 1, 8, 20, 15),
    dataCheckIn: null,
  },
  {
    nome: "Carlos",
    email: "carlos@gmail.com",
    dataInscricao: new Date(2024, 0, 30, 11, 25),
    dataCheckIn: new Date(2024, 2, 26, 14, 10),
  },
  {
    nome: "Fernanda",
    email: "fernanda@gmail.com",
    dataInscricao: new Date(2024, 2, 10, 13, 20),
    dataCheckIn: new Date(2024, 3, 8, 17, 0),
  },
]

const createNewParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

  if (participante.dataCheckIn == null) {
    dataCheckIn = `
    <button data-email="${participante.email}" onclick="fazerCheckIn(event)" class="text-green-500">
      Confirmar Check-In
    </button> `
  }

  return `<tr class="grid grid-cols-4 px-4 py-2 items-center border-t-2 border-zinc-700 text-gray-200">
          <td class="col-span-2">
            <strong class="text-white">${participante.nome}</strong>
            <br />
            <small class="text-sm">${participante.email}</small>
          </td>
          <td>${dataInscricao}</td>
          <td>${dataCheckIn}</td>
        </tr>`
}
//Arrow Funcion
const updateLista = (participantes) => {
  let output = ""
  //Loop
  for (let participante of participantes) {
    output = output + createNewParticipante(participante)
  }
  //substituir informações do Html
  document.querySelector("tbody").innerHTML = output
}

updateLista(participantes)

const addparticipante = (event) => {
  event.preventDefault()

  const formDados = new FormData(event.target)

  const participante = {
    nome: formDados.get("nome"),
    email: formDados.get("email"),
    dataInscricao: new Date(),
    dataCheckIn: null,
  }

  //verificar se já existe
  const participanteExiste = participantes.find((p) => {
    return p.email == participante.email
  })

  if (participanteExiste) {
    alert("E-mail já cadastrado!")
    return
  }

  participantes = [participante, ...participantes]
  updateLista(participantes)

  //Limpar form
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  //Confirmação de Check In
  const msg = "Tem certeza de que quer fazer o Check-In?"
  if (confirm(msg) === false) {
    return
  }

  //Encontrar participante
  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email
  })
  //Atualizar o check in do participante
  participante.dataCheckIn = new Date()

  //Atualizar a lista de participantes
  updateLista(participantes)
}
