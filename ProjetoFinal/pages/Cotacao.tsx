import React from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet, TextInput, SafeAreaView, FlatList } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { styles } from "./styles/stylesHome";
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Coin {
    id: string;
    code: string;
    codein: string;
    name: string;
    high: string;
    low: string;
    varBid: string;
    pctChange: string;
    bid: string;
    ask: string;
    timestamp: string;
    create_date: string;

}

export default function Cotacao({ navigation }) {
    const [conversaoList, setConversaoList] = useState<Coin[]>([]);


    async function getCotacao() {
        axios
            .get('https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL')
            .then(res => {
                const dolar: Coin = { id: 'USDBRL', ...res.data.USDBRL };
                const euro: Coin = { id: 'EURBRL', ...res.data.EURBRL };
                setConversaoList([dolar, euro]);
            });
    }
    useEffect(() => {
        getCotacao();
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <LinearGradient colors={['#890FFF', '#A13FFF', '#9001C8',]} style={styles.linearGradient} >
                    <Text style={styles.titulo}>
                        Cotação de moedas
                    </Text>
                    <View style={styles.modalView}>
                        <FlatList
                            data={conversaoList}

                            renderItem={({ item }) => (
                                <View style={styles.conta} >
                                    <View >
                                        <Text style={styles.txtTitulo}>
                                            {item?.code === 'USD' ? 'Dollar (USD)' : 'Euro (EUR)'} para Real (BRL)
                                        </Text>


                                    </View>
                                    <Text style={styles.txtConteudo} >{item?.code === 'USD' ? 'U$' : '€'} 1</Text>
                                    <Text style={styles.txtConteudoA}>
                                        Valor mais alto:
                                    </Text>
                                    <Text style={styles.txtConteudo} >R$ {item.high}</Text>
                                    <Text style={styles.txtConteudoB} >
                                        Valor mais baixo:
                                    </Text>
                                    <Text style={styles.txtConteudo} >R$ {item.low}</Text>
                                    <Text style={styles.txtConteudoM} >
                                        Valor médio:
                                    </Text>
                                    <Text style={styles.txtConteudo} >R$ {item.bid}</Text>

                                </View>
                            )}
                        />
                        <TouchableOpacity style={styles.button5} onPress={() => navigation.navigate("Home")}>
                            <Text style={styles.txtButton}>Voltar</Text>
                        </TouchableOpacity>
                    </View>

                </LinearGradient>

            </View>

        </SafeAreaView>
    );
};

