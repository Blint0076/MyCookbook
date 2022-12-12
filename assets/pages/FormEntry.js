import React, { useState } from 'react';
import {  View, ScrollView,  KeyboardAvoidingView,  Alert,  SafeAreaView,  Text, } from 'react-native';
import Mytextinput from './components/Mytextinput.js';
import Mybutton from './components/Mybutton';
//import { openDatabase } from 'react-native-sqlite-storage';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('RecipeDatabase.db');

//var db = openDatabase({ name: 'RecipeDatabase.db' });
 
const FormEntry = ({ navigation }) => {
  let [recipeName, setRecipeName] = useState('');
  let [recipe_ingredient1, setRecipeIngredient1] = useState('');
  let [recipe_quantity1, setRecipeQuantity1] = useState('');
  let [recipe_ingredient2, setRecipeIngredient2] = useState('');
  let [recipe_quantity2, setRecipeQuantity2] = useState('');
  let [recipe_ingredient3, setRecipeIngredient3] = useState('');
  let [recipe_quantity3, setRecipeQuantity3] = useState('');
  let [recipe_instructions, setRecipeInstructions] = useState('');
 
  let register_recipe = () => {
    console.log(recipeName, recipe_ingredient1, recipe_quantity1, recipe_ingredient2, recipe_quantity2, recipe_ingredient3, recipe_quantity3, recipe_instructions);
 
    if (!recipeName) {
      alert('Please enter recipe name');
      return;
    }
    if (!recipe_ingredient1) {
      alert('Please enter name of ingredient 1');
      return;
    }
    if (!recipe_quantity1) {
      alert('Please enter a quantity');
      return;
    }
    if (!recipe_ingredient2) {
      alert('Please enter name of ingredient 2');
      return;
    }
    if (!recipe_quantity2) {
      alert('Please enter a quantity');
      return;
    }
    if (!recipe_ingredient3) {
      alert('Please enter name of ingredient 3');
      return;
    }
    if (!recipe_quantity3) {
      alert('Please enter a quantity');
      return;
    }
    if (!recipe_instructions) {
      alert('Please enter instructions');
      return;
    }
 
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_recipe (recipe_name, recipe_ingredient1, recipe_quantity1, recipe_ingredient2, recipe_quantity2, recipe_ingredient3, recipe_quantity3, recipe_instructions) VALUES (?,?,?,?,?,?,?,?)',
        [recipeName, recipe_ingredient1, recipe_quantity1, recipe_ingredient2, recipe_quantity2,recipe_ingredient3, recipe_quantity3, recipe_instructions],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'You successfully saved your recipe',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Save Failed');
        }
      );
    });
  };
 
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
              <Mytextinput
                placeholder="Enter Recipe Name"
                onChangeText={(recipeName) => setRecipeName(recipeName)}
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Enter Ingredient"
                onChangeText={(recipe_ingredient1) => setRecipeIngredient1(recipe_ingredient1)}
                maxLength={10}
                keyboardType="numeric"
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Enter Quantity"
                onChangeText={(recipe_quantity1) => setRecipeQuantity1(recipe_quantity1)}
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{ textAlignVertical: 'top', padding: 10 }}
              />
              <Mytextinput
                placeholder="Enter Ingredient"
                onChangeText={(recipe_ingredient2) => setRecipeIngredient2(recipe_ingredient2)}
                maxLength={10}
                keyboardType="numeric"
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Enter Quantity"
                onChangeText={(recipe_quantity2) => setRecipeQuantity2(recipe_quantity2)}
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{ textAlignVertical: 'top', padding: 10 }}
              />
              <Mytextinput
                placeholder="Enter Ingredient"
                onChangeText={(recipe_ingredient3) => setRecipeIngredient3(recipe_ingredient3)}
                maxLength={10}
                keyboardType="numeric"
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Enter Quantity"
                onChangeText={(recipe_quantity3) => setRecipeQuantity3(recipe_quantity3)}
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{ textAlignVertical: 'top', padding: 10 }}
              />
              <Mytextinput
                placeholder="Enter Instructions"
                onChangeText={(recipe_instructions) => setRecipeInstructions(recipe_instructions)}
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{ textAlignVertical: 'top', padding: 10 }}
              />
              <Mybutton title="Submit" customClick={register_recipe} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            color: 'grey'
          }}>
          Cookin' 4 Urself
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: 'grey'
          }}>
          C. Gondringer
        </Text>
      </View>
    </SafeAreaView>
  );
};
 
export default FormEntry;