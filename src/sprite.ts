interface RegularSpriteAnimationLoc {
  x: number;
  y: number;
}

interface RegularSpriteAnimationFrames {
  loc: RegularSpriteAnimationLoc[]
}

interface RegularSpriteAnimation {
  [key: string]: RegularSpriteAnimationFrames
}

interface RegularSpriteAnimationState {
  name: string;
  frames: number;
  x: number;
  y: number;
}

interface SpriteProps {
  initState: string;
  imageSrc: string;
  animationStates: RegularSpriteAnimationState[];
  spriteWidth: number;
  spriteHeight: number;
  width: number;
  height: number;
  x: number;
  y: number;
}

type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<
  infer ElementType
>
  ? ElementType
  : never

export default class Sprite {
  state: string
  image: HTMLImageElement
  spriteWidth: number
  spriteHeight: number
  width: number
  height: number
  x: number
  y: number
  allStates: string[]
  spriteAnimations: RegularSpriteAnimation

  constructor (props: SpriteProps) {
    this.state = props.initState
    this.spriteWidth = props.spriteWidth
    this.spriteHeight = props.spriteHeight
    this.width = props.width
    this.height = props.height
    this.x = props.x
    this.y = props.y
    this.image = this.getImage(props.imageSrc)
    this.allStates = props.animationStates.map((state) => state.name)
    this.spriteAnimations = this.getSpriteAnimations(props.animationStates)
  }

  private getImage(imageSrc: string) {
    const image = new Image()
    image.src = imageSrc
    return image
  }
  
  private getSpriteAnimations(animationStates: RegularSpriteAnimationState[]) {
    const spriteAnimations: RegularSpriteAnimation = {}
    animationStates.forEach((state: RegularSpriteAnimationState) => {
      let frames: RegularSpriteAnimationFrames = {
        loc: [],
      }

      for (let j = 0; j < state.frames; j++) {
        let x: number = (state.x * this.spriteWidth) + (j * this.spriteWidth)
        let y: number = state.y * this.spriteHeight
        frames.loc.push({ x, y })
      }
      spriteAnimations[state.name] = frames
    })

    return spriteAnimations
  }

  public setState(state: ElementType<typeof this.allStates>) {
    if (!this.allStates.includes(state)) {
      console.warn(`Sprite state "${state}" not available for this Sprite. Available states are: ${this.allStates.join(', ')}`)
      return
    }

    this.state = state
  }

  public getState() {
    return this.state
  }

  public getAllStates() {
    return this.allStates
  }

  private getAnimation () {
    return this.spriteAnimations[this.state]
  }

  public drawSprite(ctx: CanvasRenderingContext2D, gameFrame: number, staggerFrames: number) {
    const position: number = Math.floor(gameFrame / staggerFrames) % this.getAnimation().loc.length
    const frameX = this.getAnimation().loc[position].x
    const frameY = this.getAnimation().loc[position].y

    ctx.drawImage(
      this.image,
      frameX,
      frameY,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height,
    )
  }
}