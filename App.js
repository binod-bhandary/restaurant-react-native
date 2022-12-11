import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Restaurant from './src/screens/Restaurant';
import Contact from './src/screens/Contact';
import Basket from './src/screens/Basket';
import { store } from './store'
import { Provider } from 'react-redux'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Restaurant" component={Restaurant} options={{ headerShown: false }} />
          <Stack.Screen name="Contact" component={Contact} />
          <Stack.Screen name="Basket" component={Basket} options={{ presentation:"modal", headerShown:false }} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}
