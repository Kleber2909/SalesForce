import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, TouchableOpacity, TextInput, Alert, Image} from 'react-native';
import { SalveConfig, GetConfig } from '../persistence/Storage';

export default class Configuracoes extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
        servidor: globalClienteId,
        vendedor: globalVendedor,
      }
  }

  static navigationOptions = {
    title: 'CONFIGURAÇÕES',
  };
  
  render() {
    return (
      
      <ScrollView style = {{backgroundColor: '#9cf6f9',}} >
        <View style={styles.container}>   
            <View > 
                <Text style={styles.text}>Servidor </Text>
                <TextInput style={styles.textInput} 
                            value={this.state.servidor}
                            returnKeyLabel = {"next"}
                            onChangeText={(text) => this.setState({servidor:text})}>
                </TextInput>
            </View> 
            <View > 
                <Text style={styles.text}>Código do vendedor </Text>
                <TextInput style={styles.textInput}
                            value={this.state.vendedor}
                            keyboardType = "numeric"
                            onChangeText={(text) => this.setState({vendedor:text})}>
                </TextInput>
            </View> 
            <View  style={styles.boxRow}/> 
            <View > 
                <TouchableOpacity onPress={ this.onPress.bind(this, )}  >
                    <Text style={styles.botao} >SALVAR</Text>
                </TouchableOpacity>
            </View> 
        </View>      
      </ScrollView>  
    );
  }

  onPress = () =>{   
    config = {
        Servidor: this.state.servidor,
        Vendedor: this.state.vendedor,
      };
    SalveConfig(JSON.stringify(config));
    GetConfig ();

    alert('Configurações salvas com sucesso !')
    this.props.navigation.goBack();
  }

}



const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flexDirection: 'column',
    backgroundColor: '#9cf6f9',
    flex: 1, 
    margin: 10,
  },

  text: {fontSize: 20, },
  
  textInput:{fontSize: 20, borderWidth: 1  },

  botao:{fontSize: 20, marginHorizontal: 50, textAlign: 'center', backgroundColor: 'skyblue'  },

  boxRow: { flexDirection: 'row',  height: 40, },

});
