import React from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Title, Card, Button } from 'react-native-paper';
import { MaterialIcons, Entypo, FontAwesome5 } from '@expo/vector-icons';


const ProfileScreens = () => {
    // const { name,  email, phone } = props.route.params.Item
    
    return (
        <View style={styles.root}>
            <LinearGradient
                colors={['#FF8C00', '#FF8C00']}
                style={{ height: "20%" }}
            >
                <View style={{ flexDirection: 'row', marginTop: "10%" }}>
                    <View style={styles.divider} />
                    <View style={styles.title}>
                        <Text style={{ fontSize: 38, color: "#2D3436" }}> Personal <Text style={{ fontWeight: "300", color: "white" }}>Profile</Text></Text>
                    </View>
                    <View style={styles.divider} />
                </View>
            </LinearGradient>


            <View style={styles.imagestyle}>
                <Image
                    style={{ width: 140, height: 140, borderRadius: 140 / 2, margin: -50 }}
                    source={{ uri: "https://khasasco.com.vn/wp-content/uploads/2022/05/hinh-chibi-cute-de-ve-21.jpg" }}
                />
            </View>

            <View style={{ alignItems: "center", marginTop: 55, margin: 15 }}>
                <Title>Milcah</Title>

            </View>

            <Card style={styles.mycard} onPress={() => { Linking.openURL("mailto:OmarAli@gmail.com") }}>
                <View style={styles.cardconent}>
                    <MaterialIcons style={{ margin: 4 }} name="email" size={32} color='#FF8C00' />
                    <Text style={{ marginTop: 12, fontSize: 15 }}>milcahsssiiss@gmail.com</Text>

                </View>
            </Card>


            <Card style={styles.mycard} >
                <View style={styles.cardconent}>
                    <Entypo style={{ margin: 4 }} name="phone" size={32} color='#FF8C00' />
                    <Text style={{ marginTop: 12, fontSize: 15 }}>0982638378</Text>
                </View>
            </Card>

            <Card style={styles.mycard} >
                <View style={styles.cardconent}>
                    <FontAwesome5 style={{ margin: 4 }} name="home" size={24} color='#FF8C00' />
                    <Text style={{ marginTop: 12, fontSize: 15 }}> Linh Trung, Thủ Đức, TP Hồ Chí Minh</Text>
                </View>
            </Card>



            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15, color: '#FF8C00' }}>
                <Button icon="account-edit" color="#FF8C00" mode="contained" >
                    Edit
             </Button>
            </View>

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
        marginTop: 10
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