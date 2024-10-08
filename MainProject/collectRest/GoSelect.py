import pandas as pd
import pymysql
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from numpy import dot, sin, cos, arccos, pi, round
from numpy.linalg import norm
import datetime

# ------------
labelDict = {}
labelDict['米食'] = ['米苔目', '米粉', '米麩', '米糕', '合菜', '便當', '草仔粿', '碗粿', '粿仔條', '爆米香', '壽司', '粥', '湯圓', '咖哩', '熱炒', '鐵板燒', '丼飯', '拌飯', '油飯', '排肉飯', '排骨飯', '飯', '飯捲', '飯糰', '豬腳飯', '燉飯', '燒肉飯', '燴飯', '雞肉飯', '爌肉飯', '羹飯']
labelDict['麵食'] = ['刀削麵', '三明治', '切仔麵', '水煎包', '水餃', '牛肉麵', '包子', '可頌', '生吐司', '合菜', '吐司', '咖哩', '披薩', '拉麵', '油條', '炒泡麵', '炒麵', '炸醬麵', '烏龍麵', '乾麵', '排肉麵', '涼麵', '麻辣拌麵', '麻醬麵', '湯包', '湯麵', '筆管麵', '陽春麵', '傻瓜麵', '意麵', '煎餃', '義大利麵', '蒸餃', '潛艇堡', '熱炒', '蔥抓餅', '蔥油餅', '擔仔麵', '燒餅', '鍋貼', '鍋燒麵', '雞蛋糕', '雞絲麵', '鬆餅', '羹麵', '饅頭', '麵', '麵包', '麵線', '鐵板麵']
labelDict['中式'] = ['刀削麵', '小菜', '小籠包', '切仔麵', '月餅', '水煎包', '水餃', '牛肉麵', '冬粉', '包子', '台式', '合菜', '米苔目', '米粉', '米麩', '米糕', '羊肉羹', '羊肉爐', '肉羹', '自助餐', '抄手', '咖哩', '油條', '油飯', '炒泡麵', '炒麵', '虱目魚焿', '便當', '炸醬麵', '臭豆腐', '草仔粿', '乾麵', '排肉飯', '排肉麵', '排骨飯', '涼麵', '魚丸羹', '麻油雞', '麻辣拌麵', '麻辣燙', '麻辣鴨血', '麻醬麵', '湯包', '湯包', '湯圓', '湯麵', '粥', '陽春麵', '飯糰', '傻瓜麵', '意麵', '煎餃', '當歸雞', '碗粿', '粿仔條', '蒸餃', '酸辣粉', '潤餅', '熱炒', '蔥抓餅', '蔥油餅', '豬腳', '豬腳飯', '魷魚羹', '擔仔麵', '燒肉飯', '燒餅', '鴨肉', '燴飯', '薑母鴨', '鍋貼', '鍋燒麵', '簡餐', '雞肉飯', '雞蛋糕', '雞湯', '雞絲麵', '鵝肉', '爆米香', '爌肉飯', '羹飯', '羹麵', '饅頭', '麵線', '鐵板麵', '中式']
labelDict['西式'] = ['牛排', '可頌', '沙拉', '沙威瑪', '披薩', '法式', '焗烤', '焗烤', '提拉米蘇', '舒芙蕾', '溫沙拉', '義大利麵', '義式', '潛艇堡', '燉飯', '鬆餅', '鹹派', '西式']
labelDict['日式'] = ['丼飯', '生魚片', '咖哩', '居酒屋', '拉麵', '壽司', '關東煮', '鐵板燒', '日式']
labelDict['越式'] = ['河粉', '涼拌', '越式']
labelDict['美式'] = ['三明治', '奶昔', '漢堡', '潛艇堡', '美式']
labelDict['客家料理'] = ['合菜', '客家料理', '粿仔條']
labelDict['泰式'] = ['泰式']
labelDict['韓式'] = ['拌飯', '韓式']
labelDict['港式'] = ['燒賣', '燒臘', '港式']
labelDict['速食'] = ['速食']
labelDict['素食'] = ['素食']
labelDict['早餐'] = ['三明治', '切仔麵', '水煎包', '包子', '可頌', '吐司', '早午餐', '米粉', '自助餐', '抓餅', '沙拉', '沙拉', '豆漿', '油條', '炒麵', '炒麵', '捲餅', '捲餅', '蛋餅', '蛋餅', '飯糰', '碗粿', '義大利麵', '漢堡', '漢堡', '蔥抓餅', '蔥油餅', '燉飯', '燒餅', '燒餅', '燒餅', '鍋貼', '饅頭', '鹹豆漿', '鹹豆漿', '鹹油條', '麵線', '鐵板麵', '蘿蔔糕', '早餐']
labelDict['冰品'] = ['冰淇淋', '冰沙', '剉冰', '蛋綿冰', '雪花冰', '雪綿冰']
labelDict['飲料'] = ['奶昔', '白木耳吸凍', '冰沙', '杏仁茶', '豆漿', '果汁', '茶', '飲料']
labelDict['咖啡'] = ['咖啡']
labelDict['甜點'] = ['月餅', '半月燒', '布丁', '冰沙', '冰淇淋', '吐司', '肉桂捲', '豆花', '剉冰', '紅豆餅', '紅薯餅', '烤糰子', '涼圓', '涼圓', '甜甜圈', '甜湯', '甜點', '蛋塔', '蛋綿冰', '蛋糕', '雪花冰', '雪綿冰', '麻糬', '提拉米蘇', '湯圓', '舒芙蕾', '餅乾', '燒仙草', '雞蛋糕', '鬆餅', '爆米香', '麵茶']
labelDict['鹹點'] = ['三角餅', '大腸包小腸', '水煎包', '肉圓', '抓餅', '沙威瑪', '拉餅', '胡椒餅', '烤玉米', '草仔粿', '章魚燒', '蛋餅', '湯包', '潤餅', '蔥抓餅', '蔥油餅', '點心', '關東煮', '鹹豆漿', '鹹油條', '鹹派', '蘿蔔糕', '鹽水雞']
labelDict['湯品'] = ['羊肉羹', '羊肉爐', '肉羹', '虱目魚焿', '魚丸羹', '麻油雞', '麻辣燙', '湯', '當歸雞', '魷魚羹', '薑母鴨', '雞湯']
labelDict['滷味'] = ['鴨肉', '麻辣燙', '麻辣鴨血', '滷味']
labelDict['炸物'] = ['臭豆腐', '鹹酥雞', '鹹油條', '油條', '炸物']
labelDict['烤物'] = ['烤鴨', '烤糰子', '烤物']
labelDict['鍋物'] = ['羊肉爐', '麻油雞', '薑母鴨', '鍋物']
labelDict['健康餐'] = ['健康餐']
labelDict['無菜單料理'] = ['無菜單料理']
labelDict['寵物餐廳'] = ['寵物餐廳']
labelDict['酒'] = ['酒']
labelDict['吃到飽餐廳'] = ['吃到飽餐廳']
# ---------

# 連線資料庫
db = pymysql.connect(host='localhost', port=3306, user='root', passwd='', db='what_should_i_eat')
cursor = db.cursor()

def get_pd(tabel_name, index, uID):
    # 取得資料
    if (uID != "NULL"):
        sql = f"SELECT * FROM {tabel_name} WHERE uID = {uID}"
    else:
        sql = f"SELECT * FROM {tabel_name}"
    cursor.execute(sql)
    result = cursor.fetchall() # tuple
    # 查欄位名稱
    sql = f"SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '{tabel_name}'"
    cursor.execute(sql)
    columns = [row[0] for row in cursor.fetchall()]
    # tuple 轉 pd
    result = pd.DataFrame(result, columns=columns)
    if (index != 'NULL'):
        result.set_index(index, inplace=True)
    # print(result)
    return result

def checkTime(Restaurant):
    Restaurant.insert(Restaurant.shape[1], 'open', 0)
    date = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']
    day_of_week = datetime.datetime.today().weekday()
    currentTime = datetime.datetime.now().time()
    for rID, row in Restaurant.iterrows():
        RestaurantTime = row[date[day_of_week]].split(';')
        openCheck = [False] * len(RestaurantTime)
        # print(RestaurantTime)
        for index,eachTime in enumerate(RestaurantTime):
            eachTime = eachTime.strip().split('~')
            # print(eachTime)
            if (eachTime != ['']):
                start_time = datetime.time(int(eachTime[0].split(':')[0]), int(eachTime[0].split(':')[1][0]), int(eachTime[0].split(':')[1][1]))
                # print(eachTime[0].split(':')[0])
                # print(eachTime[0].split(':')[1][0])
                # print(eachTime[0].split(':')[1][1])
                end_time = datetime.time(int(eachTime[1].split(':')[0]), int(eachTime[1].split(':')[1][0]), int(eachTime[1].split(':')[1][1]))
                if (start_time <= currentTime <= end_time):
                    openCheck[index] = True
                else:
                    openCheck[index] = False
        # print(openCheck)
        if (True not in openCheck):
            Restaurant.at[rID, 'open'] = -1
        else:
            Restaurant.at[rID, 'open'] = 1
    Restaurant = Restaurant.drop(date, axis=1)
    return Restaurant

def checkDistance(userPos, Restaurant):
    Restaurant.insert(Restaurant.shape[1], 'distance', 0.1111)
    # [lat, lng]
    for rID, row in Restaurant.iterrows():
        # 測試
        resPos = [23.968, 120.959]
        # resPos = [Restaurant.loc[rID, 'lat'], Restaurant.loc[rID, 'lng']]
        # print(type(userPos[1]), type(resPos[1]))
        theta = userPos[1]-resPos[1]
        distance = 60 * 1.1515 * rad2deg(
            arccos(
                (sin(deg2rad(userPos[0])) * sin(deg2rad(resPos[0]))) +
                (cos(deg2rad(userPos[0])) * cos(deg2rad(resPos[0])) * cos(deg2rad(theta)))
            )
        )
        Restaurant.loc[rID, 'distance'] = round(distance * 1.609344, 2)
        # print(Restaurant.loc[rID, 'distance'])
    return Restaurant

def rad2deg(radians):
    degrees = radians * 180 / pi
    return degrees

def deg2rad(degrees):
    radians = degrees * pi / 180
    return radians

def replaceAllLabel(Restaurant):
    global labelDict
    # print(Restaurant)
    for rID, row in Restaurant.iterrows():
        thisLabel = row['all_label'].split(",")[0]
        for key, values in labelDict.items():
            if (thisLabel in values):
                Restaurant.loc[rID, 'all_label'] = key
                continue
    Restaurant = Restaurant.rename(columns={'all_label': 'BigLabel'})
    return Restaurant

def main(uID, CollectList, userPos, sorting):
# def main():
#     uID = 1
#     userPos = [23.96656, 120.96586]
#     sorting = 0
    Restaurant = get_pd('1_restaurant', "NULL", "NULL")
    NewRLabel = get_pd('1_new_rlabel', 'rID', "NULL")
    db.close
    print('close')

    # 過濾餐廳
    print(CollectList)
    Restaurant = Restaurant[Restaurant['rID'].isin(CollectList)]

    Restaurant = checkTime(Restaurant)
    Restaurant = checkDistance(userPos, Restaurant)

    # rName rMap_Score rPhone rAddress BigLabel open distance collect rID
    Restaurant = replaceAllLabel(Restaurant)
    Restaurant = Restaurant.drop(['meal_or_not', 'rLat', 'rLng'], axis=1)
    # print(Restaurant.rID)
    Restaurant.insert(Restaurant.shape[1], 'collect', 1)
    if (sorting): # 評分
        Restaurant = Restaurant.sort_values(by="rMap_Score", ascending=False)
    else:  # 距離
        Restaurant = Restaurant.sort_values(by="distance", ascending=True)

    print(Restaurant.rID)
    return Restaurant

# if __name__ == '__main__':
#     main()