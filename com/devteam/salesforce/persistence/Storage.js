import {AsyncStorage} from 'react-native';

export async function SalveConfig(valor) {
    try {
        await AsyncStorage.setItem('SalesForceConf', valor);
      } catch (error) {
          console.log("SalveConfig", error);
      }  
};


export async function GetConfig () {
    try {
        const value = await AsyncStorage.getItem('SalesForceConf');
          
          if (value !== null) {
            console.log("SalesForceConf", value);
            config = JSON.parse(value);
            global.globalClienteId = config.Servidor;
            global.globalVendedor = config.Vendedor;
          }
          else{
            global.globalClienteId = "";
            global.globalVendedor = "";
          }
      } catch (error) {
          console.log("GetConfig", error);
      }  
};
