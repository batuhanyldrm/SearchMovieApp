import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import Main from "./src/components/Main";
import { NavigationContainer } from "@react-navigation/native";
import Movies from "./src/components/Movies";
import MovieDetail from "./src/components/MovieDetail";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Movies" options={{ headerShown: false }} component={Main} />
        <Stack.Screen name="Movie" component={Movies} />
        <Stack.Screen name="Movie Detail" component={MovieDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({});
