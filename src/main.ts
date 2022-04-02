import sprites from '@/sprites'
import Sprite from '@/sprite'
import '@/style.css'

// Types
interface SpriteDic {
  [key: string]: Sprite
}

// Canvas init and global variables
const canvas = document.querySelector<HTMLCanvasElement>('#canvas1')!
const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!
const CANVAS_WIDTH: number = canvas.width = 600
const CANVAS_HEIGHT: number = canvas.height = 600

// Create players sprites
const spriteShadowDog = new Sprite({
  imageSrc: sprites.shadowDog.imageSrc,
  animationStates: sprites.shadowDog.states,
  initState: 'idle',
  spriteWidth: 575, // 8876/12 (width of the image divided by the number of frames)
  spriteHeight: 523, // 5230/10 (height of the image divided by the number of row)
  width: 128,
  height: 128,
  x: (CANVAS_WIDTH / 2) - 128 / 2,
  y: (CANVAS_HEIGHT / 2) - 128 / 2,
})

const spriteKnight = new Sprite({
  imageSrc: sprites.hallowKnight.imageSrc,
  animationStates: sprites.hallowKnight.states,
  initState: 'walk',
  spriteWidth: 128, // 2048/16 (width of the image divided by the number of frames)
  spriteHeight: 128, // 2048/16 (height of the image divided by the number of row)
  width: 128,
  height: 128,
  x: (CANVAS_WIDTH/2) - 128/2,
  y: (CANVAS_HEIGHT / 2) - 128 / 2,
})

let currentSprite = spriteKnight

// Game frame variables
let gameFrame: number = 0
let staggerFrames: number = 5

// Animate function
function animate(){
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  currentSprite.drawSprite(ctx, gameFrame, staggerFrames)
  gameFrame++
  requestAnimationFrame(animate)
}

// Init animation
animate()

// DOM Elements to change animations
const controls = document.querySelector<HTMLDivElement>('#controls')!

const spritesMap: SpriteDic = {
  'Knight': spriteKnight,
  'Shadow Dog': spriteShadowDog,
}

const selectSprite: HTMLSelectElement = document.createElement('select')
Object.keys(spritesMap).forEach((spriteName) => {
  const optionSprite = document.createElement('option')
  optionSprite.value = spriteName
  optionSprite.innerText = spriteName
  selectSprite.appendChild(optionSprite)
})

const selectAnimations: HTMLSelectElement = document.createElement('select')
const setAnimationsOptions = () => {
  selectAnimations.innerHTML = ''
  currentSprite.getAllStates().forEach((state: string) => {
    const optionSprite = document.createElement('option')
    optionSprite.value = state
    optionSprite.innerText = state
    selectAnimations.appendChild(optionSprite)
  })
  selectAnimations.value = currentSprite.getState()
}
setAnimationsOptions()

const inputStaggerFrames: HTMLInputElement = document.createElement('input')
inputStaggerFrames.type = 'number'
inputStaggerFrames.value = staggerFrames.toString()

selectSprite.addEventListener('change', () => {
  currentSprite = spritesMap[selectSprite.value]
  setAnimationsOptions()
})

selectAnimations.addEventListener('change', () => {
  currentSprite.setState(selectAnimations.value)
})

inputStaggerFrames.addEventListener('change', () => {
  staggerFrames = parseInt(inputStaggerFrames.value)
})

controls.appendChild(selectSprite)
controls.appendChild(selectAnimations)
controls.appendChild(inputStaggerFrames)