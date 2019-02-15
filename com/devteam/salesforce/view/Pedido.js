import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, FlatList, Picker, Platform, DatePickerAndroid, DatePickerIOS } from 'react-native';
import ItemComponent from '../components/ItemComponent';
import moment from 'moment';


export default class Pedido extends React.Component {

  constructor(props) {
    super(props);
    const { navigation } = this.props;
    //const cliente = navigation.getParam('cliente', '');
    const cliente = { nome: 'Leandro Jackson', codigo: '00001454' }
    this.state = {
      cliente: cliente,
      data: new Date(),
      itemsOrder: [],
      selectedItems: [],
      total: 0,
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Novo pedido"
    }
  };

  componentDidMount() {
    //this.setState({itemsOrder: this.props.navigation.getParam('itemsOrder', []) })
    //console.log("items:" + this.state.itemsOrder)
  }

  addSelectedItems = (selectedItems, total) => {
    const items = [...selectedItems].map(i => {
      const item = {
        codigo: i.codigo,
        descricao: i.descricao,
        valor: i.valor,
        estoque: i.estoque,
        quantidade: i.quantidade,
      }

      return item;
    });

    this.setState({ selectedItems: items, total: total.toFixed(2) }, () => {
      console.log('items adicionados');
    });
  }

  removeItem = item => {
    const index = this.state.selectedItems.findIndex(i => i.codigo === item.codigo);
    const items = index > -1 ? [...this.state.selectedItems.splice(index, 1)] : [...this.state.selectedItems];

    this.setState({ selectedItems: items });
  }

  selectItem = () => {
    console.log('navigation: PedidoSelect');
    this.props.navigation.navigate('PedidoSelect', { addSelectedItems: this.addSelectedItems,  }, () => { console.log('voltou.') });
  }

  toggleData = () => {
    DatePickerAndroid.open({
      date: this.state.data
    }).then(e => {
      if (e.action !== DatePickerAndroid.dismissedAction) {
        const momentDate = moment(this.state.data);
        momentDate.date(e.day);
        momentDate.month(e.month);
        momentDate.year(e.year)

        this.setState({ data: momentDate.toDate() })
      }
    })
  }

  render() {
    let datePicker = null;

    if (Platform.IOS === 'ios') {
      datePicker = <DatePickerIOS mode='date' date={this.state.data} onDateChange={data => this.setState({ data })} />
    } else {
      datePicker = (
        <TouchableOpacity onPress={this.toggleData}>
          <Text style={styles.date}>
            {moment(this.state.data).format('ddd, D [de] YYYY')}
          </Text>
        </TouchableOpacity>
      );
    }

    var items = (<Text>Arriegua mah, compra alguma coisa cara :(</Text>)
    if (this.state.selectedItems.length !== 0) {
      items = (
        <View>
          <Text>Aaah, agora sim :)</Text>
          <FlatList
            data={this.state.selectedItems}
            keyExtractor={item => `${item.codigo}`}
            renderItem={({ item }) => <ItemComponent {...item} removeItem={this.removeItem} />}
          />
        </View>
      )
    }
    return (
      <View >
        <View>
          <Text style={styles.text}>Cliente</Text>
          <Text style={styles.text}>{this.state.cliente.nome}</Text>
          <Text style={styles.text}>Data de entrega</Text>
          {datePicker}
          <Text style={styles.text}>    Forma de pagamento </Text>
          <Picker
            selectedValue={this.state.language}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ language: itemValue })
            }>
            <Picker.Item label="À VISTA" value="0" />
            <Picker.Item label="BOLETO" value="1" />
            <Picker.Item label="CARTÃO" value="2" />
          </Picker>
          <TouchableOpacity style={styles.Touchable} onPress={() => this.selectItem()}  >
            <Text style={styles.text}>Add Item</Text>
          </TouchableOpacity>
        </View>
        <View>
          {/*  */}
          {items}
        </View>
        <Button title='Pedir' onPress={() => {}}></Button>
      </View>
    );
  }

  onPress = (rota) => {
    console.log("rota " + rota)
    this.props.navigation.navigate(rota);
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
          <TextInput style={styles.item} value={rowData.Quantidade.toString()} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flexDirection: 'column',
    backgroundColor: '#9cf6f9',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 1,
  },

  Touchable: { height: 75, },

  text: { fontSize: 20, height: 30, alignItems: 'center', justifyContent: 'space-around' },

  picker: { margin: 12, height: 30, width: 300 },

  date: {
    fontSize: 20,
    marginLeft: 10,
    marginTop: 10,
  }

});