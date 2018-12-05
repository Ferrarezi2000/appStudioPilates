import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView} from 'react-native';
import {Icon} from 'native-base';
import cores from "../../../styles/cores";
import metricas from "../../../styles/metricas";
import PropTypes from "prop-types";
import api from '../../../services/api';


export default class Alunos extends Component {
    static propTypes = {
        carregarLista: PropTypes.func,
        aluno: PropTypes.shape({
            nome: PropTypes.string,
            data_nascimento: PropTypes.string,
            observacao: PropTypes.string,
            id: PropTypes.number,
        }).isRequired
    };

    exibirObs = () => {
        Alert.alert(
            'Observações!',
            this.props.aluno.observacao ? this.props.aluno.observacao : 'Não temos observações para o  ' + this.props.aluno.nome,
            [{text: 'OK', onPress: () => {}}],
            {cancelable: false }
        );
    };

    deletar = async () => {
        await api.delete('aluno/' + this.props.aluno.id).then(res => {
            this.props.carregarLista()
        }).catch(erro => {
            console.tron.log(erro)
        });
    };

    confirmaDelete = () => {
        Alert.alert(
            'Atenção!',
            'Deseja realmente excluir o aluno ' + this.props.aluno.nome + '?',
            [
                {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: styles.cancel},
                {text: 'Deletar', onPress: () => this.deletar(), style: styles.cancel},
            ],
            {cancelable: false }
        );
    };

    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={() => this.exibirObs()}>
                <View style={styles.info}>
                    <Text style={styles.nome}>{this.props.aluno.nome}</Text>
                    <Text style={styles.data}>{this.props.aluno.data_nascimento ? this.props.aluno.data_nascimento : '-'}</Text>
                </View>

                <TouchableOpacity onPress={() => this.confirmaDelete()}>
                    <Icon name="md-trash" type="Ionicons" style={{fontSize: 25, color: cores.perigo, marginRight: metricas.baseMargin * 2}}/>
                </TouchableOpacity>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    form: {
        borderColor: cores.white,
        borderStyle: 'solid',
    },
    cancel: {
        color: cores.perigo
    },
    info: {
        flex: 1,
        marginLeft: metricas.baseMargin * 2,
    },
    data: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 14,
        color: cores.white,
    },
    nome: {
        fontSize: 15,
        color: cores.white,
        fontWeight: 'bold',
    },
    container: {
        borderBottomWidth: 0.5,
        borderColor: '#d6d7da',
        marginTop: metricas.baseMargin,
        marginHorizontal: metricas.baseMargin,
        flexDirection: 'row',
        alignItems: 'center',
    },
});
