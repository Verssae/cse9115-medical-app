import React, { useState } from "react";
import { LayoutChangeEvent, SafeAreaView, Text, useWindowDimensions, View } from "react-native";
import { basicDimensions, fonts } from "../styles/globalStyles";
import Prompt from "../components/Prompt";
import Button from "../components/Button";
import { humans } from "../data/humans";
import { styles } from "../styles/screenStyles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./RootStackParams";
import Human from "../components/Human";
import { useRecoilValue } from "recoil";
import { strifiedSymptomsState, symptomsState } from "../recoil/symptom";

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const DetailScreen = ({ route, navigation }: Props) => {
    const { part } = route.params;
    const strSymptoms = useRecoilValue(strifiedSymptomsState);
    const symptoms = useRecoilValue(symptomsState);
    const { width } = useWindowDimensions();
    const [parentDimensions, setParentDimensions] = useState({
        width: 0,
        height: 0,
        x: 0,
        y:0,
    });
    const unit = width / basicDimensions.width;

    // console.log(parentDimensions);

    return <SafeAreaView style={styles.container}>
        <View style={styles.topPrompt}>
            <Prompt numberOfLines={2} unit={unit}>
                {strSymptoms}
            </Prompt>
        </View>
        <View style={[styles.humanContainer, {
            // margin: 15,
        }]} onLayout={(e: LayoutChangeEvent) => setParentDimensions(e.nativeEvent.layout)}>
            <Human parts={humans[part]} baseWidth={humans[part][0].width} baseHeight={humans[part][0].height} parentDimensions={parentDimensions} />
        </View>
        <View style={styles.midPrompt}>
            <Prompt numberOfLines={1} unit={unit} underline>
                불편하신 부위를 모두 눌러주세요
            </Prompt>
        </View>
        <View style={styles.footer}>
            <Button unit={unit} callback={() => {
                if (symptoms.find(({name}) => name === "팔꿈치")){
                    navigation.navigate("ElbowTest");
                } else {
                    navigation.navigate("Pain", {});
                }
            }}>
                완료
            </Button>
            <Button unit={unit} callback={() => navigation.goBack()}>
                돌아가기
            </Button>
        </View>
    </SafeAreaView>
}

export default DetailScreen;