import Singleton from 'db://assets/Base/Singleton'
import { ITile } from 'db://assets/Levels'

export default class DataManager extends Singleton {
  static get Instance() {
    return super.getInstance<DataManager>()
  }

  mapInfo: Array<Array<ITile>>
  mapRowCount: number = 0
  mapColumnCount: number = 0
  levelIndex: number = 1

  reset() {
    this.mapInfo = []
    this.mapRowCount = 0
    this.mapColumnCount = 0
  }
}
