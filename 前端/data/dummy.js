export const DUMMY_DATA =[
    {id: 1, title:'蘇媽媽湯圓',description:'545南投縣埔里鎮中正路309號'},
    {id: 2, title:'一燒丼燒肉專賣店',description:'545南投縣埔里鎮中正路309號'},
    {id: 3, title:'肯德基 南投埔里餐廳',description:' 545南投縣埔里鎮中正路340號'},
    {id: 4, title:'藝鍋物-埔里店',description:' 545南投縣埔里鎮中山路三段423號'},
    {id: 5, title:'鍋去啃 南投埔里店',description:'545南投縣埔里鎮南昌街271號'},
    {id: 6, title:'食神滷味-埔里中山店',description:'54556南投縣埔里鎮中山路二段358號'},
    {id: 7, title:'第七家餐廳',description:'545南投縣埔里鎮第七家餐廳的地址'},
    {id: 8, title:'第八家餐廳',description:'545南投縣埔里鎮第八家餐廳的地址'},
    {id: 9, title:'第九家餐廳',description:'545南投縣埔里鎮第九家餐廳的地址'},
    {id: 10, title:'第十家餐廳',description:'545南投縣埔里鎮第十家餐廳的地址'},
    {id: 11, title:'第十一家餐廳',description:'545南投縣埔里鎮第十一家餐廳的地址'},
    {id: 12, title:'第十二家餐廳',description:'545南投縣埔里鎮第十二家餐廳的地址'},
]
export const SearchRestaurant = (query) => {
    const searchTerm = query.toLowerCase();
    return DUMMY_DATA.filter(restaurant =>
      restaurant.title.toLowerCase().includes(searchTerm)
    );
  };