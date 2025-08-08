import { Button } from "react-native";
import { AudioManager } from "react-native-audio-api";

export default function Index() {
  return (
    <Button
      title="crash"
      onPress={() => {
        AudioManager.requestRecordingPermissions();
      }}
    />
  );
}
