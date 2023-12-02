import { useState } from "react";
import { StyleSheet,Text,View,FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

// SearchFilter data={DUMMY_DATA} input={Input} SetInput={handleInputUpdate}
const SearchFilter=({data,input,SetInput}) =>{
    const [shouldRender, setShouldRender] = useState(true);
    return (
        shouldRender && (
            <View style={{ marginTop: 10, maxHeight: 100 }}>
                <FlatList
                    data={data}
                    renderItem={({ item }) => {
                        if (item.title.trim().toLowerCase() === input.trim().toLowerCase() || input === "") {//輸入正確
                            setShouldRender(false);
                            return null;
                        }
                        if (item.title.trim().toLowerCase().match(input.trim().toLowerCase())) {//提示字
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                    SetInput(item.title);
                                    setShouldRender(false); // Hide SearchFilter after selecting an item
                                    }}
                                    style={{ marginVertical: 10 }}
                                >
                                <Text style={{ fontSize: 14, fontWeight: "bold" }}>{item.title}</Text>
                                <Text style={{ borderColor: "gray", borderWidth: 1, height: 1, marginTop: 5 }} />
                                </TouchableOpacity>
                            );
                        }
                    }}
                />
            </View>
        )
    );
}

export default SearchFilter
const styles=StyleSheet.create({})