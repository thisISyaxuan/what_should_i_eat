import {View,FlatList, RefreshControl } from "react-native"
import EventItem from "./event-item"
export default EventList =({data}) => {
//  console.log(data)
  const datalist = data;
//  console.log("?????????????")
//  console.log(datalist)
    const renderItem =({item,index}) =>{
        return <EventItem rID={datalist.rID[index]}
                          rName={datalist.rName[index]} 
                          rMap_Score={datalist.rMap_Score[index]}
                          rPhone={datalist.rPhone[index]}
                          rAddress={datalist.rAddress[index]}
                          open={datalist.open[index]}
                          collect={datalist.collect[index]}
                          distance={datalist.distance[index]}
                          labelID={datalist.BigLabel[index]}/>
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
