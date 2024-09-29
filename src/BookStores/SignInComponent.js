import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ImageBackground, Dimensions, Alert} from 'react-native';
import * as Animatable from 'react-native-animatable'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import {TextInput} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

export default function SignInComponent() {
    const navigation = useNavigation();

    const [isValidUser, setIsValidUser] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const checkUserValidation = (value) => {
        setUser(value);
        const n = value.length;
        if (n > 0) {
            setIsValidUser(true);
        } else {
            setIsValidUser(false);
        }
    };

    const checkPasswordValidation = (value) => {
        const n = value.length;
        if (n > 5) {
            setIsValidPassword(true);
        } else {
            setIsValidPassword(false);
        }
    };

    const makeSecurePassword = () => {
        setSecureTextEntry(!secureTextEntry);
    };
    const handleSingIn = async () => {
        if (isValidUser) {
            try {
                const reponse = await fetch('http://192.168.1.10:3000/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    }, body: JSON.stringify({
                        username: user,
                        password: password
                    })
                });
                const data = await reponse.json()
                if (reponse.ok) {
                    if (!data.id) {
                        Alert.alert('Lỗi', data.message);
                        return;
                    }
                    navigation.navigate('HomeScreen');
                } else {
                    Alert.alert('Lỗi', data.message || 'Something went wrong!'); // Hiển thị thông báo lỗi
                }
            } catch (error) {
                console.error(error);
                Alert.alert('Lỗi', error.toString());
            }
        } else {
            Alert.alert('Lỗi', 'Check your details again !');
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <ImageBackground style={styles.background}
                                 source={require('../Screens/Images/SignIn_background2.jpeg')}/>
            </View>

            <Animatable.View style={styles.footer} animation="fadeInUpBig">
                <Text style={styles.textWelcome}> Welcome back </Text>
                <Text style={styles.text_bottom_welcome}> Login to your account </Text>

                <View style={[styles.action, {marginTop: 40}]}>
                    <Feather name="mail" color="#FF8C00" size={20}/>
                    <TextInput
                        placeholder="User"
                        style={styles.textInput}
                        onChangeText={(text) => checkUserValidation(text)}
                    />
                    {isValidUser ? (
                        <Animatable.View animation="bounceIn">
                            <Feather name="check-circle" color="green" size={18}/>
                        </Animatable.View>
                    ) : null}
                </View>

                <View style={[styles.action, {marginTop: 20}]}>
                    <FontAwesome name="lock" color="#FF8C00" size={20}/>
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

                    <TouchableOpacity onPress={makeSecurePassword}>
                        {secureTextEntry ? (
                            <Feather name="eye-off" color="gray" size={18}/>
                        ) : (
                            <Feather name="eye" color="gray" size={18}/>
                        )}
                    </TouchableOpacity>
                </View>

                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.button_signIn}
                        onPress={handleSingIn}
                    >
                        <Text style={styles.btnTextSignIn}>Login</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.lastViewInFooter}>
                    <Text style={{color: '#A0A0A0'}}>Don't have an account? </Text>
                    <Text
                        style={styles.textSignUp}
                        onPress={() => navigation.navigate('SignUpScreen')}
                    >
                        Sign up
                    </Text>
                </View>
            </Animatable.View>
        </View>
    );
}

const image_width = Dimensions.get('window').width;
const image_height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 2,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 20,
        paddingHorizontal: 20,
        alignItems: 'center'
    },
    background: {
        flex: 1,
        width: image_width,
        height: image_height / 2
    },
    textWelcome: {
        alignContent: 'center',
        alignItems: 'center',
        color: 'black',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_bottom_welcome: {
        color: '#A0A0A0',
        fontSize: 15,
        marginTop: 5,
        alignItems: 'center'
    },
    action: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        paddingLeft: 10,
        color: '#FF8C00'
    },
    button: {
        alignItems: 'center',
        marginTop: 30,
    },
    button_signIn: {
        backgroundColor: '#FF8C00',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        width: image_width - 50,
        height: 50
    },
    btnTextSignIn: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
    lastViewInFooter: {
        marginTop: 20,
        alignItems: 'center',
        alignContent: 'center',
        flexDirection: 'row',
    },
    textSignUp: {
        color: '#FF8C00',
        fontWeight: 'bold',
    },
});