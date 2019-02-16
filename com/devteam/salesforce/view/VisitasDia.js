import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Alert, Image, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SalveConfig, GetConfig } from '../persistence/Storage';
import { db } from '../persistence/Firebase';

const weekday = new Array(6);
weekday[1] = "Segunda-Feira";
weekday[2] = "Terça-Feira";
weekday[3] = "Quarta-Feira";
weekday[4] = "Quinta-Feira";
weekday[5] = "Sexta-Feira";
weekday[6] = "Sábado";

let DayDay = new Date().getDay();

export default class VisitasDia extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        Day: new Date().getDay(),
        DayName: weekday[new Date().getDay()],
        vendedor: globalVendedor,
        dataSource: null
      }
  }
  
  static navigationOptions = {
    title: 'Visitas do Dia',
  };

  componentDidMount() {
    this.loadClientes();
  }

  NextDay(){   

        if(this.state.Day < 6){
            let day = this.state.Day + 1;
            let dayName = weekday[day];

            DayDay = DayDay + 1

            this.setState({
                Day: day,
                DayName: dayName
            })
            this.loadClientes();
        }
  }

  PreviousDay(){
   
            if(this.state.Day > 1){
                let day = this.state.Day - 1;
                let dayName = weekday[day];

                DayDay = DayDay - 1

                this.setState({
                    Day: day,
                    DayName: dayName
                })
                this.loadClientes();
            }
       }

  onPressList = (rowData) =>{
        console.log("clik " + rowData.Codigo)
        this.props.navigation.navigate('ModulosCliente', {cliente: rowData, }); 
  }

  loadClientes(){
    const day = DayDay + 1
    var dataSourceParam = []
    var self = this

    let dbRef = db.ref('/' + globalClienteId + '/Clientes/').orderByChild('DiaVisita').equalTo(day)

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
    return (
      <ScrollView scrollsToTop={false}>
        <View style={styles.container}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-around'}}>
                <TouchableOpacity onPress={() => this.PreviousDay()} >
                    <View style={{borderRadius:10, backgroundColor:"skyblue", height:30, width:30, alignItems:'center', justifyContent: 'center'}}>
                        <Icon name="angle-left" color="white" />
                    </View>
                </TouchableOpacity >  
                <Text style={{fontWeight:'bold', alignItems:'center', justifyContent: 'center'}}>{this.state.DayName}</Text>
                <TouchableOpacity onPress={() => this.NextDay()} >
                    <View style={{borderRadius:10, backgroundColor:"skyblue", height:30, width:30, alignItems:'center', justifyContent: 'center'}}>
                    <Icon name="angle-right" color="white" />
                    </View>
                </TouchableOpacity >  
            </View>
            <FlatList 
                        data={this.state.dataSource}
                        renderItem={this._renderItem}
                        ItemSeparatorComponent={()=><View style={{height:1, backgroundColor: '#f7f7f7'}} />}
            />       
        </View>      
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flexDirection: 'column',
    flex: 1, 
  },
});
