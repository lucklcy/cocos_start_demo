import { SpriteFrame, resources } from 'cc'
import Singleton from 'db://assets/Base/Singleton'

export default class ResoutceManager extends Singleton {
  static get Instance() {
    return super.getInstance<ResoutceManager>()
  }

  loadDir(path: string, type: typeof SpriteFrame = SpriteFrame) {
    return new Promise<SpriteFrame[]>((resolve, reject) => {
      resources.loadDir(path, type, function (err, assets) {
        if (err) {
          reject(err)
          return
        }
        resolve(assets)
      })
    })
  }
}
