import { React, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Linking, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Title, Card, Button, IconButton } from 'react-native-paper';
import { MaterialIcons, Entypo, FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as constants from '../constants.js'
import { TextInput } from 'react-native-gesture-handler';

const ProfileScreens = () => {
    const [user, setUser] = useState([])
    const [editing, setEditing] = useState(false)

    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')

    async function fetchUser() {
        const id = await AsyncStorage.getItem(constants.USER_ID);                   // 0
        const username = await AsyncStorage.getItem(constants.USER_USERNAME);       // 1
        const password = await AsyncStorage.getItem(constants.USER_PASSWORD);       // 2
        const email = await AsyncStorage.getItem(constants.USER_EMAIL);             // 3
        const phone = await AsyncStorage.getItem(constants.USER_PHONE);             // 4
        const image = await AsyncStorage.getItem(constants.USER_IMAGE);             // 5
        const token = await AsyncStorage.getItem(constants.USER_TOKEN);             // 6
        const role = await AsyncStorage.getItem(constants.USER_ROLE);               // 7
        const address = await AsyncStorage.getItem(constants.USER_ADDRESS);         // 8
        const dateAdded = await AsyncStorage.getItem(constants.USER_DATE_ADDED);    // 9

        setUser([id, username, password, email, phone, image, token, role, address, dateAdded])
    }

    useEffect(() => {
        fetchUser()
    }, [])

    function clearInputs() {
        setEmail('')
        setPhone('')
        setAddress('')
        setEditing(false)
    }

    async function handleEdit() {
        const response = await fetch('http://10.0.2.2:3000/user', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": user[0],
                "username": user[1],
                "email": email,
                "phone": phone,
                "address": address
            })
        })
        if (response.status === 200) {
            const json = await response.json()
            json['email'] && await AsyncStorage.setItem(constants.USER_EMAIL, json['email']);
            json['phone'] && await AsyncStorage.setItem(constants.USER_PHONE, json['phone']);
            json['address'] && await AsyncStorage.setItem(constants.USER_ADDRESS, json['address']);
            await fetchUser()
            clearInputs()
        }
    }

    return (
        <View style={styles.root}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <LinearGradient colors={['#FF8C00', '#FF8C00']}
                    style={{ height: "20%" }}>
                    <View style={{ flexDirection: 'row', marginTop: "10%" }}>
                        <View style={styles.divider} />
                        <View style={styles.title}>
                            <Text style={{ fontSize: 38, color: "#2D3436" }}> Hồ sơ <Text style={{ fontWeight: "300", color: "white" }}>Cá nhân</Text></Text>
                        </View>
                        <View style={styles.divider} />
                    </View>
                </LinearGradient>

                <View style={styles.imagestyle}>
                    <Image
                        style={{ width: 140, height: 140, borderRadius: 140 / 2, margin: -50 }}
                        source={{ uri: user[5] || "https://khasasco.com.vn/wp-content/uploads/2022/05/hinh-chibi-cute-de-ve-21.jpg" }}
                    />
                </View>

                <View style={{ alignItems: "center", marginTop: 55, margin: 15 }}>
                    <Title>{user[1]}</Title>
                </View>

                <Card style={styles.mycard} onPress={() => { Linking.openURL(user[3]) }}>
                    <View style={styles.cardconent}>
                        <MaterialIcons style={{ margin: 4 }} name="email" size={32} color='#FF8C00' />
                        {
                            editing ? (
                                <TextInput
                                    placeholder={user[3] || 'Your email'}
                                    value={email || user[3]}
                                    onChangeText={text => setEmail(text)}
                                    style={{ flex: 1 }}
                                />
                            ) : (
                                <Text style={{ marginTop: 10, fontSize: 15 }}>{user[3] || 'Not set'}</Text>
                            )
                        }
                    </View>
                </Card>

                <Card style={styles.mycard} >
                    <View style={styles.cardconent}>
                        <Entypo style={{ margin: 4 }} name="phone" size={32} color='#FF8C00' />
                        {
                            editing ? (
                                <TextInput
                                    placeholder={user[4] || 'Your phone'}
                                    value={phone || user[4]}
                                    textContentType='telephoneNumber'
                                    onChangeText={text => setPhone(text)}
                                    style={{ flex: 1 }}
                                />
                            ) : (
                                <Text style={{ marginTop: 12, fontSize: 15 }}>{user[4] || 'Not set'}</Text>
                            )
                        }
                    </View>
                </Card>

                <Card style={styles.mycard} >
                    <View style={styles.cardconent}>
                        <FontAwesome5 style={{ margin: 4 }} name="home" size={28} color='#FF8C00' />
                        {
                            editing ? (
                                <TextInput
                                    placeholder={user[8] || 'Your address'}
                                    value={address || user[8]}
                                    onChangeText={text => setAddress(text)}
                                    style={{ flex: 1 }}
                                />
                            ) : (
                                <Text style={{ marginTop: 10, fontSize: 15 }}>{user[8] || 'Not set'}</Text>
                            )
                        }
                    </View>
                </Card>

                {!editing ? (
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 40, marginBottom: 30, color: '#FF8C00' }}>
                        <Button onPress={() => setEditing(true)} icon="account-edit"
                            buttonColor="#FF8C00" mode="contained" style={{ height: 45, backgroundColor: '#f90', justifyContent: 'center' }} >
                            Chỉnh sửa
                        </Button>
                    </View>
                ) : (
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 40, marginBottom: 30 }}>
                        <Button onPress={handleEdit}
                            icon="check" buttonColor="#FF8C00" mode="contained"
                            style={{ height: 45, backgroundColor: '#f90', justifyContent: 'center' }}>Xong</Button>
                        <IconButton onPress={clearInputs} icon="close" iconColor={'white'}
                            style={{ height: 45, width: 45, backgroundColor: '#f90' }} />
                    </View>
                )}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: 'white'
    },
    imagestyle: {
        alignItems: 'center',
        marginTop: 30
    },
    mycard: {
        margin: 3,
        marginTop: 10,
        marginLeft: 16,
        marginEnd: 16,
        height: 50,
    },
    cardconent: {
        flexDirection: 'row',
        padding: 5
    },
    divider: {
        backgroundColor: "#FF8C00",
        height: 1,
        flex: 1,
        alignSelf: 'center'
    }
})

export default ProfileScreens;