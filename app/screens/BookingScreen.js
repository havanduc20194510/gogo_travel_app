import { StyleSheet, Text, TextInput, View } from "react-native";
import TourCard from "../components/TourCard/TourCard";
import { ScrollView } from "react-native-gesture-handler";
import HideSearchInput from "../components/input/HideSearchInput";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Selector from "../components/input/Selector";
import DatePicker from "../components/picker/DatePicker";
import ButtonFullBgr from "../components/buttons/custom/ButtonFullBgr";


export default BookingScreen = () => {
  let image =
    "https://png.pngtree.com/background/20210710/original/pngtree-universal-world-travel-self-driving-tour-cartoon-background-picture-image_1053651.jpg";


  const [txtSearch, setTxtSearch] = useState("");
  const { t } = useTranslation();
  return (
    // container
    <View>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {/* search */}
        <View style={{ alignItems: "center" }}>
          {/* search field */}
          <View style={styles.boxSearchField}>
            <Text style={styles.txtTitleSearchField}>{t("Place")}</Text>
            <HideSearchInput
              onFocus={() => {
                console.log("on forcus");
              }}
              txtPlaceHolder={t("Type your mind")}
              value={txtSearch}
              onChangeText={(e) => {
                setTxtSearch(e);
                console.log(txtSearch);
              }}
              onClearData={() => {
                setTxtSearch("");
              }}
              style={styles.inputSearchField}
            ></HideSearchInput>
          </View>

          <View style={styles.boxSearchField}>
            <Text style={styles.txtTitleSearchField}>{t("Date")}</Text>
            <DatePicker></DatePicker>

          </View>


          <View style={styles.boxSearchField}>
            <Text style={styles.txtTitleSearchField}>{t("Activity")}</Text>
            <Selector></Selector>

          </View>

          <ButtonFullBgr title={t("Search")} fontSize={20} style={{ width: "60%" }} onPress={() => {
            console.log("Search");
          }}></ButtonFullBgr>
        </View>



        <TourCard image={image}></TourCard>
        <TourCard image={image}></TourCard>
        <TourCard image={image}></TourCard>
        <TourCard image={image}></TourCard>
        <TourCard image={image}></TourCard>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { borderRadius: 8, paddingHorizontal: 8, marginBottom: 20 },
  txtTitleSearchField: {
    fontSize: 16,
    width: "20%",
    // marginHorizontal: 30
  },
  boxSearchField: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 30
  },
  inputSearchField: {
    width: "75%",
    // backgroundColor: "#FFFBF6",
    marginHorizontal: 35,
    height: 45,
    paddingHorizontal: 10,
    borderColor: "red",
    borderBottomWidth: 0.5,
  }

});
