import {Dimensions, StyleSheet, Text, TextInput, TouchableHighlight, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Icons from "react-native-heroicons/outline";
import { useState } from 'react';

import Movies from "./Movies";
  
  

export default function Main() {

  const [search, setSearch] = useState("");

  return (
    <SafeAreaView style={{backgroundColor: '#FFFFFF', flex: 1}}>
      <View style={{flex: 1}}>
        <Text style={{ color: '#000000', fontSize: 18, fontWeight: '600', textAlign: 'center' }}>Movies</Text>
        <View style={styles.container}>
          <TouchableHighlight onPress={() => console.log("modal yapılacak")} style={styles.iconButton} underlayColor="#40404040">
            <Icons.AdjustmentsHorizontalIcon color="#000000" fill="#000000" size={30} />
          </TouchableHighlight>
          <TextInput onChangeText={setSearch} placeholder="Search movies" placeholderTextColor="#000000" style={styles.searchInput}  value={search} />
        </View>
        <View style={{flex: 1}}>
          <Movies />
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
