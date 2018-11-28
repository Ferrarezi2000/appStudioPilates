import React, {Component} from 'react';
import PropTypes from "prop-types";
import {ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Textarea} from 'native-base';
import { TextInputMask } from 'react-native-masked-text'
import cores from "../../styles/cores";
import metricas from "../../styles/metricas";
import api from "../../services/api";

export default class Form extends Component {
    static propTypes = {
        navigation: PropTypes.shape({
            dispatch: PropTypes.func
        }).isRequired
    };

    state = {
        loading: false,
        msgErro: null,
        msgSucesso: null,
        aluno: {
            nome: '',
            data_nascimento: '',
            observacao: null
        }
    };

    cadastrar = async () => {
        if (this.state.aluno.nome.length < 3 || this.state.aluno.data_nascimento.length < 10) return;
        this.setState({loading: true});
        await api.post('aluno', this.state.aluno).then(res => {
            this.setState({msgSucesso: 'Aluno(a) cadastrado(a) com sucesso.'});
            this.setState({aluno: {nome: '', data_nascimento: '', observacao: null}});
            this.setState({loading: false});
        }).catch(erro => {
            this.setState({loading: false, msgErro: erro.response.data});
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.form}>
                    <Text style={styles.titulo}>Aluno(a)</Text>
                    <Text style={styles.texto}>Cadastre um novo aluno(a) no Studio Fisio Pilates</Text>

                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Nome"
                        underlineColorAndroid="rgba(0, 0, 0, 0)"
                        value={this.state.aluno.nome}
                        onChangeText={nome => this.setState({aluno: {nome: nome, data_nascimento: this.state.aluno.data_nascimento, observacao: this.state.aluno.observacao }})}/>

                    <TextInputMask
                        style={styles.input}
                        type={'datetime'}
                        placeholder="Data Nascimento"
                        options={{
                            format: 'DD/MM/YYYY'
                        }}
                        value={this.state.aluno.data_nascimento}
                        onChangeText={data => this.setState({aluno: {nome: this.state.aluno.nome, data_nascimento: data, observacao: this.state.aluno.observacao }})}/>

                    <TextInput
                        style={styles.inputText}
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Observações"
                        underlineColorAndroid="rgba(0, 0, 0, 0)"
                        multiline={true}
                        value={this.state.aluno.observacao}
                        onChangeText={observacao => this.setState({aluno: {nome: this.state.aluno.nome, data_nascimento: this.state.aluno.data_nascimento, observacao: observacao }})}/>

                    {!!this.state.msgErro && <Text style={styles.erro}>{this.state.msgErro}</Text>}

                    {!!this.state.msgSucesso && <Text style={styles.sucesso}>{this.state.msgSucesso}</Text>}

                    <TouchableOpacity style={styles.botao} onPress={this.cadastrar}>
                        {this.state.loading
                            ? <ActivityIndicator size="small" color="#FFF"/>
                            : <Text style={styles.logar}>Cadastrar</Text>}
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: cores.secundaria,
        padding: metricas.basePadding * 2,
    },
    input: {
        backgroundColor: cores.white,
        borderRadius: metricas.baseRadius,
        height: 44,
        paddingHorizontal: metricas.basePadding,
        marginBottom: 8,
    },
    inputText: {
        backgroundColor: cores.white,
        borderRadius: metricas.baseRadius,
        height: 100,
        paddingHorizontal: metricas.basePadding,
        marginBottom: 8,
    },
    titulo: {
        fontSize: 24,
        textAlign: 'center',
        color: cores.white,
        fontWeight: 'bold',
    },
    texto: {
        textAlign: 'center',
        color: cores.light,
        fontSize: 15,
        marginTop: metricas.baseMargin,
        marginBottom: metricas.baseMargin,
        lineHeight: 21,
    },
    erro: {
        color: cores.perigo,
        textAlign: 'center',
        marginTop: metricas.baseMargin,
        marginBottom: metricas.baseMargin,
    },
    sucesso: {
        color: cores.sucesso,
        textAlign: 'center',
        marginTop: metricas.baseMargin,
        marginBottom: metricas.baseMargin,
    },
    botao: {
        backgroundColor: cores.primaria,
        borderRadius: metricas.baseRadius,
        height: 44,
        marginTop: metricas.baseMargin,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logar: {
        color: cores.white,
        fontWeight: 'bold',
        fontSize: 15,
    },
    form: {
        marginTop: metricas.baseMargin * 2
    },
});
