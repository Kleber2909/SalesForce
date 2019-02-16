import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, TextInput, Alert,} from 'react-native';

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
              <View style={styles.boxRow}>
                <Image style={{width: 30, height: 30}} source={require('../img/agenda.png')} />
                <Text style={styles.text}>    Visitas do dia </Text>
              </View>
            </TouchableOpacity>
            <View style={styles.separador}/>  
            
              <TouchableOpacity style={styles.Touchable } onPress={ this.onPressList.bind(this, "Clientes")}  >
                <View style={styles.boxRow}>
                  <Image style={{width: 30, height: 30}} source={require('../img/clientes.png')} />
                  <Text style={styles.text}>    Lista de clientes </Text>
                </View>
              </TouchableOpacity>
            <View style={styles.separador}/>  

            <TouchableOpacity style={styles.Touchable } onPress={ this.onPressList.bind(this, "ItensEstoque")}  >
              <View style={styles.boxRow}>
                <Image style={{width: 30, height: 30}} source={require('../img/estoque.png')} />
                <Text style={styles.text}>    Consulta de estoque </Text>
              </View>
            </TouchableOpacity>
            <View style={styles.separador}/>  

            <TouchableOpacity style={styles.Touchable } onPress={ this.onPressList.bind(this, "HistoricoPedido")}  >
              <View style={styles.boxRow}>
                <Image style={{width: 30, height: 30}} source={require('../img/historico.png')} />
                <Text style={styles.text}>    Histórico de pedidos </Text>
              </View>
            </TouchableOpacity>
            <View style={styles.separador}/>  

            <TouchableOpacity style={styles.Touchable } onPress={ this.onPressList.bind(this, "Configuracoes")}  >
              <View style={styles.boxRow}>
                <Image style={{width: 30, height: 30}} source={require('../img/configuracoes.png')} />
                <Text style={styles.text}>    Configurações </Text>
              </View>
            </TouchableOpacity>
            <View style={styles.separador}/>  
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
    justifyContent: 'flex-start',
    flex: 1, 
  },

  Touchable: {margin: 10,  height:50, justifyContent: 'center' },

  text: {fontSize: 20, height: 30, alignItems: 'center', justifyContent: 'space-around'},

  separador: {height: 1,  backgroundColor: 'powderblue'},

  boxRow: { flex: 1, margin: 15, flexDirection: 'row', },

});
