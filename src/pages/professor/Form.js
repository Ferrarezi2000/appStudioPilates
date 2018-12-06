import React, {Component} from 'react';
import PropTypes from "prop-types";
import {ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
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
        professor: {
            nome: '',
            senha: ''
        }
    };

    cadastrar = async () => {
        if (this.state.professor.nome.length < 3 || this.state.professor.senha.length < 3) return;
        this.setState({loading: true});
        await api.post('professor', this.state.professor).then(res => {
            this.setState({msgSucesso: 'Professora cadastrada com sucesso.'});
            this.setState({professor: {nome: ''}});
            this.setState({loading: false});
        }).catch(erro => {
            this.setState({loading: false, msgErro: erro.response.data});
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.form}>
                    <Text style={styles.titulo}>Professora</Text>
                    <Text style={styles.texto}>Cadastre uma nova professora no Studio Fisio Pilates</Text>

                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Nome"
                        underlineColorAndroid="rgba(0, 0, 0, 0)"
                        value={this.state.professor.nome}
                        onChangeText={nome => this.setState({professor: {nome: nome, senha: this.state.professor.senha}})}/>

                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Senha de Acesso"
                        underlineColorAndroid="rgba(0, 0, 0, 0)"
                        value={this.state.professor.senha}
                        onChangeText={senha => this.setState({professor: {senha: senha, nome: this.state.professor.nome}})}/>

                    <TouchableOpacity style={styles.botao} onPress={this.cadastrar}>
                        {this.state.loading
                            ? <ActivityIndicator size="small" color="#FFF"/>
                            : <Text style={styles.logar}>Cadastrar</Text>}
                    </TouchableOpacity>

                    {!!this.state.msgErro && <Text style={styles.erro}>{this.state.msgErro}</Text>}

                    {!!this.state.msgSucesso && <Text style={styles.sucesso}>{this.state.msgSucesso}</Text>}
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: cores.secundaria,
        paddingLeft: metricas.basePadding,
        paddingRight: metricas.basePadding,
    },
    input: {
        backgroundColor: cores.white,
        borderRadius: metricas.baseRadius,
        height: 44,
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
        marginBottom: metricas.baseMargin * 4,
        lineHeight: 21,
    },
    erro: {
        color: cores.perigo,
        textAlign: 'center',
        marginTop: metricas.baseMargin * 2,
        marginBottom: metricas.baseMargin,
    },
    sucesso: {
        color: cores.sucesso,
        textAlign: 'center',
        marginTop: metricas.baseMargin * 2,
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
