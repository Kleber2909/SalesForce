import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList, TextInput} from 'react-native';
import { SalveConfig, GetConfig } from '../persistence/Storage';
import { db } from '../persistence/Firebase';
import Icon from 'react-native-vector-icons/FontAwesome';

let Filtro = 0

export default class HistoricoPedido extends React.Component {

  constructor(props) {
    super(props);

    const { navigation } = this.props;
    cliente = navigation.getParam('cliente', '');

    this.state = {
        vendedor: globalVendedor,
        dataSource: null,
        search: 0,
        cliente: cliente.Codigo,
        aberto: 'bold',
        vencido: 'normal'
      }    
  }

  static navigationOptions = {
    title: 'Histórico Pedidos',
  };
  
  componentDidMount() {
    this.loadPedidos();




  }

  loadPedidos(){
    var dataSourceParam = []
    var self = this

    let dbRef = db.ref('/' + globalClienteId + '/Pedidos/')

    dbRef.on('value', (snapshot) => {

        snapshot.forEach(userSnapshot => {
            let data = userSnapshot.val();
            let currentDate = new Date()
            let dataDate = Date.parse(data.Vencimento.toString().substr(6, 4) + '-' + data.Vencimento.toString().substr(3, 2) + '-' + data.Vencimento.toString().substr(0, 2))

            if(data.Vendedor == this.state.vendedor)
            {
              if(data.Codigo == this.state.cliente || this.state.cliente === undefined){
              if(data.Pedido == this.state.search || this.state.search == 0)
              {
                if(Filtro == 0 && dataDate >= currentDate){
                    dataSourceParam.push(data)
                }
                else if (Filtro == 1 && dataDate < currentDate)
                    dataSourceParam.push(data)
              }
            }
          }
        });

        self.setState({
            dataSource: dataSourceParam
                    })
   }); 
  }

  filtarPedidos()
  {
    this.loadPedidos()
  }

  onClick = (valor) =>{
    Filtro = valor;

    if(Filtro == 0){
      this.setState({
        aberto: 'bold',
        vencido: 'normal'
                })
    }else{
      this.setState({
        aberto: 'normal',
        vencido: 'bold'
                })
    }

    this.setState({
      search: 0
              })

    this.loadPedidos();
  }

  _renderItem = ({item}) => {      
    return  (
            <View>
                <View style={{flexDirection:'row', padding: 10}}>
                    <Text style={{marginLeft: 10, fontWeight: 'bold'}}>Pedido: {item.Pedido}</Text>
                    <Text style={{marginLeft: 20}}>{item.Vencimento}</Text>
                </View>
                <Text style={{marginLeft: 20, fontWeight: 'bold'}}>{item.Nome}</Text>
            </View>
            )
  }

  render() {
    return ( 
      <ScrollView scrollsToTop={false}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-around', paddingTop: 20, paddingBottom: 20, backgroundColor:"skyblue"}}>
                <TouchableOpacity onPress={ this.onClick.bind(this, 0)} >
                    <View>
                        <Text style={{fontWeight: this.state.aberto}}>Abertos</Text>
                    </View>
                </TouchableOpacity >  
                <TouchableOpacity onPress={ this.onClick.bind(this, 1)}>
                    <View>
                        <Text style={{fontWeight: this.state.vencido}}>Vencidos</Text>
                    </View>
                </TouchableOpacity >  
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <TextInput style = {styles.input}
                  underlineColorAndroid = "transparent"
                  placeholder = "Identificar do Pedido"
                  keyboardType = 'numeric'
                  autoCapitalize = "none"
                  value={this.state.search}
                  onChangeText={(text) => this.setState({search: text})}/> 
              <TouchableOpacity 
                  style = {{flex: 1, height: 40, backgroundColor: 'skyblue', margin: 15, borderRadius:10, alignItems:'center', justifyContent: 'center'}}
                  onPress={ this.filtarPedidos.bind(this)}>
                      <Icon name="search" color="white" />
              </TouchableOpacity>
            </View> 
            <FlatList 
                data={this.state.dataSource}
                renderItem={this._renderItem}
                ItemSeparatorComponent={()=><View style={{height:2, backgroundColor: '#f7f7f7'}} />}
            />     
      </ScrollView>  
    );
  }
}

const styles = StyleSheet.create({
    container: {
      paddingTop: 20,
      flexDirection: 'column',
      flex: 1, 
    },
    input: {
      margin: 15,
      height: 40,
      flex: 4,
      borderColor: 'skyblue',
      borderWidth: 1,
      paddingLeft: 10
   }    
  });
