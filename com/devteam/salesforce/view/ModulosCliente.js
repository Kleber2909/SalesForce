import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ListView, ScrollView, Alert, } from 'react-native';

var cliente = "";

export default class ModulosCliente extends React.Component {
  
    constructor(props) {
      super(props);
      const { navigation } = this.props;
      cliente = navigation.getParam('cliente', '');
      console.log("Cliente ", cliente.Nome);
    }
    
    static navigationOptions = ({ navigation }) => {
      return {
        title: (navigation.getParam('cliente', 'SALES FORCE')).Nome
      }
    };

    render() {
      return (
        <ScrollView style = {{backgroundColor: '#9cf6f9',}} >
          <View style={styles.container}>   
            <TouchableOpacity style={styles.Touchable } onPress={ this.onPress.bind(this, "Pedido")}  >
                  <Text style={styles.text}>    Criar pedido </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.Touchable } onPress={ this.onPress.bind(this, "Clientes")}  >
                  <Text style={styles.text}>    Histórico de pedidos </Text>
              </TouchableOpacity>
          </View>  
        </ScrollView>    
      );
    }

    onPress = (rota) =>{
      console.log("rota " + rota)
      this.props.navigation.navigate(rota, {cliente: cliente, }); 
    }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flexDirection: 'column',
    backgroundColor: '#9cf6f9',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 1, 
  },

  Touchable: { height:75, },

  text: {fontSize: 20, height: 30, alignItems: 'center', justifyContent: 'space-around'},
  
  });