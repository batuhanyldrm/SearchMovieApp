import { ActivityIndicator, Alert, Dimensions, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
      <View style={styles.loadingContainer}>
        <ActivityIndicator color="#87ceff" size="large" />
        <Text style={styles.loading}>Loading</Text>
      </View>
    :
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle={'light-content'} />
        <View style={styles.container}>
          <Text style={styles.title}>{movieInfo.Title}</Text>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.imageContainer}>
              <Image source={movieInfo.Poster !== 'N/A' ? { uri: movieInfo.Poster } : require('../assets/camera.jpg')} style={styles.image} />
              <TouchableOpacity onPress={addToFavorite}>
                <Icons.HeartIcon color={isFavorite ? "#6495ed" : "#000000"} fill={isFavorite ? "#87ceff" : "#e8e8e8"} size={30} />
              </TouchableOpacity>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.mainTextDecoration}>
                <Icons.CalendarIcon color="#000000" fill="#999999" size={15} /> 
                <Text style={styles.textDecoration}> Year: </Text>
                <Text style={styles.color}>{movieInfo.Released !== 'N/A' ? movieInfo.Released : '-'}</Text>
              </Text>
              <Text style={styles.mainTextDecoration}>
                <Icons.StarIcon color="#000000" fill="#999999" size={15} /> 
                <Text style={styles.textDecoration}> Rating: </Text>
                <Text style={styles.color}>{movieInfo.imdbRating !== 'N/A' ? movieInfo.imdbRating : '-'}</Text>
              </Text>
              <Text style={styles.mainTextDecoration}>
                <Icons.ClockIcon color="#000000" fill="#999999" size={15} /> 
                <Text style={styles.textDecoration}> Time: </Text>
                <Text style={styles.color}>{movieInfo.Runtime !== 'N/A' ? movieInfo.Runtime : '-'}</Text>
              </Text>
              <Text style={styles.mainTextDecoration}>
                <Text style={styles.textDecoration}>Gendre: </Text>
                <Text style={styles.color}>{movieInfo.Genre !== 'N/A' ? movieInfo.Genre : '-'}</Text>
              </Text>
              <Text style={styles.textDecorationSummary}>Summary:</Text>
              <Text style={styles.color}>{movieInfo.Plot !== 'N/A' ? movieInfo.Plot : '-'}</Text>
              <Text style={styles.mainTextDecoration}>
                <Text style={styles.textDecoration}>Director: </Text>
                <Text style={styles.color}>{movieInfo.Director !== 'N/A' ? movieInfo.Director : '-'}</Text>
              </Text>
              <Text style={styles.mainTextDecoration}>
                <Text style={styles.textDecoration}>Actors: </Text>
                <Text style={styles.color}>{movieInfo.Actors !== 'N/A' ? movieInfo.Actors : '-'}</Text>
              </Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  loading: {
    color: '#616161',
    fontSize: 18,
    textAlign: 'center'
  },
  safeArea: {
    flex: 1
  },
  title: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center'
  },
  color: {
    color: '#000000'
  },
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  textContainer: {
    paddingHorizontal: 20,
    width: Dimensions.get('window').width,
  },
  mainTextDecoration: {
    marginVertical: 5
  },
  textDecoration: {
    color: '#000000',
    fontSize: 15,
    fontWeight: '600',
  },
  textDecorationSummary: {
    color: '#000000',
    fontSize: 15,
    fontWeight: '600',
    marginVertical: 5
  },
  image: {
    borderRadius: 10,
    margin: 10,
    height: Dimensions.get('window').height / 4,
    resizeMode: 'cover',
    width: Dimensions.get('window').width / 2.2,
  },
  imageContainer: {
    alignItems: 'center'
  }
});
