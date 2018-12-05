import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, ScrollView} from 'react-native';
import {Icon} from 'native-base';
import cores from "../../styles/cores";
import api from "../../services/api";
import ListProf from './components/Professores';

export default class Lista extends Component {
    static navigationOptions = {
        tabBarIcon: ({tintColor}) => <Icon name="md-people" type="Ionicons" style={{fontSize: 30, color: tintColor}}/>
    };

    async componentDidMount() {
        await this.carregarLista()
    };

    state = {
        professores: [],
    };

    carregarLista = async () => {
        await api.get('professores').then(res => {
            this.setState({professores: res.data});
        }).catch(erro => {
            console.tron.log(erro)
        });
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <FlatList
                    style={styles.list}
                    renderItem={({ item }) => <ListProf professor={item} carregarLista={this.carregarLista}/>}
                    data={this.state.professores}
                    keyExtractor={professor => String(professor.id)}/>
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
