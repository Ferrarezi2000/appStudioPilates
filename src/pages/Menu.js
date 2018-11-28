import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import { Content, Card, CardItem, Text, Icon, Right } from 'native-base';
import {cores, metricas} from '../styles';
import PropTypes from 'prop-types';

export default class Menu extends Component {
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

    render() {
        return (
            <View style={styles.container}>
                <Content>
                    <Card>
                        <CardItem>
                            <Icon active name="md-person-add" />
                            <Text style={styles.texto}>Novo Aluno</Text>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </CardItem>
                    </Card>

                    <Card>
                        <CardItem>
                            <Icon active name="teach" type="MaterialCommunityIcons" style={{fontSize: 30}}/>
                            <Text style={styles.texto}>Nova Professora</Text>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </CardItem>
                    </Card>

                    <Card>
                        <CardItem>
                            <Icon active name="calendar" type="FontAwesome" />
                            <Text style={styles.texto}>Novo Horário</Text>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </CardItem>
                    </Card>
                </Content>
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
        marginLeft: metricas.baseMargin,
    },
    icones: {
        textAlign: 'right',
    }
});
