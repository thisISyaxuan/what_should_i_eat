import pandas as pd
import pymysql

db = pymysql.connect(host='localhost', port=3306, user='root', passwd='', db='what_should_i_eat')
cursor = db.cursor()

# 讀取 Excel 文件中的特定工作表
file_path = 'crawler.xlsx'  # 檔案路徑
sheet_name = 'Sheet'  # 工作表名稱

# 使用 Pandas 讀取 Excel 文件中的工作表
data = pd.read_excel(file_path, sheet_name=sheet_name)

# 顯示讀取到的資料
for index, row in data.iterrows():
    a = int(row['rID'])
    b = row['rLat']
    c = row['rLng']
    print(a, b, c)
    sql = f"UPDATE `1_restaurant` SET `rLat`={b},`rLng`={c} WHERE `rID`={a}"
    cursor.execute(sql)

db.commit()
db.close()