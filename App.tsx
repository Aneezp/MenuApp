import * as React from 'react';
import { Stack } from './src/stack/Stack';
import { LoggedContext } from './src/common/Context';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Common from './src/common/CommonFunctions';


export default function App() {
  const [isLoged, setIsLoged] = React.useState(false);
  const [role, setRole] = React.useState(false);

  const HandleLogin = (prop: boolean) => {
    setIsLoged(prop)
  }
  const resetContext = () => {
    setIsLoged(false);
    setRole(false);
  }
  return (
    <LoggedContext.Provider value={{ logged: isLoged, setLogged: HandleLogin, userRole: role, setUserRole: setRole, resetContext: resetContext }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} >
        <Stack />
      </SafeAreaView>
    </LoggedContext.Provider>
  );
}
