import {View,FlatList, RefreshControl } from "react-native"
import EventItem from "./event-item"
export default EventList =({data}) => {
  const datalist = data;
    const renderItem =({item,index}) =>{
        return <EventItem rID={item} 
                          rName={datalist.rName[index]} 
                          rMap_Score={datalist.rMap_Score[index]}
                          rPhone={datalist.rPhone[index]}
                          rAddress={datalist.rAddress[index]}
                          open={datalist.open[index]}
                          collect={datalist.collect[index]}
                          distance={datalist.distance[index]}/>
    }
    return (
        <View style={{ paddingLeft: 16,paddingRight:16,paddingTop:16, }}>
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
