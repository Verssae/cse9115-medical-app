import React, { useEffect, useState } from "react";
import { LayoutChangeEvent, SafeAreaView, Text, useWindowDimensions, View } from "react-native";
import { basicDimensions, colors, fonts } from "../styles/globalStyles";
import Prompt from "../components/Prompt";
import {Button} from "../components/Button";
import { styles } from "../styles/screenStyles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./RootStackParams";
import { ElbowTest, baseWidth, baseHeight } from "../data/elbowTest";
import Elbow from "../components/Elbow";
import { Slider } from "@miblanchard/react-native-slider";
import *  as Speech from 'expo-speech';
import { elbowFunctionTest } from "../data/selectables";
import { useRecoilState } from "recoil";
import { logState } from "../recoil/symptom";

type Props = NativeStackScreenProps<RootStackParamList, 'Stability'>;

const Stability = ({ route, navigation }: Props) => {

    const [log, setLog] = useRecoilState(logState);
    const { width, height } = useWindowDimensions();
    const unit = width / basicDimensions.width;

    const indicators = ["안정적", "불안정", "극심한 불안정"]

    const prompts = ["방금 팔을 움직이실 때 안정적으로 잘 움직이셨나요?", "버튼을 좌우로 움직여 안정성을 표시해주세요"];

    useEffect(() => {
        Speech.speak(prompts[0], {
            rate: 0.9,
            onDone: () => {
                Speech.pause()
                let timer = setTimeout(() => {
                    Speech.speak(prompts[1], { rate: 0.9 });
                    clearTimeout(timer);
                }, 2000);
            }
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
                {indicators[log.stability / 5]}
            </Text>
            <Slider value={log.stability} onValueChange={(value) => setLog({
                ...log,
                stability: typeof value === "number" ? value : value[0]
            })} maximumValue={10} minimumValue={0} step={5}
                renderTrackMarkComponent={(idx) => <View style={{
                    transform: [{translateY: unit * 10}]
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
                    }}>{idx}</Text>
                </View>}
                trackMarks={[0, 5, 10]}

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
            <Button unit={unit} callback={() => navigation.navigate('ElbowFunction', {
                data: elbowFunctionTest
            })}>
                다음
            </Button>
            <Button unit={unit} callback={() => navigation.goBack()}>
                돌아가기
            </Button>
        </View>
    </SafeAreaView>
}

export default Stability;