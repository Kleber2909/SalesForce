import React from 'react';
import { StyleSheet, View, FlatList, Button, Text } from 'react-native';
import ItemSelect from '../components/ItemSelect';
import { db } from '../persistence/Firebase';

export default class PedidoSelect extends React.Component {
    state = {
        items: [],
        total: 0,
    }

    static navigationOptions = ({ navigation }) => {
        return {
          title: "Selecionar items"
        }
      };

    componentDidMount() {
        this.getDataFirebase();
    }

    getDataFirebase() {
        try {
            let dbRef = db.ref('/salesforce001/Itens');
            dbRef.on('value', (snapshot) => {
                try {
                    const items = [];
                    snapshot.forEach((item) => {
                        items.push({
                            codigo: item.val().Codigo,
                            descricao: item.val().Descricao,
                            valor: item.val().Valor,
                            estoque: item.val().Estoque,
                            quantidade: 0,
                        });
                    });
                    this.setState({ items });
                }
                catch (error) {
                    console.log("error: ", error);
                    this.setState({ items: [] })
                }
            });
        }
        catch (error) {
            console.log("error: ", error);
        }
    }

    addItems = () => {
        const selectedItems = this.state.items.filter(item => item.quantidade > 0)
        let total = 0;
        
        this.state.items.forEach(i => {
            if(i.quantidade > 0) {
                total += i.valor * i.quantidade;
            }
        });        
        
        this.props.navigation.state.params.addSelectedItems(selectedItems, total);
        this.props.navigation.goBack();        
    }

    toggleItem = (props, newItem) => {
        const items = this.state.items.map(item => {
            if (item.codigo === props.codigo) {
                item = { ...item }

                if (newItem) {
                    item.quantidade = item.quantidade + 1;
                } else {
                    item.quantidade = item.quantidade - 1;
                }
            }

            if (item.quantidade < 0) {
                item.quantidade = 0;
            }

            return item;
        })

        let total = 0;
        items.forEach(i => {
            if(i.quantidade > 0) {
                total += i.valor * i.quantidade;
            }
        });  

        this.setState({ 
                items: items,
                total: total
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.items}
                    keyExtractor={item => `${item.codigo}`}
                    renderItem={({ item }) => <ItemSelect {...item} toggleItem={this.toggleItem} />}
                />
                <View>
                    <Text>Total(R$) {this.state.total}</Text>
                    <Button title="Adicionar" onPress={this.addItems} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
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