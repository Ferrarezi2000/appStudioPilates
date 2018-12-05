import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon} from 'native-base';
import cores from "../../../styles/cores";
import metricas from "../../../styles/metricas";
import api from "../../../services/api";

const Alunos = ({ alunos }) => (
    <View style={styles.container}>
        <View style={styles.form}>
        <Text>{aluno.nome}</Text>
        <Text>{aluno.data_nascimento}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    form: {},
    container: {
        flex: 1,
        backgroundColor: cores.secundaria,
        paddingLeft: metricas.basePadding,
        paddingRight: metricas.basePadding,
    },
});
