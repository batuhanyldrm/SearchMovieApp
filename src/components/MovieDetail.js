import { ActivityIndicator, Alert, Dimensions, Image, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Icons from "react-native-heroicons/outline";
import { useEffect, useState } from 'react';
import axios from "axios";

export default function MovieDetail({ route }) {
  const [movieInfo, setMovieInfo] = useState({});
  const [loading, setLoading] = useState(true);

  const getMovie = async () => {
    setLoading(true);
    try {
      const resp = await axios.get(`https://movie-database-alternative.p.rapidapi.com/?r=json&i=${route.params.imdbID}`, {
        headers: {
          'x-rapidapi-key': '53f668ccacmsh5988c24aeb8d2ffp1e1076jsn880a7e7cbb42',
          'x-rapidapi-host': 'movie-database-alternative.p.rapidapi.com'
        }
      });
      setMovieInfo(resp.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error(error);
      } else {
        Alert.alert('Bağlantı Hatası', 'Lütfen internet bağlantınızı kontrol ediniz.', [{text: 'Tamam', onPress: () => {}}])
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    loading ? 
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator color="#e04403" size="large" />
        <Text style={{color: '#616161', fontSize: 18, textAlign: 'center'}}>Loading</Text>
      </View>
    :
      <SafeAreaView style={{flex: 1}}>
        <StatusBar barStyle={'light-content'} />
        <View style={styles.container}>
          <Text style={{ color: '#000000', fontSize: 18, fontWeight: '600', textAlign: 'center' }}>{route.params.title}</Text>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View>
            <Image source={movieInfo.Poster !== 'N/A' ? { uri: movieInfo.Poster } : require('../assets/camera.jpg')} style={styles.image} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.textDecoration}><Icons.CalendarIcon color="#000000" fill="#999999" size={15} /> Year: {movieInfo.Year}</Text>
              <Text style={styles.textDecoration}><Icons.StarIcon color="#000000" fill="#999999" size={15} /> Rating: {movieInfo.imdbRating}</Text>
              <Text style={styles.textDecoration}><Icons.BookmarkIcon color="#000000" fill="#999999" size={15} /> Votes: {movieInfo.imdbVotes}</Text>
            </View>          
          </ScrollView>
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    width: Dimensions.get('window').width,
  },
  textDecoration: {
    color: '#000000',
    fontSize: 15,
    fontWeight: '600'
  },
  image: {
    borderRadius: 10,
    margin: 10,
    height: Dimensions.get('window').height / 4,
    resizeMode: 'cover',
    width: Dimensions.get('window').width / 2.2,
  },
});
