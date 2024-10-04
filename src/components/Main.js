import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState, useRef } from 'react';
import axios from "axios";
import Movies from "./Movies";
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchBar from './SearchBar';
  
  
export default function Main() {
  const [search, setSearch] = useState('Avengers%20Endgame');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  
  const flatListRef = useRef();

  const getMovies = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const resp = await axios.get(`https://movie-database-alternative.p.rapidapi.com/?s=${search}&r=json&page=${pageNumber}`,
        {
          headers: {
            'x-rapidapi-key': '53f668ccacmsh5988c24aeb8d2ffp1e1076jsn880a7e7cbb42',
            'x-rapidapi-host': 'movie-database-alternative.p.rapidapi.com'
          }
        }
      );

      if (resp.data.Response === "True") {

        const allMovies = pageNumber === 1 ? resp.data.Search : [...movies, ...resp.data.Search];
        setMovies(allMovies);
        setTotalResults(parseInt(resp.data.totalResults, 10));

      } else {
        Alert.alert('Error', resp.data.Error, [{ text: 'Tamam', onPress: () => { } }]);
      }
    } catch (error) {
      Alert.alert('Bağlantı Hatası', 'Lütfen internet bağlantınızı kontrol ediniz.', [{text: 'Tamam', onPress: () => {}}])
    } finally {
      setLoading(false);
    }
  };

  const loadNewPage = () => {
    if (movies.length < totalResults && !loading) {
      setPage(page => {
        const nextPage = page + 1;
        getMovies(nextPage);
        return nextPage;
      });
    }
  };

  const handleSearchSubmit = () => {
    flatListRef.current.scrollToOffset({ animated: false, offset: 0 });
    setPage(1);
    getMovies(1);
  };

  useEffect(() => {
    getMovies(1);
  }, []);

  return (
    loading && page === 1 ? 
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator color="#e04403" size="large" />
        <Text style={{color: '#616161', fontSize: 18, textAlign: 'center'}}>Loading</Text>
      </View>
    :
    <SafeAreaView style={{backgroundColor: '#FFFFFF', flex: 1}}>
      <View style={{flex: 1}}>
        <Text style={{ color: '#000000', fontSize: 18, fontWeight: '600', textAlign: 'center' }}>Movies</Text>
        <SearchBar search={search} setSearch={setSearch} handleSearchSubmit={handleSearchSubmit} />
        <View style={{flex: 1}}>
          <Movies movies={movies} loadNewPage={loadNewPage} loading={loading} flatListRef={flatListRef} />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({});
