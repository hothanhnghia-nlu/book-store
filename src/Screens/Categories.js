import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import StarRating from '../Components/StarRating';
import BookAPI from '../Services/BookAPI';

const categoriesTest = [
  {
    id: 1,
    imageSource: require('../Screens/Images/funny.jpg'),
    title: 'Funny Category',
    ratings: null, // Nếu không có đánh giá
    reviews: null,
    description: 'Amazing description for this Category',
  },
  {
    id: 2,
    imageSource: require('../Screens/Images/drama.jpg'),
    title: 'Drama Category',
    ratings: 5,
    reviews: 150,
    description: 'Amazing description for this Category',
  },
  {
    id: 2,
    imageSource: require('../Screens/Images/drama.jpg'),
    title: 'Drama Category',
    ratings: 5,
    reviews: 150,
    description: 'Amazing description for this Category',
  },
  {
    id: 3,
    imageSource: require('../Screens/Images/romantic.jpg'),
    title: 'Romantic Category',
    ratings: 3,
    reviews: 50,
    description: 'Amazing description for this Category',
  },
  {
    id: 4,
    imageSource: require('../Screens/Images/action.jpg'),
    title: 'Action Category',
    ratings: 2,
    reviews: 20,
    description: 'Amazing description for this Category',
  },
];


const CategoryCard = ({ imageSource, title, ratings, reviews, description }) =>{
  // anh tam thoi
  const image = 'https://cdn0.fahasa.com/media/catalog/product/n/x/nxcmctbt.jpg'
 return (
  
  <View style={styles.card}>
    <View style={styles.cardImgWrapper}>
      <Image
        source={{ uri: image }}
        resizeMode="stretch"
        style={styles.cardImg}
      />
    </View>
    <View style={styles.cardInfo}>
      <Text style={styles.cardTitle}>{title}</Text>
      {ratings && <StarRating ratings={ratings} reviews={reviews} />}
      <Text style={styles.cardDetails}>{description}</Text>
    </View>
  </View>
)};

const Categories = () => {
  const [categoryBooks, setCategoryBooks] = useState([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
  
    const fetchAllCategory = async () => {
      try {
        const categoryBooksResponse = await BookAPI.categoryBooks();
        if (categoryBooksResponse.status === 200) {
          setCategoryBooks(categoryBooksResponse.data);
        }
      } catch (err) {
        console.error('Error fetching books:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCategory();
  }, []);

  return (
    
    <View style={{ backgroundColor: 'white' }}>
      <ScrollView style={{padding: 10, marginBottom: 10 }}>
        {/* {categories.map(category => (
        <CategoryCard 
          key={category.id}
          imageSource={category.imageSource}
          title={category.title}
          ratings={category.ratings}
          reviews={category.reviews}
          description={category.description}
        />
      ))} */}
         {categoryBooks.map(category => (
        <CategoryCard 
          key={category.id}
          title={category.name}
        />
      ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  divider: {
    backgroundColor: "#FF8C00",
    height: 1,
    flex: 1,
    alignSelf: 'center'
  },
  title: {
    flexDirection: "row",
    fontWeight: "800",
    color: "#2D3436",
    paddingHorizontal: 30
  },
  cardsWrapper: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
  card: {
    height: 150,
    marginVertical: 4,
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
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,

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
  }
})
export default Categories;