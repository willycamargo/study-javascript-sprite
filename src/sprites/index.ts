import imgShadowDog from './shadow_dog.png'
import imgKnight from './hallow_knight.png'

export default {
  hallowKnight: {
    imageSrc: imgKnight,
    states: [
      { name: 'walk', frames: 8, x: 1, y: 0 },
      { name: 'run', frames: 6, x: 10, y: 0 },
      { name: 'crawling', frames: 7, x: 5, y: 1 },
      { name: 'walk-back', frames: 6, x: 0, y: 5 },
      { name: 'walk-front', frames: 6, x: 6, y: 5 },
      { name: 'looking-up', frames: 7, x: 0, y: 8 },
      { name: 'open-book', frames: 8, x: 7, y: 8 },
      { name: 'shy', frames: 8, x: 0, y: 14 },
      { name: 'dash', frames: 4, x: 7, y: 4 },
      { name: 'ghost-idle', frames: 4, x: 0, y: 10 },
      { name: 'ghost-explode', frames: 12, x: 4, y: 10 },
    ]
  },
  shadowDog: {
    imageSrc: imgShadowDog,
    states: [
      { name: 'idle', frames: 7, x: 0, y: 0 },
      { name: 'jump', frames: 7, x: 0, y: 1 },
      { name: 'fall', frames: 7, x: 0, y: 2 },
      { name: 'run', frames: 9, x: 0, y: 3 },
      { name: 'dizzy', frames: 11, x: 0, y: 4 },
      { name: 'sit', frames: 5, x: 0, y: 5 },
      { name: 'roll', frames: 7, x: 0, y: 6 },
      { name: 'bite', frames: 7, x: 0, y: 7 },
      { name: 'ko', frames: 12, x: 0, y: 8 },
      { name: 'get-hit', frames: 4, x: 0, y: 9 },
    ]
  },
}