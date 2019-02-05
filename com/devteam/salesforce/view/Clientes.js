import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, TouchableOpacity, TextInput, Alert, Image} from 'react-native';
import ListClient from '../controller/ListClient';

export default class Clientes extends React.Component {
  
  propsClientes = "";

  constructor(props) {
    super(props);
    propsClientes = props;
  }

  static navigationOptions = {
    title: 'Clientes',
  };
  
  render() {
    return (
      
      <ScrollView style = {{backgroundColor: '#9cf6f9',}} scrollsToTop={false}>
        <View style={styles.container}>   
          <ListClient/>          
        </View>      
      </ScrollView>  
    );
  }
}



const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flexDirection: 'column',
    backgroundColor: '#9cf6f9',
    alignItems: 'flex-start',
    flex: 1, 
  },
});
