import React from 'react';
import { StyleSheet, View, ScrollView, Button} from 'react-native';
import ListItensCarrinho from '../controller/ListItensCarrinho';

export default class Carrinho extends React.Component {
  
  propsItens = "";  
  
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    cliente = navigation.getParam('cliente', '');
    propsItens = props;
  }
  
  static navigationOptions = {
    title: 'Escolher itens',
  };

  render() {
    return (
      <ScrollView style = {{backgroundColor: '#9cf6f9',}} scrollsToTop={false}>
        <View style={styles.container}>   
            <ListItensCarrinho/>          
        </View>
        <View>
            <Button title="Add" onPress={() => {}}></Button>
        </View>
      </ScrollView>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flexDirection: 'column',
    backgroundColor: '#9cf6f9',
    alignItems: 'flex-start',
    flex: 1, 
  },
});
