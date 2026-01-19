import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoggedContext } from "../common/Context";
import { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AdminStack } from "./Screens/AdminStack";
import { UserStack } from "./Screens/UserStack";
export function RootStack() {
  const Stack = createNativeStackNavigator();
  const logedContext = useContext(LoggedContext);


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#00000010" }} >
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        {logedContext.userRole === 'admin' ? (
          <Stack.Screen options={{ headerShown: false }} name="AdminStack" component={AdminStack} />
        ) : (
          <Stack.Screen options={{ headerShown: false }} name="UserStack" component={UserStack} />
        )}
      </Stack.Navigator>
    </SafeAreaView>
  );
}
