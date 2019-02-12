import { createStackNavigator, createAppContainer} from 'react-navigation';
import Home from './com/devteam/salesforce/view/Home'
import Clientes from './com/devteam/salesforce/view/Clientes'
import ItensEstoque from './com/devteam/salesforce/view/ItensEstoque'
import ModulosCliente from './com/devteam/salesforce/view/ModulosCliente'
import Configuracoes from './com/devteam/salesforce/view/Configuracoes'
import Pedido from './com/devteam/salesforce/view/Pedido'
import Carrinho from './com/devteam/salesforce/view/Carrinho'
import ListItensCarrinho from './com/devteam/salesforce/controller/ListItensCarrinho'
import { GetConfig } from './com/devteam/salesforce/persistence/Storage';

//global.globalClienteId = "salesforce001";
GetConfig();

const RootStack = createStackNavigator({
  Home: Home,
  Clientes: Clientes,
  ItensEstoque: ItensEstoque,
  ModulosCliente: ModulosCliente,
  Configuracoes: Configuracoes,
  Pedido: Pedido,
  Carrinho: Carrinho,
  Items: ListItensCarrinho
}, 
{
  // Tela inicial
  initialRouteName: "Pedido",

  // Configurações do layout do cabeçalho
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
});

const App = createAppContainer(RootStack);

export default App;