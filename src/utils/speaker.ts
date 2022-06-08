import *  as Speech from 'expo-speech';

export async function speak(text: string, onDone?: () => void) {
    if (await Speech.isSpeakingAsync()) {
        Speech.stop();
    }
    Speech.speak(text, {
        rate: 0.9,
        onDone: onDone
    })
}