import { ActivityIndicator, Alert, Dimensions, Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import * as Icons from "react-native-heroicons/outline";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import axios from "axios";

export default function MovieDetail({ route }) {
  const navigation = useNavigation();
  const [movieInfo, setMovieInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

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

      if (resp.data.Response === "False") {
        Alert.alert('Error', resp.data.Error, [{text: 'Tamam', onPress: () => navigation.navigate('Movies')}])
      }

    } catch (error) {
      Alert.alert('Connection Error', 'Please check your internet connection.', [{text: 'Tamam', onPress: () => {}}])
    } finally {
      setLoading(false);
      checkFavorite();
    }
  };

  const checkFavorite = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      const storageFavorites = favorites ? JSON.parse(favorites) : [];
      const isFavoriteMovie = storageFavorites.some(favoriteMovie => favoriteMovie.imdbID === route.params.imdbID);
      setIsFavorite(isFavoriteMovie);
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  const addToFavorite = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      let storageFavorites = favorites ? JSON.parse(favorites) : [];

      if (isFavorite) {
        storageFavorites = storageFavorites.filter(favoriteMovie => favoriteMovie.imdbID !== movieInfo.imdbID);
      } else {
        storageFavorites.push(movieInfo);
      }

      await AsyncStorage.setItem('favorites', JSON.stringify(storageFavorites));
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error: ', error);
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
        {/* <ImageBackground source={movieInfo.Poster !== 'N/A' ? { uri: movieInfo.Poster } : require('../assets/camera.jpg')} imageStyle={{ opacity: 0.2 }} style={{ flex: 1 }}> */}
          <StatusBar barStyle={'light-content'} />
          <View style={styles.container}>
            <Text style={{ color: '#000000', fontSize: 18, fontWeight: '600', textAlign: 'center' }}>{movieInfo.Title}</Text>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <View style={{ alignItems: 'center' }}>
                <Image source={movieInfo.Poster !== 'N/A' ? { uri: movieInfo.Poster } : require('../assets/camera.jpg')} style={styles.image} />
                <TouchableOpacity onPress={addToFavorite}>
                  <Icons.HeartIcon color={isFavorite ? "#6495ed" : "#000000"} fill={isFavorite ? "#87ceff" : "#e8e8e8"} size={30} />
                </TouchableOpacity>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.textDecoration}><Icons.CalendarIcon color="#000000" fill="#999999" size={15} /> Year: {movieInfo.Released !== 'N/A' ? movieInfo.Released : '-'}</Text>
                <Text style={styles.textDecoration}><Icons.StarIcon color="#000000" fill="#999999" size={15} /> Rating: {movieInfo.imdbRating !== 'N/A' ? movieInfo.imdbRating : '-'}</Text>
                <Text style={styles.textDecoration}><Icons.ClockIcon color="#000000" fill="#999999" size={15} /> Time: {movieInfo.Runtime !== 'N/A' ? movieInfo.Runtime : '-'}</Text>
                <Text style={styles.textDecoration}>Summary</Text>
                <Text style={styles.textDecoration}>{movieInfo.Plot !== 'N/A' ? movieInfo.Plot : '-'}</Text>
                <Text style={styles.textDecoration}>Gendre: {movieInfo.Genre !== 'N/A' ? movieInfo.Genre : '-'}</Text>
              </View>
            </ScrollView>
          </View>
        {/* </ImageBackground> */}
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
   /*  flexDirection: 'row',
    justifyContent: 'space-between', */
    paddingHorizontal: 20,
    width: Dimensions.get('window').width,
  },
  textDecoration: {
    color: '#000000',
    fontSize: 15,
    fontWeight: '600',
  },
  image: {
    borderRadius: 10,
    margin: 10,
    height: Dimensions.get('window').height / 4,
    resizeMode: 'cover',
    width: Dimensions.get('window').width / 2.2,
  },
});
