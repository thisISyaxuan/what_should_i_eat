import { useState, useMemo } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const SearchFilter = ({ data, input, SetInput }) => {
    const [shouldRender, setShouldRender] = useState(true);

    // 使用 useMemo 來優化效能，只在 data 或 input 變化時重新計算
    const filteredData = useMemo(() => {
        if (!input.trim()) {
            return [];
        }

        // 對數據進行篩選和排序
        return data.filter(item =>
            item.title.includes(input.trim())
        ).sort((a, b) => {
            // 按照匹配順序排序
            return a.title.indexOf(input.trim()) - b.title.indexOf(input.trim());
        });
    }, [data, input]);

    return (
        shouldRender && (
            <View style={{ marginTop: 10, maxHeight: 100 }}>
                <FlatList
                    data={filteredData}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                SetInput(item.title);
                                setShouldRender(false); // 點擊後隱藏 SearchFilter
                            }}
                            style={{ marginVertical: 10 }}
                        >
                            <Text style={{ fontSize: 14, fontWeight: "bold" }}>{item.title}</Text>
                            <Text style={{ borderColor: "gray", borderWidth: 1, height: 1, marginTop: 5 }} />
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.id.toString()} // 假設每個項目有唯一的 id
                />
            </View>
        )
    );
}

export default SearchFilter;
const styles = StyleSheet.create({});
