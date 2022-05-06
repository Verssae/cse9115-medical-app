import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import Human from "../components/human";
import { basicDimensions, colors, fonts } from "../styles/globalStyles";
import Prompt from "../components/Prompt";
import Button from "../components/Button";
import { strifiedSymptomsState } from "../recoil/symptom";
import { useRecoilValue } from "recoil";
import { humans } from "../data/humans";
import { styles } from "../styles/screenStyles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./RootStackParams";

type Props = NativeStackScreenProps<RootStackParamList, 'Human'>;

const SymptomScreen = ({navigation} : Props) => {
    const symptoms = useRecoilValue(strifiedSymptomsState);
    let { width, height } = useWindowDimensions();
    width = width / basicDimensions.width;
    height = height / basicDimensions.height;

    return <SafeAreaView style={styles.container}>
        <View style={styles.topPrompt}>
            <Prompt numberOfLines={2} style={{
                fontSize: width * 100,
                margin: width * 10
            }}>
                안녕하세요 <Text style={{ fontFamily: fonts.Pretendard_Black }}>김유신</Text>님! {symptoms} 
            </Prompt>
        </View>
        <View style={styles.humanContainer} >
            <Human humans={humans} baseWidth={317} baseHeight={756}/>
        </View>
        <View style={styles.midPrompt}>
            <Prompt numberOfLines={1} style={{
                fontSize: width * 100,
                margin: width * 5,
                marginLeft: width * 10,
                marginRight: width * 10,
                textDecorationLine: 'underline',
                fontFamily: fonts.Pretendard_Medium
            }}>
                불편하신 부위를 모두 눌러주세요
            </Prompt>
        </View>
        <View style={styles.footer}>
            <Button ratio={width} onPress={() => navigation.navigate('Neck')}>
                완료
            </Button>
            <Button ratio={width} onPress={() => navigation.goBack()}>
                돌아가기
            </Button>
        </View>
    </SafeAreaView>
}

export default SymptomScreen;