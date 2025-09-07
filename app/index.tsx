import { useRef, useState } from "react";
import { Button } from "react-native";
import { AudioManager, AudioRecorder } from "react-native-audio-api";

AudioManager.setAudioSessionOptions({
  iosCategory: "record",
});
AudioManager.requestRecordingPermissions();

export default function Index() {
  const recorderRef = useRef(
    new AudioRecorder({ sampleRate: 44100, bufferLengthInSamples: 441 })
  );
  const [isRecording, setIsRecording] = useState(false);

  return (
    <Button
      title={isRecording ? "Stop recording" : "Start recording"}
      onPress={() => {
        if (isRecording) {
          recorderRef.current.stop();
        } else {
          recorderRef.current.start();
        }
        setIsRecording((b) => !b);
      }}
    />
  );
}
