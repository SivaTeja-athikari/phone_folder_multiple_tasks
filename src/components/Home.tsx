import {Text, View} from 'react-native';
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductDescription from './ProductDescription';

const Stack = createNativeStackNavigator();
export class Home extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            component={ProductDescription}
            name="ProductDescription"
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Home;
