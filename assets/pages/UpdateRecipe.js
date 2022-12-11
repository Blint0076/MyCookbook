import React, { useState } from 'react';
import {  View,  ScrollView,  KeyboardAvoidingView,  Alert,  SafeAreaView,  Text, } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';
 
var db = openDatabase({ name: 'RecipeDatabase.db' });
 
const UpdateRecipe = ({ navigation }) => {
  let [recipeName, setRecipeName] = useState('');
  let [recipe_ingredient1, setRecipeIngredient1] = useState('');
  let [recipe_quantity1, setRecipeQuantity1] = useState('');
  let [recipe_ingredient2, setRecipeIngredient2] = useState('');
  let [recipe_quantity2, setRecipeQuantity2] = useState('');
  let [recipe_ingredient3, setRecipeIngredient3] = useState('');
  let [recipe_quantity3, setRecipeQuantity3] = useState('');
 
  let updateAllStates = (name, ingredient1, quantity1, ingredient2, quantity2, ingredient3, quantity3, instructions) => {
    setRecipeName(name);
    setRecipeIngredient1(ingredient1);
    setRecipeQuantity1(quantity1);
    setRecipeIngredient1(ingredient2);
    setRecipeQuantity1(quantity2);
    setRecipeIngredient1(ingredient3);
    setRecipeQuantity1(quantity3);
    setRecipeInstructions(instructions);
  };
 
  let searchRecipe = () => {
    console.log(inputRecipeId);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_recipe where recipe_id = ?',
        [inputRecipeId],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            updateAllStates(
              res.recipe_name,
              res.recipe_ingredient1,
              res.recipe_quantity1,
              res.recipe_ingredient2,
              res.recipe_quantity2,
              res.recipe_ingredient3,
              res.recipe_quantity3,
              res.recipe_instructions
            );
          } else {
            alert('No user found');
            updateAllStates('', '', '', '', '', '', '', '');
          }
        }
      );
    });
  };
  let UpdateRecipe = () => {
    console.log(inputRecipeId, recipeName, recipe_ingredient1, recipe_quantity1, recipe_ingredient2, recipe_quantity2, recipe_ingredient3, recipe_quantity3, instructions);
 
    if (!inputRecipeId) {
      alert('Please enter recipe id');
      return;
    }
    if (!recipeName) {
      alert('Please enter recipe name');
      return;
    }
    if (!recipeIngredient1) {
      alert('Please enter ingredient 1');
      return;
    }
    if (!recipeQuantity1) {
      alert('Please enter quantity 1');
      return;
    }
    if (!recipeIngredient2) {
      alert('Please enter ingredient 2');
      return;
    }
    if (!recipeQuantity2) {
      alert('Please enter quantity 2');
      return;
    }
    if (!recipeIngredient3) {
      alert('Please enter ingredient 3');
      return;
    }
    if (!recipeQuantity3) {
      alert('Please enter quantity 3');
      return;
    }
    if (!recipeInstructions) {
      alert('Please enter instructions');
      return;
    }
 
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE table_recipe set recipe_name=?, recipe_ingredient1=? , recipe_quantity1=? , recipe_ingredient2=? , recipe_quantity2=? , recipe_ingredient3=? , recipe_quantity3=? , recipe_instructions=? where user_id=?',
        [recipeName, recipeIngredient1, recipeQuantity1, recipeIngredient2, recipeQuantity2, recipeIngredient3, recipeQuantity3, recipeInstructions, inputRecipeId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Recipe updated successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Update Failed');
        }
      );
    });
  };
 
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: '#a9927d' }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
              <Mytextinput
                placeholder="Enter Recipe Id"
                style={{ padding: 10 }}
                onChangeText={(inputRecipeId) => setinputRecipeId(inputRecipeId)}
              />
              <Mybutton
                title="Search Recipe"
                customClick={searchRecipe} 
              />
              <Mytextinput
                placeholder="Enter Recipe Name"
                value={recipeName}
                style={{ padding: 10 }}
                onChangeText={(recipeName) => setRecipeName(recipeName)}
              />
              <Mytextinput
                placeholder="Enter ingredient 1"
                value={'' + recipeIngredient1}
                onChangeText={(recipeIngredient1) => setRecipeIngredient1(recipeIngredient1)}
                maxLength={10}
                style={{ padding: 10 }}
                //keyboardType="numeric"
              />
              <Mytextinput
                value={userQuantity1}
                placeholder="Enter quantity 1"
                onChangeText={(recipeQuantity1) => setRecipeQuantity1(recipeQuantity1)}
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{ textAlignVertical: 'top', padding: 10 }}
              />
              <Mytextinput
                placeholder="Enter ingredient 2"
                value={'' + recipeIngredient2}
                onChangeText={(recipeIngredient2) => setRecipeIngredient2(recipeIngredient2)}
                maxLength={10}
                style={{ padding: 10 }}
                //keyboardType="numeric"
              />
              <Mytextinput
                value={userQuantity2}
                placeholder="Enter quantity 2"
                onChangeText={(recipeQuantity2) => setRecipeQuantity2(recipeQuantity2)}
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{ textAlignVertical: 'top', padding: 10 }}
              />
              <Mytextinput
                placeholder="Enter ingredient 3"
                value={'' + recipeIngredient3}
                onChangeText={(recipeIngredient3) => setRecipeIngredient3(recipeIngredient3)}
                maxLength={10}
                style={{ padding: 10 }}
                //keyboardType="numeric"
              />
              <Mytextinput
                value={userQuantity3}
                placeholder="Enter quantity 3"
                onChangeText={(recipeQuantity3) => setRecipeQuantity3(recipeQuantity3)}
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{ textAlignVertical: 'top', padding: 10 }}
              />
              <Mybutton
                title="Update Recipe"
                customClick={UpdateRecipe}
              />
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
 
export default UpdateRecipe;