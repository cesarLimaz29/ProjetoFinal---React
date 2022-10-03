
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import Home from './pages/Home';
import Cliente from './pages/Cliente';
import Dados from './pages/Dados';
import Cotacao from './pages/Cotacao';




const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
    
     
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false}} />
      <Stack.Screen name="Cliente" component={Cliente} options={{ headerShown: false}} />
      <Stack.Screen name="Dados" component={Dados} options={{ headerShown: false}} />
      <Stack.Screen name="Cotacao" component={Cotacao} options={{ headerShown: false}} />

    
      
    </Stack.Navigator>
  );
}

const App = () => {

  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
    
  );
};


export default App;
