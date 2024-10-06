import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableHighlight, View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Movies(props) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <FlatList
        data={props.movies}
        ref={props.flatListRef}
        numColumns={2}
        keyExtractor={item => item.imdbID}
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
        onEndReached={props.loadNewPage}
        onEndReachedThreshold={0.5}
        ListFooterComponent={props.loading ? <ActivityIndicator color="#87ceff" size="large" /> : null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
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
