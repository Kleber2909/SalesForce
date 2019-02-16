import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ListView, Alert, } from 'react-native';
import { db } from '../persistence/Firebase';

var itemArray = [];

export default class ListItens extends React.Component {
  
    constructor(props) {
      super(props);      
      var dataSource = new ListView.DataSource({rowHasChanged:(r1,r2) => r1.guid != r2.guid});
      this.state = {dataSource: dataSource.cloneWithRows(itemArray),}
    }

    componentDidMount() {
        //console.log("componentDidMount");
          this.getDataFirebase();  
      }

      getDataFirebase() {
        try{
         let dbRef = db.ref('/' + globalClienteId + '/Itens');
         dbRef.on('value', (snapshot) => {
           try{
             //console.log("Itens: ", snapshot.val());
             this.setState({dataSource:this.state.dataSource.cloneWithRows(snapshot.val()),})
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
        //console.log("Nome ", rowData.Nome);
        return (
            <TouchableOpacity style={{height:75, }  } onPress={ this.onPressList.bind(this, rowData)}  >
                <Text style={styles.text} >   {rowData.Descricao}</Text>
                <Text style={styles.textDetalhes} >   Estoque: {rowData.Estoque}    Preço R$ {rowData.Valor}</Text>
            </TouchableOpacity>
    );
    }

    onPressList = (rowData) =>{
        console.log("clik " + rowData.Codigo)
        //propspropsItens.navigation.navigate('ModulosCliente', {id: rowData.Codigo}); 
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