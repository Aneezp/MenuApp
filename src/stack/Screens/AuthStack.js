import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../Screens/AuthScreens/LoginScreen";
import EntryScreen from '../Screens/EntryScreen';

export function AuthStack() {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={({ route }) => ({
            headerShown: false,
        })}>
            <Stack.Screen name="EntryScreen" component={EntryScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
    );
}