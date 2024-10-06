import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import Main from "./src/components/Main";
import { NavigationContainer } from "@react-navigation/native";
import Movies from "./src/components/Movies";
import MovieDetail from "./src/components/MovieDetail";
import FavoriteMovies from "./src/components/FavoriteMovies";
import SearchBar from "./src/components/SearchBar";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Movies" options={{headerStyle: {backgroundColor: 'gray'}, headerTintColor: 'white',}} component={Main} />
        <Stack.Screen name="Movie" component={Movies} />
        <Stack.Screen name="Movie Detail" options={{headerStyle: {backgroundColor: 'gray'}, headerTintColor: 'white',}} component={MovieDetail} />
        <Stack.Screen name="Favorite Movies" options={{headerStyle: {backgroundColor: 'gray'}, headerTintColor: 'white',}} component={FavoriteMovies} />
        <Stack.Screen name="SearchBar" component={SearchBar} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({});
