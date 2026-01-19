import { CommonActions, createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';

import { useContext } from "react"
import { LoggedContext } from "../common/Context"
import { RootStack } from './RootStack';
import { AuthStack } from './Screens/AuthStack';

export const navigationRef = createNavigationContainerRef();

export const GlobalNav = (route) => {
    if (navigationRef.isReady()) {
        navigationRef.navigate(route);
    }

    // navigationRef.navigate(route);
}
export const GlobalNavwithParam = (route, param = {}) => {
    if (navigationRef.isReady()) {
        navigationRef.navigate(route, param);
    }

    // navigationRef.navigate(route);
}
export const GlobalNavWithResetStack = (route) => {
    navigationRef.dispatch(
        CommonActions.reset({
            index: 0,
            routes: [{ name: route }],
        })
    );
}
export const Stack = ({ }) => {
    const { logged } = useContext(LoggedContext);

    return (
        <NavigationContainer
            ref={navigationRef}
        >
           {logged ? <RootStack /> : <AuthStack />}
        </NavigationContainer>
    )
}