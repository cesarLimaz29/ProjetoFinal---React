import React from "react";
import { Text, View,Image,TouchableOpacity,StyleSheet,TextInput,SafeAreaView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {styles} from "./styles/stylesHome"

export default function Home ({navigation}) {
    return(
    <SafeAreaView style={styles.container}>
        <View>
            <LinearGradient colors={['#890FFF','#A13FFF', '#9001C8', ]} style={styles.linearGradient} >
                <Text style = {styles.titulo}>
                    Bem vindo!
                    
                </Text>
                <Image source={require('./../assets/img/bd.png')} style = {styles.logo}></Image>
                <Text style= {styles.txtCont}>Clique em um dos botões para ter acesso a os clientes ou para ver a cotação do real hoje.</Text>

                <TouchableOpacity style = {styles.button} onPress={() => navigation.navigate("Cliente")}>
                    <Text style = {styles.txtButton}> Cliente </Text>
                </TouchableOpacity> 
                <TouchableOpacity style = {styles.button2} onPress={() => navigation.navigate("Cotacao")}>
                    <Text style = {styles.txtButton}>Cotação </Text>
                </TouchableOpacity> 
                {/* <TouchableOpacity style = {styles.button3} onPress={() => navigation.navigate("Login")}>
                 <Image source={require('./../assets/img/porta.png')} style = {styles.img} ></Image>
                </TouchableOpacity>                      */}
            </LinearGradient>  
        </View>
    </SafeAreaView>
    );
};

