import AppDispatcher from '../dispatchers/appDispatcher'
import BaseStore from './baseStore'
import OrderConstants from '../constants/orderConstants.js'
import assign from 'object-assign'
const Immutable = require('immutable')

// Current data
let _orders = Immutable.List()

const OrderStore = assign({}, BaseStore, {
  addOrder(order) {
    _orders = _orders.push(order)
  },
  removeOrder(index) {
    _orders = _orders.delete(index)
  },
  updateOrder(index, order) {
    _orders = _orders.set(index, order)
  },

  getOrder(index) {
    return _orders.get(index)
  },
  getOrders() {
    return _orders
  }
})

AppDispatcher.register((action) => {
  switch (action.actionType) {
    case OrderConstants.ADD_ORDER:
      OrderStore.addOrder(action.order)
      OrderStore.emitChange()
      break
    case OrderConstants.REMOVE_ORDER:
      OrderStore.removeOrder(action.index)
      OrderStore.emitChange()
      break
    case OrderConstants.UPDATE_ORDER:
      OrderStore.updateOrder(action.index, action.order)
      OrderStore.emitChange()
      break
    default:
    // no op
  }
})

export default OrderStore
