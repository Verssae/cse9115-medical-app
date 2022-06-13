import React, { useEffect, useState } from "react";
import { LayoutChangeEvent, SafeAreaView, useWindowDimensions, View } from "react-native";
import { basicDimensions } from "../styles/globalStyles";
import Prompt from "../components/Prompt";
import { Button } from "../components/Button";
import { humans, ToKorean } from "../data/humans";
import { styles } from "../styles/screenStyles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./RootStackParams";
import Human from "../components/Human";
import { useRecoilValue } from "recoil";
import { detailSymptoms, symptomsState } from "../recoil/states";
import * as Speech from 'expo-speech';
import { speak } from "../utils/speaker";

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const DetailScreen = ({ route, navigation }: Props) => {
    const { part, index, test } = route.params;
    const symptoms = useRecoilValue(detailSymptoms);
    const overviewSymptoms = useRecoilValue(symptomsState);
    const { width } = useWindowDimensions();
    const [parentDimensions, setParentDimensions] = useState({
        width: 0,
        height: 0,
        x: 0,
        y: 0,
    });
    const unit = width / basicDimensions.width;

    let name = ['arm', 'leg', 'chest', 'back', 'waist', 'chest'].includes(part) ? ToKorean[part] : part;
    let prompts = [`${name} 중에서 어느 부위가 불편하신가요?`, "불편하신 부위를 모두 눌러주세요"];

    useEffect(() => {
        speak(prompts.join(' '));
    }, []);

    return <SafeAreaView style={styles.container}>
        <View style={styles.topPrompt}>
            <Prompt numberOfLines={2} unit={unit}>
                {prompts[0]}
            </Prompt>
        </View>
        <View style={[styles.humanContainer, {
            // margin: 15,
        }]} onLayout={(e: LayoutChangeEvent) => setParentDimensions(e.nativeEvent.layout)}>
            <Human parts={humans[part]} baseWidth={humans[part][0].width} baseHeight={humans[part][0].height} parentDimensions={parentDimensions} />
        </View>
        <View style={styles.midPrompt}>
            <Prompt numberOfLines={1} unit={unit} underline>
                {prompts[1]}
            </Prompt>
        </View>
        <View style={styles.footer}>
            <Button unit={unit} callback={symptoms.length > 0 ? (
                overviewSymptoms.length > index + 1 ?
                    () => navigation.push("Detail", {
                        part: overviewSymptoms[index + 1].name,
                        index: index + 1,
                        test: symptoms.find(({ name }) => name === "팔꿈치") ? "ElbowTest" : undefined
                    }) :
                    () => {
                        navigation.navigate("Duration", {
                            test: symptoms.find(({ name }) => name === "팔꿈치") ? "ElbowTest" : undefined
                        })
                    }) : () => speak("하나 이상의 부위를 눌러주세요.")}>
                다음
            </Button>
            <Button unit={unit} callback={() => navigation.goBack()}>
                돌아가기
            </Button>
        </View>
    </SafeAreaView>
}

export default DetailScreen;