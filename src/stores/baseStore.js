import assign from 'object-assign'
let EventEmitter = require('events').EventEmitter

let CHANGE_EVENT = 'change'

let BaseStore = assign({}, EventEmitter.prototype, {
  dispatchToken: function() {
    return this._dispatchToken
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT)
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback)
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }
})

export default BaseStore
