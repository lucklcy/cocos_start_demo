import { _decorator, Component, Event } from 'cc'
import EventManager from 'db://assets/Runtime/EventManager'
import { EVENT_ENUM, CONTROLLER_DIRECTION_ENUM } from 'db://assets/Enums'
const { ccclass, property } = _decorator

@ccclass('ControllerManager')
export class ControllerManager extends Component {
  handleCtrl() {
    EventManager.Instance.emit(EVENT_ENUM.NEXT_LEVEL)
  }

  handleMove(evt: Event, type: string) {
    EventManager.Instance.emit(EVENT_ENUM.PLAYER_CONTROL, type as CONTROLLER_DIRECTION_ENUM)
  }
}
