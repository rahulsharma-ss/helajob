// Stacks for navigation throught application

import { Navigation } from "react-native-navigation";
// Authorization stack
export const goToAuth = () =>
  Navigation.setRoot({
    root: {
      stack: {
        id: "App",
        children: [
          {
            component: {
              name: "SignIn",
              passProps: {
                text: "React Native"
              },
              options: {
                statusBar: {
                  visible: true,
                  style: "light",
                  hideWithTopBar: true,
                  blur: true
                },
                topBar: {
                  visible: false,
                  height: 0
                }
              }
            }
          }
        ]
      }
    }
  });

// // Homescreen stack
// export const goHome = () =>
//   Navigation.setRoot({
//     root: {
//       stack: {
//         id: "home",
//         children: [
//           {
//             component: {
//               name: "Home",
//               passProps: {
//                 text: "React Native"
//               },
//               options: {
//                 statusBar: {
//                   visible: true,
//                   style: "dark",
//                   hideWithTopBar: true,
//                   blur: true
//                 },
//                 topBar: {
//                   visible: false,
//                   height: 0
//                 }
//               }
//             }
//           }
//         ]
//       }
//     }
//   });

// // Services stack
// export const goServices = () =>
//   Navigation.setRoot({
//     root: {
//       stack: {
//         id: "services",
//         children: [
//           {
//             component: {
//               name: "Services",
//               passProps: {
//                 text: "React Native"
//               },
//               options: {
//                 statusBar: {
//                   visible: true,
//                   style: "dark",
//                   hideWithTopBar: true,
//                   blur: true
//                 },
//                 topBar: {
//                   visible: false,
//                   height: 0
//                 }
//               }
//             }
//           }
//         ]
//       }
//     }
//   });

// // Dashboard stack
// export const dashboard = () =>
//   Navigation.setRoot({
//     root: {
//       stack: {
//         id: "dashboard",
//         children: [
//           {
//             component: {
//               name: "Dashboard",
//               passProps: {},
//               options: {
//                 statusBar: {
//                   drawBehind: true,
//                   backgroundColor: "#1F5BA8",
//                   style: "dark"
//                 },
//                 topBar: {
//                   visible: false,
//                   height: 0
//                 }
//               }
//             }
//           }
//         ]
//       }
//     }
//   });

// // History stack
// export const goToHistory = () =>
//   Navigation.setRoot({
//     root: {
//       stack: {
//         id: "history",
//         children: [
//           {
//             component: {
//               name: "History",
//               passProps: {},
//               options: {
//                 statusBar: {
//                   visible: true,
//                   style: "dark",
//                   hideWithTopBar: true,
//                   blur: true
//                 },
//                 topBar: {
//                   visible: false,
//                   height: 0
//                 }
//               }
//             }
//           }
//         ]
//       }
//     }
//   });

// // Add stack
// export const goToAdd = () =>
//   Navigation.setRoot({
//     root: {
//       stack: {
//         id: "add",
//         children: [
//           {
//             component: {
//               name: "Add",
//               passProps: {},
//               options: {
//                 statusBar: {
//                   visible: true,
//                   style: "dark",
//                   hideWithTopBar: true,
//                   blur: true
//                 },
//                 topBar: {
//                   visible: false,
//                   height: 0
//                 }
//               }
//             }
//           }
//         ]
//       }
//     }
//   });

// // Chat stack
// export const goToChat = () =>
//   Navigation.setRoot({
//     root: {
//       stack: {
//         id: "chat",
//         children: [
//           {
//             component: {
//               name: "Chat",
//               passProps: {},
//               options: {
//                 statusBar: {
//                   visible: true,
//                   style: "dark",
//                   hideWithTopBar: true,
//                   blur: true
//                 },
//                 topBar: {
//                   visible: false,
//                   height: 0
//                 }
//               }
//             }
//           }
//         ]
//       }
//     }
//   });

// // Profile stack
// export const goToProfile = () =>
//   Navigation.setRoot({
//     root: {
//       stack: {
//         id: "profile",
//         children: [
//           {
//             component: {
//               name: "Profile",
//               passProps: {},
//               options: {
//                 statusBar: {
//                   visible: true,
//                   style: "dark",
//                   hideWithTopBar: true,
//                   blur: true
//                 },
//                 topBar: {
//                   visible: false,
//                   height: 0
//                 }
//               }
//             }
//           }
//         ]
//       }
//     }
//   });
