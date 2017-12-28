import AppDispatcher from '../dispatchers/appDispatcher'
import DialogConstants from '../constants/dialogConstants'

export const displayUpdateDialog = (showDialog) => {
  AppDispatcher.dispatch({
    actionType: DialogConstants.DISPLAY_UPDATE_DIALOG,
    showDialog: showDialog
  })
}

export const displayRemoveDialog = (showDialog) => {
  AppDispatcher.dispatch({
    actionType: DialogConstants.DISPLAY_REMOVE_DIALOG,
    showDialog: showDialog
  })
}

