import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import { Content, Card, CardItem, Text, Icon, Right } from 'native-base';
import {cores} from '../styles';
import PropTypes from 'prop-types';
import {NavigationActions} from "react-navigation";

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
        },
    };

    navegar = (rota) => {
        this.props.navigation.navigate(rota);
    };

    render() {
        return (
            <View style={styles.container}>
                <Content>
                    <Card>
                        <TouchableOpacity onPress={() => this.navegar('NovoAluno')}>
                            <CardItem style={styles.card}>
                                <Icon active name="md-person-add"  style={{color: cores.white}}/>
                                <Text style={styles.texto}>Novo Aluno</Text>
                                <Right>
                                    <Icon name="arrow-forward" />
                                </Right>
                            </CardItem>
                        </TouchableOpacity>
                    </Card>

                    <Card>
                        <TouchableOpacity onPress={() => this.navegar('NovoProfessor')}>
                            <CardItem style={styles.card}>
                                <Icon active name="teach" type="MaterialCommunityIcons" style={{fontSize: 30, color: cores.white}}/>
                                <Text style={styles.texto}>Nova Professora</Text>
                                <Right>
                                    <Icon name="arrow-forward" />
                                </Right>
                            </CardItem>
                        </TouchableOpacity>
                    </Card>

                    <Card>
                        <TouchableOpacity onPress={() => this.navegar('NovoAgenda')}>
                            <CardItem style={styles.card}>
                                <Icon active name="calendar" type="FontAwesome" style={{color: cores.white}}/>
                                <Text style={styles.texto}>Novo Horário</Text>
                                <Right>
                                    <Icon name="arrow-forward" />
                                </Right>
                            </CardItem>
                        </TouchableOpacity>
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
        backgroundColor: cores.primaria,
        padding: 2,
    },
    card: {
        backgroundColor: cores.secundaria
    },
    texto: {
        color: cores.white
    },
});
