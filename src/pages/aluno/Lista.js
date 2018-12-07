import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, ScrollView} from 'react-native';
import {Icon} from 'native-base';
import cores from "../../styles/cores";
import api from "../../services/api";
import ListAluno from './components/Alunos';

export default class Lista extends Component {
    static navigationOptions = {
        tabBarIcon: ({tintColor}) => <Icon name="md-people" type="Ionicons" style={{fontSize: 30, color: tintColor}}/>
    };

    async componentDidMount() {
        await this.carregarAlunos()
    };

    state = {
        alunos: [],
    };

    carregarAlunos = async () => {
        await api.get('alunos').then(res => {
            this.setState({alunos: res.data});
        }).catch(erro => {
            console.tron.log(erro)
        });
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <FlatList
                    style={styles.list}
                    renderItem={({ item }) => <ListAluno aluno={item} carregarLista={this.carregarAlunos}/>}
                    data={this.state.alunos}
                    keyExtractor={aluno => String(aluno.id)}/>
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
