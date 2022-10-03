import React, { useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet, TextInput, SafeAreaView, ScrollView, Modal, Switch, Alert, NativeModules } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import SQLite from 'react-native-sqlite-storage';
import { FlatList } from "react-native-gesture-handler";
import { styles } from "./styles/stylesCliente";
import { stylesD } from './styles/stylesDados';


const db = SQLite.openDatabase(

    {
        name: 'mainDB',
        location: 'default',

    },
    () => { },
    error => { console.log(error) }
);


export default function Dados({ navigation, route }) {
    console.log(route.params.id);
  
    const renderLista = ({ item }) => {
        return (
            <ScrollView>
                <Text style={styles.entrega}> Dados:</Text>
                <Text style={styles.txtDados}> ID: {item.id} </Text>
                <Text style={styles.txtDados}> Nome: {item.nome} {item.sobrenome} </Text>
                <Text style={styles.txtDados}> E-mail: {item.email} </Text>
                <Text style={styles.txtDados}> Telefone: {item.telefone} </Text>
                <Text style={styles.txtDados}> o numero é WhatsApp: {item.wpp} </Text>
                <Text style={styles.entrega}> Dias para entrega: </Text>
                <Text style={styles.txtDados}> Segunda-Feira: {item.segunda}</Text>
                <Text style={styles.txtDados}> Terça-Feira: {item.terca}</Text>
                <Text style={styles.txtDados}> Quarta-Feira: {item.quarta}</Text>
                <Text style={styles.txtDados}> Quinta-Feira: {item.quinta}</Text>
                <Text style={styles.txtDados}> Sexta-Feira: {item.sexta} </Text>
                <Text style={styles.entrega}> Horario de entrega: {item.horario} </Text>
                <Text style={styles.entrega}> Preferência de contato: </Text>
                <Text style={styles.txtDados}> {item.preferencia}</Text>
                <Text style={styles.entrega}> Estabelecimento: </Text>
                <Text style={styles.txtdados}>  {item.estabelecimento}</Text>
                <Text style={styles.entrega}> Entrega rastreavel: {item.entrega} </Text>
                <TouchableOpacity style={styles.button6} onPress={deleteCliente}>
                    <Text style={styles.txtButton}> Deletar </Text>
                </TouchableOpacity>

             
            </ScrollView>
        )
    }

    const [cliente1, set1Cliente] = useState([]);
    const [delet, setDelete] = useState([]);

    const get1Cliente = () => {

        db.transaction(txn => {
            txn.executeSql(
                `SELECT * FROM clientes WHERE ID = ${route.params.id} `,
                [],
                (sql, res) => {
                    let len = res.rows.length;
                    if (len > 0) {
                        let resultado = [];
                        for (let i = 0; i < len; i++) {
                            let item = res.rows.item(i);

                            if(item.segunda == true){
                                item.segunda = "Sim"
                            }

                            else{
                                item.segunda = "Não"
                            }

                            if(item.terca == true){
                                item.terca = "Sim"
                            }

                            else{
                                item.terca = "Não"
                            }

                            if(item.quarta == true){
                                item.quarta = "Sim"
                            }

                            else{
                                item.quarta = "Não"
                            }

                            if(item.quinta == true){
                                item.quinta = "Sim"
                            }

                            else{
                                item.quinta = "Não"
                            }

                            if(item.sexta == true){
                                item.sexta = "Sim"
                            }

                            else{
                                item.sexta = "Não"
                            }
                            if(item.entrega == "true"){
                                item.entrega = "Não"
                            }

                            else{
                                item.entrega = "Sim"
                            }


                            resultado.push({ id: item.ID, nome: item.nome, sobrenome: item.sobrenome, email: item.email, telefone: item.telefone, wpp: item.whatsapp, segunda: item.segunda, terca: item.terca, quarta: item.quarta, quinta: item.quinta, sexta: item.sexta, horario: item.horario,preferencia: item.preferencia, estabelecimento: item.estabelecimento, entrega: item.entrega })

                        }
                        // console.log(resultado);
                        set1Cliente(resultado);

                    }

                },
                error => {
                    console.log("deu ruim " + error.message);
                }

            );
        })
    }
    const deleteCliente = () => {

        db.transaction(txn => {
            txn.executeSql(
                `DELETE FROM clientes WHERE ID = ${route.params.id} `,
                [],
                (sql, res) => {
                    console.log('Cliente deletado');
                    Alert.alert('Deletado com sucesso');
                    navigation.navigate('Cliente');
                },
                error => {
                    console.log("deu ruim " + error.message);
                }

            );
        })
    }

    
    useEffect(() => {
        get1Cliente();

    }, []);

    return (
        <SafeAreaView  >
             
            <LinearGradient colors={['#890FFF', '#A13FFF', '#9001C8',]} style={styles.linearGradient} >
       
                <Text style={styles.txtTitulo}>
                    Clientes
                </Text>
                <TouchableOpacity style={styles.button3} onPress={() => navigation.navigate('Cliente')}>
                    <Image source={require('./../assets/img/back.png')} style={stylesD.img8} ></Image>
                </TouchableOpacity>

                <View>

                    <View style={stylesD.container}>
                        <View>
                            <FlatList
                                data={cliente1}
                                renderItem={renderLista}
                                key={cat => cat.id}
                            />
                            
                        </View>


                    </View>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );

};


