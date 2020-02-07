import { combineReducers } from "redux";

const initialStateFriends = { idsSelected: [] };

function selectFriend(state = initialStateFriends, action) {
  let nextState;
  switch (action.type) {
    case "SELECT_ACCOUNT":
      const accountIndex = state.idsSelected.findIndex(
        item => item === action.value
      );
      if (accountIndex !== -1) {
        nextState = {
          ...state,
          idsSelected: state.idsSelected.filter(
            (item, index) => index !== accountIndex
          )
        };
      } else {
        nextState = {
          ...state,
          idsSelected: [...state.idsSelected, action.value]
        };
      }
      return nextState || state;
    default:
      return state;
  }
}

const initialStatePlaces = { idSelected: "" };

function selectPlace(state = initialStatePlaces, action) {
  let nextState;
  switch (action.type) {
    case "SELECT_PLACE":
      if (state.idSelected == action.value) {
        nextState = { idSelected: "" };
      } else {
        nextState = { idSelected: action.value };
      }
      return nextState || state;
    default:
      return state;
  }
}

const appStore = combineReducers({
  selectFriend,
  selectPlace
});
export default appStore;
