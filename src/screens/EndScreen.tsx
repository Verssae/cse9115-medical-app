import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, useWindowDimensions, View } from "react-native";
import { basicDimensions } from "../styles/globalStyles";
import Prompt from "../components/Prompt";
import {Button, LargeButton} from "../components/Button";
import { styles } from "../styles/screenStyles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./RootStackParams";
import *  as Speech from 'expo-speech';
import { getAllStates, homeState, medicineState } from "../recoil/symptom";
import { useRecoilValue } from "recoil";

type Props = NativeStackScreenProps<RootStackParamList, 'EndScreen'>;



const EndScreen = ({ route, navigation }: Props) => {
    const medicine = useRecoilValue(medicineState);
    const home = useRecoilValue(homeState);
    const result = useRecoilValue(getAllStates);
    
    const { width, height } = useWindowDimensions();
    const unit = width / basicDimensions.width;
    const prompts = ["감사합니다. 예진을 완료하셨습니다. 진료까지 잠시만 기다려 주세요.", "감사합니다. 예진을 완료하셨습니다. 예약된 날짜에 내원하시기 바랍니다.", "감사합니다. 예진을 완료하셨습니다. 병원 방문 시 꼭 약 봉투를 챙겨오세요"]

    const prompt = home && medicine === '네' ? prompts[2] : home ? prompts[1] : prompts[0]
    useEffect(() => {
        Speech.speak(prompt, {
            rate: 0.9,
        })
    }, []);
    console.log(result);
    return <SafeAreaView style={styles.container}>
        <View style={styles.topPrompt}>
            <Prompt numberOfLines={2} unit={unit}>
                {prompt}
            </Prompt>
        </View>

        <View style={{
            flex: 10,
            // justifyContent: 'space-around',
            // alignItems: 'center'
        }}>
            
        </View>
        <View style={styles.midPrompt}>
           
        </View>
        <View style={styles.footer}>
            <Button unit={unit} callback={() => navigation.popToTop()}>
                완료
            </Button>
            <Button unit={unit} callback={() => navigation.goBack()}>
                돌아가기
            </Button>
        </View>
    </SafeAreaView>
}

export default EndScreen;