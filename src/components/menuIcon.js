import React, {Component} from 'react';
import {StyleSheet, AsyncStorage, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {cores} from '../styles';
import {Icon} from 'native-base';

export default class MenuIcon extends Component {
    static propTypes = {
        navigation: PropTypes.shape({
            state: PropTypes.shape({
                routeName: PropTypes.string,
            }),
            navigate: PropTypes.func
        }).isRequired
    };

    menu = () => {
        this.props.navigation.navigate('Menu');

    };

    voltar = () => {
        this.props.navigation.navigate('Logado');
    };

    render() {
        return (
            <View>
                {this.props.navigation.state.routeName !== 'Logado'
                    ? <TouchableOpacity onPress={this.voltar}>
                        <Icon type="FontAwesome" name="angle-left" style={styles.icon}/>
                    </TouchableOpacity>
                    : <TouchableOpacity onPress={this.menu}>
                        <Icon name="menu" style={styles.icon}/>
                    </TouchableOpacity>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    icon: {
        color: cores.white
    }
});
