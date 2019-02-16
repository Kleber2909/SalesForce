import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ListView, Alert, FlatList} from 'react-native';
import { db } from '../persistence/Firebase';

export default class ListClient extends React.Component {
  
    constructor(props) {
      super(props);      
      this.state = {
        vendedor: globalVendedor,
        dataSource: null
      }
    }

    componentDidMount() {
          this.getDataFirebase();  
    }

    getDataFirebase() {
        var dataSourceParam = []
        var self = this
    
        let dbRef = db.ref('/' + globalClienteId + '/Clientes/')
    
        dbRef.on('value', (snapshot) => {
    
            snapshot.forEach(userSnapshot => {
                let data = userSnapshot.val();
                if(data.Vendedor == this.state.vendedor)
                  dataSourceParam.push(data)
            });
    
            self.setState({
                dataSource: dataSourceParam
                        })
       }); 
     }

     onPressList = (rowData) =>{
      console.log("clik " + rowData.Codigo)
      propsClientes.navigation.navigate('ModulosCliente', {cliente: rowData, }); 
}

     _renderItem = ({item}) => {      
      return  (
                  <TouchableOpacity  style={{flexDirection:'row', padding: 10, alignItems:'center'}} onPress={ this.onPressList.bind(this, item)}>
                      <View>
                          <Text style={{marginLeft: 10, fontWeight: 'bold'}}>{item.Nome}</Text>
                          <Text style={{marginLeft: 10}}>{item.Endereco}</Text>
                      </View>
                  </TouchableOpacity>
              )
    }

    render() {
        console.log("Render");
          return (
              <View >
                <FlatList 
                            data={this.state.dataSource}
                            renderItem={this._renderItem}
                            ItemSeparatorComponent={()=><View style={{height:1, backgroundColor: '#f7f7f7'}} />}
                />  
              </View>
          );
    }

}