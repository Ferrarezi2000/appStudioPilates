import React, {Component} from 'react';
import PropTypes from "prop-types";
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View, Alert, ScrollView} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import Select from 'react-native-picker-select';
import StepIndicator from 'react-native-step-indicator';
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

        await api.get('semana').then(res => {
            let lista = [];
            res.data.forEach(item => {
                item.key = item.id;
                item.label = item.dia;
                item.value = item.dia;
                item.horarios.forEach(item => {
                    item.key = item.id;
                    item.label = item.hora;
                    item.value = item.hora;
                })
                lista.push(item)
            });
            this.setState({semana: lista});
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
        labelSetep: [],
        stepCount: 2,
        posicaoStep: 0,
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
        semana: [],
        listaHora: [],
        listaDia: [],
        loading: false,
        msgErro: null,
        msgSucesso: null,
        professorId: null,
        alunoId: null,
        msgErroDiaHoraSelecionado: null,
        agenda: {
            aluno_id: null,
            professor_id: null,
            lista: []
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

    mudarPosicao = (posicao) => {
        switch(posicao) {
            case 1:
                if (this.state.primeiro.hora || this.state.primeiro.dia_semana) {
                    this.setState({posicaoStep: posicao});
                    this.setState({msgErroDiaHoraSelecionado: null});
                } else {
                    this.setState({msgErroDiaHoraSelecionado: 'Para passar para o próximo dia, precisa selecionar o dia e hora deste dia!'});
                }

                break;
            case 2:
                if (this.state.segundo.hora || this.state.segundo.dia_semana) {
                    this.setState({posicaoStep: posicao});
                    this.setState({msgErroDiaHoraSelecionado: null});
                } else {
                    this.setState({msgErroDiaHoraSelecionado: 'Para passar para o próximo dia, precisa selecionar o dia e hora deste dia!'});
                }
                break;
            case 3:
                if (this.state.terceiro.hora || this.state.terceiro.dia_semana) {
                    this.setState({posicaoStep: posicao});
                    this.setState({msgErroDiaHoraSelecionado: null});
                } else {
                    this.setState({msgErroDiaHoraSelecionado: 'Para passar para o próximo dia, precisa selecionar o dia e hora deste dia!'});
                }
                break;
            case 4:
                if (this.state.quarto.hora || this.state.quarto.dia_semana) {
                    this.setState({posicaoStep: posicao});
                    this.setState({msgErroDiaHoraSelecionado: null});
                } else {
                    this.setState({msgErroDiaHoraSelecionado: 'Para passar para o próximo dia, precisa selecionar o dia e hora deste dia!'});
                }
                break;
            default:
                return null;
        }
    };

    verificarDados = async () => {
        this.setState({loading: true});
        if (!this.state.professorId || !this.state.alunoId) return;
        let lista = [];
        switch(this.state.qtdSelecionada) {
            case 1:
                if (this.state.primeiro.hora && this.state.primeiro.dia_semana) {
                    lista.push(this.state.primeiro);
                    await this.setState({agenda: {aluno_id: this.state.alunoId, professor_id: this.state.professorId, lista: lista, qtdSemana: this.state.qtdSelecionada}});
                    this.cadastrar();
                }
                break;
            case 2:
                if (this.state.primeiro.hora && this.state.primeiro.dia_semana && this.state.segundo.hora && this.state.segundo.dia_semana) {
                    lista.push(this.state.primeiro);
                    lista.push(this.state.segundo);
                    await this.setState({agenda: {aluno_id: this.state.alunoId, professor_id: this.state.professorId, lista: lista, qtdSemana: this.state.qtdSelecionada}});
                    this.cadastrar();
                }
                break;
            case 3:
                if (this.state.primeiro.hora && this.state.primeiro.dia_semana && this.state.segundo.hora && this.state.segundo.dia_semana && this.state.terceiro.hora && this.state.terceiro.dia_semana) {
                    lista.push(this.state.primeiro);
                    lista.push(this.state.segundo);
                    lista.push(this.state.terceiro);
                    await this.setState({agenda: {aluno_id: this.state.alunoId, professor_id: this.state.professorId, lista: lista, qtdSemana: this.state.qtdSelecionada}});
                    this.cadastrar();
                }
                break;
            case 4:
                if (this.state.primeiro.hora && this.state.primeiro.dia_semana && this.state.segundo.hora && this.state.segundo.dia_semana && this.state.terceiro.hora && this.state.terceiro.dia_semana && this.state.quarto.hora && this.state.quarto.dia_semana) {
                    lista.push(this.state.primeiro);
                    lista.push(this.state.segundo);
                    lista.push(this.state.terceiro);
                    lista.push(this.state.quarto);
                    await this.setState({agenda: {aluno_id: this.state.alunoId, professor_id: this.state.professorId, lista: lista, qtdSemana: this.state.qtdSelecionada}});
                    this.cadastrar();
                }
                break;
            default:
                return null;
        }

    };

    cadastrar = async () => {
        await api.post('agenda', this.state.agenda).then(res => {
            Alert.alert(
                'Sucesso',
                'Agenda cadastrado com sucessa!',
                [{text: 'OK', onPress: () => this.props.navigation.navigate('Logado')}],
                {cancelable: false }
            );
            this.setState({loading: false});
        }).catch(erro => {
            this.setState({loading: false, msgErro: erro.response.data, msgSucesso: null});
        });
    };

    proximo = async () => {
        if (!this.state.professorId || !this.state.alunoId) {
            Alert.alert(
                'Erro',
                'Professor e Aluno precisam ser escolhidos antes de prosseguir!',
                [{text: 'OK', onPress: () => console.tron.log('fechou')}],
                {cancelable: false }
            );
            return;
        }
        let label = [];
        switch(this.state.qtdSelecionada) {
            case 2:
                label = ["Primeiro dia","Segundo dia"];
                await this.setState({stepCount: 2});
                break;
            case 3:
                label = ["Primeiro dia","Segundo dia", "Terceiro dia"];
                await this.setState({stepCount: 3});
                break;
            case 4:
                label = ["Primeiro dia","Segundo dia", "Terceiro dia", "Quarto dia"];
                await this.setState({stepCount: 4});
                break;
            default:
                return null;
        }
        await this.setState({labelSetep: label});
        await this.setState({contador: 2});
    };

    horasDias = async (dia, texto) => {
        if (dia) {
            if (texto === 'primeiro') this.setState({primeiro: {dia_semana: dia, hora: this.state.primeiro.hora}});
            if (texto === 'segundo') this.setState({segundo: {dia_semana: dia, hora: this.state.segundo.hora}});
            if (texto === 'terceiro') this.setState({terceiro: {dia_semana: dia, hora: this.state.terceiro.hora}});
            if (texto === 'quarto') this.setState({quarto: {dia_semana: dia, hora: this.state.quarto.hora}});
            this.state.semana.forEach(item => {
                if (item.label === dia) this.setState({listaHora: item.horarios})
            });
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.form}>
                    {this.state.contador === 1
                         ? <ScrollView>
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
                                    items={this.state.semana}
                                    placeholder={{label: 'Selecione um dia', value: null}}
                                    onValueChange={(dia) => this.horasDias(dia, 'primeiro')}/>

                                <Text style={styles.label}>Hora</Text>
                                <Select
                                    style={{...pickerSelectStyles}}
                                    selectedValue={this.state.primeiro.hora}
                                    items={this.state.listaHora}
                                    disabled={!this.state.primeiro.dia_semana}
                                    placeholder={{label: 'Selecione uma hora', value: null}}
                                    onValueChange={(hora) => (this.setState({
                                        primeiro: {
                                            hora: hora,
                                            dia_semana: this.state.primeiro.dia_semana
                                        }
                                    }))}/>

                                {this.state.qtdSelecionada === 1
                                    ? <TouchableOpacity style={styles.cadastrar} onPress={this.verificarDados}>
                                        {this.state.loading
                                            ? <ActivityIndicator size="small" color="#FFF"/>
                                            : <Text style={styles.logar}>Cadastrar</Text>}
                                    </TouchableOpacity>
                                    : <TouchableOpacity style={styles.botao} onPress={this.proximo}>
                                        <Text style={styles.logar}>Próximo</Text>
                                    </TouchableOpacity>}
                            </View>
                        </ScrollView>
                         : <ScrollView>
                            <View>
                                <Text style={styles.titulo}>Agenda</Text>
                                <Text style={styles.texto}>Defina os dias e horários desejados.</Text>

                                <StepIndicator
                                    customStyles={customStyles}
                                    currentPosition={this.state.posicaoStep}
                                    onPress={posicao => this.mudarPosicao(posicao)}
                                    stepCount={this.state.stepCount}
                                    labels={this.state.labelSetep}/>

                                {this.state.posicaoStep === 0 &&
                                <View>
                                    <Text style={styles.label}>Dia</Text>
                                    <Select
                                        style={{...pickerSelectStyles}}
                                        selectedValue={this.state.primeiro.dia_semana}
                                        items={this.state.semana}
                                        placeholder={{label: 'Selecione um dia', value: null}}
                                        onValueChange={(dia) => this.horasDias(dia, 'primeiro')}/>

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
                                </View>}

                                {this.state.posicaoStep === 1 &&
                                <View>
                                    <Text style={styles.label}>Dia</Text>
                                    <Select
                                        style={{...pickerSelectStyles}}
                                        selectedValue={this.state.segundo.dia_semana}
                                        items={this.state.semana}
                                        placeholder={{label: 'Selecione um dia', value: null}}
                                        onValueChange={(dia) => this.horasDias(dia, 'segundo')}/>

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
                                </View>}

                                {this.state.posicaoStep === 2 && this.state.qtdSelecionada >= 3 && <View>
                                    <Text style={styles.label}>Dia</Text>
                                    <Select
                                        style={{...pickerSelectStyles}}
                                        selectedValue={this.state.terceiro.dia_semana}
                                        items={this.state.semana}
                                        placeholder={{label: 'Selecione um dia', value: null}}
                                        onValueChange={(dia) => this.horasDias(dia, 'terceiro')}/>

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
                                </View>}

                                {this.state.posicaoStep === 3 && this.state.qtdSelecionada >= 4 && <View>
                                    <Text style={styles.label}>Dia</Text>
                                    <Select
                                        style={{...pickerSelectStyles}}
                                        selectedValue={this.state.quarto.dia_semana}
                                        items={this.state.semana}
                                        placeholder={{label: 'Selecione um dia', value: null}}
                                        onValueChange={(dia) => this.horasDias(dia, 'quarto')}/>

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
                                </View>}

                                {this.state.posicaoStep + 1 === this.state.qtdSelecionada
                                    ? <TouchableOpacity style={styles.cadastrar} onPress={this.verificarDados}>
                                        {this.state.loading
                                            ? <ActivityIndicator size="small" color="#FFF"/>
                                            : <Text style={styles.logar}>Cadastrar</Text>}
                                    </TouchableOpacity>
                                    : <View/>}

                                <Text style={styles.erroDiaProximo}>{this.state.msgErroDiaHoraSelecionado}</Text>

                            </View>
                        </ScrollView>
                    }
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    erroDiaProximo: {
        flex: 1,
        color: cores.perigo,
        justifyContent: 'center',
        alignItems: 'stretch',
        textAlign: 'center',
        marginTop: 20,
    },
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

const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize:30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: cores.white,
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: cores.white,
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: cores.white,
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: cores.white,
    stepIndicatorUnFinishedColor: cores.secundaria,
    stepIndicatorCurrentColor: cores.secundaria,
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: cores.white,
    stepIndicatorLabelFinishedColor: cores.secundaria,
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: cores.white
};
