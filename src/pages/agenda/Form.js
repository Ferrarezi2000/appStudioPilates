import React, {Component} from 'react';
import PropTypes from "prop-types";
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View, Picker, ScrollView} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import Select from 'react-native-picker-select';
import {cores, metricas} from '../../styles'
import api from "../../services/api";

export default class Form extends Component {
    async componentDidMount() {
        await api.get('professores').then(res => {
            let lista = [];
            if (res.data.length > 0) {
                res.data.forEach(item => {
                    item.key = item.id;
                    item.label = item.nome;
                    item.value = item.id;
                    lista.push(item)
                });
                this.setState({professores: lista});
            }
        }).catch(erro => {
            console.tron.log(erro)
        });

        await api.get('alunos').then(res => {
            let lista = [];
            if (res.data.length > 0) {
                res.data.forEach(item => {
                    item.key = item.id;
                    item.label = item.nome;
                    item.value = item.id;
                    lista.push(item)
                });
                this.setState({alunos: lista});
            }
        }).catch(erro => {
            console.tron.log(erro)
        });
    };

    static propTypes = {
        navigation: PropTypes.shape({
            dispatch: PropTypes.func
        }).isRequired
    };

    state = {
        qdtVezes: [
            {label: '1 x Semana', value: 1 },
            {label: '2 x Semana', value: 2 },
            {label: '3 x Semana', value: 3 },
            {label: '4 x Semana', value: 4 },
        ],
        professores: [],
        contador: 1,
        qtdSelecionada: 1,
        alunos: [],
        listaHora: [
            {label: "07:00 - 08:00", value: "07:00 - 08:00", key: 1},
            {label: "08:00 - 09:00", value: "08:00 - 09:00", key: 2},
            {label: "09:00 - 10:00", value: "09:00 - 10:00", key: 3},
            {label: "10:00 - 11:00", value: "10:00 - 11:00", key: 4},
            {label: "11:00 - 12:00", value: "11:00 - 12:00", key: 5},
            {label: "12:00 - 13:00", value: "12:00 - 13:00", key: 6},
            {label: "13:00 - 14:00", value: "13:00 - 14:00", key: 7},
            {label: "14:00 - 15:00", value: "14:00 - 15:00", key: 8},
            {label: "15:00 - 16:00", value: "15:00 - 16:00", key: 9},
            {label: "16:00 - 17:00", value: "16:00 - 17:00", key: 10},
            {label: "17:00 - 18:00", value: "17:00 - 18:00", key: 11},
            {label: "18:00 - 19:00", value: "18:00 - 19:00", key: 12},
            {label: "19:00 - 20:00", value: "19:00 - 20:00", key: 13},
        ],
        listaDia: [
            {label: 'Segunda-feira', key: 1, value: 'Segunda-feira'},
            {label: 'Terça-feira', key: 2, value: 'Terça-feira'},
            {label: 'Quarta-feira', key: 3, value: 'Quarta-feira'},
            {label: 'Quinta-feira', key: 1, value: 'Quinta-feira'},
            {label: 'Sexta-feira', key: 1, value: 'Sexta-feira'}
        ],
        loading: false,
        msgErro: null,
        msgSucesso: null,
        professorId: null,
        alunoId: null,
        agenda: {
            aluno_id: null,
            professor_id: null,
            hora: null,
            dia_semana: null
        },
        primeiro: {
            hora: null,
            dia_semana: null
        },
        segundo: {
            hora: null,
            dia_semana: null
        },
        terceiro: {
            hora: null,
            dia_semana: null
        },
        quarto: {
            hora: null,
            dia_semana: null
        },
    };

    cadastrar = async () => {
        if (!this.state.professorId || !this.state.diaSemana || !this.state.alunoId || !this.state.hora) return;
        this.setState({loading: true});
        await this.setState({agenda: {aluno_id: this.state.alunoId, professor_id: this.state.professorId, hora: this.state.hora, dia_semana: this.state.diaSemana}})
        await api.post('agenda', this.state.agenda).then(res => {
            this.setState({msgSucesso: 'Cadastro efetuado com sucesso.', msgErro: null});
            this.setState({agenda: {aluno_id: null, professor_id: null, hora: null, dia_semana: null}});
            this.setState({alunoId: null, hora: null, diaSemana: null, professorId: null});
            this.setState({loading: false});
        }).catch(erro => {
            this.setState({loading: false, msgErro: erro.response.data, msgSucesso: null});
        });
    };

    proximo = () => {
        if (!this.state.professorId || !this.state.alunoId) return;
        this.setState({contador: 2});
    };

    render() {
        let professores = this.state.professores.map((p, i) => {
            return <Picker.Item key={i} value={p.id} label={p.nome} />
        });

        let alunos = this.state.alunos.map((a, i) => {
            return <Picker.Item key={i} value={a.id} label={a.nome} />
        });

        return (
            <View style={styles.container}>
                <View style={styles.form}>
                    {this.state.contador === 1
                         ?  <ScrollView>
                                <View>
                                <Text style={styles.titulo}>Agenda</Text>
                                <Text style={styles.texto}>Cadastre um novo horário</Text>

                                <Text style={styles.label}>Professora</Text>
                                <Select
                                    style={{...pickerSelectStyles}}
                                    selectedValue={this.state.professorId}
                                    items={this.state.professores}
                                    placeholder={{label: 'Selecione uma professora', value: null}}
                                    onValueChange={(prof) => (this.setState({professorId: prof}))}/>

                                <Text style={styles.label}>Aluno</Text>
                                <Select
                                    style={{...pickerSelectStyles}}
                                    selectedValue={this.state.alunoId}
                                    items={this.state.alunos}
                                    placeholder={{label: 'Selecione um aluno', value: null}}
                                    onValueChange={(aluno) => (this.setState({alunoId: aluno}))}/>

                                <Text style={styles.label}>Semana</Text>
                                <RadioForm
                                    style={styles.viewCheck}
                                    radio_props={this.state.qdtVezes}
                                    initial={0}
                                    formHorizontal={true}
                                    labelHorizontal={false}
                                    buttonColor={cores.white}
                                    buttonInnerColor={cores.white}
                                    labelStyle={{fontSize: 13, color: cores.white}}
                                    animation={true}
                                    onPress={(value) => {
                                        this.setState({qtdSelecionada: value})
                                    }}/>

                                <Text style={styles.label}>Dia</Text>
                                <Select
                                    style={{...pickerSelectStyles}}
                                    selectedValue={this.state.primeiro.dia_semana}
                                    items={this.state.listaDia}
                                    placeholder={{label: 'Selecione um dia', value: null}}
                                    onValueChange={(dia) => (this.setState({
                                        primeiro: {
                                            dia_semana: dia,
                                            hora: this.state.primeiro.hora
                                        }
                                    }))}/>

                                <Text style={styles.label}>Hora</Text>
                                <Select
                                    style={{...pickerSelectStyles}}
                                    selectedValue={this.state.primeiro.hora}
                                    items={this.state.listaHora}
                                    placeholder={{label: 'Selecione uma hora', value: null}}
                                    onValueChange={(hora) => (this.setState({
                                        primeiro: {
                                            hora: hora,
                                            dia_semana: this.state.primeiro.dia_semana
                                        }
                                    }))}/>

                                {this.state.qtdSelecionada === 1 ?
                                    <TouchableOpacity style={styles.cadastrar} onPress={this.cadastrar}>
                                        {this.state.loading
                                            ? <ActivityIndicator size="small" color="#FFF"/>
                                            : <Text style={styles.logar}>Cadastrar</Text>}
                                    </TouchableOpacity> :
                                    <TouchableOpacity style={styles.botao} onPress={this.proximo}>
                                        <Text style={styles.logar}>Próximo</Text>
                                    </TouchableOpacity>
                                }
                            </View>
                            </ScrollView>
                        :   <ScrollView>
                                <View>
                            <Text style={styles.titulo}>Agenda</Text>
                            <Text style={styles.texto}>Defina os dias e horários desejados.</Text>


                            <Text style={styles.label}>Dia 1</Text>
                            <Select
                                style={{...pickerSelectStyles}}
                                selectedValue={this.state.primeiro.dia_semana}
                                items={this.state.listaDia}
                                placeholder={{label: 'Selecione um dia', value: null}}
                                onValueChange={(dia) => (this.setState({
                                    primeiro: {
                                        dia_semana: dia,
                                        hora: this.state.primeiro.hora
                                    }
                                }))}/>

                            <Text style={styles.label}>Hora</Text>
                            <Select
                                style={{...pickerSelectStyles}}
                                selectedValue={this.state.primeiro.hora}
                                items={this.state.listaHora}
                                placeholder={{label: 'Selecione uma hora', value: null}}
                                onValueChange={(hora) => (this.setState({
                                    primeiro: {
                                        hora: hora,
                                        dia_semana: this.state.primeiro.dia_semana
                                    }
                                }))}/>

                            <Text style={styles.label}>Dia 2</Text>
                            <Select
                                style={{...pickerSelectStyles}}
                                selectedValue={this.state.segundo.dia_semana}
                                items={this.state.listaDia}
                                placeholder={{label: 'Selecione um dia', value: null}}
                                onValueChange={(dia) => (this.setState({
                                    segundo: {
                                        dia_semana: dia,
                                        hora: this.state.segundo.hora
                                    }
                                }))}/>

                            <Text style={styles.label}>Hora</Text>
                            <Select
                                style={{...pickerSelectStyles}}
                                selectedValue={this.state.segundo.hora}
                                items={this.state.listaHora}
                                placeholder={{label: 'Selecione uma hora', value: null}}
                                onValueChange={(hora) => (this.setState({
                                    segundo: {
                                        hora: hora,
                                        dia_semana: this.state.segundo.dia_semana
                                    }
                                }))}/>

                            {this.state.qtdSelecionada >= 3
                                ? <View>
                                    <Text style={styles.label}>Dia 3</Text>
                                    <Select
                                        style={{...pickerSelectStyles}}
                                        selectedValue={this.state.terceiro.dia_semana}
                                        items={this.state.listaDia}
                                        placeholder={{label: 'Selecione um dia', value: null}}
                                        onValueChange={(dia) => (this.setState({
                                            terceiro: {
                                                dia_semana: dia,
                                                hora: this.state.terceiro.hora
                                            }
                                        }))}/>

                                    <Text style={styles.label}>Hora</Text>
                                    <Select
                                        style={{...pickerSelectStyles}}
                                        selectedValue={this.state.terceiro.hora}
                                        items={this.state.listaHora}
                                        placeholder={{label: 'Selecione uma hora', value: null}}
                                        onValueChange={(hora) => (this.setState({
                                            terceiro: {
                                                hora: hora,
                                                dia_semana: this.state.terceiro.dia_semana
                                            }
                                        }))}/>
                                </View>
                                : <View/>
                            }

                            {this.state.qtdSelecionada >= 4
                                ? <View>
                                    <Text style={styles.label}>Dia 4</Text>
                                    <Select
                                        style={{...pickerSelectStyles}}
                                        selectedValue={this.state.quarto.dia_semana}
                                        items={this.state.listaDia}
                                        placeholder={{label: 'Selecione um dia', value: null}}
                                        onValueChange={(dia) => (this.setState({
                                            quarto: {
                                                dia_semana: dia,
                                                hora: this.state.quarto.hora
                                            }
                                        }))}/>

                                    <Text style={styles.label}>Hora</Text>
                                    <Select
                                        style={{...pickerSelectStyles}}
                                        selectedValue={this.state.quarto.hora}
                                        items={this.state.listaHora}
                                        placeholder={{label: 'Selecione uma hora', value: null}}
                                        onValueChange={(hora) => (this.setState({
                                            quarto: {
                                                hora: hora,
                                                dia_semana: this.state.quarto.dia_semana
                                            }
                                        }))}/>
                                </View>
                                : <View/>
                            }

                            <TouchableOpacity style={styles.cadastrar} onPress={this.cadastrar}>
                                {this.state.loading
                                    ? <ActivityIndicator size="small" color="#FFF"/>
                                    : <Text style={styles.logar}>Cadastrar</Text>}
                            </TouchableOpacity>
                        </View>
                            </ScrollView>
                    }
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
    viewCheck: {
        justifyContent: 'center',
        alignItems: 'stretch',
        color: cores.white,
        padding: 5,
    },
    input: {
        backgroundColor: cores.white,
        borderRadius: metricas.baseRadius,
        height: 44,
        paddingHorizontal: metricas.basePadding,
        marginBottom: 8,
    },
    textRadio: {
        color: cores.white,
        marginLeft: 5
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
    label: {
        color: cores.light,
        marginLeft: 2,
        marginBottom: 2,
    },
    texto: {
        textAlign: 'center',
        color: cores.light,
        fontSize: 15,
        marginTop: metricas.baseMargin,
        marginBottom: metricas.baseMargin * 3,
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
        marginBottom: metricas.baseMargin,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cadastrar: {
        backgroundColor: cores.sucesso,
        borderRadius: metricas.baseRadius,
        height: 44,
        marginTop: metricas.baseMargin,
        marginBottom: metricas.baseMargin,
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

const pickerSelectStyles = StyleSheet.create({
    inputAndroid: {
        backgroundColor: cores.white,
        borderRadius: metricas.baseRadius,
        height: 44,
        paddingHorizontal: metricas.basePadding,
        marginBottom: 8,
        borderWidth: 0,
        color: cores.black,
    },
});
