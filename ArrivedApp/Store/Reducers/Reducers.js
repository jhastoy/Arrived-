import { combineReducers } from "redux";
import { getInTravel } from "../../API/Storage";
import { ActionSheetIOS } from "react-native";
import { createPortal } from "react-dom";

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

const initialStateType = { type: 0 };

function selectType(state = initialStateType, action) {
  let nextState;
  switch (action.type) {
    case "SELECT_TYPE":
      nextState = { type: action.value };
      return nextState || state;
    default:
      return state;
  }
}

const initialStateTravel = {
  inTravel: false
};
async function inTravel(state = initialStateTravel, action) {
  getInTravel().then(inTravel => {
    state.inTravel = inTravel;
  });
  let nextState;
  switch (action.type) {
    case "CHANGE_TRAVEL_MODE":
      nextState = { inTravel: action.value };
      return nextState || state;
    default:
      return state;
  }
}
const initialPlaceDetailled = { idPlaceDetailled: "" };

function selectDetailledPlace(state = initialPlaceDetailled, action) {
  let nextState;
  switch (action.type) {
    case "DETAIL_PLACE":
      if (state.idPlaceDetailled == action.value) {
        nextState = { idPlaceDetailled: "" };
      } else {
        nextState = { idPlaceDetailled: action.value };
      }
      return nextState || state;
    default:
      return state;
  }
}

const appStore = combineReducers({
  selectFriend,
  selectPlace,
  selectType,
  inTravel,
  selectDetailledPlace
});
export default appStore;
