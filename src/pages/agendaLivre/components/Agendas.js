import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import cores from "../../../styles/cores";
import metricas from "../../../styles/metricas";
import PropTypes from "prop-types";
import Horarios from './Horarios';


export default class Agendas extends Component {
    static propTypes = {
        carregarLista: PropTypes.func.isRequired,
        agenda: PropTypes.shape({
            dia: PropTypes.string,
            vagas: PropTypes.arrayOf(PropTypes.shape({
                hora: PropTypes.string,
                vagas: PropTypes.number,
            })),
        }).isRequired
    };

    render() {
        return (
            <View>
                {this.props.agenda.vagas.length > 0 &&
                    <View style={styles.container}>
                        <View style={styles.info}>
                            <Text style={styles.dias}>{this.props.agenda.dia} - {this.props.agenda.vagas.length} Vagas(s)</Text>
                            <FlatList
                                style={styles.list}
                                renderItem={({item}) => <Horarios vagas={item}/>}
                                data={this.props.agenda.vagas}
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
