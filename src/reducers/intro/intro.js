const INITIAL_STATE = {
  introduction: false
};

export default function introReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case "INTRODUCTION_TOGGLE":
      return Object.assign({}, state, { introduction: action.payload });
    default:
      return state;
  }
}
