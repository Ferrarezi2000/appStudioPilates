import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import cores from "../../../styles/cores";
import metricas from "../../../styles/metricas";
import PropTypes from "prop-types";


export default class Horarios extends Component {
    static propTypes = {
        vagas: PropTypes.shape({
            hora: PropTypes.string,
            vagas: PropTypes.number,
        }).isRequired
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.info}>
                    <Text style={styles.hora}>{this.props.vagas.hora}</Text>
                </View>
                <Text style={styles.nome}>{this.props.vagas.vagas}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    info: {
        flex: 1,
        marginLeft: metricas.baseMargin,
    },
    hora: {
        color: cores.white
    },
    nome: {
        marginRight: 10,
        color: cores.light,
        letterSpacing: 2,
        marginTop: 5,
    },
    container: {
        marginTop: metricas.baseMargin,
        marginHorizontal: metricas.baseMargin,
        flexDirection: 'row',
        alignItems: 'center',
    },
});
