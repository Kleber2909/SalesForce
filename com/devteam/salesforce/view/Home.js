import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, TouchableOpacity, TextInput, Alert, Image} from 'react-native';

export default class Home extends React.Component {
  
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Sales force',
  };
  
  render() {
    return (
      
      <ScrollView >
        <View style={styles.container}>   
            <TouchableOpacity style={styles.Touchable } onPress={ this.onPressList.bind(this, "VisitasDia")}  >
                <Text style={styles.text}>    Visitas do dia </Text>
            </TouchableOpacity>
            <View style={styles.separador}/>  
            <TouchableOpacity style={styles.Touchable } onPress={ this.onPressList.bind(this, "Clientes")}  >
                <Text style={styles.text}>    Lista de clientes </Text>
            </TouchableOpacity>
            <View style={styles.separador}/>  
            <TouchableOpacity style={styles.Touchable } onPress={ this.onPressList.bind(this, "ItensEstoque")}  >
                <Text style={styles.text}>    Consulta de estoque </Text>
            </TouchableOpacity>
            <View style={styles.separador}/>  
            <TouchableOpacity style={styles.Touchable } onPress={ this.onPressList.bind(this, "HistoricoPedido")}  >
                <Text style={styles.text}>    Histórico de pedidos </Text>
            </TouchableOpacity>
            <View style={styles.separador}/>  
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
    //paddingTop: 20,
    flexDirection: 'column',
   // alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 1, 
  },

  Touchable: {margin: 10,  height:50, justifyContent: 'center'},

  text: {fontSize: 20, height: 30, alignItems: 'center', justifyContent: 'space-around'},

  separador: {height: 1,  backgroundColor: 'powderblue'},

});
