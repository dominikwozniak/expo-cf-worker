import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";

export function SignIn() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    if (!email || !password || !isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: email,
        password,
      });

      if (completeSignIn.status === "complete") {
        await setActive({ session: completeSignIn.createdSessionId });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <TextInput value={email} placeholder="E-mail" onChangeText={setEmail} />
      <TextInput
        value={password}
        placeholder="Password"
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={handleSignIn}>
        <Text>SIGN IN</Text>
      </TouchableOpacity>
    </View>
  );
}
