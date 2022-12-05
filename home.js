import {React, useState, useEffect} from 'react';
import {   Platform,  SafeAreaView,  ScrollView,  StyleSheet,  Text,  TextInput,  TouchableOpacity,  View, } from 'react-native';
import * as SQLite from "expo-sqlite";

function openDatabase() {
    if (Platform.OS === "web") {
      return {
        transaction: () => {
          return {
            executeSql: () => {},
          };
        },
      };
    }
  
    const db = SQLite.openDatabase("recipe.db");
    return db;
  }

  const db = openDatabase();

  function recipeList() {
    const [items, setItems] = useState(null);

    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
                `select id, name, ingredient, quantity, instructions from name;`,
                [],
                (_, { rows: { _array } }) => setItems(_array)
            );
        });
    });

    if (items === null || items.length === 0) {
        return null;
    }

    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.historyHeading}>Cookin</Text>
            {items.map(({id, name, ingredient, quantity, instructions}) => (
                <Text key={id} style={styles.ingredients}>{name}: {ingredient} {quantity} {instructions}</Text>
            ))}
        </View>
    );
}  

  export default function List() {
    const [recipeName, setRecipeName] = useState(null);
    const [ingredient, setIngredient] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [instructions, setInstructions] = useState(null);

    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
                "create table if not exists recipe (id integer primary key not null, name string, ingredient string, quantity real, instructions string);"
            );
        });
    }, []); 
  }

  const add = () => {
    if (recipeName === null || recipeName === "" || ingredient === null || ingredient === "" || quantity === null || quantity === "" || 
    instructions === null || instructions === '') {
        return false;
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.toolbar}>Enter your recipe</Text>
            {Platform.OS === "web" ? (
                <View 
                style={{ flex:1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={styles.heading}>Expo SQLite is not supported on the web!</Text>
                </View>
            ) : (
                <ScrollView style={styles.scrollContainer}>
                    <TextInput 
                        style={styles.input}
                        onChangeText={(recipeName) => setRecipeName(recipeName)}
                        value={recipeName}
                        placeholder="Recipe Name"
                    />
                    <TextInput 
                        style={styles.input}
                        onChangeText={(ingredient) => setIngredient(ingredient)}
                        value={ingredient}
                        placeholder="Ingredient"
                    />
                    <TextInput 
                        style={styles.input}
                        onChangeText={(quantity) => setQuantity(quantity)}
                        value={quantity}
                        placeholder="Qty"
                    />
                    <TextInput 
                        style={styles.input}
                        onChangeText={(instructions) => setInstructions(instructions)}
                        value={instructions}
                        placeholder="Instructions"
                    />
                    <TouchableOpacity onPress={() => add()} style={styles.button}>
                        <Text style={styles.save}>Save</Text>
                    </TouchableOpacity>
                </ScrollView>
            )
        }
        </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    container: {
        backgroundColor: '#a9927d',
    },
    scrollContainer: {
        backgroundColor: '#a9927d',
        alignItems: 'center',
    },
    sectionContainer: {
        backgroundColor: '#a9927d',
    },
    historyHeading: {
        backgroundColor: '#5e503f',
    },
    ingredients: {
        color: '#f2f4f3',
    },
    toolbar: {
        backgroundColor: '#0a0908',
    },
    heading: {
        backgroundColor: '#0a0908',
    },
    input: {
        color: '#5e503f',
    },
    button: {
        backgroundColor: '#49111c',
    },
    save: {
        color: '#f2f4f3',
        alignItems: 'center',
    },
  })