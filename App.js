import 'react-native-gesture-handler';
import * as React from 'react';
import NavigationBar from 'react-native-navbar-color'
import
 MaterialCommunityIcons
from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  NavigationContainer
} from '@react-navigation/native';
import {
  createStackNavigator
} from '@react-navigation/stack';
import {
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs';

import HomeScreen from './Screens/homeScreen';
import PricePredictionScreen from './Screens/pricePredictionScreen';
import CryptoViewScreen from './Screens/cryptoViewScreen.js';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function FavStack() {
  return (
      <Stack.Navigator
        initialRouteName="Fav"
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Fav"
          component={HomeScreen}
          options={{ title: 'Fav' }}/>

        <Stack.Screen
          name="view"
          component={CryptoViewScreen}
          options={{ title: 'view' }}/>

      </Stack.Navigator>
  );
}

function UserStack() {
  return (
    <Stack.Navigator
      initialRouteName="User"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="User"
        component={PricePredictionScreen}
        options={{ title: 'User' }}/>

    </Stack.Navigator>
  );
}



function App() {


  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Feed"    

        tabBarOptions={{
          activeTintColor: '#95C35D',
          
          tabStyle: [{backgroundColor: '#282f4f'}]
        }}>
        



<Tab.Screen
          name="FavStack"
          component={FavStack}
          options={{
            headerShown: false,
            tabBarLabel: '',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="store"
                color={color}
                size={size}
              />
            ),
          }}  />


         
<Tab.Screen
          name="UserStack"
          component={UserStack}
          options={{
            headerShown: false,
            tabBarLabel: '',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="trending-up"
                color={color}
                size={size}
              />
            ),
          }} />

          
      </Tab.Navigator>
    </NavigationContainer>
  );
}
export default App;