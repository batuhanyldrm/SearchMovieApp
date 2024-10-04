import { ActivityIndicator, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';

export default function FavoriteMovies() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

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
        <Text style={{ color: '#000000', fontSize: 18, fontWeight: '600', textAlign: 'center' }}>FavoritesMovies</Text>
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
});
