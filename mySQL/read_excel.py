# requirement
# ------------------------------------
# pip install pandas
# pip install openpyxl
# pip install pymyslq
# ------------------------------------
import pandas as pd
import pymysql

# 連線資料庫
db = pymysql.connect(host='localhost', user='root', passwd='', db='what_should_i_eat')
cursor = db.cursor()

def user():
    sql = "INSERT INTO `user`(`uID`, `uName`, `uPWD`, `uMail`) VALUES ('1','test1','test1','test1@mail')"
    cursor.execute(sql)
    db.commit()

def restaurant(data):
    # print(type(data))
    for index, row in data.iterrows():
        # print(index)
        # print(row)
        # print(row[0])    # 18度C巧克力工房
        # print(row[1])    # 4.2
        # print(row[2])    # 04 9298 4863
        # print(row[3])    # 545南投縣埔里鎮慈恩街20號
        # print(row[4])    # 星期六、10:00 到 19:00; 星期日、10:00 到 19:00; 星期一、10:00 到 19:00; 星期二、10:00 到 19:00; 星期三、10:00 到 19:00; 星期四、10:00 到 19:00; 星期五、10:00 到 19:00. 隱藏本週營業時間
        # print(row[4])
        # ----------------------------------------------------------
        # 店名
        row[0] = row[0].replace("'", ',')
        # ----------------------------------------------------------
        # 電話
        # print(type(row[2]))
        row[2] = str(row[2]).split(' ')
        temp = ''
        for i in range(len(row[2])):
            temp += row[2][i]
        row[2] = temp
        # ----------------------------------------------------------
        # 營業時間
        time = [[], [], [], [], [], [], []]
        row[4] = row[4].split('.')
        row[4] = row[4][0].split('; ')
        for i in range(len(row[4])):
            # print(row[4][i])
            if ("星期日" in row[4][i]):
                row[4][i] = row[4][i].split('、')
                time[0] = row[4][i][1:]
            elif ("星期一" in row[4][i]):
                row[4][i] = row[4][i].split('、')
                time[1] = row[4][i][1:]
            elif ("星期二" in row[4][i]):
                row[4][i] = row[4][i].split('、')
                time[2] = row[4][i][1:]
            elif ("星期三" in row[4][i]):
                row[4][i] = row[4][i].split('、')
                time[3] = row[4][i][1:]
            elif ("星期四" in row[4][i]):
                row[4][i] = row[4][i].split('、')
                time[4] = row[4][i][1:]
            elif ("星期五" in row[4][i]):
                row[4][i] = row[4][i].split('、')
                time[5] = row[4][i][1:]
            elif ("星期六" in row[4][i]):
                row[4][i] = row[4][i].split('、')
                time[6] = row[4][i][1:]
            else:
                break
        for i in range(len(time)):
            temp = ''
            for j in range(len(time[i])):
                # print(type(time[i][j]))
                time[i][j] = time[i][j].replace(' 到 ', '~')
                time[i][j] = time[i][j].replace('休息', '')
                temp += time[i][j]
                if (j != len(time[i])-1):
                    temp += '; '
            time[i] = temp
        # print(time)
        # ----------------------------------------------------------
        # if (index == 0):
        #     print(index)
        #     print(row[0])
        #     print(row[1])
        #     print(row[2])
        #     print(row[3])
        #     print(time[0])
        #     print(time[1])
        #     print(time[2])
        #     print(time[3])
        #     print(time[4])
        #     print(time[5])
        #     print(time[6])
        rID = 1
        if (index != 0):
            sql = "select * from restaurant order by rID desc limit 0,1"
            cursor.execute(sql)
            id_result = cursor.fetchone()
            # print(type(id_result[0]))
            rID = id_result[0] + 1

        sql = "SELECT * FROM restaurant WHERE rName = %s"
        cursor.execute(sql, (row[0],))
        name_result = cursor.fetchone()
        # print(result)

        if (name_result == None):
            sql = "INSERT INTO restaurant (rID, rName, rMap_Score, rPhone, rAddress, Sun, Mon, Tue, Wed, Thur, Fri, Sat) VALUES (%d, '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')" % (rID, row[0], row[1], row[2], row[3], time[0], time[1], time[2], time[3], time[4], time[5], time[6])
            # sql = "INSERT INTO restaurant (rID, rName, rMap_Score, rPhone, rAddress, Sun, Mon, Tue, Wed, Thur, Fri, Sat) VALUES (%d, ''%s'', ''%s'', ''%s'', ''%s'', ''%s'', ''%s'', ''%s'', ''%s'', ''%s'', ''%s'', ''%s'')" % (rID, row[0], row[1], row[2], row[3], time[0], time[1], time[2], time[3], time[4], time[5], time[6])
            cursor.execute(sql)
            db.commit()

def label():
    print()

def main():
    # user()
    restaurant(pd.read_excel("restaurant.xlsx", sheet_name="info"))
    # label()
    db.close

if __name__ == '__main__':
    main()