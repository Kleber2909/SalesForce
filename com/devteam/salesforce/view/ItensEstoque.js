import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Alert, Image} from 'react-native';
import ListItens from '../controller/ListItens';

export default class ItensEstoque extends React.Component {
  
  propsItens = "";

  constructor(props) {
    super(props);
    propsItens = props;
  }
  
  static navigationOptions = {
    title: 'Lista de itens',
  };

  render() {
    return (
      <ScrollView  scrollsToTop={false}>
        <View style={styles.container}>   
          <ListItens/>          
      </View>      
      </ScrollView>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1, 
  },
});
