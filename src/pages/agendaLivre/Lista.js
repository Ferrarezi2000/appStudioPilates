import React, {Component} from 'react';
import {StyleSheet, FlatList, ScrollView, StatusBar} from 'react-native';
import {Icon} from 'native-base';
import api from "../../services/api";
import cores from "../../styles/cores";
import Agendas from "./components/Agendas";

export default class Lista extends Component {
    static navigationOptions = {
        tabBarIcon: ({tintColor}) => <Icon name="calendar" type="FontAwesome" style={{fontSize: 20, color: tintColor}}/>
    };

    async componentDidMount() {
        await this.carregarAgendaLivre();
    };

    state = {
        professor: {nome: ''},
        listaAgendaLivre: ''
    };

    carregarAgendaLivre = async () => {
        await api.get('agenda/livre').then(res => {
            this.setState({listaAgendaLivre: res.data});
        }).catch(erro => {
            console.tron.log(erro)
        });
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor={cores.secundaria}/>
                <FlatList
                    style={styles.list}
                    renderItem={({ item }) => <Agendas agenda={item} carregarLista={this.carregarAgendaLivre}/>}
                    data={this.state.listaAgendaLivre}
                    keyExtractor={agenda => String(agenda.id)}/>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: cores.primaria,
    },
    list: {
        marginTop: 10,
    }
});
