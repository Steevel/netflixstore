import React from 'react';
import {NativeBaseProvider} from 'native-base';

// Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Import Screens
import Home from './screens/Home';
import Add from './screens/Add';
import Edit from './screens/Edit';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerStyle: {
                backgroundColor: '#5067ff',
              },
              title: 'Netflix Store',
              headerTitleStyle: {
                textAlign: 'center',
                color: '#eee',
              },
            }}
          />
          <Stack.Screen
            name="Add"
            component={Add}
            options={{
              headerStyle: {
                backgroundColor: '#5067ff',
              },
              title: 'Netflix Store',
              headerTitleStyle: {
                textAlign: 'center',
                color: '#eee',
              },
            }}
          />
          <Stack.Screen
            name="Edit"
            component={Edit}
            options={{
              headerStyle: {
                backgroundColor: '#5067ff',
              },
              title: 'Netflix Store',
              headerTitleStyle: {
                textAlign: 'center',
                color: '#eee',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
