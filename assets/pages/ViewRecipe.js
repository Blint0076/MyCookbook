import React, { useState } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import Mytextinput from './components/Mytextinput.js';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';
//import * as SQLite from 'expo-sqlite';
 
var db = openDatabase({ name: 'RecipeDatabase.db' });
 
const ViewRecipe = () => {
  let [inputRecipeId, setInputRecipeId] = useState('');
  let [recipeData, setRecipeData] = useState({});
 
  let searchRecipe = () => {
    console.log(inputRecipeId);
    setRecipeData({});
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_recipe where recipe_id = ?',
        [inputRecipeId],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            setRecipeData(results.rows.item(0));
          } else {
            alert('No user found');
          }
        }
      );
    });
  };
 
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: '#f2f4f3' }}>
        <View style={{ flex: 1 }}>
          <Mytextinput
            placeholder="Enter Recipe Id"
            onChangeText={
              (inputRecipeId) => setInputRecipeId(inputRecipeId)
            }
            style={{ padding: 10 }}
          />
          <Mybutton title="Search Recipe" customClick={searchRecipe} />
          <View
            style={{
              marginLeft: 35,
              marginRight: 35,
              marginTop: 10
            }}>
            <Text>Recipe Id: {recipeData.recipe_id}</Text>
            <Text>Recipe Name: {recipeData.recipe_name}</Text>
            <Text>Recipe Ingredient 1: {recipeData.recipe_ingredient1}</Text>
            <Text>Recipe Quantity 1: {recipeData.user_quantity1}</Text>
            <Text>Recipe Ingredient 2: {recipeData.recipe_ingredient2}</Text>
            <Text>Recipe Quantity 2: {recipeData.user_quantity2}</Text>
            <Text>Recipe Ingredient 3: {recipeData.recipe_ingredient3}</Text>
            <Text>Recipe Quantity 3: {recipeData.user_quantity3}</Text>
            <Text>Recipe Instructions: {recipeData.recipe_instructions}</Text>
          </View>
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
 
export default ViewRecipe;