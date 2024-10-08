import React from 'react';
import { StyleSheet, Text, View, Button, StatusBar, TouchableOpacity, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default class SplashComponent extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        <View style={styles.header}>
          <Animatable.Image
            animation="bounceIn"
            duration={1500}
            source={require("../Screens/Images/Bookstore_logo.png")}
            style={styles.mainScreen_logoStyle}
            resizeMode={"stretch"}
          />
        </View>

        <Animatable.View style={styles.footer}
          animation="fadeInUpBig" >
          <Text style={styles.title}>JOIN BOOKSTORE TODAY!</Text>
          <Text style={styles.text}>Tạo tài khoản để bắt đầu đọc sách nào!</Text>
          <View style={styles.button}>
            <TouchableOpacity style={styles.button_getStarted}
              onPress={() => this.props.navigation.navigate("SignInScreen")}>
              <Text style={styles.textSign}>Bắt đầu ngay</Text>
              <MaterialIcons
                name="navigate-next"
                color="white"
                size={20} />
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
    );
  }
}

const { height } = Dimensions.get("screen");
const height_logo = height * 0.7 * 0.4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF8C00',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30
  },
  mainScreen_logoStyle: {
    width: height_logo,
    height: height_logo
  },
  title: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 30
  },
  text: {
    color: 'gray',
    fontSize: 15,
    marginTop: 5
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
  },
  button_getStarted: {
    backgroundColor: '#FF8C00',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    width: 150,
    height: 40,
    flexDirection: 'row'
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  }
});