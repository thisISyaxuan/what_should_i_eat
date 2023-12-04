import { useState, useMemo } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const SearchFilter = ({ data, input, SetInput }) => {
    const [shouldRender, setShouldRender] = useState(true);

    // 使用 useMemo 來優化效能
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
        shouldRender && filteredData.length > 0 && (
            <View style={styles.resultContainer}>
                <FlatList
                    data={filteredData}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                SetInput(item.title);
                                setShouldRender(false); // 點擊後隱藏 SearchFilter
                            }}
                            style={styles.item}
                        >
                            <Text style={styles.itemText}>{item.title}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
        )
    );
}

export default SearchFilter;

const styles = StyleSheet.create({
    resultContainer: {
        marginTop: 10,
        maxHeight: 100,
        overflow: 'hidden', // 防止內容溢出
    },
    item: {
        marginVertical: 1,
        padding: 12,
        backgroundColor: '#f9f9f9', // 背景顏色
        width: 300, // 設置固定寬度
        marginLeft:30
    },
    itemText: {
        fontSize: 14,
        fontWeight: "bold",
        flexWrap: 'wrap', // 允許文本換行
    }
});
