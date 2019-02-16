import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, FlatList } from 'react-native';
import { db } from '../persistence/Firebase';
import PedidoItem from '../components/PedidoItem';

const initialState = { selectedItems: [], items: [], total: 0}

export default class AddTask extends Component {
    state = { ...initialState }

    componentDidMount() {
        this.getDataFirebase();
    }

    getDataFirebase() {
        try{
         let dbRef = db.ref('/' + globalClienteId + '/Itens');
         dbRef.on('value', (snapshot) => {
           try {
               let dbItems = [];
            snapshot.forEach((item) => {
              if(a <= 8){
                a++;
                dbItems.push({
                  Codigo: item.val().Codigo,
                  Descricao: item.val().Descricao,
                  Valor: item.val().Valor,
                  Estoque: item.val().Estoque,
                  Quantidade: 0,
                  _key: item.key
                });
              }
            });
             this.setState({items: dbItems, });
           }
           catch(error){
             console.log("error: ", error);
             this.setState({items: [],})
           }
         });
       }
       catch(error){
         console.log("error: ", error);
       }
    }

    changeValue = (id, qtd) => {
        const items = this.state.items.map(item => {
            if(item.id === id) {
                item = {...task}
                item.quantidade = item.quantidade + qtd;
            }

            return item;
        })

        this.setState({ items })
    }

    save = () => {        
        const data = { ...this.state }
        this.props.onSave(data)
        this.setState({ ...initialState })
    }

    render() {
        return(
            <View style={styles.view}>
                <FlatList
                    data={this.state.items}
                    keyExtractor={item => `${item.codigo}`}
                    renderItem={({item}) => <PedidoItem {...item} changeValue={this.changeValue} /> }
                />
                <View>
                <Text>Total(R$) {this.state.total}</Text>              
                </View> 
                <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <Button onPress={this.props.onCancel}>
                        <Text style={styles.button}>Cancelar</Text>
                    </Button>
                    <Button onPress={this.save}>
                        <Text style={styles.button}>Salvar</Text>
                    </Button>
                </View>           
            </View>
        )
    }
}

const styles = StyleSheet.create({    
    container: {
        backgroundColor: 'white',
        justifyContent: 'space-between',
    },
    input: {
        width: '90%',
        height: 40,
        marginTop: 10,
        marginLeft: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#e3e3e3',
        borderRadius: 6,
    }, 
    button: {
        margin: 20,
        marginRight: 30,
        color: commonStyles.colors.default
    },
});