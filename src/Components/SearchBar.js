import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";

const SearchBar = ({ onSubmit }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = () => {
    if (searchTerm.trim()) {
      onSubmit(searchTerm);
      setSearchTerm(""); // Xóa từ khóa sau khi gửi
    }
  };

  return (
    <View style={styles.background}>
      <AntDesign name="search1" style={styles.Icon} />
      <TextInput
        style={styles.input}
        placeholder="Search Books..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSubmitEditing={handleSubmit} // Gọi handleSubmit khi nhấn Enter
      />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    width: "95%",
    alignSelf: "center",
    height: 60,
    flexDirection: "row",
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 3,
  },
  Icon: {
    marginLeft: 10,
    fontSize: 24,
    color: "black",
    alignSelf: "center",
  },
  input: {
    flex: 1, // Sử dụng flex để input chiếm không gian còn lại
    height: "80%",
    alignSelf: "center",
    paddingLeft: 5,
    marginLeft: 5,
  },
});

export default SearchBar;
