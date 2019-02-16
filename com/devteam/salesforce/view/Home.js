import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, TouchableOpacity, TextInput, Alert, Image} from 'react-native';

export default class Home extends React.Component {
  
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'SALES FORCE',
  };
  
  render() {
    return (
      
      <ScrollView style = {{backgroundColor: '#9cf6f9',}} >
        <View style={styles.container}>   
            <TouchableOpacity style={styles.Touchable } onPress={ this.onPressList.bind(this, "VisitasDia")}  >
                <Text style={styles.text}>    Visitas do dia </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Touchable } onPress={ this.onPressList.bind(this, "Clientes")}  >
                <Text style={styles.text}>    Lista de clientes </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Touchable } onPress={ this.onPressList.bind(this, "ItensEstoque")}  >
                <Text style={styles.text}>    Consulta de estoque </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Touchable } onPress={ this.onPressList.bind(this, "HistoricoPedido")}  >
                <Text style={styles.text}>    Histórico de pedidos </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Touchable } onPress={ this.onPressList.bind(this, "Configuracoes")}  >
                <Text style={styles.text}>    Configurações </Text>
            </TouchableOpacity>
        </View>      
      </ScrollView>  
    );
  }

  onPressList = (rota) =>{
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

});
