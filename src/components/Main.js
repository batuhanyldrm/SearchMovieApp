import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState, useRef } from 'react';
import axios from "axios";
import Movies from "./Movies";
import SearchBar from './SearchBar';
  
  
export default function Main() {
  const [search, setSearch] = useState('Avengers Endgame');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [types, setTypes] = useState([{type: 'all'}, {type: 'movie'}, {type: 'series'}, {type: 'game'}]);
  const [selectedType, setSelectedType] = useState('');
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  
  const flatListRef = useRef();

  const yearQuery = selectedYear === 'all' ? '' : selectedYear;
  const typeQuery = selectedType === 'all' ? '' : selectedType;

  const getMovies = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const resp = await axios.get(`https://movie-database-alternative.p.rapidapi.com/?s=${search}&r=json&page=${pageNumber}&y=${yearQuery}&type=${typeQuery}`,
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
      Alert.alert('Connection Error', 'Please check your internet connection.', [{text: 'Tamam', onPress: () => {}}])
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

  const currentYear = new Date().getFullYear();
  const yearArray = [{ year: 'all' }];

  for (let years = 1900; years <= currentYear; years++) {
    yearArray.push({ year: years.toString() });
  }

  useEffect(() => {
    setYears(yearArray);
    getMovies(1);
  }, []);

  return (
    loading && page === 1 ? 
      <View style={styles.loadingContainer}>
        <ActivityIndicator color="#87ceff" size="large" />
        <Text style={styles.loading}>Loading</Text>
      </View>
    :
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <View style={styles.viewContainer}>
        <SearchBar search={search} setSearch={setSearch} types={types} years={years} selectedYear={selectedYear} setSelectedYear={setSelectedYear} handleSearchSubmit={handleSearchSubmit}   selectedType={selectedType} setSelectedType={setSelectedType} />
        <View style={styles.viewContainer}>
          <Movies movies={movies} loadNewPage={loadNewPage} loading={loading} flatListRef={flatListRef} />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
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
    flex: 1
  },
  header: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center'
  },
  viewContainer: {
    flex: 1
  }
});
