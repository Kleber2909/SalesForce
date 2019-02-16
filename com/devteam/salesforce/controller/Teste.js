import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ListView, TextInput, Button, Alert, } from 'react-native';
import { db } from '../persistence/Firebase';

var itemArray = [];

export default class Teste extends React.Component {
  
    constructor(props) {
      super(props);      
      var dataSource = new ListView.DataSource({rowHasChanged:(r1,r2) => r1.guid != r2.guid});
      this.state = {dataSource: dataSource.cloneWithRows(itemArray),}
      
    }

   
    componentDidMount() {
        console.log("componentDidMount");
          this.getDataFirebase();  
      }

      getDataFirebase() {
        try{
         let dbRef = db.ref('/' + globalClienteId + '/Itens');
         dbRef.on('value', (snapshot) => {
           try{
             //console.log("Itens: ", snapshot.val());
             a = 0;
             snapshot.forEach((item) =>{
                if(a <= 2){
                    a++;
                    itemArray.push({
                        Codigo: item.val().Codigo,
                        Descricao: item.val().Descricao,
                        Valor: item.val().Valor,
                        Estoque: item.val().Estoque,
                        Quantidade: item.val().Quantidade,
                        QTD: "0",
                        _Key: item.key,
                    });
                }
             });
             this.setState({dataSource:this.state.dataSource.cloneWithRows(itemArray),})
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
        //console.log("renderRow ", rowData);
        console.log("renderRow ", );
        return (
            <View style={{height:130} }   >
                <Text style={styles.text} >   {rowData.Descricao}</Text>
                <Text style={styles.textDetalhes} >   Estoque: {rowData.Estoque}    Preço R$ {rowData.Valor}</Text>
                <Button title = "+" onPress={ this.onPress.bind(this, rowData)}/>
                <TextInput style={styles.text} value={rowData.QTD.toString()}/>
            </View>
    );
    }

    onPress = (rowData) =>{   
        let index =  itemArray.findIndex(x => x._Key === rowData._Key)
        if(index !== -1){
            itemArray[index].QTD = parseInt(rowData.QTD) + 1;
        }

        this.setState((state, props) => {
            return {counter: state.counter + props.step};
          });
      }

      render() {
        console.log("Render");
          return (
              <View  >
                <ListView 
                      dataSource={this.state.dataSource} 
                      renderRow={this.renderRow.bind(this)} enableEmptySections={true}
                />
              </View>
          );
        }

}

const styles = StyleSheet.create({

  text: {fontSize: 20, height: 30, alignItems: 'center', justifyContent: 'space-around'},
  
  textDetalhes: {fontSize: 18, height: 30, alignItems: 'center', justifyContent: 'space-around',},
  
});