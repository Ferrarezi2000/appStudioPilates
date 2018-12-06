import React, {Component} from 'react';
import {AsyncStorage, StyleSheet, FlatList, ScrollView, StatusBar} from 'react-native';
import {Icon} from 'native-base';
import api from "../../services/api";
import cores from "../../styles/cores";
import Agendas from "./components/Agendas";

export default class Lista extends Component {
    static navigationOptions = {
        tabBarIcon: ({tintColor}) => <Icon name="calendar" type="FontAwesome" style={{fontSize: 20, color: tintColor}}/>
    };

    async componentDidMount() {
        const nome = await AsyncStorage.getItem('nome');
        await this.setState({professor: {nome: nome}});
        await this.carregarAgenda();
    };

    state = {
        professor: {nome: ''},
        listaAgenda: ''
    };

    carregarAgenda = async () => {
        await api.post('agenda/professor', this.state.professor).then(res => {
            this.setState({listaAgenda: res.data});
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
                    renderItem={({ item }) => <Agendas agenda={item} carregarLista={this.carregarAgenda}/>}
                    data={this.state.listaAgenda}
                    keyExtractor={agenda => String(agenda.id)}/>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: cores.secundaria,
    },
    list: {
        marginTop: 10,
    }
});
