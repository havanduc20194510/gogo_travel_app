import { Alert, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Modal from "react-native-modal";
import { useState } from "react";
import ButtonHasBorder from "../../buttons/custom/ButtonHasBorder";
import ButtonFullBgr from "../../buttons/custom/ButtonFullBgr";
/**
 * @param {boolean} show: hiển thị modal
 * @param {function} onHide: close modal
 * @param {function} onButton: sự kiện button
 * @param {function} onBeforeBtnClick: sự kiện beforeBtn
 * @param {string} textBeforeBtn: text của beforeBtn
 * @param {string} textButton: title của item (required)
 * @param {string} title: title của item (required)
 * @param {time} description: thời gian của item (required)
 * @returns
 */
function EmptyFlatList({
  show,
  onHide,
  title,
  description,
  textButton,
  onButton,
  textBeforeBtn,
  onBeforeBtnClick,
  children,
}) {
  return (
    <View>
      <Modal isVisible={show} onBackdropPress={() => onHide()}>
        <View style={{ backgroundColor: "#FFF", borderRadius: 12 }}>
          <View>
            <View style={{ marginVertical: 10 }}>
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: 600,
                  color: "#000",
                  marginBottom: 20,
                }}
              >
                {title}
              </Text>
              <Text
                style={{ textAlign: "center", fontWeight: 400, color: "#000" }}
              >
                {children}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 20,
                marginHorizontal: 20,
              }}
            >
              <ButtonFullBgr
                title={textButton}
                width="100%"
                onPress={() => {
                  onButton();
                }}
              ></ButtonFullBgr>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
export default EmptyFlatList;
