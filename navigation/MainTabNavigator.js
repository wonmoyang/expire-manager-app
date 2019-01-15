import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';

import FoodScreen from '../screens/food/FoodScreen';
import FoodCreateScreen from '../screens/food/FoodCreateScreen';
import FoodBarcodeScreen from '../screens/food/FoodBarcodeScreen';

import BeautyScreen from '../screens/beauty/BeautyScreen';
import SettingScreen from '../screens/setting/SettingScreen';

const FoodStack = createStackNavigator({
  Food: FoodScreen,
  FoodCreate: FoodCreateScreen,
  FoodBarcode: FoodBarcodeScreen
});
FoodStack.navigationOptions = {
  tabBarLabel: 'Food',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-nutrition' : 'md-nutrition'}
    />
  ),
};

const beautyStack = createStackNavigator({
  Beauty: BeautyScreen,
});
beautyStack.navigationOptions = {
  tabBarLabel: 'Beauty',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-heart' : 'md-heart'}
    />
  ),
};

const SettingStack = createStackNavigator({
  Setting: SettingScreen,
});
SettingStack.navigationOptions = {
  tabBarLabel: 'Setting',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  FoodStack,
  beautyStack,
  SettingStack,
});
