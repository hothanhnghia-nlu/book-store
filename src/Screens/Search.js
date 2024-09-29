import React, { useState, useEffect } from "react";
import { View, Dimensions, StyleSheet, Image, ScrollView, Text, TouchableOpacity } from "react-native";
import axios from "axios";
import SearchBar from "../Components/SearchBar"; // Import SearchBar
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [categories, setCategories] = useState([]); // Trạng thái lưu danh sách danh mục
  const [books, setBooks] = useState([]); // Trạng thái lưu danh sách sách

  const navigation = useNavigation(); // Khởi tạo navigation

  useEffect(() => {
    // Gọi API để lấy dữ liệu danh mục
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://192.168.1.9:3000/category");
        setCategories(response.data); // Lưu dữ liệu vào trạng thái
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    // Gọi API để lấy dữ liệu sách
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://192.168.1.9:3000/books");
        setBooks(response.data); // Lưu dữ liệu vào trạng thái
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchCategories();
    fetchBooks();
  }, []);

  const handleSearch = (term) => {
    const results = [...categories, ...books].filter(item =>
      item.name ? item.name.toLowerCase().includes(term.toLowerCase()) : item.title.toLowerCase().includes(term.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleBookPress = (item) => {
    // Điều hướng đến màn hình BookDetails và truyền dữ liệu sách
    navigation.navigate('BookDetails', { book: item });
  };

  return (
    <View style={{ marginTop: 20 }}>
      {/* Search Bar */}
      <SearchBar onSubmit={handleSearch} />

      {/* Hiển thị kết quả tìm kiếm */}
      <ScrollView>
        {searchResults.length === 0 ? (
          <Text style={styles.noResults}>No results found</Text>
        ) : (
          searchResults.map((item) => (
            <TouchableOpacity key={item.id} onPress={() => handleBookPress(item)}>
              <View style={styles.card}>
                <View style={styles.cardImgWrapper}>
                  <Image
                    source={{ uri: item.image ? `http://10.0.2.2:3000${item.image}` : "URL_TO_DEFAULT_IMAGE" }} // Thay thế bằng URL hình ảnh thích hợp
                    resizeMode="stretch"
                    style={styles.cardImg}
                  />
                </View>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>{item.name ? item.name : item.title}</Text>
                  <Text style={styles.cardDetails}>{item.name ? "Amazing description for this Category" : item.author}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const { height } = Dimensions.get("screen");
const height_logo = height * 0.7 * 0.4;

const styles = StyleSheet.create({
  logoStyle: {
    width: height_logo,
    height: height_logo,
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 150,
  },
  card: {
    height: 100,
    marginVertical: 10,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImgWrapper: {
    flex: 1,
  },
  cardImg: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontWeight: 'bold',
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
  },
  noResults: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#888',
  },
});

export default Search;
