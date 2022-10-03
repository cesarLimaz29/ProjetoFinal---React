import React, { useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet, TextInput, SafeAreaView, ScrollView, Modal, Switch, Alert, NativeModules } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CheckBox from '@react-native-community/checkbox';
import RadioButtonRN from 'radio-buttons-react-native';
import { TextInputMask } from 'react-native-masked-text';
import SQLite from 'react-native-sqlite-storage';
import { FlatList } from "react-native-gesture-handler";
import { styles } from "./styles/stylesCliente";


const db = SQLite.openDatabase(

    {
        name: 'mainDB',
        location: 'default',

    },
    () => { },
    error => { console.log(error) }

); const dataR = [
    {
        label: 'E-mail'
    },
    {
        label: 'Fax'
    },
    {
        label: 'Whatsapp'
    },
    {
        label: 'Telefone'
    }
];

//estabelecimento
const dataRR = [
    {
        label: 'Comercial'
    },
    {
        label: 'Residencial'
    }
];

const dataWpp = [
    {
        label: 'Sim'
    },
    {
        label: 'Não'
    }
];

export default function Cliente({ navigation }) {

    // modal
    const [modalVisible, setModalVisible] = useState(false);

    const [modalCliente, setModalCliente] = useState(false);

    // labels
    const [nome, setNome] = useState('')
    const [sobrenome, setSobrenome] = useState('')
    const [emailtxt, setEmailtxt] = useState('')
    const [cell, setCell] = useState('');

    //whatsapp?
    const [IsSim, setSim] = React.useState('sim');

    // dias entrega
    const [isSegunda, setSegunda] = useState(false);
    const [isTerca, setTerca] = useState(false);
    const [isQuarta, setQuarta] = useState(false);
    const [isQuinta, setQuinta] = useState(false);
    const [isSexta, setSexta] = useState(false);

    // tempo
    const [time, setTime] = useState('');

    // preferencia
    const [isEmail, setEmail] = useState(false);
    const [isWhatsApp, setWhatsapp] = useState(false);
    const [isFax, setFax] = useState(false);
    const [isTelefonema, setTelefonema] = useState(false);


    const [prefere, setPreferencia] = useState("");
    const [estabelecimento, setEstabelecimento] = useState("");
    const [wpp, setwpp] = useState("");

    //switch rastreamento
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [isEnabled, setIsEnabled] = useState(false);

    // get de dados

    const [cliente, setCliente] = useState([]);

    const [busca,setBusca] = useState("");

    const renderClientes = ({ item }) => {
        return (
            <ScrollView>
                <View style={styles.dados}>
                    <TouchableOpacity onPress={() => { navigation.navigate('Dados', { id: item.id }) }}>
                        <Text style={styles.txtDados}> ID: {item.id}</Text>
                        <Text style={styles.txtDados}> Nome: {item.nome} {item.sobrenome} </Text>
                        <Text style={styles.txtDados}> E-mail: {item.email} </Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        )
    }

    const renderLista = ({ item }) => {
        return (
            <ScrollView>
                <Text style={styles.entrega}> Dados:</Text>
                <Text style={styles.txtDados}> ID:{item.id} </Text>
                <Text style={styles.txtDados}> Nome:{item.nome} {item.sobrenome} </Text>
                <Text style={styles.txtDados}> E-mail:{item.email} </Text>
                <Text style={styles.txtDados}> Telefone:{item.telefone} </Text>
                <Text style={styles.txtDados}> o numero é WhatsApp:{item.wpp} </Text>
                <Text style={styles.entrega}> Dias para entrega:</Text>
                <Text style={styles.txtDados}> Segunda-Feira:{item.segunda}</Text>
                <Text style={styles.txtDados}> Terça-Feira:{item.terca}</Text>
                <Text style={styles.txtDados}> Quarta-Feira:{item.quarta}</Text>
                <Text style={styles.txtDados}> Quinta-Feira:{item.quinta}</Text>
                <Text style={styles.txtDados}> Sexta-Feira:{item.sexta} </Text>
                <Text style={styles.txtDados}> Horario:{item.horario} </Text>
                <Text style={styles.entrega}> Preferência de contato: </Text>
                <Text style={styles.txtDados}> {item.emailP} {item.fax} {item.whatspp} {item.telefonema}</Text>
                <Text style={styles.entrega}> Estabelecimento: </Text>
                <Text style={styles.txtdados}> Residencia:{item.estabelecimento}</Text>
                <Text style={styles.txtdados}> Comercial:{item.estabelecimento} </Text>
                <Text style={styles.entrega}> Entrega:{item.entrega} </Text>
                <TouchableOpacity style={styles.button6} onPress={() => navigation.navigator('Cliente') }>
                    <Text style={styles.txtButton}> Voltar </Text>
                </TouchableOpacity>

            </ScrollView>
        )
    }

    const createTables = () => {
        db.transaction(txn => {
            txn.executeSql(
                `CREATE TABLE IF NOT EXISTS clientes(
                     ID INTEGER PRIMARY KEY AUTOINCREMENT,
                     nome VARCHAR(20),
                     sobrenome VARCHAR(50),
                     email VARCHAR(50),
                     telefone VARCHAR(20),
                     whatsapp VARCHAR(45),
                     segunda BOLEAN,
                     terca BOOLEAN,
                     quarta BOOLEAN,
                     quinta BOOLEAN,
                     sexta BOOLEAN,
                     horario VARCHAR (4),
                     preferencia VARCHAR(40),  
                     estabelecimento VARCHAR(30),
                     entrega BOOLEAN,
                     status BOOLEAN

                     )`,
                [],
                (sqlTxn: SQLtransaction, res: SQLResultSet) => {
                    console.log('tabela criada')
                },
                error => {
                    console.log('deu erro ' + error.message);

                },
            );
        });
    }

    const addCliente = () => {
        if (!Cliente) {
            alert("Insira um cliente");
            return false;
        }

        db.transaction(txn => {
            txn.executeSql(
                'INSERT INTO clientes (nome, sobrenome, email,telefone, whatsapp, segunda, terca, quarta, quinta, sexta, horario,preferencia, estabelecimento, entrega, status) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,true)',
                                      [nome, sobrenome, emailtxt,cell, wpp, isSegunda, isTerca, isQuarta, isQuinta, isSexta, time, prefere, estabelecimento, isEnabled],
                (sqlTxn: SQLTransaction, res: SQLResultSet) => {
                    console.log(`${nome},${sobrenome},${emailtxt},${cell},${wpp},${isSegunda},${isTerca},${isEnabled} ${prefere}adicionados com sucesso`);
                    getClientes();
                    setCliente('');
                    setModalVisible(false);
                },
                error => {
                    console.log('erro ao adicionar cliente' + error.message);
                },
            );
        });
    }

    const getClientes = () => {

        db.transaction(txn => {
            txn.executeSql(

                `SELECT * FROM clientes `,
                [],
                (sql, res) => {


                    let len = res.rows.length;
                    if (len > 0) {
                        let resultado = [];
                        for (let i = 0; i < len; i++) {
                            let item = res.rows.item(i);
                            resultado.push({ id: item.ID, nome: item.nome, sobrenome: item.sobrenome, email: item.email,})

                        }
                        // console.log(resultado);
                        setCliente(resultado);

                    }

                },
                error => {
                    console.log("deu ruim " + error.message);
                }

            );
        })

    }

    const buscar = ()=>{
        db.transaction(txn => {
            txn.executeSql(
                
                `SELECT * FROM clientes where status =true and ID =${busca}`,
                [],
                (sql,res)=> {
                    console.log("Dados selecionados com exito")
                    let len = res.rows.length;

                    if(len > 0){
                        let resultado = [];
                        for(let i = 0; i < len; i++){
                            let item = res.rows.item(i);
                            resultado.push({id: item.id, nome: item.nome, sobrenome: item.sobrenome})
                        }
                        setClientes(resultado);
                    }
                },
                error => {
                    console.log("Erro ao fazer select "+ error.message)
                }
            )
        })
    }

    useEffect(() => {
        createTables();
        getClientes();

    }, []);

    return (
        <SafeAreaView  >
            <LinearGradient colors={['#890FFF', '#A13FFF', '#9001C8',]} style={styles.linearGradient} >

                <Text style={styles.txtTitulo}>
                    Clientes
                </Text>
                <TextInput placeholder="Digite o id do cliente" placeholderTextColor="#000" style={styles.input} onChangeText={setBusca}/>

                <TouchableOpacity style={styles.button3} onPress={() => navigation.navigate("Home")}>
                    <Image source={require('./../assets/img/back.png')} style={styles.img} ></Image>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button4} onPress={() => setModalVisible(true)}>
                    <Image source={require('./../assets/img/addUser.png')} style={styles.img} ></Image>
                </TouchableOpacity>
            </LinearGradient>

            <View style={styles.contai}>
                <View>
                    <FlatList
                        data={cliente}
                        renderItem={renderClientes}
                        key={cat => cat.id}
                    />
                </View>
            </View>



            <Modal animationType="slide" transparent={true} visible={modalVisible}>

                <TouchableOpacity style={styles.button3} onPress={() => setModalVisible(false)}>
                    <Image source={require('./../assets/img/back.png')} style={styles.img2} ></Image>
                </TouchableOpacity>
                <ScrollView style={styles.modalView}>

                    <Text style={styles.modalText}>Cadastro de clientes</Text>
                    <TextInput placeholder="Nome" placeholderTextColor="#000" style={styles.input} value={nome} onChangeText={setNome} />

                    <TextInput placeholder="Sobrenome" placeholderTextColor="#000" style={styles.input} value={sobrenome} onChangeText={setSobrenome} />

                    <TextInput placeholder="E-mail" placeholderTextColor="#000" style={styles.input} value={emailtxt} onChangeText={setEmailtxt} />

                    <TextInputMask style={styles.input} type={'cel-phone'} placeholder="Telefone" placeholderTextColor="#000" options={{
                        maskType: 'BRL',
                        withDDD: true,
                        dddMask: '(99)'
                    }}
                        value={cell}
                        onChangeText={text => setCell(text)}
                    />

                    <Text style={styles.entrega}> O numero é Whatsapp:</Text>

                    <View style={styles.radiowpp}>
                        <RadioButtonRN
                            style={styles.radio}
                            data={dataWpp}
                            selectedBtn={(text) => setwpp(text.label)}
                            activeColor="#9001C8"
                        />


                    </View>



                    <Text style={styles.entrega}> Dias para entrega:</Text>

                    <View style={styles.checkboxContainer}>
                        <CheckBox value={isSegunda} onValueChange={setSegunda} />
                        <Text style={styles.txtcheck}>Segunda - Feira</Text>
                    </View>

                    <View style={styles.checkboxContainer}>
                        <CheckBox value={isTerca} onValueChange={setTerca} />
                        <Text style={styles.txtcheck}>Terça - Feira</Text>
                    </View>

                    <View style={styles.checkboxContainer}>
                        <CheckBox value={isQuarta} onValueChange={setQuarta} />
                        <Text style={styles.txtcheck}>Quarta - Feira</Text>
                    </View>

                    <View style={styles.checkboxContainer}>
                        <CheckBox value={isQuinta} onValueChange={setQuinta} />
                        <Text style={styles.txtcheck}>Quinta - Feira</Text>
                    </View>

                    <View style={styles.checkboxContainer}>
                        <CheckBox value={isSexta} onValueChange={setSexta} />
                        <Text style={styles.txtcheck}>Sexta - Feira</Text>
                    </View>

                    <TextInputMask style={styles.input} type={'datetime'} placeholder="Horário de entrega" placeholderTextColor="#000" options={{
                        format: 'hh:mm'
                    }}
                        value={time}
                        onChangeText={text => setTime(text)}
                    />
                    <Text style={styles.entrega}> Preferência de contato:</Text>

                    <View style={styles.radioContainer}>
                        <RadioButtonRN
                            style={styles.radio}
                            data={dataR}
                            selectedBtn={(text) => setPreferencia(text.label)}
                            activeColor="#9001C8"
                        />
                    </View>
                    <View style ={styles.estabelecimento}>
                    <Text style={styles.entrega}> Tipo de estabelecimento:</Text>

                    <View style={styles.checkboxContainer}>
                        <RadioButtonRN
                            style={styles.radio}
                            data={dataRR}
                            selectedBtn={(text) => setEstabelecimento(text.label)}
                            activeColor="#9001C8"
                        />

                    </View>
                    </View>
                    <View style={styles.entregaContainer}>
                        <Text style={styles.entrega}> Entrega  rastreável:</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#9001C8" }}
                            thumbColor={isEnabled ? "#890FFF" : "#FFF"}
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                            style={styles.swt}
                        />

                        <TouchableOpacity style={styles.button6} onPress={addCliente}>
                            <Text style={styles.txtButton}> Cadastrar </Text>
                        </TouchableOpacity>

                    </View>

                </ScrollView>

            </Modal>

            <Modal animationType="slide" transparent={true} visible={modalCliente}>

                <TouchableOpacity style={styles.button3} onPress={() => setModalCliente(false)}>
                    <Image source={require('./../assets/img/back.png')} style={styles.img2} ></Image>
                </TouchableOpacity>

                <View style={styles.modalView}>
                    <View>
                        <FlatList
                            data={cliente}
                            renderItem={renderLista}
                            key={cat => cat.id}
                        />
                    </View>


                </View>
            </Modal>
        </SafeAreaView>
    );

};


