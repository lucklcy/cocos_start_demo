import level1 from 'db://assets/Levels/level1'
import level2 from 'db://assets/Levels/level2'
import level3 from 'db://assets/Levels/level3'
import level4 from 'db://assets/Levels/level4'
import { TILE_TYPE_ENUM } from 'db://assets/Enums/index'

export interface ITile {
  src: number | null
  type: TILE_TYPE_ENUM | null
}

export interface ILevel {
  mapInfo: ITile[][]
}

const levels: Record<string, ILevel> = {
  level1,
  level2,
  level3,
  level4,
}

export default levels
