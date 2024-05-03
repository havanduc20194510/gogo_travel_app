import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Platform, TouchableOpacity } from "react-native";
import _ from "lodash";

import Styles from "../../components/Styles";

import FastImage from "react-native-fast-image";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

/**
 * @document
 * @param {number} size: kích thước avatar
 * @param {boolean} showEdit: hiển thị có cho upload hay ko
 * @returns {JSX.Element}
 * @constructor
 */
const AvatarPicker = ({ size = 100, showEdit = false }) => {
  const tag = "[AvatarPicker]";
  const { t } = useTranslation();

  const [isAvatarLoadFailed, setIsAvatarLoadFail] = useState(false);

  return (
    <TouchableOpacity
      disabled={!showEdit}
      activeOpacity={1}
      style={{
        ...Styles.Layout.columnCenter,
        width: size,
        height: size,
      }}
      onPress={() => {
        console.log("Change profile");
      }}
    >
      {/* default image */}
      <FastImage
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          position: "absolute",
        }}
        source={require("../../assets/images/imgDefaultAvatar.jpg")}
      />

      {showEdit && (
        <FontAwesome5
          name="edit"
          size={15}
          style={{ top: 20, left: 20 }}
        ></FontAwesome5>
      )}
    </TouchableOpacity>
  );
};

export default AvatarPicker;
