import React, { useEffect, useState } from "react";
import { FlatList, LayoutChangeEvent, SafeAreaView, Text, TouchableHighlight, useWindowDimensions, View } from "react-native";
import { basicDimensions, colors, fonts } from "../styles/globalStyles";
import Prompt from "../components/Prompt";
import {Button, LargeButton} from "../components/Button";
import { styles } from "../styles/screenStyles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./RootStackParams";
import { ElbowTest, baseWidth, baseHeight } from "../data/elbowTest";
import Elbow from "../components/Elbow";
import { Slider } from "@miblanchard/react-native-slider";
import *  as Speech from 'expo-speech';

type Props = NativeStackScreenProps<RootStackParamList, 'ElbowFunction'>;

interface Selectable {
    top: string,
    candidates: string[],
    bot: string,
};

const data: Selectable = {
    top: '다음 팔꿈치를 사용해서 할 수 있는 일 중 혼자서 할 수 있는 일들을 모두 골라 주세요',
    candidates: [
        '머리 빗기',
        '식사',
        '셔츠 입기',
        '씻기',
        '신발 신기'
    ],
    bot: '혼자서 할 수 있는 일이 적힌 버튼을 모두 눌러 주세요'
}



const SelectScreen = ({ route, navigation }: Props) => {
    
    const [state, setState] = useState({
        value: 1
    });
    const { width, height } = useWindowDimensions();
    const unit = width / basicDimensions.width;

    useEffect(() => {
        Speech.speak(data.top, {
            rate: 0.9,
            onDone: () => {
                Speech.pause()
                let timer = setTimeout(() => {
                    Speech.speak(data.bot, { rate: 0.9 });
                    clearTimeout(timer);
                }, 2000);
            }
        })
    }, []);

    return <SafeAreaView style={styles.container}>
        <View style={styles.topPrompt}>
            <Prompt numberOfLines={2} unit={unit}>
                {data.top}
            </Prompt>
        </View>

        <View style={{
            flex: 10,
            // justifyContent: 'space-around',
            // alignItems: 'center'
        }}>
            <FlatList
                data={data.candidates}
                renderItem={({item}) => <LargeButton unit={unit} callback={() => Speech.speak(item, { rate: 0.9 })}><Text>{item}</Text></LargeButton> }
                keyExtractor={(item, index) => `${index}`}
            />
        </View>
        <View style={styles.midPrompt}>
            <Prompt numberOfLines={1} unit={unit} underline>
                {data.bot}
            </Prompt>
        </View>
        <View style={styles.footer}>
            <Button unit={unit}>
                완료
            </Button>
            <Button unit={unit} callback={() => navigation.goBack()}>
                돌아가기
            </Button>
        </View>
    </SafeAreaView>
}

export default SelectScreen;