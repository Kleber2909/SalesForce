import React from 'react';
import { StyleSheet, Text, View, ListView, Button, TextInput} from 'react-native';
import { db } from '../persistence/Firebase';

var items = [];
export default class ListItensCarrinho extends React.Component {
  
    constructor(props) {
      super(props);
      const { navigation } = this.props;
      var ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1 != r2});
      this.state = {
        itemsArray: [],
        dataSource: ds.cloneWithRows([]),         
        selectedItens: [],
        total: 0
      }
    }

    static navigationOptions = {
      title: 'Escolher itens',
    };

    componentDidMount() {
      this.getDataFirebase();
    }

    getDataFirebase() {
        try{
         let dbRef = db.ref('/salesforce001/Itens');
         dbRef.on('value', (snapshot) => {
           try{
            a = 0;
            
            snapshot.forEach((item) => {
              if(a <= 8){
                a++;
                items.push({
                  Codigo: item.val().Codigo,
                  Descricao: item.val().Descricao,
                  Valor: item.val().Valor,
                  Estoque: item.val().Estoque,
                  Quantidade: 0,
                  _key: item.key
                });
              }
            });
             this.setState({dataSource: this.state.dataSource.cloneWithRows(items), });
           }
           catch(error){
             console.log("error: ", error);
             this.setState({dataSource:this.state.dataSource.cloneWithRows(""),})
           }
         });
       }
       catch(error){
         console.log("error: ", error);
       }
  }

    renderRow(rowData) {      
      return (
        <View style={styles.container}>
          <View style={styles.item_desc}>
            <Text style={styles.text}>
              {rowData.Descricao}
            </Text>
            <View style={styles.item_desc2}>
              <Text>
                Estoque(un): {rowData.Estoque}
              </Text>
              <Text>
                Preço(R$): {rowData.Valor.toFixed(2)}
              </Text>
            </View>            
          </View>
          <View style={styles.item_func}>
            <Button style={styles.item} color="#2ecc71" title="+" onPress={this.onAddItem.bind(this, rowData, 1)}></Button>
            <TextInput style={styles.item} value={rowData.Quantidade.toString()} />
            <Button style={styles.item} color="#e74c3c" title="-" onPress={this.onAddItem.bind(this, rowData, -1)}></Button>
          </View>
        </View>
      );
    }

    onAddItem = (rowData, Add) => {
      let index = items.findIndex(x => x._key === rowData._key);
      
      console.log("Index", index);
     
      if(index !== -1){
        if(items[index].Quantidade >= 0) {
          items[index].Quantidade = parseInt(rowData.Quantidade) + Add;          
        }
      }

      this.setState((state, props) => {
        return {counter: state.counter + props.step};
      });
    }

    onAddOrder = () => {
      let itemsOrder = items.filter(item => item.Quantidade >= 1);

      this.props.navigation.navigate('Pedido', {
        itemsOrder: itemsOrder.slice(),
      });
    }

      render() {        
        return (
          <View style={styles.view}>
            <ListView 
              dataSource={this.state.dataSource} 
              renderRow={this.renderRow.bind(this)}
              enableEmptySections={true}              
            />
            <View>
              <Text>Total(R$) {this.state.total}</Text>
              <Button title="Adicionar" onPress={this.onAddOrder.bind(this)}/>
            </View>            
          </View>
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