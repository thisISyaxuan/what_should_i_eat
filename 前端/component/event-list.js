import { Text,View,FlatList, RefreshControl } from "react-native"
import EventItem from "./event-item"

export default EventList =({data}) => {
  const datalist = data.success;
    const renderItem =({item,index}) =>{
        return <EventItem rID={item} 
                          rName={datalist.rName[index]} 
                          rMap_Score={datalist.rMap_Score[index]}
                          rPhone={datalist.rPhone[index]}
                          rAddress={datalist.rAddress[index]}
                          open={datalist.open[index]}
                          distance={datalist.distance[index]}/>
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