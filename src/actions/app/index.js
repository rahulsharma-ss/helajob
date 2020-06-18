import * as types from "../../actionTypes";
import { Navigation } from "react-native-navigation";

export const pushToParticularScreen = (componentId, screenNAme) => {
  return dispatch => {
    Navigation.push(componentId, {
      component: {
        name: screenNAme
      }
    });
  };
};

export const pop = componentId => {
  return dispatch => {
    Navigation.pop(componentId);
  };
};

/**
 * Navigate to a new page and clear the backstack.
 */
export function resetTo(newScreen: string): Function {
  return dispatch => {
    dispatch(navigate(newScreen, true));
  };
}

export const mergeOptions = (componentId, draweropen) => {
  return dispatch => {
    Navigation.mergeOptions(componentId, {
      sideMenu: {
        left: {
          visible: draweropen
        }
      }
    });
  };
};
export const setScrenStack = (componentId, screen, visible) => {
  return dispatch => {
    Navigation.setStackRoot(componentId, {
      component: {
        name: screen,
        options: {
          topBar: {
            title: {
              text: "Home"
            }
          },
          bottomTabs: {
            visible,
            drawBehind: true
          }
        }
      }
    });
  };
};

/**
 * Internal helper method for setting the redux state
 */
export const navigate = (newScreen: string, reset: boolean) => {
  return {
    type: t.SCREEN,
    screen: newScreen,
    isReset: reset
  };
};
