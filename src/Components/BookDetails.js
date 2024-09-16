import React, { useRef } from "react";
import { Image, StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'; // Sử dụng FontAwesome cho mũi tên
import LikeButton from '../Components/LikeButton';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const screen_width = Dimensions.get('window').width;
const screen_height = Dimensions.get('window').height;

const BookDetails = ({ route, navigation }) => {
    const scrollViewRef = useRef(null);

    const scrollToTop = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: 0, animated: true });
        }
    };

    return (
        <GestureHandlerRootView style={styles.container}>
            <ScrollView ref={scrollViewRef}>
                <View style={styles.top}>
                    <Image source={{ uri: "https://upload.wikimedia.org/wikipedia/vi/7/71/HP1_posters.jpg" }} style={styles.Coverimg} />
                    <View style={styles.btn}>
                        <LikeButton />
                    </View>
                </View>

                <View style={styles.textview}>
                    <Text style={styles.header}>Harry Potter và Hòn đá phù thuỷ</Text>
                    <Text style={styles.normaltext}>By: J. K. Rowling</Text>
                    <Text style={styles.header}>Description</Text>
                    <Text style={styles.normaltext}>
                        Harry Potter and the Philosophers Stone is the first book in the seven-part Harry Potter series written by British author J.K. Rowling. Published on June 30, 1997 by Bloomsbury Publishers, this book sets the foundation for the following six books. It introduces readers to the magical world of Harry Potter and main characters, places, and terminology, while also raising questions that arent answered until subsequent books. This creates a sense of intrigue and curiosity among readers.

                        The books original title in English was Harry Potter and the Philosophers Stone, but in the US, it was published under the title Harry Potter and the Sorcerers Stone, which is also used in the Vietnamese translation. In France, the book was titled Harry Potter à lécole des sorciers (Harry Potter at the School of Wizards). Changing book titles for different countries is common in the publishing industry to match the language and attract more readers, but it must be approved by the author.

                        After the tragic death of James and Lily Potter, their son Harry is sent by Professor Albus Dumbledore to live with his aunt and uncle, the Dursleys. They mistreat him because they despise magic and anything mysterious, leaving Harry in the dark about himself and his parents, except for the fabricated story that they died in a car crash.

                        On his eleventh birthday, Harry is visited by the giant Rubeus Hagrid, who tells him about his magical abilities and takes him to Hogwarts School of Witchcraft and Wizardry. There, Harry learns about his family history, including how they were killed by Voldemort, the most powerful Dark Wizard of all time. However, Harry miraculously survived, making him a hero in the wizarding world. At Hogwarts, Harry is sorted into Gryffindor house alongside his new friends Ronald Weasley and Hermione Granger. Their first year at Hogwarts doesnt go smoothly, as they encounter dangerous and mysterious secrets.
                    </Text>
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
});

export default BookDetails;
