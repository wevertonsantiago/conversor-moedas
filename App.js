import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput,TouchableOpacity, Image } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';


export default function App() {
  const [moedaSelecionada, setMoedaSelecionada] = useState('');
  const [moedaRealValor, setMoedaRealValor] = useState('')
  // api = economia.awesomeapi.com.br/json/all/USD-BRL
  const api = axios.create({
    baseURL:'https://economia.awesomeapi.com.br/json/all/'
  })
  
  // useEffect(() => {
  //   async function loadMoeda(){
  //     const response = await api.get(`${moedaSelecionada}-BRL`)
  //     console.log(response)
  //   }
  //   loadMoeda();
  // }, []);
  const [valorConvertido,setValorConvertido] = useState()
  const [valorUnitario, setValorUnitario] = useState(0)
  
  async function converter(){
    if(moedaSelecionada === '' ||  moedaRealValor === ''){
      alert('Por favor selecione uma moeda e ou digite algum valor da moeda escolhida.')
      return;
    }

    const response = await api.get(`${moedaSelecionada}-BRL`)
    var apiResultado = parseFloat(response.data[moedaSelecionada].ask)
    setValorUnitario(`${apiResultado.toFixed(2)}`);
    setValorConvertido(parseFloat(apiResultado * moedaRealValor).toFixed(2))
  }

  return (
    <View style={styles.container}>
      <Image style={{width:150, height:150}} source={require('./assets/logo.png')}></Image>
     <View style={styles.areaMoeda}>
      <Text style={{fontSize:20}}>Selecione uma moeda</Text>
      <Picker
            style={{width:250}}
            selectedValue={moedaSelecionada}
            onValueChange={(itemValue, itemIndex) =>
              setMoedaSelecionada(itemValue)}>
            <Picker.Item label="Selecione uma moeda..." value ='' />
            <Picker.Item label="USD - Dolar" value="USD" />
            <Picker.Item label="EUR - Euro" value="EUR" />
          </Picker>
     </View>
     <View style={styles.areaInput}>
            <View style={styles.areaValor}>
              <Text style={{fontSize:20}}>Digite um valor para converter em R$</Text>
              <View style={styles.areaInput}>
                <Text style={{fontSize:18,marginRight:2}}>{moedaSelecionada}</Text>
                <TextInput
                style={{borderWidth: 1,width:250, height:40, padding:5, fontSize:18}}
                placeholder='Ex: 100'
                keyboardType='numeric'
                onChangeText={(valor) => setMoedaRealValor(valor)}/>
                </View>
            </View>
    </View>
            <TouchableOpacity style={styles.btn} onPress={converter}>
              <Text style={{fontWeight:'bold', fontSize:17}}>CONVERTER</Text>
            </TouchableOpacity>

            {Object.keys(valorUnitario).length > 0 && (
              <View style={{alignItems:'center'}}>
                <Text style={styles.text}> {moedaRealValor} {moedaSelecionada} </Text>
                <Text style={{alignItems:'center',fontSize:30,marginTop:-12}}>=</Text>
                <Text style={[styles.text,{marginTop:-12}]}>R$ {valorConvertido}</Text>
                <Text style={{marginLeft:10, fontSize:15,marginTop:-5}}> 1 {moedaSelecionada} = R$ {valorUnitario} </Text>
              </View>  
            )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  areaInput: {
    flexDirection:'row',
    justifyContent:"center",
    alignItems:'center',
},
  areaMoeda:{
    // borderWidth:3,
    // borderColor:'#2fb615',
    backgroundColor:"#b3e1aa",
    borderRadius:25,
    width: '90%',
    alignItems:'center',
    justifyContent:'center',
    padding:10
  },
  areaValor:{
    // borderWidth:3,
    // borderColor:'#2fb615',
    borderRadius:25,
    backgroundColor:"#b3e1aa",
    width: '90%',
    alignItems:'center',
    justifyContent:'center',
    marginTop:10,
    padding:10
  },
  btn:{
    borderWidth:3,
    borderColor:'#2fb615',
    borderRadius: 25,
    width:'90%',
    height:45,
    marginTop:10,
    justifyContent:'center',
    alignItems:'center',
  },
  text:{
    fontSize:35
  }
});
