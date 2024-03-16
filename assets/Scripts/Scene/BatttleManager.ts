import { _decorator, Component, Node } from 'cc'
import { TileMapManager } from 'db://assets/Scripts/Tile/TileMapManager'
import { createUINode } from 'db://assets/Scripts/Utils/index'
import Levels, { ILevel } from 'db://assets/Levels/index'
import DataManager from 'db://assets/Runtime/DataManager'
import { TILE_WIDTH, TILE_HEIGHT } from 'db://assets/Scripts/Tile/TileManager'
import EventManager from 'db://assets/Runtime/EventManager'
import { EVENT_ENUM } from 'db://assets/Enums/index'
import { PlayerManager } from 'db://assets/Scripts/Player/PlayerManager'

const { ccclass, property } = _decorator

@ccclass('BatttleManager')
export class BatttleManager extends Component {
  level: ILevel
  stage: Node
  start() {
    this.generateStage()
    this.initLevel()
  }

  protected onLoad(): void {
    EventManager.Instance.on(EVENT_ENUM.NEXT_LEVEL, this.nextLevel, this)
  }

  protected onDestroy(): void {
    EventManager.Instance.off(EVENT_ENUM.NEXT_LEVEL, this.nextLevel)
  }

  generateStage() {
    this.stage = createUINode()
    this.stage.setParent(this.node)
  }

  initLevel() {
    const level = Levels[`level${DataManager.Instance.levelIndex}`]
    if (level) {
      this.clearLevel()
      this.level = level

      DataManager.Instance.mapInfo = level.mapInfo
      DataManager.Instance.mapRowCount = level.mapInfo.length
      DataManager.Instance.mapColumnCount = level.mapInfo[0].length

      this.generateTileMap()
      this.generatePlayer()
    }
  }

  clearLevel() {
    this.stage.destroyAllChildren()
    DataManager.Instance.reset()
  }

  nextLevel() {
    DataManager.Instance.levelIndex++
    this.initLevel()
  }

  generateTileMap() {
    const tileMap = createUINode()
    tileMap.setParent(this.stage)

    const tileMapManager = tileMap.addComponent(TileMapManager)
    tileMapManager.init()

    this.adapPos()
  }

  generatePlayer() {
    const player = createUINode()
    player.setParent(this.stage)

    const playerManager = player.addComponent(PlayerManager)
    playerManager.init()
  }

  adapPos() {
    const { mapRowCount, mapColumnCount } = DataManager.Instance

    const distanceX = (TILE_WIDTH * mapRowCount) / 2
    const disttanceY = (TILE_HEIGHT * mapColumnCount) / 2

    this.stage.setPosition(-distanceX, disttanceY)
  }
}
