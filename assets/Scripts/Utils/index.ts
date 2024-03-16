import { _decorator, Component, Layers, Node, resources, Sprite, SpriteFrame, UITransform } from 'cc'

export const createUINode = (name: string = '') => {
  const node = new Node(name)

  const uiTransform = node.addComponent(UITransform)
  uiTransform.setAnchorPoint(0, 1)

  node.layer = 1 << Layers.nameToLayer('UI_2D')

  return node
}

export const randomByRange = (start: number, end: number) => Math.floor(start + Math.random() * (end - start))
