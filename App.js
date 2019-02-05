import { createStackNavigator, createAppContainer} from 'react-navigation';
import Clientes from './com/devteam/salesforce/view/Clientes'
import Itens from './com/devteam/salesforce/view/Itens'
import ModulosCliente from './com/devteam/salesforce/view/ModulosCliente'

const RootStack = createStackNavigator({
  Clientes: Clientes,
  Itens: Itens,
  ModulosCliente: ModulosCliente,
}, {
  initialRouteName: "Clientes"
});

const App = createAppContainer(RootStack);

export default App;