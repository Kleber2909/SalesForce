import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default props => {

    return (
        <View style={styles.container}>
            <View style={styles.valor}>
                <Text style={styles.text}>Total(R$) {props.total}</Text>
            </View>
            <View style={styles.action}>
                <TouchableWithoutFeedback onPress={() => props.addItems(props)}>
                    <View style={styles.button}>
                        <Icon name="check" color="white" />
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderColor: '#ecf0f1',
        backgroundColor: '#ecf0f1'
    },
    valor: {
        flex: 4,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',          
    },
    text: {
        fontSize: 20, 
        fontWeight: 'bold',  
    },
    action: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    button: {
        justifyContent: 'center',        
        alignItems: 'center',
        backgroundColor: '#2ecc71',
        height: 50, 
        width: 50,      
        borderRadius: 50  
    }
});