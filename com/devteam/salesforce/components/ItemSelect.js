import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default props => {

    return (        
        <View style={styles.container}>
            <View style={styles.item_desc}>
                <Text style={styles.text}>
                    {props.descricao}
                </Text>
                <View style={styles.item_desc2}>
                    <Text>
                        Estoque(un): {props.estoque}
                    </Text>
                    <Text>
                        Preço(R$): {props.valor.toFixed(2)}
                    </Text>
                </View>
            </View>
            <View style={styles.item_func}>
                <Button style={styles.item} color="#2ecc71" title="+" onPress={() => props.toggleItem(props, true)}></Button>
                <TextInput editable={false} style={styles.item} value={props.quantidade.toString()} />
                <Button style={styles.item} color="#e74c3c" title="-" onPress={() => props.toggleItem(props, false)}></Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
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