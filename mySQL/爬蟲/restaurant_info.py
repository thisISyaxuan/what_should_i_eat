import pymysql
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
import time

myservice = Service()

db = pymysql.connect(host='localhost', port=3306, user='root', passwd='', db='what_should_i_eat')
cursor = db.cursor()

def get_db(tabel_name):
    sql = f"SELECT rID, rName, rAddress FROM {tabel_name}"
    cursor.execute(sql)
    result = cursor.fetchall() # tuple
    return result

def go_driver(KeyWord):
    driver = webdriver.Chrome(service=myservice)
    driver.get("https://www.google.com/maps/@23.9722244,120.9655851,13.14z?entry=ttu")
    time.sleep(2)
    search = driver.find_element(By.NAME, 'q')
    search.clear()
    search.send_keys(KeyWord)
    search.send_keys(Keys.RETURN)
    last_height = driver.execute_script("return document.body.scrollHeight")
    restaraunts_list = []
    while True:
        # Scroll down to the bottom.
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        # Wait to load the page.
        time.sleep(5)
        # 一間一間找
        restaraunts = driver.find_elements(By.CLASS_NAME, "hfpxzc")
        restaraunts_list.append(restaraunt.get_attribute("aria-label") for restaraunt in restaraunts)
        # Calculate new scroll height and compare with last scroll height.
        new_height = driver.execute_script("return document.body.scrollHeight")
        if new_height == last_height:
            break
            print("END OF PAGE")
        last_height = new_height
    print(restaraunts_list)
def main():
    Restaurant = list(get_db('1_restaurant'))
    db.close
    label = ['米食 飯']
    all = ['麵食', '中式', '西式', '日式', '越式', '美式', '客家料理', '泰式', '韓式', '港式', '速食', '素食', '早餐', '冰品', '飲料', '咖啡', '甜點', '鹹點', '湯品', '滷味', '炸物', '烤物', '鍋物', '健康餐', '無菜單料理', '寵物餐廳', '酒', '吃到飽餐廳']
    for i in label:
        go_driver("埔里 "+i)

if __name__ == '__main__':
    main()

# //*[@id="QA0Szd"]/div/div/div[1]/div[2]/div/div[1]/div/div/div[1]/div[1]/div[3]/div/a
# //*[@id="QA0Szd"]/div/div/div[1]/div[2]/div/div[1]/div/div/div[1]/div[1]/div[5]/div/a
# //*[@id="QA0Szd"]/div/div/div[1]/div[2]/div/div[1]/div/div/div[1]/div[1]/div[7]/div/a
# //*[@id="QA0Szd"]/div/div/div[1]/div[2]/div/div[1]/div/div/div[1]/div[1]/div[9]/div/a
#
# # 店名
# class_name = "a5H0ec"
# # 評分
# class_name ="ceNzKf"
# # 電話
# class_name ="CsEnBe"
# # 地址
# class_name ="CsEnBe"
# # 營業時間
# # 11:00~14:0017:00~21:00
# class_name ="t39EBf GUrTXd"