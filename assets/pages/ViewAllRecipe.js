import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
//import * as SQLite from 'expo-sqlite';

var db = openDatabase({ name: 'RecipeDatabase.db' });
 
const ViewAllUser = () => {
  let [flatListItems, setFlatListItems] = useState([]);
 
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_recipe',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItems(temp);
        }
      );
    });
  }, []);
 
  let listViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.2,
          width: '100%',
          backgroundColor: '#5e503f'
        }}
      />
    );
  };
 
  let listItemView = (item) => {
    return (
      <View
        key={item.recipe_id}
        style={{ backgroundColor: 'white', padding: 20 }}>
        <Text>Id: {item.recipe_id}</Text>
        <Text>Name: {item.recipe_name}</Text>
        <Text>Ingredient1: {item.recipe_ingredient1}</Text>
        <Text>Quantity1: {item.recipe_quantity1}</Text>
        <Text>Ingredient2: {item.recipe_ingredient2}</Text>
        <Text>Quantity2: {item.recipe_quantity2}</Text>
        <Text>Ingredient3: {item.recipe_ingredient3}</Text>
        <Text>Quantity3: {item.recipe_quantity3}</Text>
        <Text>Instructions: {item.recipe_instructions}</Text>
      </View>
    );
  };
 
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: '#f2f4f3' }}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={flatListItems}
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
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
  );
};
 
export default ViewAllUser;