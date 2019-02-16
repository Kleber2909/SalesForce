import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, FlatList, Picker, ScrollView, Platform, DatePickerAndroid, DatePickerIOS, Alert } from 'react-native';
import ItemComponent from '../components/ItemComponent';
import TotalComponent from '../components/TotalComponent';
import moment from 'moment';
import 'moment/locale/pt-br';
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
    const items = this.state.selectedItems.map(i => {
      if (item.codigo === i.codigo) {
        i = { ...item }
        i.quantidade = item.quantidade - 1;
      }

      if (i.quantidade < 0) {
        i.quantidade = 0;
      }

      return i;
    })

    const selectedItems = items.filter(i => i.quantidade !== 0);

    let total = 0;
    selectedItems.forEach(i => {
      if (i.quantidade > 0) {
        total += i.valor * i.quantidade;
      }
    });

    this.setState({
      selectedItems: selectedItems,
      total: total.toFixed(2),
    });
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
        this.setState({ pedido: Object.values(pedidos).length + 1 }, () => {
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

    let dbRef = db.ref('/' + globalClienteId + '/Pedidos/' + this.state.pedido + '/');
    dbRef.set(pedido)
      .then((data) => {
        console.log(data);
        Alert.alert(
          "Sucesso",
          "Pedido enviado para processamento. :)"
        );

        this.props.navigation.goBack();
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
          <Text>
            {moment(this.state.data).format('DD/MM/YYYY')}
          </Text>
        </TouchableOpacity>
      );
    }

    var selectedItems = (<Text style={{ marginLeft: 10, marginTop: 10, fontWeight: 'bold' }}>Nenhum produto selecionado.</Text>)
    if (this.state.selectedItems.length !== 0) {
      selectedItems = (
        <View>
          <FlatList
            data={this.state.selectedItems}
            keyExtractor={item => `${item.codigo}`}
            renderItem={({ item }) => <ItemComponent {...item} removeItem={this.removeItem} />}
          />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.title}>Cliente</Text>
          <Text style={styles.text}>{this.state.cliente.Nome}</Text>
          <Text style={styles.title}>Data de entrega</Text>
          {datePicker}
          <Text style={styles.title}>Forma de pagamento </Text>
          <Picker style={styles.picker}
            selectedValue={this.state.language}
            onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}>
            <Picker.Item label="À vista" value="0" />
            <Picker.Item label="Boleto" value="1" />
            <Picker.Item label="Cartão" value="2" />
          </Picker>
          <TouchableOpacity onPress={() => this.selectItem()} >
            <View style={styles.button}>
              <Text style={{ fontWeight: 'bold' }}>Adicionar Produtos</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.list}>
          <ScrollView>
            {selectedItems}
          </ScrollView>
        </View >
        <View style={styles.foot}>
          <TotalComponent total={this.state.total} addItems={this.sendPedido} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
  },
  form: {
    flex: 4,
  },
  list: {
    flex: 6,
    flexDirection: 'row',
  },
  foot: {
    flex: 1,
    flexDirection: 'row',
  },
  title: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  text: { fontSize: 15, alignItems: 'center', justifyContent: 'space-around', marginTop: 10 },
  picker: { alignItems: 'center', justifyContent: 'space-around', marginTop: 10 },
  button: {
    borderRadius: 10, padding: 10, margin: 10, backgroundColor: "skyblue", height: 30, alignItems: 'center', justifyContent: 'center'
  }
});