import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView, FlatList} from 'react-native';
import {Icon} from 'native-base';
import cores from "../../../styles/cores";
import metricas from "../../../styles/metricas";
import PropTypes from "prop-types";


export default class Horarios extends Component {
    static propTypes = {
        confirmaDelete: PropTypes.func,
        horario: PropTypes.shape({
            hora: PropTypes.string,
            aluno: PropTypes.shape({
                nome: PropTypes.string
            })
        }).isRequired
    };

    deletar = () => {
        this.props.confirmaDelete(this.props.horario.id)
    };

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.deletar()}>
                    <Icon name="md-trash" type="Ionicons" style={{fontSize: 20, color: cores.perigo}}/>
                </TouchableOpacity>
                <View style={styles.info}>
                    <Text style={styles.hora}>{this.props.horario.hora}</Text>
                </View>
                <Text style={styles.nome}>{this.props.horario.aluno.nome}</Text>
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
