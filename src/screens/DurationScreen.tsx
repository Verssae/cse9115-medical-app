import React, { useEffect } from "react";
import { SafeAreaView, Text, useWindowDimensions, View } from "react-native";
import { basicDimensions, colors, fonts } from "../styles/globalStyles";
import Prompt from "../components/Prompt";
import { Button } from "../components/Button";
import { styles } from "../styles/screenStyles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./RootStackParams";
import { Slider } from "@miblanchard/react-native-slider";
import *  as Speech from 'expo-speech';
import { logState } from "../recoil/states";
import { useRecoilState } from "recoil";
import { speak } from "../utils/speaker";

type Props = NativeStackScreenProps<RootStackParamList, 'Duration'>;

const DurationScreen = ({ route, navigation }: Props) => {
    const { test } = route.params;

    const [log, setLog] = useRecoilState(logState);

    const { width, height } = useWindowDimensions();
    const unit = width / basicDimensions.width;

    const indicators = ['3일 이내', '일주일 이내', '1개월 이내', '3개월 이내', '1년 이내', '1년 이상'];
    const indices = ['3일', '7일', '1개월', '3개월', '1년 이내', '이상'];

    const prompts = ["언제부터 통증이 시작되었나요?", "버튼을 좌우로 움직여 통증 경과일을 표시해주세요"];

    useEffect(() => {
        speak(prompts[0], () => {
            Speech.pause();
            let timer = setTimeout(() => {
                Speech.speak(prompts[1], { rate: 0.9 });
                clearTimeout(timer);
            }, 1000);
        });
    }, []);

    return <SafeAreaView style={styles.container}>
        <View style={styles.topPrompt}>
            <Prompt numberOfLines={2} unit={unit}>
                {prompts[0]}
            </Prompt>
        </View>

        <View style={{
            flex: 10,
            justifyContent: 'space-around',
            alignItems: 'center'
        }}>
            <Text style={{
                fontFamily: fonts.Pretendard_Bold,
                fontSize: unit * 30,
                textAlign: 'center',
                marginTop: 10
            }}>
                {indicators[log.duration]}
            </Text>
            <Slider value={log.duration} onValueChange={(value) => setLog({
                ...log,
                duration: typeof value === "number" ? value : value[0]
            })} maximumValue={5} minimumValue={0} step={1}
                renderTrackMarkComponent={(idx) => <View style={{
                    transform: [{ translateY: unit * 10 }]
                }}><View style={{
                    width: unit * 3,
                    height: unit * 40,
                    backgroundColor: 'black',
                    transform: [{
                        translateX: unit * 15,
                    }]
                }}></View>
                    <Text style={{
                        fontFamily: fonts.Pretendard_Bold,
                        fontSize: unit * 15,
                        textAlign: 'center',
                        transform: [{
                            translateX: unit * 12
                        }]
                    }}>{indices[idx]}</Text>
                </View>}
                trackMarks={[0, 1, 2, 3, 4, 5]}

                trackStyle={{

                }} containerStyle={{
                    width: "90%",
                    height: unit * 40,
                }} thumbStyle={{
                    width: unit * 30,
                    height: unit * 30,
                    borderRadius: 40,
                    backgroundColor: colors.primary,
                    borderColor: 'black',
                    borderWidth: unit * 3,
                }} />

        </View>
        <View style={styles.midPrompt}>
            <Prompt numberOfLines={1} unit={unit} underline>
                {prompts[1]}
            </Prompt>
        </View>
        <View style={styles.footer}>
            <Button unit={unit} callback={() => navigation.navigate('Pain', test ? {
                test: test
            } : {})}>
                다음
            </Button>
            <Button unit={unit} callback={() => navigation.goBack()}>
                돌아가기
            </Button>
        </View>
    </SafeAreaView>
}

export default DurationScreen;
