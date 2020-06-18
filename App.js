import React from 'react'
import {View, Text} from 'react-native'

export default App=()=>{
return(
  <View>
    <Text>App</Text>
  </View>
)
}

// import { Navigation } from "react-native-navigation";
// import { registerScreens } from "./src/config/routes";
// import { addListeners } from "./src/utilities/listeners";
// import { Provider } from "react-redux";
// import setup from "./src/store/setup";
// import AppContainer from "./src/container/appContainer";
// console.disableYellowBox = true;
// // Navigation.registerComponent(`SignIn`, () => AppContainer);
// export default App=()=>{
//   return(
//     Navigation.events().registerAppLaunchedListener(() => {
//       const store = setup();
//       registerScreens(store, Provider);
//       // addListeners();
//       Navigation.setRoot({
//         root: {
//           component: {
//             name: "Loader"
//           }
//         }
//       });
//     })

//   )
// }


