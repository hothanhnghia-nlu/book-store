import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as constants from "../constants.js";

const BookItem = ({ id, title, author, image, onBookRemove }) => {
  async function handlePress() {
    const userId = await AsyncStorage.getItem(constants.USER_ID);
    const res = await fetch(`http://10.0.2.2:3000/favorite/${userId}/${id}`, {
      method: "DELETE",
    });
    if (res.status === 200) {
      onBookRemove(id);
    }
  }
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.bookItem}>
        <Image source={{ uri: image }} style={styles.bookImage} />
        <Text style={styles.bookTitle} numberOfLines={2} ellipsizeMode="tail">
          {title}
        </Text>
        <Text style={styles.bookAuthor}>{author}</Text>
      </View>
    </TouchableOpacity>
  );
};

const SessionBook = ({ title, items, onBookRemove }) => {
  const image =
    "https://cdn0.fahasa.com/media/catalog/product/n/x/nxcmctbt.jpg";
  return (
    <View>
      <Text style={styles.sectionTitle}>{title}</Text>
      <ScrollView horizontal={true}>
        <FlatList
          numColumns={3}
          data={items}
          renderItem={({ item }) => (
            <BookItem
              id={item.id}
              title={item.title}
              author={item.author}
              image={image}
              onBookRemove={onBookRemove}
            />
          )}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </ScrollView>
    </View>
  );
};

export default function BookFavorite() {
  const sampleBooks = [
    {
      id: "1",
      title: "Sách Phổ Biến 1",
      author: "Tác giả 3",
      image: "https://cdn0.fahasa.com/media/catalog/product/n/x/nxcmctbt.jpg",
    },
    {
      id: "2",
      title: "Sách Phổ Biến 2",
      author: "Tác giả 4",
      image: "https://cdn0.fahasa.com/media/catalog/product/n/x/nxcmctbt.jpg",
    },
    {
      id: "3",
      title: "Sách Phổ Biến 3",
      author: "Tác giả 4",
      image: "https://cdn0.fahasa.com/media/catalog/product/n/x/nxcmctbt.jpg",
    },
    {
      id: "4",
      title: "Sách Phổ Biến 4",
      author: "Tác giả 4",
      image: "https://cdn0.fahasa.com/media/catalog/product/n/x/nxcmctbt.jpg",
    },
    {
      id: "5",
      title: "Sách Phổ Biến 5",
      author: "Tác giả 4",
      image: "https://cdn0.fahasa.com/media/catalog/product/n/x/nxcmctbt.jpg",
    },
  ];

  const [books, setBooks] = useState([]);

  function onBookRemove(bookId) {
    setBooks([...books.filter((b) => b.id !== bookId)]);
    Alert.alert("Success", "Removed book with id = " + bookId);
  }

  useEffect(() => {
    (async function fetchFavoriteBooks() {
      const userId = await AsyncStorage.getItem(constants.USER_ID);
      const res = await fetch(`http://10.0.2.2:3000/favorite/${userId}`);
      if (res.status === 200) {
        const jsonMap = await res.json();
        if (!jsonMap.size) {
          setBooks(sampleBooks)
        }
      }
    })();
  }, []);
  return (
    <View style={styles.container}>
      {books.length > 0 ? (
        <SessionBook
          title="Sách yêu thích"
          items={books}
          onBookRemove={onBookRemove}
        />
      ) : (
        <View
          style={{
            height: '100%',
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Danh sách rỗng</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  shelf: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  sliderContainer: {
    height: 200,
    width: "100%",
    justifyContent: "center",
    alignSelf: "center",
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  sliderImage: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
  },
  divider: {
    marginTop: 10,
    backgroundColor: "#000",
    height: 1,
    width: "100%",
    flex: 1,
    alignSelf: "center",
  },
  categoryContainer: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
  categoryBtn: {
    marginHorizontal: 0,
    alignSelf: "center",
    marginRight: 0,
    marginLeft: 10,
    paddingRight: 8,
    paddingLeft: 8,
    backgroundColor: "#e6e5e7",
    borderRadius: 12,
  },
  categoryIcon: {
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: 70,
    height: 50,
  },
  categoryBtnTxt: {
    alignSelf: "center",
    marginTop: 5,
    width: "auto",
    color: "#FF8C00",
    paddingBottom: 4,
    paddingLeft: 4,
    paddingRight: 4,
  },
  container: {
    padding: 10,
    paddingBottom: 50,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  listContainer: {
    paddingBottom: 16,
  },
  bookItem: {
    marginRight: 16,
    width: 120,
    position: "relative",
  },
  bookImage: {
    width: 120,
    height: 180,
    borderRadius: 8,
  },
  bookTitle: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 8,
  },
  bookAuthor: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
  },
  rankBadge: {
    position: "absolute",
    bottom: 47,
    right: 5,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 2,
  },
  rankText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  containerTextTopAMT: {
    height: 50,
    width: 1000,
    overflow: "hidden",
    backgroundColor: "#FF8C00",
    justifyContent: "center",
  },
  marqueeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    whiteSpace: "nowrap",
  },
  containerCategoryTitle: {
    marginTop: 16,
  },
  categoryTitle: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 2,
  },
  categoryTitleTO: {
    width: "48%",
    marginVertical: 7,
    alignItems: "center",
    padding: 10,
    backgroundColor: "#e6e5e7",
    borderRadius: 6,
  },
  categoryTitleTx: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
