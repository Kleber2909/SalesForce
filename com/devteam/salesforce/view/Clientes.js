import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
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
      
      <ScrollView scrollsToTop={false}>
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
    alignItems: 'flex-start',
    flex: 1, 
  },
});
