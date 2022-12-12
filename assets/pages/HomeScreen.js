import React, { useEffect } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import Mybutton from '././components/Mybutton';
import Mytext from '././components/Mytext';
//import { openDatabase } from 'react-native-sqlite-storage';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('RecipeDatabase.db');

//var db = openDatabase({ name: 'RecipeDatabase.db' });
 
const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('DROP TABLE IF EXISTS table_recipe', []);
      tx.executeSql('CREATE TABLE IF NOT EXISTS table_recipe(recipe_id INTEGER PRIMARY KEY AUTOINCREMENT, recipe_name VARCHAR(255), recipe_ingredient1 VARCHAR(50), recipe_quantity1 VARCHAR(10), recipe_ingredient2 VARCHAR(50), recipe_quantity2 VARCHAR(10), recipe_ingredient3 VARCHAR(50), recipe_quantity3 VARCHAR(10), recipe_instructions VARCHAR(255))',
      []);
    });  
  }, []);

/*   useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_recipe'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_recipe', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_recipe(recipe_id INTEGER PRIMARY KEY AUTOINCREMENT, recipe_name VARCHAR(255), recipe_ingredient1 VARCHAR(50), recipe_quantity1 VARCHAR(10), recipe_ingredient2 VARCHAR(50), recipe_quantity2 VARCHAR(10), recipe_ingredient3 VARCHAR(50), recipe_quantity3 VARCHAR(10), recipe_instructions VARCHAR(255))',
              []);
          }
        }
      );
    });
  }, []);
 */ 
  return (
    <GestureHandlerRootView>
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: '#a9927d' }}>
        <View style={{ flex: 1 }}>
          <Mytext text="My Cookbook" />
          <Mybutton
            title="Enter Recipe"
            customClick={() => navigation.navigate('FormEntry')}
          />
          <Mybutton
            title="Update"
            customClick={() => navigation.navigate('Update')}
          />
          <Mybutton
            title="View"
            customClick={() => navigation.navigate('View')}
          />
          <Mybutton
            title="View All"
            customClick={() => navigation.navigate('ViewAll')}
          />
          <Mybutton
            title="Delete"
            customClick={() => navigation.navigate('Delete')}
          />
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
    </GestureHandlerRootView>
  );
};
 
export default HomeScreen;