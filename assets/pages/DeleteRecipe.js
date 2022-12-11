import React, { useState } from 'react';
import { Text, View, Alert, SafeAreaView } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';
//import * as SQLite from 'expo-sqlite';
 
var db = openDatabase({ name: 'RecipeDatabase.db' });
 
const DeleteRecipe = ({ navigation }) => {
  let [inputRecipeId, setInputRecipeId] = useState('');
 
  let deleteRecipe = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM  table_recipe where user_id=?',
        [inputRecipeId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Recipe deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else {
            alert('Please insert a valid Recipe Id');
          }
        }
      );
    });
  };
 
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Mytextinput
            placeholder="Enter Recipe Id"
            onChangeText={
              (inputRecipeId) => setInputRecipeId(inputRecipeId)
            }
            style={{ padding: 10 }}
          />
          <Mybutton title="Delete Recipe" customClick={deleteRecipe} />
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
 
export default DeleteRecipe;