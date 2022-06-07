import React, { useState } from "react";
import { LayoutChangeEvent, SafeAreaView, Text, useWindowDimensions, View } from "react-native";
import { basicDimensions, colors, fonts } from "../styles/globalStyles";
import Prompt from "../components/Prompt";
import Button from "../components/Button";
import { styles } from "../styles/screenStyles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./RootStackParams";
import { ElbowTest, baseWidth, baseHeight } from "../data/elbowTest";
import Elbow from "../components/Elbow";
import { Slider } from "@miblanchard/react-native-slider";

type Props = NativeStackScreenProps<RootStackParamList, 'ElbowTest'>;

const ElbowTestScreen = ({ route, navigation }: Props) => {
    const [state, setState] = useState({
        value: 30
    });
    const { width, height } = useWindowDimensions();
    const unit = width / basicDimensions.width;
    const [parentDimensions, setParentDimensions] = useState({
        width: 0,
        height: 0,
        x: 0,
        y:0,
    });

    return <SafeAreaView style={styles.container}>
        <View style={styles.topPrompt}>
            <Prompt numberOfLines={2} unit={unit}>
                아래 그림과 같이 팔을 굽혀보세요. 아프지 않을 때까지 팔을 얼마나 굽히실 수 있나요?
            </Prompt>
        </View>
        <View style={[styles.humanContainer, {
            margin: 15,
            flex: 6,
        }]} onLayout={(e: LayoutChangeEvent) => setParentDimensions(e.nativeEvent.layout)}>
            <Elbow parts={ElbowTest} baseWidth={baseWidth} baseHeight={baseHeight} parentDimensions={parentDimensions} deg={state.value}/>
            
        </View>
        <View style={{
            flex: 2,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Slider value={state.value} onValueChange={(value) => setState({
                value: typeof value === "number" ? value : value[0]
            })} minimumValue={0} maximumValue={120} step={10}  renderTrackMarkComponent={(idx) => <View style={{
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
                }}>{idx*30}</Text>
            </View>}
            trackMarks={[0, 30, 60, 90, 120]}
            
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
            <Text style={{
                fontFamily: fonts.Pretendard_Bold,
                fontSize: unit * 30,
                textAlign: 'center',
                marginTop: unit * 30,
                
            }}>
                {`${state.value.toFixed(0)}도`}
            </Text>
        </View>
        <View style={[styles.midPrompt, {flex:2}]}>
            <Prompt numberOfLines={2} unit={unit} underline>
                버튼을 좌우로 움직여 최대로 움직일 수 있는 각도를 표시해주세요
            </Prompt>
        </View>
        <View style={styles.footer}>
            <Button unit={unit} callback={() => navigation.navigate("Pain", {
                test: "Elbow"
            })}>
                완료
            </Button>
            <Button unit={unit} callback={() => navigation.goBack()}>
                돌아가기
            </Button>
        </View>
    </SafeAreaView>
}

export default ElbowTestScreen;