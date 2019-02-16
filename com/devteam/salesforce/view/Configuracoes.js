import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
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
    title: 'Configurações',
  };
  
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>   
            <View style={{marginTop: 10}}> 
                <Text style={{marginLeft: 10, fontWeight: 'bold'}}>Servidor</Text>
                <TextInput style = {styles.input}
                           underlineColorAndroid = "transparent"
                           placeholder = "Servidor"
                           autoCapitalize = "none"
                           value={this.state.servidor}
                           onChangeText={(text) => this.setState({servidor:text})}/>                  
            </View> 
            <View style={{marginTop: 10}}> 
                <Text style={{marginLeft: 10, fontWeight: 'bold'}}>Código do Vendedor</Text>
                <TextInput style = {styles.input}
                           underlineColorAndroid = "transparent"
                           placeholder = "Código do Vendedor"
                           keyboardType = 'numeric'
                           autoCapitalize = "none"
                           value={this.state.vendedor}
                           onChangeText={(text) => this.setState({vendedor:text})}/>                 
            </View> 
            <View  style={styles.boxRow}/> 
            <View > 
                <TouchableOpacity onPress={ this.onPress.bind(this, )} >
                  <View style={{borderRadius:10, padding:10, marginLeft:10, marginRight:10,backgroundColor:"skyblue", height:40, alignItems:'center', justifyContent: 'center'}}>
                    <Text style={{fontWeight: 'bold', color:'white'}}>Salvar</Text>
                  </View>          
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
    flex: 1, 
  },

  text: {fontSize: 20, },
  
  input: {
    margin: 10,
    height: 30,
    borderColor: '#759cd8',
    borderWidth: 1,
    paddingLeft: 10
  },

  botao:{fontSize: 20, textAlign: 'center', backgroundColor: 'skyblue'  },

  boxRow: { flexDirection: 'row',  height: 20, },

});
