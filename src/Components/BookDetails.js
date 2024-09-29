import React, { useRef } from "react";
import { Image, StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'; // Sử dụng FontAwesome cho mũi tên
import LikeButton from '../Components/LikeButton';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const screen_width = Dimensions.get('window').width;
const screen_height = Dimensions.get('window').height;

const BookDetails = ({ route, navigation }) => {
    const { book } = route.params; // Nhận dữ liệu sách từ route

    const scrollViewRef = useRef(null);

    const scrollToTop = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: 0, animated: true });
        }
    };

    return (
        <GestureHandlerRootView style={styles.container}>
            <ScrollView ref={scrollViewRef}>
                {/* Nút back ở góc trên cùng bên trái */}
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={25} color="#000" />
                </TouchableOpacity>

                <View style={styles.top}>
                    <Image
                      source={{ uri: book.image ? `http://192.168.1.9:3000${book.image}` : "URL_TO_DEFAULT_IMAGE" }}
                      style={styles.Coverimg}
                    />

                    <View style={styles.btn}>
                        <LikeButton />
                    </View>
                </View>

                <View style={styles.textview}>
                    <Text style={styles.header}>{book.title}</Text>
                    <Text style={styles.normaltext}>By: {book.author}</Text>
                    <Text style={styles.header}>Description</Text>
                    {/* Thay book.description bằng book.content */}
                    <Text style={styles.normaltext}>{book.content}</Text>
                </View>

                <TouchableOpacity style={styles.scrollToTopButton} onPress={scrollToTop}>
                    <Icon name="arrow-up" size={30} color="#fff" />
                </TouchableOpacity>
            </ScrollView>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    top: {
        height: 250,
        width: "100%",
    },
    Coverimg: {
        width: "100%",
        height: "100%",
        resizeMode: "stretch",
    },
    textview: {
        marginTop: 10,
        marginLeft: 10,
    },
    header: {
        fontWeight: 'bold',
        fontSize: 24,
        marginLeft: 7,
        color: "black",
    },
    normaltext: {
        fontSize: 15,
        marginLeft: 7,
        marginTop: 5,
        marginBottom: 10,
        color: "black",
    },
    btn: {
        position: 'absolute',
        bottom: 20,
        right: 10,
    },
    scrollToTopButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Nền mờ mờ
        borderRadius: 30,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    // Thêm style cho nút back
    backButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.6)', // Nền sáng nhẹ
        borderRadius: 30,
        zIndex: 1,
    },
});

export default BookDetails;
