import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList, Alert} from 'react-native';
import {Icon} from 'native-base';
import cores from "../../../styles/cores";
import metricas from "../../../styles/metricas";
import PropTypes from "prop-types";
import Horarios from './Horarios';
import api from "../../../services/api";


export default class Agendas extends Component {
    static propTypes = {
        carregarAgenda: PropTypes.func.isRequired,
        agenda: PropTypes.shape({
            dia: PropTypes.string,
            aulas: PropTypes.arrayOf(PropTypes.shape({
                hora: PropTypes.string
            })),
        }).isRequired
    };

    deletar = async (id) => {
        let envio = {id: id}
        await api.post('agenda/deletar', envio).then(res => {
            this.props.carregarAgenda()
        }).catch(erro => {
            console.tron.log(erro)
        });
    };

    confirmaDelete = (id) => {
        Alert.alert(
            'Atenção!',
            'Deseja realmente excluir esse horário?',
            [
                {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: styles.cancel},
                {text: 'Deletar', onPress: () => this.deletar(id), style: styles.cancel},
            ],
            {cancelable: false }
        );
    };

    render() {
        return (
            <View>
                {this.props.agenda.aulas.length > 0 &&
                    <View style={styles.container}>
                        <View style={styles.info}>
                            <Text style={styles.dias}>{this.props.agenda.dia} - {this.props.agenda.aulas.length} Aula(s)</Text>
                            <FlatList
                                style={styles.list}
                                renderItem={({item}) => <Horarios horario={item} confirmaDelete={this.confirmaDelete}/>}
                                data={this.props.agenda.aulas}
                                keyExtractor={aula => String(aula.id)}/>
                        </View>
                    </View>
                }
            </View>
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
    dias: {
        fontSize: 15,
        color: cores.white,
    },
    horas: {
        fontSize: 14,
        color: cores.white,
        marginLeft: 20,
    },
    container: {
        borderBottomWidth: 0.5,
        borderColor: '#d6d7da',
        marginTop: metricas.baseMargin,
        marginHorizontal: metricas.baseMargin,
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
});
