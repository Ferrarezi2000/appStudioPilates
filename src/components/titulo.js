import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
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

    render() {
        return (
            <View>
            {this.props.navigation.state.routeName === 'Logado'
                ? <Text style={styles.titulo}>Título</Text>
                : <Text style={styles.titulo}>Menu</Text>}
            </View>

        );
    }
}

const styles = StyleSheet.create({
    titulo: {
        color: cores.white,
        fontSize: 20,
    }
});
