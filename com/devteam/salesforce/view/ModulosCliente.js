import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ListView, ScrollView, Alert, } from 'react-native';


export default class ModulosCliente extends React.Component {
  
    constructor(props) {
      super(props);
      const { navigation } = this.props;
      const id = navigation.getParam('id', '0');
    }
    
    static navigationOptions = {
        title: 'Sales Force',
      };

    render() {
      return (
        
        <View style={styles.container}>   
          <View style={styles.box} >
            <TextInput placeholder = "Sales Force" keyboardType = "email-address" returnKeyType = "next" style={styles.textInput} onChangeText={(email) => this.setState({email})}/>
          </View>
        </View>      
      );
    }
}

const styles = StyleSheet.create({
    container: {
      paddingTop: 60,
      flexDirection: 'column',
      backgroundColor: '#9cf6f9',
      alignItems: 'center',
      
      flex: 1, 
    },
  
    separadorImagem: {borderWidth: 25, borderColor: 'steelblue'},
  
    separador: {borderWidth: 10, borderColor: 'steelblue'},
  
    textInput:{fontSize: 20, alignItems: 'stretch', height: 30, width: 280, backgroundColor: '#ffffff' },
  
    textInputSenha:{fontSize: 20, alignItems: 'stretch', height: 30, width: 280, backgroundColor: '#ffffff'  },
  
    text: {fontSize: 20, height: 30, alignItems: 'center', justifyContent: 'space-around'},
    
    logoStyle: {width: 280, height: 200},
  
    boxRow: { flexDirection: 'column',  },
    
    botao: { justifyContent: 'space-around',   height: 40, alignItems: 'center',  backgroundColor: '#007fff', borderColor: '#007fff'},
  
    
  
  });