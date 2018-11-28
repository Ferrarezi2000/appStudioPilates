import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon} from 'native-base';
export default class Lista extends Component {
    static navigationOptions = {
        tabBarIcon: ({tintColor}) => <Icon name="calendar" type="FontAwesome" style={{fontSize: 20, color: tintColor}}/>
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Agenda</Text>
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
