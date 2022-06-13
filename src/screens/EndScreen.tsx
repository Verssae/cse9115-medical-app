import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, useWindowDimensions, View } from "react-native";
import { basicDimensions } from "../styles/globalStyles";
import Prompt from "../components/Prompt";
import { Button, LargeSingleButton } from "../components/Button";
import { styles } from "../styles/screenStyles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./RootStackParams";
import * as WebBrowser from 'expo-web-browser';

import { getAllStates, homeState, medicineState } from "../recoil/states";
import { useRecoilValue } from "recoil";
import { speak } from "../utils/speaker";

type Props = NativeStackScreenProps<RootStackParamList, 'EndScreen'>;

const EndScreen = ({ route, navigation }: Props) => {
    const medicine = useRecoilValue(medicineState);
    const home = useRecoilValue(homeState);
    const impressions = useRecoilValue(getAllStates);
    const [url, setUrl] = useState('');

    const { width, height } = useWindowDimensions();
    const unit = width / basicDimensions.width;
    const prompts = ["감사합니다. 예진을 완료하셨습니다. 진료까지 잠시만 기다려 주세요.", "감사합니다. 예진을 완료하셨습니다. 예약된 날짜에 내원하시기 바랍니다.", "감사합니다. 예진을 완료하셨습니다. 병원 방문 시 꼭 약 봉투를 챙겨오세요"]

    const openURL = async () => {
        let result = await WebBrowser.openBrowserAsync("http://172.17.77.136:5000/220610/%EC%A3%BC%ED%95%9C%EC%83%88_1998_07.html");
        console.log(result);
    };
    console.log(impressions);
    const prompt = home && medicine === '네' ? prompts[2] : home ? prompts[1] : prompts[0]
    useEffect(() => {

        speak(prompt);
        fetch('http://172.17.77.136:5000/post', {
            method: 'POST',
            credentials: 'same-origin',
            mode: 'same-origin',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(impressions)
        })
            .then(data => data.json())
            .then(({url}) => { setUrl(url);console.log(`http://${url}`) })
            .catch(reason => console.error(reason));
    }, []);

    return <SafeAreaView style={styles.container}>
        <View style={styles.topPrompt}>
            <Prompt numberOfLines={2} unit={unit}>
                {prompt}
            </Prompt>
        </View>

        <View style={{
            flex: 4,
            // justifyContent: 'space-around',
            // alignItems: 'center'
        }}>

        </View>
        <View style={[styles.midPrompt, {
            flex: 2,
        }]}>
            <Button unit={unit} callback={openURL}>
                예진표 확인
            </Button>
        </View>
        <View style={{
            flex: 4,
            // justifyContent: 'space-around',
            // alignItems: 'center'
        }}>
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