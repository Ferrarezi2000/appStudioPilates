import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon} from 'native-base';

export default class Lista extends Component {
    static navigationOptions = {
        tabBarIcon: ({tintColor}) => <Icon name="md-people" type="Ionicons" style={{fontSize: 30, color: tintColor}}/>
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Aluno</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
