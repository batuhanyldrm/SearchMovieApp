import {ActivityIndicator, Dimensions, StyleSheet, Text, TextInput, TouchableHighlight, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Icons from "react-native-heroicons/outline";
import { useEffect, useState } from 'react';
import axios from "axios";

import Movies from "./Movies";
  
  

export default function Main() {

  const [search, setSearch] = useState('Avengers%20Endgame');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMovies = async () => {
    setLoading(true);
    try {
      const resp = await axios.get(`https://movie-database-alternative.p.rapidapi.com/?s=${search}&r=json&page=1`,
        {
          headers: {
            'x-rapidapi-key': '53f668ccacmsh5988c24aeb8d2ffp1e1076jsn880a7e7cbb42',
            'x-rapidapi-host': 'movie-database-alternative.p.rapidapi.com'
          }
        }
      )
      
      setMovies(resp.data.Search)
      return movies;

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const searchResult = setTimeout(() => {
      getMovies();
    }, 1000);

    return () => clearTimeout(searchResult);
  }, [search]);

  return (
    loading ? 
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ActivityIndicator color="#e04403" size="large" />
        <Text style={{color: '#616161', fontSize: 18, textAlign: 'center'}}>Loading</Text>
      </View>
    :
    <SafeAreaView style={{backgroundColor: '#FFFFFF', flex: 1}}>
      <View style={{flex: 1}}>
        <Text style={{ color: '#000000', fontSize: 18, fontWeight: '600', textAlign: 'center' }}>Movies</Text>
        <View style={styles.container}>
          <TouchableHighlight onPress={() => console.log("modal yapılacak")} style={styles.iconButton} underlayColor="#40404040">
            <Icons.AdjustmentsHorizontalIcon color="#000000" fill="#000000" size={30} />
          </TouchableHighlight>
          <TextInput onChangeText={(value) => setSearch(value)} placeholder="Search movies" placeholderTextColor="#000000" style={styles.searchInput}  value={search} />
        </View>
        <View style={{flex: 1}}>
          <Movies movies={movies} />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButton: {
    borderRadius: 20,
    marginLeft: 5,
    padding: 5
  },
  textColors: {
    color: '#000000',
    maxHeight: Dimensions.get('window').height / 2
  },
  searchInput: {
    flex: 1,
    color: '#424242',
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 8,
    margin: 5
  }
})
