import { _decorator, Component, resources, SpriteFrame } from 'cc'
const { ccclass, property } = _decorator
import { createUINode, randomByRange } from 'db://assets/Scripts/Utils/index'
import { TileManager } from 'db://assets/Scripts/Tile/TileManager'
import DataManager from 'db://assets/Runtime/DataManager'
import ResourceManager from 'db://assets/Runtime/ResourceManager'

@ccclass('TileMapManager')
export class TileMapManager extends Component {
  async init() {
    const { mapInfo } = DataManager.Instance
    const spriteFrames = await ResourceManager.Instance.loadDir('texture/tile/tile', SpriteFrame)
    console.log(spriteFrames)
    for (let i = 0; i < mapInfo.length; i++) {
      const column = mapInfo[i]
      for (let j = 0; j < column.length; j++) {
        const element = column[j]
        if (element.src === null || element.type === null) {
          continue
        }

        const node = createUINode()
        let num = element.src
        if ((num === 1 || num === 5 || num === 9) && i % 2 === 0 && j % 2 === 0) {
          num += randomByRange(0, 4)
        }
        const imgSrc = `tile (${num})`
        const spriteFrame = spriteFrames.find(v => v.name === imgSrc) || spriteFrames[0]

        const tileManager = node.addComponent(TileManager)
        tileManager.init(spriteFrame, i, j)

        node.setParent(this.node)
      }
    }
  }
}
