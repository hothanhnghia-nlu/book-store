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
            route.name == "Trang chủ"
              ? (iconname = "home")
              : route.name == "Danh mục"
              ? (iconname = "bars")
              : route.name == "Tìm kiếm"
              ? (iconname = "search1")
              : route.name == "Quotes"
              ? (iconname = "book")
              : route.name == "Tài khoản"
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
        <Tab.Screen name="Trang chủ" component={Home} />
        <Tab.Screen name="Danh mục" component={Categories} />
        <Tab.Screen name="Tìm kiếm" component={Search} />
        <Tab.Screen name="Quotes" component={Bookmarks} />
        <Tab.Screen name="Tài khoản" component={ProfileScreens} />
      </Tab.Navigator>
    );
  }
}
