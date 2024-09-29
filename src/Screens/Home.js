import React, { useRef, useEffect, useState } from "react";
import { Text, StyleSheet, View, Image, ScrollView, FlatList, Animated, Dimensions } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Swiper from 'react-native-swiper';
import { TouchableOpacity } from "react-native";
import { Entypo, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import BookAPI from "../Services/BookAPI";

const data = {
  readMore: [
    { 
      id: '1',
      title: 'Sách Mới 1',
      author: 'Tác giả 1',
      image: 'https://cdn0.fahasa.com/media/catalog/product/n/x/nxcmctbt.jpg',
    },
    {
      id: '2',
      title: 'Sách Mới 2',
      author: 'Tác giả 2',
      image: 'https://cdn0.fahasa.com/media/catalog/product/n/x/nxcmctbt.jpg',
    },
    {
      id: '2',
      title: 'Sách Mới 2',
      author: 'Tác giả 2',
      image: 'https://cdn0.fahasa.com/media/catalog/product/n/x/nxcmctbt.jpg',
    },
    {
      id: '2',
      title: 'Sách Mới 2',
      author: 'Tác giả 2',
      image: 'https://cdn0.fahasa.com/media/catalog/product/n/x/nxcmctbt.jpg',
    },
    // Thêm sách mới khác...
  ],
  rankBooks: [
    {
      id: '3',
      rank: 1,
      title: 'Sách Phổ Biến 1',
      author: 'Tác giả 3',
      image: 'https://cdn0.fahasa.com/media/catalog/product/n/x/nxcmctbt.jpg',
    },
    {
      id: '4',
      rank: 2,
      title: 'Sách Phổ Biến 2',
      author: 'Tác giả 4',
      image: 'https://cdn0.fahasa.com/media/catalog/product/n/x/nxcmctbt.jpg',
    },
    {
      id: '4',
      rank: 3,
      title: 'Sách Phổ Biến 2',
      author: 'Tác giả 4',
      image: 'https://cdn0.fahasa.com/media/catalog/product/n/x/nxcmctbt.jpg',
    },
    {
      id: '4',
      rank: 4,
      title: 'Sách Phổ Biến 2',
      author: 'Tác giả 4',
      image: 'https://cdn0.fahasa.com/media/catalog/product/n/x/nxcmctbt.jpg',
    },
    {
      id: '4',
      rank: 5,
      title: 'Sách Phổ Biến 2',
      author: 'Tác giả 4',
      image: 'https://cdn0.fahasa.com/media/catalog/product/n/x/nxcmctbt.jpg',
    },
    // Thêm sách phổ biến khác...
  ],
};

const categories = [
  { icon: <FontAwesome name="bar-chart" size={33} color='#3c6e89' />, text: 'Xem nhiều' },
  { icon: <FontAwesome name="star" size={35} color='#3c6e89' />, text: 'Đánh giá' },
  { icon: <FontAwesome name="heart" size={35} color='#3c6e89' />, text: 'Yêu thích' },
  { icon: <FontAwesome5 name="map" size={35} color='#3c6e89' />, text: 'Lịch Sử' },
];

const renderCategoryButton = (icon, text) => {
  return (
    <TouchableOpacity style={styles.categoryBtn}>
      <View style={styles.categoryIcon}>
       {icon}
      </View>
      <Text style={styles.categoryBtnTxt} numberOfLines={1}>{text}</Text>
    </TouchableOpacity>
  );
};

const CategoryTittle = ({title}) => {
  return (
    <TouchableOpacity style={styles.categoryTitleTO}>
      <Text style={styles.categoryTitleTx} numberOfLines={1}>{title}</Text>
    </TouchableOpacity>
  );
};

const BookItem = ({ title, author, image, rank }) => {
  return (
    <View style={styles.bookItem}>
      <Image source={{ uri: image }} style={styles.bookImage} />
      {/* Hiển thị số thứ tự nếu có index */}
      {rank !== undefined && (
        <View style={styles.rankBadge}>
          <Text style={styles.rankText}>{rank}</Text>
        </View>
      )}
      <Text 
      style={styles.bookTitle}  
      numberOfLines={2} 
      ellipsizeMode="tail">{title}</Text>
      <Text style={styles.bookAuthor}>{author}</Text>
    </View>
  );
};

const RankBook = ({ title, items }) => {
  
  return (
    <ScrollView>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <BookItem title={item.title} author={item.author} image={item.image} rank={item.rank} />
        )}
        keyExtractor={(item) => item.id}
        horizontal={true}  // Hiển thị ngang
        showsHorizontalScrollIndicator={false}  // Ẩn thanh cuộn ngang
        contentContainerStyle={styles.listContainer}
      />
    </ScrollView>
  );
};

const SessionBook = ({ title, items }) => {
  // anh tam thoi
  const image = 'https://cdn0.fahasa.com/media/catalog/product/n/x/nxcmctbt.jpg'
  return (
    <ScrollView>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <BookItem title={item.title} author={item.author} image={image} />
        )}
        keyExtractor={(item) => item.id}
        horizontal={true}  // Hiển thị ngang
        showsHorizontalScrollIndicator={false}  // Ẩn thanh cuộn ngang
        contentContainerStyle={styles.listContainer}
      />
    </ScrollView>
  );
};

const MarqueeText = () => {
  const translateX = useRef(new Animated.Value(0)).current;
  const [textWidth, setTextWidth] = useState(0);
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    if (textWidth === 0) return; // Chờ đến khi biết được kích thước của chữ
    const startAnimation = () => {
      translateX.setValue(screenWidth); // Đặt vị trí ban đầu ở bên phải màn hình

      Animated.timing(translateX, {
        toValue: -textWidth, // Di chuyển đến vị trí ra khỏi màn hình
        duration: (screenWidth + textWidth) * 8, // Tốc độ di chuyển đều, tỷ lệ thuận với chiều dài của văn bản
        useNativeDriver: true,
        easing: (t) => t, // Đảm bảo tốc độ không đổi (linear)
      }).start(() => startAnimation()); // Khi kết thúc, bắt đầu lại
    };

    startAnimation();
  }, [textWidth, translateX, screenWidth]);

  return (
    <View style={styles.containerTextTopAMT}>
      <Animated.Text
        style={[styles.marqueeText, { transform: [{ translateX }] }]}
        onLayout={(e) => setTextWidth(e.nativeEvent.layout.width)}
        numberOfLines={1}
      >
        Tác phẩm Tịch Tà Kiếm Phổ đang bán chạy!!!
      </Animated.Text>
    </View>
  );
};

const Home = () => {
  const [rankBooks, setRankBooks] = useState([]);
  const [newBooks, setNewBooks] = useState([]);
  const [readMoreBook, setReadMoreBook] = useState([]);
  const [popularBooks, setPopularBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
  
    const fetchAllBooks = async () => {
      try {

        const newBooksResponse = await BookAPI.fetchNewBooks();
        if (newBooksResponse.status === 200) {
          setNewBooks(newBooksResponse.data);
        }

        const popularBooksResponse = await BookAPI.fetchPopularBooks();
        if (popularBooksResponse.status === 200) {
          setPopularBooks(popularBooksResponse.data);
        }

        // const rankBooksResponse = await BookAPI.fetchRankBooks();
        // if (rankBooksResponse.status === 200) {
        //   setRankBooks(rankBooksResponse.data);
        // }

        // const readMoreBookResponse = await BookAPI.fetchReadMoreBooks();
        // if (readMoreBookResponse.status === 200) {
        //   setReadMoreBook(readMoreBookResponse.data);
        // }
      } catch (err) {
        console.error('Error fetching books:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllBooks();
  }, []);
  

  return (
    <View style={styles.mainview}>
      <MarqueeText />
      <ScrollView style={styles.container} >
        <View style={styles.sliderContainer}>
          <Swiper
            autoplay
            horizontal={false}
            height={200}
            activeDotColor='#FF8C00'>
            <View style={styles.slide} >
              <Image
                source={{
                  uri: 'https://www.scholastic.com/content/dam/scholastic/educators/book-lists/Harry-Potter-Book-List_BL_16-9.jpg.corpimagerendition.xxl.1400.788.png',
                }}
                resizeMode="cover"
                style={styles.sliderImage}
              />
            </View>
            <View style={styles.slide} >
              <Image
                source={{
                  uri: 'https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=754&fit=clip',
                }}
                resizeMode="cover"
                style={styles.sliderImage}
              />
            </View>
            <View style={styles.slide} >
              <Image
                source={{
                  uri: 'https://cdn.coolofthewild.com/wp-content/uploads/2016/12/adventure-books.jpg',
                }}
                resizeMode="cover"
                style={styles.sliderImage}
              />
            </View>
            <View style={styles.slide} >
              <Image
                source={{
                  uri: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/02/27/11/pile-of-books.jpg',
                }}
                resizeMode="cover"
                style={styles.sliderImage}
              />
            </View>
            <View style={styles.slide}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1551029506-0807df4e2031?ixlib=rb-1.2.1&auto=format&fit=crop&w=891&q=80',
                }}
                resizeMode="cover"
                style={styles.sliderImage}
              />
            </View>
            <View style={styles.slide} >
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1549122728-f519709caa9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=625&q=80',
                }}
                resizeMode="cover"
                style={styles.sliderImage}
              />
            </View>
            <View style={styles.slide} >
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80',
                }}
                resizeMode="cover"
                style={styles.sliderImage}
              />
            </View>
            <View style={styles.slide}>
              <Image
                source={{
                  uri: 'https://blog.efpsa.org/wp-content/uploads/2016/06/programming-psychologist-python-elixir-rstats-640x497.jpg',
                }}
                resizeMode="cover"
                style={styles.sliderImage}
              />
            </View>
          </Swiper>
        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.categoryContainer}>
            {categories.map((category, index) => renderCategoryButton(category.icon, category.text))}
          </View>
        </ScrollView>


        <View style={styles.containerCategoryTitle}>
          <Text style={styles.sectionTitle}>Danh mục</Text>
              <View style={styles.categoryTitle}>
                <CategoryTittle title={"Mới Cập Nhật"}/>
                <CategoryTittle title={"Đánh Giá Cao"}/>
                <CategoryTittle title={"Mới Đăng"}/>
                <CategoryTittle title={"Xem Nhiều"}/>
              </View>
        </View>

        <View style={styles.container}>
          <RankBook title={'Bảng xếp hạng'} items={data.rankBooks} />
          <SessionBook title={'Sách mới'} items={newBooks} />
          <SessionBook title={'Được đọc nhiều'} items={data.readMore} />
          <SessionBook title={'Sách Phổ Biến'} items={popularBooks} />
        </View>

        <View style={styles.shelf}></View>

      </ScrollView>



    </View>

  )
}
const styles = StyleSheet.create({
  shelf: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  mainview: {
    marginTop: 0,
  },
  sliderContainer: {
    height: 200,
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  sliderImage: {
    height: '100%',
    width: '100%',
    alignSelf: 'center'
  },
  divider: {
    marginTop: 10,
    backgroundColor: "#000",
    height: 1,
    width: '100%',
    flex: 1,
    alignSelf: 'center'
  },
  categoryContainer: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center'
  },
  categoryBtn: {
    marginHorizontal: 0,
    alignSelf: 'center',
    marginRight: 0 ,
    marginLeft:10,
    paddingRight:8,
    paddingLeft: 8,
    backgroundColor:'#e6e5e7',
    borderRadius: 12,
  },
  categoryIcon: {
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 70,
    height: 50,
  },
  categoryBtnTxt: {
    alignSelf: 'center',
    marginTop: 5,
    width: "auto",
    color: '#FF8C00',
    paddingBottom:4,
    paddingLeft: 4,
    paddingRight: 4,
  },

  // >>>>>>>
  container: {
    padding: 10,
    paddingBottom: 50
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  listContainer: {
    paddingBottom: 16, // Thêm khoảng cách giữa danh sách và tiêu đề tiếp theo
  },
  bookItem: {
    marginRight: 16,
    width: 120,
    position: 'relative',
  },
  bookImage: {
    width: 120,
    height: 180,
    borderRadius: 8,
  },
  bookTitle: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 8,
  },
  bookAuthor: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center'
  },
  // RANKBOOK
  rankBadge: {
    position: 'absolute',
    bottom: 47,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 2,
  },
  rankText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  // ANIMATION TEXT MESS TOP
  containerTextTopAMT: {
    height: 50,
    width: 1000,
    overflow: 'hidden',
    backgroundColor: '#FF8C00',
    justifyContent: 'center',
  },
  marqueeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    whiteSpace: 'nowrap',
  },
  // categoryTitleTO categoryTitleTx
  containerCategoryTitle:{
    marginTop: 16,
  },
  categoryTitle:{
    flexDirection: 'row',
    flexWrap: 'wrap',        
    justifyContent: 'space-between', 
    padding: 2,
  },
  categoryTitleTO:{
    width: '48%',
    marginVertical: 7, 
    alignItems: 'center',
    padding: 10,
    backgroundColor:'#e6e5e7',
    borderRadius: 6,
  },
  categoryTitleTx:{
    fontSize: 16,  
    fontWeight: 'bold',
  },
});
export default Home;
