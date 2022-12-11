import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
 
const Mybutton = (props) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={props.customClick}>
      <Text style={styles.text}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};
 
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#49111c',
    color: '#49111c',
    padding: 10,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
  },
  text: {
    color: '#f2f4f3',
  },
});
 
export default Mybutton;