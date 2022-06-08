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
import StabilityScreen from "./src/screens/StabilityScreen";
import { ToKorean } from "./src/data/humans";
import DurationScreen from "./src/screens/DurationScreen";
import EndScreen from "./src/screens/EndScreen";
import StartScreen from "./src/screens/StartScreen";
import ElbowFunctionScreen from "./src/screens/ElbowFunctionScreen";

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
        <Stack.Navigator initialRouteName="Start" screenOptions={{
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
            options={({route}) => ({title: '불편한 '+(['arm', 'leg', 'chest', 'back', 'waist', 'chest'].includes(route.params.part) ? ToKorean[(route.params.part)] : route.params.part) + ' 부위 선택' })} />
            <Stack.Screen
            name="ElbowTest"
            component={ElbowTestScreen}
            options={({route}) => ({title: "팔꿈치 움직임 테스트"})} />
            <Stack.Screen
            name="Duration"
            component={DurationScreen}
            options={({route}) => ({title: "통증 경과일 선택"})} />
            <Stack.Screen
            name="Pain"
            component={PainScreen}
            options={({route}) => ({title: "통증 정도 선택"})} />
            <Stack.Screen
            name="Stability"
            options={({route}) => ({title: "관절 안정성 테스트"})}
            component={StabilityScreen}
            />
            <Stack.Screen
            name="Select"
            options={({route}) => ({title: route.params.data.name})}
            component={SelectScreen}
            />
            <Stack.Screen
            name="ElbowFunction"
            options={({route}) => ({title: route.params.data.name})}
            component={ElbowFunctionScreen}
            />
            <Stack.Screen
            name="EndScreen"
            options={({route}) => ({title: "예진 완료"})}
            component={EndScreen}
            />
            <Stack.Screen
            name="Start"
            options={({route}) => ({title: "예진 시작"})}
            component={StartScreen}
            />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  )
}

export default App;