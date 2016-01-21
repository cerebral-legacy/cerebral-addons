import Controller from 'cerebral'
import Model from 'cerebral-model-baobab'

const model = Model({})
const controller = Controller(model)
controller.model = model
controller.reset = () => {
  model.tree.set({})
  model.tree.commit()
}

export default controller
