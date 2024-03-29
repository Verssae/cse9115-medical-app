import React, { useEffect, useState } from "react";
import { LayoutChangeEvent, SafeAreaView, useWindowDimensions, View } from "react-native";
import Human from "../components/Human";
import { basicDimensions } from "../styles/globalStyles";
import Prompt from "../components/Prompt";
import { Button } from "../components/Button";
import { symptomsState, strifiedSymptomsState } from "../recoil/states";
import { useRecoilValue } from "recoil";
import { humans } from "../data/humans";
import { styles } from "../styles/screenStyles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./RootStackParams";
import { speak } from "../utils/speaker";

type Props = NativeStackScreenProps<RootStackParamList, 'Overview'>;

const SymptomScreen = ({ navigation, route }: Props) => {
    const { faced } = route.params;
    const direction = faced ? 'frontView' : 'backView';
    const strSymptoms = useRecoilValue(strifiedSymptomsState);
    const symptoms = useRecoilValue(symptomsState);
    const { width, height } = useWindowDimensions();
    const unit = width / basicDimensions.width;
    const [parentDimensions, setParentDimensions] = useState({
        width: 0,
        height: 0,
        x: 0,
        y: 0,
    });

    const prompts: string[] = ["마주보고 있는 그림에서, 불편하신 부위 주변을 눌러주세요", "뒤를 보고 있는 그림에서, 불편하신 부위 주변을 눌러주세요"];
    const prompt = faced? prompts[0] : prompts[1];
    useEffect(() => {
        speak(prompt);
    },[]);


    return <SafeAreaView style={styles.container}>
        <View style={styles.topPrompt}>
            <Prompt numberOfLines={2} unit={unit}>
                {prompt}
            </Prompt>
        </View>
        <View style={styles.humanContainer} onLayout={(e: LayoutChangeEvent) => setParentDimensions(e.nativeEvent.layout)}>
            <Human parts={humans[direction]} baseWidth={humans[direction][0].width} baseHeight={humans[direction][0].height} parentDimensions={parentDimensions} overview/>
        </View>

        <View style={styles.footer}>
            <Button unit={unit} callback={
                faced ? () => navigation.push('Overview', {
                    faced: false,
                }) :
                    symptoms.length > 0 ? () => navigation.push('Detail', {
                        part: symptoms[0].name,
                        index: 0
                    }) : () => speak("하나 이상의 부위를 눌러주세요")
            }>
                다음
            </Button>
            <Button unit={unit} callback={ () => navigation.goBack()}>
                돌아가기
            </Button>
        </View>
    </SafeAreaView>
}

export default SymptomScreen;