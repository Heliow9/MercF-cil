import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, Modal, Pressable } from 'react-native';
import { useState, useEffect } from 'react'
import { BarCodeScanner } from 'expo-barcode-scanner';



export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [valor, setValor1] = useState(0)
  const [valor2, setValor2] = useState(0)
  const [result, setResult] = useState(0)
  const [codeBar, setCodeBar] = useState('')
  const [modalVisible, setModalVisible] = useState(false);
  const [dataList, setData] = useState([
    {
      name: 'Even - Creme Dental',
      codeBar: '7896013106968',
      preco: '100'
    },
    // {
    //   name: 'White Lub',
    //   codeBar: '7898314110118'
    // }
  ])
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  function HandlerCalc() {
    let soma = parseInt(valor) + parseInt(valor2);
    setResult(soma)
  }

  

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setCodeBar(data)
    let result = dataList.find((item) => {
      return item.codeBar === data
    })
    if (result) {
      alert('O item escaneado é ' + result.name, 'o código dele é' + result.codeBar)
    } else {
      setModalVisible(true)
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }


  return (


    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Produto não cadastrado por favor cadastre!</Text>
            <TextInput style={styles.input} placeholder="Produto Nome" />
            <TextInput disabled={true} style={styles.input} placeholder="Produto Code" value={codeBar} />
            <TextInput disabled={true} style={styles.input} placeholder="Produto Preço" />
            <TouchableOpacity
              style={styles.buttonClose}
            >
              <Text style={styles.textStyle}>Cadastrar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonClose}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Cancelar Cadastro</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.Calc}>
        <Text>Calculadora</Text>
        <Text>Resultado: {result} </Text>
        <View>
          <TextInput
            placeholder="Valor 1"
            style={styles.input}
            onChangeText={(val) => setValor1(val)}
          />

          <TextInput
            placeholder="Valor 2"
            style={styles.input}
            onChangeText={(val) => setValor2(val)}
          />
          <TouchableOpacity style={styles.botao} onPress={() => HandlerCalc()} >
            <Text style={styles.btnText} >Calcular</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.barCode}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {scanned && <Button title={'Aperte para escanear'} onPress={() => setScanned(false)} />}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    Calc: {
      justifyContent: 'center',
      alignItems: 'center'
    }
  },
  input: {
    width: 200,
    height: 28,
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 5,
    borderRadius: 4,
    paddingHorizontal: 10

  },
  botao: {
    width: 200,
    height: 40,
    marginTop: 12,
    backgroundColor: '#DAF7A6',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 10
  },
  barCode: {
    width: 300,
    height: 100,
  },


  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',


  },


  buttonClose: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#2196F3",
    marginTop: 17,
    width: 190,
    height: 28,
    borderRadius: 8,
   


  },
  textStyle:{
    color: '#fff',
    fontSize:15,
  }

});
