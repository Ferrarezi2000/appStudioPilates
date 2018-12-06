import React, {Component} from 'react';
import {AsyncStorage, StyleSheet, Text, View} from 'react-native';
import {cores} from '../styles';
import PropTypes from "prop-types";

export default class Titulo extends Component {
    static propTypes = {
        navigation: PropTypes.shape({
            state: PropTypes.shape({
                routeName: PropTypes.string,
            }),
            navigate: PropTypes.func
        }).isRequired
    };

    async componentDidMount() {
        const nome = await AsyncStorage.getItem('nome');
        this.setState({nome: nome});
    };

    state = {
        nome: ''
    };

    render() {
        return (
            <View>
            {this.props.navigation.state.routeName === 'Logado'
                ? <View>
                    <Text style={styles.titulo}>Studio Fisio Pilates</Text>
                    <Text style={styles.nome}>{this.state.nome}</Text>
                  </View>
                : <Text style={styles.titulo}>Menu</Text>}
            </View>

        );
    }
}

const styles = StyleSheet.create({
    titulo: {
        color: cores.white,
        fontSize: 20,
    },
    nome: {
        fontSize: 15,
        color: cores.light,
        marginTop: 1,
        letterSpacing: 2,
    }
});
