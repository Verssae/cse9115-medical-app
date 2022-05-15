import React from "react";
import { SafeAreaView, Text, useWindowDimensions, View } from "react-native";
import Human from "../components/Human";
import { basicDimensions, fonts } from "../styles/globalStyles";
import Prompt from "../components/Prompt";
import Button from "../components/Button";
import { symptomsState,strifiedSymptomsState } from "../recoil/symptom";
import { useRecoilValue } from "recoil";
import { humans } from "../data/humans";
import { styles } from "../styles/screenStyles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./RootStackParams";

type Props = NativeStackScreenProps<RootStackParamList, 'Human'>;

const SymptomScreen = ({navigation} : Props) => {
    const strSymptoms = useRecoilValue(strifiedSymptomsState);
    const symptoms = useRecoilValue(symptomsState);
    const { width } = useWindowDimensions();
    const unit = width / basicDimensions.width;


    return <SafeAreaView style={styles.container}>
        <View style={styles.topPrompt}>
            <Prompt numberOfLines={2} unit={unit}>
                안녕하세요 <Text style={{ fontFamily: fonts.Pretendard_Black }}>김유신</Text>님! {strSymptoms} 
            </Prompt>
        </View>
        <View style={styles.humanContainer} >
            <Human humans={humans.body} baseWidth={317} baseHeight={756}/>
        </View>
        <View style={styles.midPrompt}>
            <Prompt numberOfLines={1} unit={unit} underline>
                불편하신 부위를 모두 눌러주세요
            </Prompt>
        </View>
        <View style={styles.footer}>
            <Button ratio={unit} onPress={() => {symptoms.length > 0 ? navigation.navigate('Detail', {
                symptom : `세부 ${symptoms[0]} 증상 선택`,
            }) : ''}}>
                완료
            </Button>
            <Button ratio={unit} onPress={() => navigation.goBack()}>
                돌아가기
            </Button>
        </View>
    </SafeAreaView>
}

export default SymptomScreen;