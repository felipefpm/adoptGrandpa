import React from "react";
import { Feather } from "@expo/vector-icons";
import { View, TouchableOpacity, Image, Text, Linking } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as MailComposer from "expo-mail-composer";

import style from "./style";
import imgLogo from "../../assets/logo.png";

export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute();

  const cases = route.params.cases;
  const message = `Olá ${cases.name}, estou entrando em contado, pois gostaria de me tornar um netiho e ajudar com o valor de R$${cases.value},00`;
  console.log(cases[0].email);
  function returnCases() {
    navigation.goBack();
  }

  function sendMail() {
    MailComposer.composeAsync({
      subject: "Netinho: Velhinho",
      recipients: [cases.email],
      body: message
    });
  }

  function sendWhatsapp() {
    Linking.openURL(
      `whatsapp://send?phone=55${cases.whatsapp}&text=${message}`
    );
  }

  return (
    <View style={style.container}>
      <View style={style.header}>
        <TouchableOpacity onPress={returnCases}>
          <Feather name="arrow-left" size={28} color="#285176" />
        </TouchableOpacity>
        <Image source={imgLogo} />
      </View>

      <View style={style.case}>
        <Text style={[style.caseProperty, { marginTop: 0 }]}>ONG:</Text>
        <Text style={style.caseValue}>{cases.name}</Text>

        <Text style={style.caseProperty}>CASO:</Text>
        <Text style={style.caseValue}>{cases.title}</Text>

        <Text style={style.caseProperty}>VALOR</Text>
        <Text style={style.caseValue}>R$ {cases.value},00</Text>
      </View>

      <View style={style.caseBox}>
        <Text style={style.title}>Ajude um Velhinho</Text>
        <Text style={style.title}>Seja um netinho para esse vozinho(a)</Text>

        <Text style={style.description}>Entre em contato:</Text>

        <View style={style.actions}>
          <TouchableOpacity style={style.action} onPress={sendWhatsapp}>
            <Text style={style.actionText}>Whatsapp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.action} onPress={sendMail}>
            <Text style={style.actionText}>Email</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
