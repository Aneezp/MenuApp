import { createNativeStackNavigator } from "@react-navigation/native-stack";

//screens
import AdminHome from '../Screens/AdminScreens/AdminHome';
import AddMenu from '../Screens/AdminScreens/AddMenu';
import ViewMenu from './AdminScreens/ViewMenu';
import AddCategory from './AdminScreens/AddCategory';
import ViewCategory from './AdminScreens/ViewCategory';


export function AdminStack() {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AdminHome" component={AdminHome} />
            <Stack.Screen name="AddMenu" component={AddMenu} />
            <Stack.Screen name="ViewMenu" component={ViewMenu} />
            <Stack.Screen name="AddCategory" component={AddCategory} />
            <Stack.Screen name="ViewCategory" component={ViewCategory} />


        </Stack.Navigator>
    );
}
