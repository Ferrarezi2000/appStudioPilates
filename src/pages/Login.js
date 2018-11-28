import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, ActivityIndicator, AsyncStorage} from 'react-native';
import {cores, metricas} from '../styles';
import {NavigationActions} from 'react-navigation';
import PropTypes from 'prop-types';
import api from '../services/api';

export default class Login extends Component {
    static navigationOptions = {
        header: null
    };

    static propTypes = {
        navigation: PropTypes.shape({
            dispatch: PropTypes.func
        }).isRequired
    };

    state = {
        loadingInicial: false,
        loading: false,
        msgErro: null,
        adm: {
            email: 'ferrarezi_alem@yahoo.com.br',
            senha: '102030'
        }
    };

    async componentDidMount() {
        this.setState({loadingInicial: true});
        const email = await AsyncStorage.getItem('email');
        const senha = await AsyncStorage.getItem('senha');

        if (email !== null && senha !== null) {
            this.setState({adm: {email: email, senha: senha}});
            this.logar();
        } else {
            this.setState({loadingInicial: false});
        }
    };

    checkAdm = async () => {
        const adm = await api.post('login', this.state.adm);
        return adm;
    };

    salvarAdm = async () => {
        await AsyncStorage.setItem('email', this.state.adm.email);
        await AsyncStorage.setItem('senha', this.state.adm.senha)
    };

    logar = async () => {
        if (this.state.adm.email.length === 0 || this.state.adm.senha.length === 0) return;
        this.setState({loading: true});

        try {
           await this.checkAdm();
           await this.salvarAdm();

            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'Logado'})]
            });
            this.props.navigation.dispatch(resetAction);
        } catch (erro) {
            this.setState({loading: false, msgErro: erro.response.data});
            this.setState({loadingInicial: false});
        }

    };

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor={cores.secundaria}/>

                {this.state.loadingInicial
                ? <ActivityIndicator color="#FFF" size="large"/>
                : <View>
                        <Text style={styles.titulo}>Bem-vindo</Text>
                        <Text style={styles.texto}>Informe seu email e senha.</Text>

                        <View style={styles.form}>
                            <TextInput
                                style={styles.input}
                                autoCapitalize="none"
                                autoCorrect={false}
                                placeholder="Digite seu email"
                                underlineColorAndroid="rgba(0, 0, 0, 0)"
                                value={this.state.adm.email}
                                onChangeText={email => this.setState({adm: {email: email, senha: this.state.adm.senha} })}/>

                            <TextInput
                                style={styles.input}
                                autoCapitalize="none"
                                autoCorrect={false}
                                placeholder="Digite sua senha"
                                underlineColorAndroid="rgba(0, 0, 0, 0)"
                                value={this.state.adm.senha}
                                onChangeText={senha => this.setState({adm: {email: this.state.adm.email, senha: senha} })}/>

                            {!!this.state.msgErro && <Text style={styles.erro}>{this.state.msgErro}</Text>}

                            <TouchableOpacity style={styles.botao} onPress={this.logar}>
                                {this.state.loading
                                    ? <ActivityIndicator size="small" color="#FFF"/>
                                    : <Text style={styles.logar}>Logar</Text>}
                            </TouchableOpacity>
                        </View>
                    </View>}
            </View>
        );
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
    titulo: {
        fontSize: 24,
        textAlign: 'center',
        color: cores.white,
        fontWeight: 'bold',
    },
    form: {
        marginTop: metricas.baseMargin * 2
    },
    input: {
        backgroundColor: cores.white,
        borderRadius: metricas.baseRadius,
        height: 44,
        paddingHorizontal: metricas.basePadding,
        marginBottom: 8,
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
    texto: {
        textAlign: 'center',
        color: cores.light,
        fontSize: 15,
        marginTop: metricas.baseMargin,
        lineHeight: 21,
    },
    erro: {
        color: cores.perigo,
        textAlign: 'center',
        marginTop: metricas.baseMargin,
    }
});
