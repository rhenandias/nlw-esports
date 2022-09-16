import { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";

import logoImg from "../../assets/logo-nlw-esports.png";

import { Background } from "../../components/Background";
import { Heading } from "../../components/Heading";
import { DuoCard, DuoCardPros } from "../../components/DuoCard";

import { styles } from "./styles";
import { THEME } from "../../theme";

import { GameParams } from "../../@types/navigation";

export function Game() {
  const route = useRoute();
  const navigation = useNavigation();

  const [duos, setDuos] = useState<DuoCardPros[]>([]);

  const game = route.params as GameParams;

  useEffect(() => {
    fetch(`http://192.168.15.11:3000/games/${game.id}/ads`)
      .then((response) => response.json())
      .then((response) => setDuos(response));
  });

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <Background>
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleGoBack}>
              <Entypo
                name="chevron-thin-left"
                color={THEME.COLORS.CAPTION_300}
                size={20}
              />
            </TouchableOpacity>

            <Image source={logoImg} style={styles.logo} />

            <View style={styles.right} />
          </View>

          <Image
            source={{ uri: game.bannerUrl }}
            style={styles.cover}
            resizeMode="cover"
          />

          <Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />

          <FlatList
            horizontal
            data={duos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <DuoCard data={item} onConnect={() => {}} />
            )}
            contentContainerStyle={[
              duos.length > 0 ? styles.contentList : styles.emptyListContent,
            ]}
            showsHorizontalScrollIndicator={false}
            style={styles.containerList}
            ListEmptyComponent={() => (
              <Text style={styles.emptyListText}>
                Ainda não há anúncios publicados.
              </Text>
            )}
          />
        </SafeAreaView>
      </ScrollView>
    </Background>
  );
}
