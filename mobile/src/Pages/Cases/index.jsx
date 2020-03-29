import React, { useEffect, useState } from "react";
import { View, Image, Text, TouchableOpacity, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import api from "../../Services/api";

import style from "./style";
import imgLogo from "../../assets/logo.png";

export default function Cases() {
  const navigation = useNavigation();
  const [cases, setCases] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadCases() {
      if (loading) {
        return;
      }
      if (total > 0 && cases.length === total) {
        return;
      }

      setLoading(true);

      const response = await api.get("cases", {
        params: { page }
      });

      setCases([...cases, ...response.data]);
      setTotal(response.headers["x-total-cases"]);
      setPage(page + 1);
      setLoading(false);
    }

    loadCases();
  }, []);

  function navigateToDetail(cases) {
    navigation.navigate("Detail", { cases });
  }
  return (
    <View style={style.container}>
      <View style={style.header}>
        <Image style={style.imgLogo} source={imgLogo} />
        <Text style={style.headerText}>
          Total de casos:{" "}
          <Text style={style.headerTextBold}>{total} casos</Text>
        </Text>
      </View>

      <Text style={style.title}>Bem-vindo!!!</Text>
      <Text style={style.description}>
        Escolha um dos casos abaixo e ajudo um velhinho simpatico!
      </Text>

      <FlatList
        style={style.casesList}
        showsVerticalScrollIndicator={false}
        onEndReached={loading}
        onEndReachedThreshold={0.2}
        data={cases}
        keyExtractor={c => String(c.id)}
        renderItem={({ item: c }) => (
          <View style={style.case}>
            <Text style={style.caseProperty}>ONG:</Text>
            <Text style={style.caseValue}>{c.name}</Text>

            <Text style={style.caseProperty}>CASO:</Text>
            <Text style={style.caseValue}>{c.title}</Text>

            <Text style={style.caseProperty}>VALOR</Text>
            <Text style={style.caseValue}>R$ {c.value},00</Text>

            <TouchableOpacity
              style={style.detailsButton}
              onPress={() => navigateToDetail(cases)}
            >
              <Text style={style.detailsTextButton}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#285176" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
