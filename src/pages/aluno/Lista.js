import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon} from 'native-base';
import cores from "../../styles/cores";
import metricas from "../../styles/metricas";
import api from "../../services/api";

export default class Lista extends Component {
    static navigationOptions = {
        tabBarIcon: ({tintColor}) => <Icon name="md-people" type="Ionicons" style={{fontSize: 30, color: tintColor}}/>
    };

    async componentDidMount() {
        await api.get('alunos').then(res => {
            this.setState({alunos: res.data});
        }).catch(erro => {
            console.tron.log(erro)
        });
    };

    state = {
        alunos: [],
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
        backgroundColor: cores.secundaria,
        paddingLeft: metricas.basePadding,
        paddingRight: metricas.basePadding,
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
