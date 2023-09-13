# 載入需要的套件
from selenium import webdriver
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
import time
myservice = Service()
driver = webdriver.Chrome(service=myservice)
driver.get("http://www.google.com")#到google首頁
keyword = driver.find_element(By.NAME, "q")# 定位搜尋框(name=q)
keyword.send_keys("埔里餐廳")# 傳入字串
button = driver.find_element(By.NAME, "btnK")#找到搜尋的按鈕(name=btnk)
button.click()
toGoogleMaps = driver.find_element(By.XPATH, "//a[text()='地圖']")#到地圖欄位
toGoogleMaps.click()
#我找不到定位qq...
#模擬使用者捲動視窗m6QErb DxyBCb kA9KIf dS8AEf ecceSd
#pane =driver.find_elements(By.CLASS_NAME, "m6QErb.DxyBCb.kA9KIf.dS8AEf.ecceSd")
#driver.execute_script("arguments[0].scrollTop = arguments[0].scrollHeight", pane)
driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
time.sleep(5)

#開始爬
#1. 餐廳class(bfdHYd Ppzolf OFBs3e)aria-label(餐廳名稱)
restaraunts = driver.find_elements(By.CLASS_NAME, "bfdHYd.Ppzolf.OFBs3e")
restaraunts_list = [restaraunt.get_attribute("aria-label") for restaraunt in restaraunts]
print("店家名稱:")
for i in range (len(restaraunts_list)):
    print(i+1,": ",restaraunts_list[i])
#2. 星等 class(e4rVHe fontBodyMedium) class (MW4etd)
print("星等")
stars = driver.find_elements(By.CLASS_NAME, "MW4etd")
stars_list = [star.text for star in stars]
for i in range (len(stars_list)):
    print(i+1,": ",stars_list[i])
# 等待秒數
time.sleep(100)
# 關閉瀏覽器
driver.quit()