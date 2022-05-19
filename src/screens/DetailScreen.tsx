import React from "react";
import { SafeAreaView, Text, useWindowDimensions, View } from "react-native";
import { basicDimensions, fonts } from "../styles/globalStyles";
import Prompt from "../components/Prompt";
import Button from "../components/Button";
import { humans } from "../data/humans";
import { styles } from "../styles/screenStyles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./RootStackParams";
import Human from "../components/Human";

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const DetailScreen = ({ route, navigation }: Props) => {
    const { symptom } = route.params;
    console.log(symptom);
    const { width } = useWindowDimensions();
    const unit = width / basicDimensions.width;

    return <SafeAreaView style={styles.container}>
        <View style={styles.topPrompt}>
            <Prompt numberOfLines={2} unit={unit}>
                <Text style={{ fontFamily: fonts.Pretendard_Black }}>목</Text>이 불편하시군요. 어느 부위가 아프신가요?
            </Prompt>
        </View>
        <View style={styles.humanContainer} >
            <Human humans={humans['neck']} baseWidth={humans.neck[0].width} baseHeight={humans.neck[0].height} />
        </View>
        <View style={styles.midPrompt}>
            <Prompt numberOfLines={1} unit={unit} underline>
                불편하신 부위를 모두 눌러주세요
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

export default DetailScreen;