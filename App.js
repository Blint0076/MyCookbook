import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { Button, Image, ImageEditor, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import {createAppContainer} from 'react-navigation'; 
//import {createStackNavigator} from 'react-navigation-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as SplashScreen from 'expo-splash-screen';
import * as ImagePicker from 'expo-image-picker';
import ImageViewer from './imageViewer';
//import { useState } from 'react';

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 2000);

//home.js
function Home({ navigation }) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleBar}>
        <Text style={styles.title}>Cookin' 4 Urself!</Text>
        <Text style={styles.title}>Take a photo or select a photo of the dish.</Text>
      </View>
      <View style={styles.image}>

      </View>
      <View style={styles.photo}>

      </View>
      <View style={styles.buttonSection}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {navigation.navigate('Save')}}
          >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

//list.js
function List({navigation}) {
  const [recipeName, setRecipeName] = useState(null);
  const [ingredient, setIngredient] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [instructions, setInstructions] = useState(null);
  
  const [selectedImage, setSelectedImage] = useState(null);
    let openImagePickerAsync = async () => {
      let pickerResult = await ImagePicker.launchImageLibraryAsync();
      if (pickerResult.cancelled === true) {
        return;
      }
      setSelectedImage({ localUri:  pickerResult.uri});
    };

  return (
    <View style={styles.enterListContainer}>
      <View>
        <Text style={styles.snapText}>Placeholder for image</Text>
      </View>
      <View style={styles.listSection}>
      <TextInput
          style={styles.input}
          placeholder="recipe name"
          placeholderTextColor='#5e503f'
          onChangeText={setRecipeName}
          value={recipeName}
        />
        <TextInput
          style={styles.input}
          placeholder="ingredient"
          placeholderTextColor='#5e503f'
          onChangeText={setIngredient}
          value={ingredient}
        />
        <TextInput
          style={styles.input}
          placeholder="qty"
          placeholderTextColor='#5e503f'
          onChangeText={setQuantity}
          value={quantity}
        />
        <TextInput
          style={styles.input}
          placeholder="instructions"
          placeholderTextColor='#5e503f'
          onChangeText={setInstructions}
          value={instructions}
        />
      </View>
      <View style={styles.buttonSection}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {navigation.navigate('Recipe Card', {
            recipeName: {recipeName},
            ingredient: {ingredient},
            quantity: {quantity},
            instructions: {instructions},
          });
        }}
        >
          <Text style={styles.buttonText}>Add Item</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

//card.js
function Card({ route, navigation}) {
  const {recipeName, ingredient, quantity, instructions} = route.params;

  return (
    <View style={styles.displayItemsContainer}>
      <View style={styles.imageSection}>
        <Image source={'./assets.chef.png'}></Image>
      </View>
      <View>
        <Text style={styles.recipeCardHeading}>Recipe Title</Text>
        <Text style={styles.recipeText}>{JSON.stringify(recipeName)}</Text>
        <Text style={styles.recipeText}>{JSON.stringify(ingredient)}</Text>
        <Text style={styles.recipeText}>{JSON.stringify(quantity)}</Text>
        <Text style={styles.recipeText}>{JSON.stringify(instructions)}</Text>
      </View>
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator useLegacyImplementation initialRouteName='App'>
        <Drawer.Screen name='Home' component={Home}/>
        <Drawer.Screen name='List' component={List}/>
        <Drawer.Screen name='Card' component={Card}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#a9927d',
  },
  titleBar: {
    color: '#0a0908',
    flexGrow: 1,
    justifyContent: 'flex-end',
    padding: 10,
  },
  title: {
    color: '#f2f4f3',
    fontSize: 18,
    textAlign: 'center',
  },
  image: {
    height: 40,
    width: 40,
  },
  photo: {
    height: 40,
    width: 40,
  },
  buttonSection: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#49111c',
  },
  buttonText: {
    color: '#f2f4f3',
  },
  enterListContainer: {
    backgroundColor: '#5e503f',
  },
  snapText: {
    color: '#f2f4f3',
  },
  listSection: {
    backgroundColor: '#a9927d',
  },
  input: {
    backgroundColor: '#f2f4f3',
  },
  displayItemsContainer: {
    backgroundColor: '#5e503f',
  },
  recipeCardHeading: {
    backgroundColor: '#0a0908',
  },
  recipeText: {
    color: '#5e503f'
  },
})