import { ActivityIndicator, FlatList, StatusBar, StyleSheet, Text, View, Image, Dimensions, TouchableHighlight } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

export default function FavoriteMovies() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const getFavoriteMovies = async () => {
    setLoading(true);
    try {
      const allFavoriteMovies = await AsyncStorage.getItem('favorites');
      if (allFavoriteMovies !== null) {
        setFavoriteMovies(JSON.parse(allFavoriteMovies));
      }
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getFavoriteMovies();
    }, [])
  );

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
          {favoriteMovies.length > 0 ?
          <FlatList
            data={favoriteMovies}
            numColumns={2}
            keyExtractor={(item) => item.imdbID}
            renderItem={({ item }) => (
              <TouchableHighlight onPress={() => navigation.navigate('Movie Detail', {imdbID: item.imdbID})} style={styles.imageButton} underlayColor='#FFFFFF'>
                <View>
                  <Image source={item.Poster !== 'N/A' ? { uri: item.Poster } : require('../assets/camera.jpg')} style={styles.image} />
                  <View style={styles.textView}>
                    <Text ellipsizeMode="tail" numberOfLines={1} style={styles.title}>{item.Title}</Text>
                  </View>
                </View>
              </TouchableHighlight>
            )}
          />
          :
          <Text style={styles.textDecoration}>Favorite movie not found</Text>
          }
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  loading: {
    color: '#616161',
    fontSize: 18,
    textAlign: 'center'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  safeArea: {
    flex: 1,
    marginTop: -50
  },
  title: {
    color: '#000000',
    fontSize: 14,
    fontWeight: "bold",
    paddingHorizontal: 5,
    paddingVertical: 3
  },
  textView: {
    alignItems: 'center',
    color: '#000000',
    height: 25,
    justifyContent: 'center',
    width: '100%'
  },
  textDecoration: {
    flex: 1,
    color: '#000000',
    fontSize: 15,
    fontWeight: '600',
    marginVertical: 5,
    textAlign: 'center'
  },
  image: {
    borderRadius: 10,
    height: Dimensions.get('window').height / 4,
    resizeMode: 'cover',
    width: Dimensions.get('window').width / 2.2
  },
  imageButton: {
    height: Dimensions.get('window').height / 4,
    marginVertical: 20,
    marginHorizontal: 10,
    width: Dimensions.get('window').width / 2.2
  }
});
