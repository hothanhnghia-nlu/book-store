import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashComponent from './src/BookStores/SplashComponent';
import SignInComponent from './src/BookStores/SignInComponent';
import SignUpComponent from './src/BookStores/SignUpComponent';
import ScreensStack from './src/Screens/ScreensStack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen" headerMode="none">
        <Stack.Screen name="SplashScreen" component={SplashComponent} />
        <Stack.Screen name="SignInScreen" component={SignInComponent} />
        <Stack.Screen name="HomeScreen" component={ScreensStack} />
        <Stack.Screen name="SignUpScreen" component={SignUpComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}