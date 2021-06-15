import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, ScrollView, Button } from 'react-native';
import * as Print from 'expo-print';

import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import getReceiptHtml from './PDFLayout';


export default function App() {

  const [clientName, setClientName] = useState('');
  const [clientAddressStreet, setClientAddressStreet] = useState('');
  const [clientAddressCity, setClientAddressCity] = useState('Rosario');
  const [jobDetails, setJobDetails] = useState('');
  const [jobCost, setJobCost] = useState('');



  const  createPDF = async (html) => {
    try {
        const { uri } = await Print.printToFileAsync({ html, width: 595, height: 842 });
        await Sharing.shareAsync(uri);
      } catch (error) {
        console.error(error);
    }
  };


  const exportReceipt = async () => {
    let html = await getReceiptHtml(clientName, clientAddressStreet, clientAddressCity, jobCost, jobDetails );
    return createPDF(html);
  }

  
  const styles = StyleSheet.create({
    container: {
      padding: 30,
      paddingTop: 60
    },  
    input: {
      borderColor: '#a5a5a5',
      borderWidth: 1,
      padding: 10,
      borderRadius: 5,
      marginBottom: 10
    },
    title: {
      fontSize: 20
    }
  });


  return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
        <View>
          <Text style={styles.title}>Generar Recibo</Text>
        </View>
        <View>
            <Text>Nombre del cliente</Text>
            <TextInput
              value={clientName}
              style={styles.input}
              onChange={event => setClientName(event.nativeEvent.text)}
            />
            <Text>Ciudad</Text>
            <TextInput
              value={clientAddressCity}
              style={styles.input}
              onChange={event => setClientAddressCity(event.nativeEvent.text)}
            />
            <Text>Dirección</Text>
            <TextInput
              value={clientAddressStreet}
              style={styles.input}
              onChange={event => setClientAddressStreet(event.nativeEvent.text)}
            />
            <Text>Detalle del trabajo</Text>
            <TextInput
              multiline
              numberOfLines={4}
              value={jobDetails}
              
              style={{...styles.input, ...{height: 100}}}
              onChange={event => setJobDetails(event.nativeEvent.text)}
            />
            <Text>Costo</Text>
            <TextInput
              value={jobCost}
              style={styles.input}
              keyboardType="numeric"
              onChange={event => setJobCost(event.nativeEvent.text)}
            />
            <Button
                onPress={exportReceipt}
                title={'Aceptar'}
              />
              </View>
            <StatusBar style="auto" />
            </ScrollView>
          </SafeAreaView>
  );
}