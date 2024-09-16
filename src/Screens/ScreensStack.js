// File ScreensStack.js (Không cần đặt Home trong StackNavigator)
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";
import Categories from "./Categories";
import Search from "./Search";
import Bookmarks from "./Bookmarks";
import ProfileScreens from "./ProfileScreens";
import { AntDesign } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default class ScreensStack extends React.Component {
  render() {
    let iconcolor = "#FF8C00";
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ size }) => {
            let iconname;
            route.name == "Home"
              ? (iconname = "home")
              : route.name == "Categories"
              ? (iconname = "bars")
              : route.name == "Search"
              ? (iconname = "search1")
              : route.name == "Quotes"
              ? (iconname = "book")
              : route.name == "Profile"
              ? (iconname = "user")
              : null;
            return <AntDesign name={iconname} size={size} color={iconcolor} />;
          },
        })}
        tabBarOptions={{
          showLabel: true,
          activeTintColor: iconcolor,
        }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Categories" component={Categories} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Quotes" component={Bookmarks} />
        <Tab.Screen name="Profile" component={ProfileScreens} />
      </Tab.Navigator>
    );
  }
}
