import {Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Icons from "react-native-heroicons/outline";
import { useEffect, useState } from 'react';
import axios from "axios";
  
  

export default function MovieDetail(props) {
  
  return (
    <View>
        <Text style={{color: '#000000'}}>MovieDetail</Text>
      {/* <View style={styles.container}>
      <FlatList
        data={search}
        numColumns={2}
        keyExtractor={item => item.imdbID}
        renderItem={({ item }) => (
          <TouchableHighlight onPress={() => ""} style={styles.imageButton} underlayColor='#FFFFFF'>
          <View>
            <Image source={item.Poster !== 'N/A' ? { uri: item.Poster } : require('../assets/camera.jpg')} style={styles.image} />
            <View style={styles.textView}>
              <Text ellipsizeMode="tail" numberOfLines={1} style={styles.title}>{item.Title}</Text>
            </View>
          </View>
        </TouchableHighlight>
        )}
      />
      </View> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  iconButton: {
    borderRadius: 20,
    marginLeft: 5,
    padding: 5
  },
  title: {
    color: '#000000',
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
    borderColor: '#E0E0E0',
    borderWidth: 1,
    height: Dimensions.get('window').height / 4,
    marginVertical: 20,
    marginHorizontal: 10,
    width: Dimensions.get('window').width / 2.2
  }
})
