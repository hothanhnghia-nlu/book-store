import React from "react";
import { StyleSheet, Image, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
const HEIGHT = 300, WIDTH = 200;
const screen_width = Dimensions.get('window').width;
const screen_height = Dimensions.get('window').height;

function BookOverview({ navigation }) {
  return (
    <TouchableOpacity style={styles.Main_View} onPress={() => {
      navigation.navigate('BookDetails', { imgsrc: {uri: "https://upload.wikimedia.org/wikipedia/vi/7/71/HP1_posters.jpg"}, title: "Harry Potter và Hòn đá phù thuỷ"})
    }}>
      <Image source={{ uri: "https://upload.wikimedia.org/wikipedia/vi/7/71/HP1_posters.jpg" }} style={styles.Coverimg} />
    </TouchableOpacity>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="BookOverview"
          component={BookOverview}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  Main_View: {
    width: screen_width/2-8,
    marginTop: 5,
    marginLeft: 5,
    height: HEIGHT,
  },
  Coverimg: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    alignSelf: "center",
  },
});

export default App;
