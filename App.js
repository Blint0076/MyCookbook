import 'react-native-gesture-handler';
 
import * as React from 'react';
import { Button, View, Text } from 'react-native';
 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
 
import HomeScreen from './assets/pages/HomeScreen';
import RegisterUser from './assets/pages/FormEntry';
import UpdateUser from './assets/pages/UpdateRecipe';
import ViewUser from './assets/pages/ViewRecipe';
import ViewAllUser from './assets/pages/ViewAllRecipe';
import DeleteUser from './assets/pages/DeleteRecipe';
 
const Stack = createStackNavigator();
 
const App = () => {
  return (
    <GestureHandlerRootView>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: 'Home', //Set Header Title
            headerStyle: {
              backgroundColor: '#0a0908', //Set Header color
            },
            headerTintColor: '#f2f4f3', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="View"
          component={ViewUser}
          options={{
            title: 'View User', //Set Header Title
            headerStyle: {
              backgroundColor: '#0a0908', //Set Header color
            },
            headerTintColor: '#f2f4f3', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="ViewAll"
          component={ViewAllUser}
          options={{
            title: 'View Users', //Set Header Title
            headerStyle: {
              backgroundColor: '#0a0908', //Set Header color
            },
            headerTintColor: '#f2f4f3', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="Update"
          component={UpdateUser}
          options={{
            title: 'Update User', //Set Header Title
            headerStyle: {
              backgroundColor: '#0a0908', //Set Header color
            },
            headerTintColor: '#f2f4f3', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterUser}
          options={{
            title: 'Register User', //Set Header Title
            headerStyle: {
              backgroundColor: '#0a0908', //Set Header color
            },
            headerTintColor: '#f2f4f3', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="Delete"
          component={DeleteUser}
          options={{
            title: 'Delete User', //Set Header Title
            headerStyle: {
              backgroundColor: '#0a0908', //Set Header color
            },
            headerTintColor: '#f2f4f3', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>
  );
};
 
export default App;