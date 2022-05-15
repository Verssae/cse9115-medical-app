import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SymptomScreen from "./src/screens/SymptomScreen";
import { colors, fonts } from "./src/styles/globalStyles";
import { RecoilRoot, atom } from "recoil";
import NeckScreen from "./src/screens/NeckScreen";
import { RootStackParamList } from "./src/screens/RootStackParams";
import DetailScreen from "./src/screens/DetailScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Human" screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontFamily: fonts.Pretendard_Bold
          },
        }}>
          <Stack.Screen
            name="Human"
            component={SymptomScreen}
            options={{
              title: "불편한 부위 선택",
            }} />
          <Stack.Screen
            name="Neck"
            component={NeckScreen}
            options={{
              title: "불편한 목 부위 선택",
            }} />
            <Stack.Screen
            name="Detail"
            component={DetailScreen}
            options={({route}) => ({title: route.params.symptom})} />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  )
}

export default App;