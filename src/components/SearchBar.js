import { StyleSheet, View, TouchableHighlight, TextInput, Modal, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import * as Icons from "react-native-heroicons/outline";

export default function SearchBar(props) {
	
  const navigation = useNavigation();
	const [modalVisible, setModalVisible] = useState(false);

  return (
		<View style={styles.container}>
			<TouchableHighlight onPress={() => setModalVisible(true)} style={styles.filterIconButton} underlayColor="#40404040">
				<Icons.AdjustmentsHorizontalIcon color="#000000" fill="#000000" size={30} />
			</TouchableHighlight>
			<TextInput onChangeText={(value) => props.setSearch(value)} onSubmitEditing={props.handleSearchSubmit} placeholder="Search movies" placeholderTextColor="#000000" style={styles.searchInput}  value={props.search} />
			<TouchableHighlight onPress={() => navigation.navigate('Favorite Movies')} style={styles.favoriteIconButton} underlayColor="#40404040">
				<Icons.HeartIcon color="#000000" /* fill="#000000" */ size={30} />
			</TouchableHighlight>
			<Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Filter</Text>
            <View style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 20,
            }}>
              <TouchableOpacity style={{
                backgroundColor: '#9c9c9c',
                padding: 10,
                borderRadius: 5,
                width: '45%',
                justifyContent: 'center',
                alignItems: 'center',
              }} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Hayır</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{
                backgroundColor: '#9c9c9c',
                padding: 10,
                borderRadius: 5,
                width: '45%',
                justifyContent: 'center',
                alignItems: 'center',
              }} onPress={() => {}}>
                <Text style={styles.buttonText}>Evet</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
		</View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  modalText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterIconButton: {
    borderRadius: 20,
    marginLeft: 5,
    padding: 5
  },
  favoriteIconButton: {
    borderRadius: 20,
    marginRight: 5,
    padding: 5
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
});
