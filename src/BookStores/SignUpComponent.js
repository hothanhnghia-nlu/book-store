import React, { useState } from 'react';
import { StyleSheet, Dimensions, View, ImageBackground, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

export default function SignUpComponent() {
  const navigation = useNavigation();

  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isValidUserName, setIsValidUserName] = useState(false);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const checkNameValidation = (value) => {
    var n = value.length;
    if (n > 0) {
      setIsValidUserName(true);
    } else {
      setIsValidUserName(false);
    }
  };

  const checkPhoneValidation = (value) => {
    var n = value.length;
    if (n > 0) {
      setIsValidPhoneNumber(true);
    } else {
      setIsValidPhoneNumber(false);
    }
  };

  const checkEmailValidation = (value) => {
    setEmail(value);
    var n = value.length;
    if (n > 4 && value.includes('@')) {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  };

  const makeSecurePassword = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ImageBackground style={styles.background} source={require("../Screens/Images/SignUp_background.jpg")} />
      </View>

      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={styles.titleText}> Sign Up </Text>

        <View style={[styles.action, { marginTop: 40 }]}>
          <FontAwesome name="user-o" color="#FF8C00" size={20} />
          <TextInput
            placeholder="User Name"
            style={styles.textInput}
            onChangeText={(text_userName) => checkNameValidation(text_userName)}
          />
          {isValidUserName ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={18} />
            </Animatable.View>
          ) : null}
        </View>

        <View style={[styles.action, { marginTop: 20 }]}>
          <AntDesign name="phone" color="#FF8C00" size={20} />
          <TextInput
            keyboardType="numeric"
            placeholder="Phone Number"
            style={styles.textInput}
            onChangeText={(text_phoneNumber) => checkPhoneValidation(text_phoneNumber)}
          />
          {isValidPhoneNumber ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={18} />
            </Animatable.View>
          ) : null}
        </View>

        <View style={[styles.action, { marginTop: 20 }]}>
          <Feather name="mail" color="#FF8C00" size={20} />
          <TextInput
            placeholder="Email"
            style={styles.textInput}
            onChangeText={(text) => checkEmailValidation(text)}
          />
          {isValidEmail ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={18} />
            </Animatable.View>
          ) : null}
        </View>

        <View style={[styles.action, { marginTop: 20 }]}>
          <FontAwesome name="lock" color="#FF8C00" size={20} />
          {secureTextEntry ? (
            <TextInput
              placeholder="Password (must be > 5 characters)"
              secureTextEntry={true}
              style={styles.textInput}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          ) : (
            <TextInput
              placeholder="Password (must be > 5 characters)"
              style={styles.textInput}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          )}
          <Animatable.View animation="bounceIn">
            <TouchableOpacity onPress={makeSecurePassword}>
              {secureTextEntry ? (
                <Feather name="eye-off" color="gray" size={18} />
              ) : (
                <Feather name="eye" color="gray" size={18} />
              )}
            </TouchableOpacity>
          </Animatable.View>
        </View>

        <View style={styles.button}>
          <TouchableOpacity
            style={styles.button_signUp}
            onPress={() => {
              if (isValidUserName && isValidPhoneNumber && isValidEmail && password.length > 5) {
                // Chuyển sang màn hình SignInComponent
                navigation.navigate('SignInScreen');
              } else {
                alert("Check your details again !");
              }
            }}
          >
            <Text style={styles.btnTextSignUp}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
}

const image_width = Dimensions.get('window').width;
const image_height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 2,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  background: {
    flex: 1,
    width: image_width,
    height: image_height / 2.9,
  },
  titleText: {
    alignContent: 'center',
    alignItems: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
  },
  action: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: '#FF8C00',
  },
  button: {
    alignItems: 'center',
    marginTop: 30,
  },
  button_signUp: {
    backgroundColor: '#FF8C00',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    width: image_width - 50,
    height: 50,
  },
  btnTextSignUp: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});
