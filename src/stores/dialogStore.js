import AppDispatcher from "../dispatchers/appDispatcher";
import BaseStore from "./baseStore";
import DialogConstants from "../constants/dialogConstants.js";
import assign from "object-assign";

// Current data
var _showUpdateDialog = false
var _showRemoveDialog = false

const DialogStore = assign({}, BaseStore, {
  setUpdateDialog(showDialog) {
    _showUpdateDialog = showDialog
  },
  isUpdateDialogOpen() {
    return _showUpdateDialog
  },

  setRemoveDialog(showDialog) {
    _showRemoveDialog = showDialog
  },
  isRemoveDialogOpen() {
    return _showRemoveDialog
  },
});

AppDispatcher.register(action => {
  switch (action.actionType) {
    case DialogConstants.DISPLAY_UPDATE_DIALOG:
      DialogStore.setUpdateDialog(action.showDialog)
      DialogStore.emitChange()
      break
    case DialogConstants.DISPLAY_REMOVE_DIALOG:
      DialogStore.setRemoveDialog(action.showDialog)
      DialogStore.emitChange()
      break
    default:
    // no op
  }
})

export default DialogStore
