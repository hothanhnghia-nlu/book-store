// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// import SplashComponent from './SplashComponent';
// import SignInComponent from './SignInComponent';
// import SignUpComponent from './SignUpComponent';
// import ScreensStack from '../Screens/ScreensStack';
// import Home from '../Screens/Home';

// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from '@react-navigation/stack';

// const Stack = createStackNavigator();

// const StackNavigator = () => {
//   return (
//     <Stack.Navigator initialRouteName="SplashScreen">
//       <Stack.Screen
//         name="SplashScreen"
//         component={SplashComponent}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="SignInScreen"
//         component={SignInComponent}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="HomeStackScreen"
//         component={ScreensStack}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="SignUpScreen"
//         component={SignUpComponent}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="HomeScreen"
//         component={Home}
//         options={{ headerShown: false }}
//       />
//     </Stack.Navigator>
//   );
// };

// export default () => (
//   <NavigationContainer>
//     <StackNavigator />
//   </NavigationContainer>
// );
