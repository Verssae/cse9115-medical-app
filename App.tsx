import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SymptomScreen from "./src/screens/OverviewScreen";
import { colors, fonts } from "./src/styles/globalStyles";
import { RecoilRoot } from "recoil";
import { RootStackParamList } from "./src/screens/RootStackParams";
import DetailScreen from "./src/screens/DetailScreen";
import ElbowTestScreen from "./src/screens/ElbowTestScreen";
import PainScreen from "./src/screens/PainScreen";
import SelectScreen from "./src/screens/SelectScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const MyTheme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(255, 255, 255)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};

const App = () => {
  return (
    <RecoilRoot>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator initialRouteName="Overview" screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontFamily: fonts.Pretendard_Bold
          },
        }}>
          <Stack.Screen
            name="Overview"
            component={SymptomScreen}
            initialParams={{
              faced: true,
            }}
            options={{
              title: "불편한 부위 선택",
            }} />
            <Stack.Screen
            name="Detail"
            component={DetailScreen}
            options={({route}) => ({title: route.params.part})} />
            <Stack.Screen
            name="ElbowTest"
            component={ElbowTestScreen}
            options={({route}) => ({title: "팔꿈치 모션 테스트"})} />
            <Stack.Screen
            name="Pain"
            component={PainScreen}
            options={({route}) => ({title: "통증 정도 선택"})} />
            <Stack.Screen
            name="ElbowFunction"
            component={SelectScreen}
            />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  )
}

export default App;