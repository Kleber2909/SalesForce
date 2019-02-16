import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, FlatList, Picker, ScrollView, Platform, DatePickerAndroid, DatePickerIOS, Alert } from 'react-native';
import ItemComponent from '../components/ItemComponent';
import moment from 'moment';
import { db } from '../persistence/Firebase';

export default class Pedido extends React.Component {

  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const cliente = navigation.getParam('cliente', '');
    this.state = {
      cliente: cliente,
      data: new Date(),
      itemsOrder: [],
      selectedItems: [],
      total: 0,
      pedido: 0,
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Novo pedido"
    }
  };

  componentDidMount() {
    this.getNextPedido();
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
    this.props.navigation.navigate('PedidoSelect', { addSelectedItems: this.addSelectedItems, });
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

  getNextPedido() {    
    let dbRef = db.ref('/salesforce001/Pedidos');
    dbRef.on('value', (snapshot) => {
      try {
        const pedidos = snapshot.val();
        this.setState({pedido: Object.values(pedidos).length }, () => {
          console.log(this.state.pedido)
        })        
      }
      catch (error) {
        console.log("error: ", error);
      }
    })
  } 

  sendPedido = () => {
    const pedido = {
      Codigo: this.state.cliente.Codigo || 'Teste',
      DataEntrega: moment(this.state.data).format('DD/MM/YYYY'),
      FormaPg: this.state.language,
      Nome: this.state.cliente.Nome || 'Testezim',
      Vencimento: moment(this.state.data).add(30, 'days').format('DD/MM/YYYY'),
      Vendedor: globalVendedor,
      Itens: this.state.selectedItems,
      Pedido: this.state.pedido,
    }

    let dbRef = db.ref('/' + globalClienteId +'/Pedidos/'+this.state.pedido+'/');
    dbRef.set(pedido)
      .then((data) => {
        console.log(data);
        Alert.alert(
          "Sucesso",
          "Pedido enviado para processamento. :)"
        );
      }).catch((error) => {
        Alert.alert(
          "Erro",
          "Erro ao enviar seu pedido. :'("
        );
      });
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

    var selectedItems = (<Text>Arriegua mah, compra alguma coisa cara :(</Text>)
    if (this.state.selectedItems.length !== 0) {
      selectedItems = (
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
          <Text style={styles.text}>{this.state.cliente.Nome}</Text>
          <Text style={styles.text}>Data de entrega</Text>
          {datePicker}
          <Text style={styles.text}>    Forma de pagamento </Text>
          <Picker
            selectedValue={this.state.language}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ language: itemValue }, () => { console.log(this.state.language); })
            }>
            <Picker.Item label="À VISTA" value="0" />
            <Picker.Item label="BOLETO" value="1" />
            <Picker.Item label="CARTÃO" value="2" />
          </Picker>
          <TouchableOpacity style={styles.Touchable} onPress={() => this.selectItem()} >
            <Text style={styles.text}>Add Item</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {selectedItems}
        </ScrollView>
        <Button title='Pedir' onPress={this.sendPedido}></Button>
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