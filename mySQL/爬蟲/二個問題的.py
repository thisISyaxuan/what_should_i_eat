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
restaraunt = driver.find_element(By.XPATH,'//a[@class="hfpxzc"]')#點第一個餐廳
restaraunt.click()
time.sleep(10)#等待加載
allPage = driver.find_element(By.CLASS_NAME,"m6QErb.DxyBCb.kA9KIf.dS8AEf") #全部頁面: m6QErb DxyBCb kA9KIf dS8AEf 
titlename = allPage.find_element(By.CSS_SELECTOR, ".lMbq3e h1")#標題框: lMbq3e 底下的 h1

driver.quit()# 關閉瀏覽器