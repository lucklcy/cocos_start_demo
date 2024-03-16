import { _decorator, Component, Sprite, SpriteFrame, UITransform, Animation, AnimationClip, animation } from 'cc'
import { TILE_HEIGHT, TILE_WIDTH } from 'db://assets/Scripts/Tile/TileManager'
import ResourceManager from 'db://assets/Runtime/ResourceManager'
import { CONTROLLER_DIRECTION_ENUM } from 'db://assets/Enums/index'
import EventManager from 'db://assets/Runtime/EventManager'
import { EVENT_ENUM } from 'db://assets/Enums/index'
const { ccclass, property } = _decorator

const ANIMATION_SPEED = 1 / 8

@ccclass('PlayerManager')
export class PlayerManager extends Component {
  x: number = 0
  y: number = 0
  targetX: number = 0
  targetY: number = 0

  private readonly speed: number = 1 / 10

  async init() {
    await this.render()
  }

  protected onLoad(): void {
    EventManager.Instance.on(EVENT_ENUM.PLAYER_CONTROL, this.move, this)
  }

  protected onDestroy(): void {
    EventManager.Instance.off(EVENT_ENUM.PLAYER_CONTROL, this.move)
  }

  protected update(dt: number): void {
    this.updateXY()
    this.node.setPosition(this.x * TILE_WIDTH - 1.5 * TILE_WIDTH, -this.y * TILE_HEIGHT + 1.5 * TILE_HEIGHT)
  }

  updateXY() {
    if (this.targetX < this.x) {
      this.x -= this.speed
    } else if (this.targetX < this.x) {
      this.x += this.speed
    }

    if (this.targetY < this.y) {
      this.y -= this.speed
    } else if (this.targetY > this.y) {
      this.y += this.speed
    }

    if (Math.abs(this.targetX - this.x) < 0.1 && Math.abs(this.targetY - this.y) < 0.1) {
      this.x = this.targetX
      this.y = this.targetY
    }
  }

  move(inputDirection: CONTROLLER_DIRECTION_ENUM) {
    switch (inputDirection) {
      case CONTROLLER_DIRECTION_ENUM.TOP:
        this.targetY -= 1
        break
      case CONTROLLER_DIRECTION_ENUM.BOTTOM:
        this.targetY += 1
        break
      case CONTROLLER_DIRECTION_ENUM.LEFT:
        this.targetX -= 1
        break
      case CONTROLLER_DIRECTION_ENUM.RIGHT:
        this.targetX += 1
        break
      default:
        break
    }
  }

  async render() {
    const sprite = this.addComponent(Sprite)
    sprite.sizeMode = Sprite.SizeMode.CUSTOM

    const uiTransform = this.getComponent(UITransform)
    uiTransform.setContentSize(TILE_WIDTH * 4, TILE_HEIGHT * 4)

    const spriteFrames = await ResourceManager.Instance.loadDir('texture/player/idle/top', SpriteFrame)
    const animationComponent = this.addComponent(Animation)

    const animationClip = new AnimationClip()

    const track = new animation.ObjectTrack()
    track.path = new animation.TrackPath().toComponent(Sprite).toProperty('spriteFrame')
    const frames: Array<[number, SpriteFrame]> = spriteFrames.map((item, index) => [ANIMATION_SPEED * index, item])
    // * 添加关键帧
    track.channel.curve.assignSorted(frames)
    // * 整个动画剪辑的周期
    animationClip.duration = frames.length * ANIMATION_SPEED
    animationClip.wrapMode = AnimationClip.WrapMode.Loop

    // * 最后将轨道添加到动画剪辑以应用
    animationClip.addTrack(track)

    animationComponent.defaultClip = animationClip
    animationComponent.play()
  }
}
