import React, { useEffect } from "react";
import { FlatList, SafeAreaView, useWindowDimensions, View } from "react-native";
import { basicDimensions } from "../styles/globalStyles";
import Prompt from "../components/Prompt";
import { Button, LargeButton } from "../components/Button";
import { styles } from "../styles/screenStyles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./RootStackParams";
import *  as Speech from 'expo-speech';
import { historyDuration } from "../data/selectables";
import { useRecoilState } from "recoil";
import { homeState } from "../recoil/states";
import { speak } from "../utils/speaker";

type Props = NativeStackScreenProps<RootStackParamList, 'Start'>;


const StartScreen = ({ route, navigation }: Props) => {
    const [home, setHome] = useRecoilState(homeState)
    const { width, height } = useWindowDimensions();
    const unit = width / basicDimensions.width;
    const prompts = ["안녕하세요? 예진을 시작하겠습니다.", "아직 내원 전이시면 왼쪽을, 병원에서 접수하셨다면 오른쪽 버튼을 눌러주세요"]


    useEffect(() => {
        speak(prompts.join(' '));
    }, []);

    return <SafeAreaView style={styles.container}>
        <View style={styles.topPrompt}>
            <Prompt numberOfLines={2} unit={unit}>
                {prompts[0]}
            </Prompt>
        </View>

        <View style={{
            flex: 10,
            // justifyContent: 'space-around',
            // alignItems: 'center'
        }}>

        </View>
        <View style={styles.midPrompt}>
            <Prompt numberOfLines={2} unit={unit} underline>
                {prompts[1]}
            </Prompt>
        </View>
        <View style={styles.footer}>
            <Button unit={unit} callback={() => {
                setHome(false);
                navigation.navigate("Select", {
                    data: historyDuration,
                })
            }}>
                현장 예진
            </Button>
            <Button unit={unit} callback={() => {
                setHome(true);
                navigation.navigate("Select", {
                    data: historyDuration,
                })
            }}>
                미리 예진
            </Button>
        </View>
    </SafeAreaView>
}

export default StartScreen;