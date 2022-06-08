import React, { useEffect } from "react";
import { FlatList, SafeAreaView, useWindowDimensions, View } from "react-native";
import { basicDimensions } from "../styles/globalStyles";
import Prompt from "../components/Prompt";
import { Button, LargeButton } from "../components/Button";
import { styles } from "../styles/screenStyles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./RootStackParams";
import *  as Speech from 'expo-speech';
import { useRecoilState } from "recoil";
import { durationState } from "../recoil/states";
import { speak } from "../utils/speaker";

type Props = NativeStackScreenProps<RootStackParamList, 'ElbowFunction'>;


const ElbowFunctionScreen = ({ route, navigation }: Props) => {

    const { data } = route.params;
    const [duration, setDuration] = useRecoilState(durationState);
    const { width, height } = useWindowDimensions();
    const unit = width / basicDimensions.width;

    useEffect(() => {
        speak(data.top);
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
                renderItem={({ item }) => <LargeButton unit={unit} callback={() => speak(item)}>{item}</LargeButton>}
            />
        </View>
        <View style={styles.midPrompt}>
            <Prompt numberOfLines={1} unit={unit} underline>
                {data.bot}
            </Prompt>
        </View>
        <View style={styles.footer}>
            <Button unit={unit} callback={() => navigation.navigate("EndScreen")}>
                다음
            </Button>
            <Button unit={unit} callback={() => navigation.goBack()}>
                돌아가기
            </Button>
        </View>
    </SafeAreaView>
}

export default ElbowFunctionScreen;