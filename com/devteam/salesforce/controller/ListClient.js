import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ListView, Alert, } from 'react-native';
import { db } from '../persistence/Firebase';

var clientArray = [];

export default class ListClient extends React.Component {
  
    constructor(props) {
      super(props);      
      var dataSource = new ListView.DataSource({rowHasChanged:(r1,r2) => r1.guid != r2.guid});
      this.state = {dataSource: dataSource.cloneWithRows(clientArray),}
    }

    componentDidMount() {
        //console.log("componentDidMount");
          this.getDataFirebase();  
      }

      getDataFirebase() {
        try{
          console.log("globalClienteId", globalClienteId, " globalVendedor", globalVendedor)
          let dbRef = db.ref('/' + globalClienteId + '/Clientes');
          //let dbRef = db.ref('/salesforce001/Clientes');
          //dbRef.orderByChild("Vendedor").equalTo(a).on('value', (snapshot) => {
           // dbRef.where('Vendedor', '=', 1).orderByChild("Nome").on('value', (snapshot) => {
          dbRef.on('value', (snapshot) => {
          try{
             //console.log("clientes: ", snapshot.val());
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
            <TouchableOpacity style={{height:75} } onPress={ this.onPressList.bind(this, rowData)}  >
                <Text style={styles.text} >   {rowData.Nome}</Text>
                <Text style={styles.textEndereco} >   {rowData.Endereco}</Text>
            </TouchableOpacity>
    );
    }

    onPressList = (rowData) =>{
        console.log("clik " + rowData.Codigo)
        propsClientes.navigation.navigate('ModulosCliente', {cliente: rowData, }); 
      }

      render() {
        console.log("Render");
          return (
              <View >
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
  
  textEndereco: {fontSize: 18, height: 30, alignItems: 'center', justifyContent: 'space-around',},
    
});