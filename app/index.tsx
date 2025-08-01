import { useRef } from "react";
import { Button } from "react-native";
import { AudioContext, OscillatorNode } from "react-native-audio-api";

const audioContext = new AudioContext();

export default function Index() {
  const nodeRef = useRef<OscillatorNode | null>(null);

  function bug(instantDisconnect: boolean, delayedDisconnect: boolean) {
    nodeRef.current?.disconnect();

    const node = audioContext.createOscillator();
    nodeRef.current = node;

    node.start();
    node.connect(audioContext.destination);
    if (instantDisconnect) {
      node.disconnect();
    }
    if (delayedDisconnect) {
      setTimeout(() => {
        node.disconnect();
      }, 100);
    }
  }

  return (
    <>
      <Button
        title="connect then instant disconnect without delayed retry"
        onPress={() => {
          bug(true, false);
        }}
      />
      <Button
        title="connect then instant disconnect with delayed retry"
        onPress={() => {
          bug(true, true);
        }}
      />
      <Button
        title="connect then delayed disconnect"
        onPress={() => {
          bug(false, true);
        }}
      />
      <Button
        title="disconnect"
        onPress={() => {
          nodeRef.current?.disconnect();
          nodeRef.current = null;
        }}
      />
    </>
  );
}
