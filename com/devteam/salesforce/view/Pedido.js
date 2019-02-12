import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ListView, ScrollView, Picker, } from 'react-native';

var cliente = "";

export default class Pedido extends React.Component {
  
    constructor(props) {
      super(props);
      const { navigation } = this.props;
      cliente = navigation.getParam('cliente', '');
      console.log("Cliente ", cliente.Nome);
      this.state = {
        codCliente: cliente.Codigo,
        nomeCliente: cliente.Nome,
      }
    }
    
    static navigationOptions = ({ navigation }) => {
      return {
        title: "PEDIDO"
      }
    };

    render() {
      return (
          <View style={styles.container}>   
            <Text style={styles.text}>    Cliente </Text>
            <Text style={styles.text}>    {this.state.nomeCliente}</Text>
            <Text style={styles.text}>    Data de entrega </Text>
            <Text style={styles.text}>    07/02/2019 </Text>
            <Text style={styles.text}>    Forma de pagamento </Text>
            <Picker
                selectedValue={this.state.language}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) =>
                    this.setState({language: itemValue})
                }>
                <Picker.Item label="À VISTA" value="0" />
                <Picker.Item label="BOLETO" value="1" />
                <Picker.Item label="CARTÃO" value="2" />
            </Picker>
            <TouchableOpacity style={styles.Touchable } onPress={ this.onPress.bind(this, "Items", {codCliente: this.state.codCliente})}  >
                 <Text style={styles.text}>    Add Item </Text>
            </TouchableOpacity>
            <ScrollView style = {{backgroundColor: '#9cf6f9',}} >

            </ScrollView>  
          </View>  
      );
    }

    onPress = (rota) =>{
      console.log("rota " + rota)
      this.props.navigation.navigate(rota); 
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
  
  picker: {margin: 12, height: 30, width: 300},

  });