import React from "react";
import { SafeAreaView, Text, useWindowDimensions, View } from "react-native";
import Human from "../components/human";
import { basicDimensions, fonts } from "../styles/globalStyles";
import Prompt from "../components/Prompt";
import Button from "../components/Button";
import { neckParts } from "../data/humans";
import { styles } from "../styles/screenStyles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./RootStackParams";

type Props = NativeStackScreenProps<RootStackParamList, 'Neck'>;

const NeckScreen = ({navigation} : Props) => {
    const { width } = useWindowDimensions();
    const unit = width / basicDimensions.width;

    return <SafeAreaView style={styles.container}>
        <View style={styles.topPrompt}>
            <Prompt numberOfLines={2} unit={unit}>
                <Text style={{ fontFamily: fonts.Pretendard_Black }}>목</Text>이 불편하시군요. 어느 부위가 아프신가요?
            </Prompt>
        </View>
        <View style={styles.humanContainer} >
            <Human humans={neckParts} baseWidth={211.33} baseHeight={233.13}/>
        </View>
        <View style={styles.midPrompt}>
            <Prompt numberOfLines={1} unit={unit} underline>
                불편하신 부위를 모두 눌러주세요
            </Prompt>
        </View>
        <View style={styles.footer}>
            <Button ratio={width}>
                완료
            </Button>
            <Button ratio={width} onPress={() => navigation.goBack()}>
                돌아가기
            </Button>
        </View>
    </SafeAreaView>
}

export default NeckScreen;