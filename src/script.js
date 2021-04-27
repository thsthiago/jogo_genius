let order = []
let clickedOrder = []
let score = 0

const pontos = document.querySelector('.pontos')
const button = document.querySelector('button')
const blue = document.querySelector('.blue')
const red = document.querySelector('.red')
const green = document.querySelector('.green')
const yellow = document.querySelector('.yellow')

let shuffleOrder = () => {
  let colorOrder = Math.floor(Math.random() * 4)
  order[order.length] = colorOrder
  clickedOrder = []

  for(let i in order) {
    let elementColor = createColorElement(order[i])
    setTimeout(() => {
      lightColor(elementColor, Number(i) + 1)
    }, 1000)
  }
}

const lightColor = (element, number) => {
  number = number * 500
  setTimeout(() => {
    element.classList.add('selected')
  }, number - 250)
  setTimeout(() => {
    element.classList.remove('selected')
  }, number - 50)
}

const checkOrder = () => {
  for(let i in clickedOrder) {
    if(clickedOrder[i] !== order[i]) {
      gameOver()
      break
    }
  }
  if(clickedOrder.length == order.length) {
    nextLevel()
  }
}

let click = (color) => {
  clickedOrder[clickedOrder.length] = color;
  createColorElement(color).classList.add('selected')

  setTimeout(() => {
    createColorElement(color).classList.remove('selected')
    checkOrder()
  }, 250)
}

const createColorElement = (color) => {
  switch (color) {
    case 0:
      return green
      break;
    case 1:
      return red
      break
    case 2:
      return yellow
      break
    case 3:
      return blue
      break
  }
}

const addPontos = () => {
  score++
  pontos.innerHTML = `Pontos: ${score}`
}

const nextLevel = (inicio = false) => {
  inicio ? pontos.innerHTML = `Pontos: 0` : addPontos()
  shuffleOrder()
}

const gameOver = () => {
  alert(`Pontuação: ${score}\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo!`)
  order = []
  clickedOrder = []
  score = 0
  playGame()
}

const playGame = () => {
  button.addEventListener('click', playGame)
  score = 0

  nextLevel(true)
}

green.addEventListener('click', () => click(0))
red.addEventListener('click', () => click(1))
yellow.addEventListener('click',() =>  click(2))
blue.addEventListener('click',() => click(3))

button.addEventListener('click', playGame)