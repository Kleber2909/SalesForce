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
        return (
            <TouchableOpacity  style={{flexDirection:'row', padding: 10, alignItems:'center'}} onPress={ this.onPressList.bind(this, rowData)}>
              <View>
                <Text style={{marginLeft: 10, fontWeight: 'bold'}}>{rowData.Descricao}</Text>
                <Text style={{marginLeft: 10}}>Estoque: {rowData.Estoque}    Preço R$ {rowData.Valor}</Text>
              </View>
            </TouchableOpacity>            
    );
    }

    onPressList = (rowData) =>{
        console.log("clik " + rowData.Codigo)
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