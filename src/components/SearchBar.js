import { StyleSheet, View, TouchableHighlight, TextInput, Modal, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import * as Icons from "react-native-heroicons/outline";
import SelectDropdown from 'react-native-select-dropdown';

export default function SearchBar(props) {
	
  const navigation = useNavigation();
	const [modalVisible, setModalVisible] = useState(false);

  const handleSelectType = (selectedItem) => {
    props.setSelectedType(selectedItem);
  };

  const handleSelectYear = (selectedItem) => {
    props.setSelectedYear(selectedItem);
  };

  return (
		<View style={styles.container}>
			<TouchableHighlight onPress={() => setModalVisible(true)} style={styles.filterIconButton} underlayColor="#40404040">
				<Icons.AdjustmentsHorizontalIcon color="#000000" fill="#000000" size={30} />
			</TouchableHighlight>
			<TextInput onChangeText={(value) => props.setSearch(value)} onSubmitEditing={props.handleSearchSubmit} placeholder="Search movies" placeholderTextColor="#000000" style={styles.searchInput}  value={props.search} />
			<TouchableHighlight onPress={() => navigation.navigate('Favorite Movies')} style={styles.favoriteIconButton} underlayColor="#40404040">
				<Icons.HeartIcon color="#000000" size={30} />
			</TouchableHighlight>
			<Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Filter</Text>
            <View style={styles.selectDropdown}>
              <SelectDropdown
                data={props.types.map(item => item.type)}
                onSelect={handleSelectType}
                defaultValue={props.selectedType}
                renderButton={selectedItem => {
                  return (
                    <View><Text>{selectedItem}</Text></View>
                  );
                }}
                renderItem={item => {
                  return (
                    <View><Text >{item.type}</Text></View>
                  );
                }}
                showsVerticalScrollIndicator={false}
                dropdownStyle={styles.dropdownMenuStyle}
              />
            </View>
            <View style={styles.selectDropdown}>
              <SelectDropdown
                data={props.years.map(item => item.year)}
                onSelect={handleSelectYear}
                defaultValue={props.selectedYear}
                renderButton={selectedItem => {
                  return (
                    <View>
                      <Text>{selectedItem}</Text>
                    </View>
                  );
                }}
                renderItem={item => {
                  return (
                    <View>
                      <Text>{item.year}</Text>
                    </View>
                  );
                }}
                showsVerticalScrollIndicator={false}
                dropdownStyle={styles.dropdownMenuStyle}
              />
            </View>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => props.handleSearchSubmit()}>
                <Text style={styles.buttonText}>Filter</Text>
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
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  selectDropdown: {
    alignItems: 'center',
    marginVertical: 5
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20
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
  modalButton: {
    backgroundColor: '#9c9c9c',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  dropdownStyle: {
    borderRadius: 8,
  }
});
