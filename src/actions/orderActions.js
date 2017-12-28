import AppDispatcher from '../dispatchers/appDispatcher'
import OrderConstants from '../constants/orderConstants'

export const addOrder = (order) => {
  AppDispatcher.dispatch({
    actionType: OrderConstants.ADD_ORDER,
    order: order
  })
}

export const removeOrder = (index) => {
  AppDispatcher.dispatch({
    actionType: OrderConstants.REMOVE_ORDER,
    index: index
  })
}

export const updateOrder = (index, order) => {
  AppDispatcher.dispatch({
    actionType: OrderConstants.UPDATE_ORDER,
    index: index,
    order: order
  })
}
