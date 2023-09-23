import { Text,View,FlatList, RefreshControl } from "react-native"
import { DUMMY_DATA } from "../data/dummy"

import EventItem from "./event-item"

export default EventList =({data}) => {
  const datalist = data.success;
  console.log("測試資料:",datalist);
    const renderItem =({item,index}) =>{
        return <EventItem rID={item} rName={datalist.rName[index]} rAddress={datalist.rAddress[index]}/>
    }
    return (
        <View>
            <FlatList 
              data={datalist.rID}
              keyExtractor={item=> item.toString()}
              renderItem={renderItem}
              refreshControl={
                <RefreshControl
                refreshing={false}
                onRefresh={()=> console.log('refreshing...')}
                />
              }
            />
        </View>
    )
}