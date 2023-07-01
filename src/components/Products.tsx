import {Text, View} from 'react-native';
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductDescription from './ProductDescription';


class Products extends Component {
  render() {
    return (
      <View>
        <Text>Product</Text>
      </View>
    );
  }
}

export default Products;
