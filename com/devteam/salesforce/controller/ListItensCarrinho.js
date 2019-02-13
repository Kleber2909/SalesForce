import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Alert, Button, FlatList} from 'react-native';
import ListItens from '../controller/ListItens';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SalveConfig, GetConfig } from '../persistence/Storage';
import { db } from '../persistence/Firebase';

const weekday = new Array(6);
weekday[1] = "Segunda-Feira";
weekday[2] = "Terça-Feira";
weekday[3] = "Quarta-Feira";
weekday[4] = "Quinta-Feira";
weekday[5] = "Sexta-Feira";
weekday[6] = "Sábado";

let DayDay = new Date().getDay();

export default class VisitasDia extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        Day: new Date().getDay(),
        DayName: weekday[new Date().getDay()],
        vendedor: globalVendedor,
        dataSource: null
      }
  }
  
  static navigationOptions = {
    title: 'Visitas do Dia',
  };

  componentDidMount() {
    this.getDataFirebase();
  }

  getDataFirebase(){
    var dataSourceParam = []

    let dbRef = db.ref('/' + globalClienteId + '/Itens/')

    dbRef.on('value', (snapshot) => {

        snapshot.forEach(userSnapshot => {
              dataSourceParam.push({
                Codigo: userSnapshot.val().Codigo,
                Descricao: userSnapshot.val().Descricao,
                Valor: userSnapshot.val().Valor,
                Estoque: userSnapshot.val().Estoque,
                Quantidade: 0,
                _key: userSnapshot.key
              });
        });

        this.setState({dataSource: dataSourceParam})
   }); 
  }

  _renderItem = ({item}) => {     
   //console.log("Item", item) 
    return (
      <View style={styles.container}>
        <View style={styles.item_desc}>
          <Text style={styles.text}>
            {item.Descricao}
          </Text>
          <View style={styles.item_desc2}>
            <Text>
              Estoque(un): {item.Estoque}
            </Text>
            <Text>
              Preço(R$): {item.Valor.toFixed(2)}
            </Text>
          </View>            
        </View>
        <View style={styles.item_func}>
          <Button style={styles.item} color="#2ecc71" title="+" onPress={this.onAdd.bind(this, item, 1)}></Button>
          <TextInput style={styles.item} value={item.Quantidade.toString()} />
          <Button style={styles.item} color="#e74c3c" title="-" onPress={this.onAdd.bind(this, item, -1)}></Button>
        </View>
      </View>
    );
  }

  onAdd = (rowData, Add) => {
    let items = this.state.dataSource;
    let index = items.findIndex(x => x._key === rowData._key);
    
    console.log("Index", index);
    
    if(index !== -1){
      items[index].Quantidade = parseInt(rowData.Quantidade) + Add;
    }
    console.log("items[index].Quantidade", items[index].Quantidade);

    this.setState((state, props) => {
      return {counter: state.counter + props.step};
    });
    
           
  }

  render() {
    return (
      <ScrollView style = {{backgroundColor: '#9cf6f9',}} scrollsToTop={false}>
        <View style={styles.container}>
            <FlatList 
                        data={this.state.dataSource}
                        renderItem={this._renderItem}
                        ItemSeparatorComponent={()=><View style={{height:2, backgroundColor: '#f7f7f7'}} />}
            />       
        </View>      
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
  }, 
  container: {
      flex: 1,
      flexDirection: 'row',
      borderBottomWidth: 0.5,
      borderColor: '#c9c9c9',
      padding: 10,
  },
  item_desc: {
      flex: 3,
      justifyContent: 'flex-start',
      flexDirection: 'column'
  },
  item_desc2: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingRight: 10,
  },
  item_func: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center'
  },
  item: {
      flex: 1,      
      textAlign: 'center',
      textAlignVertical: "center",
  },
  item_add: {
    color: '#2ecc71'
  },
  item_rem: {
    color: '#e74c3c'
  } 
});
