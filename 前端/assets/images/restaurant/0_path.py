# 1: 找路徑
# import os
#
# # 使用相對路徑，不需指定目錄路徑
# directory_path = './'
#
# # 建立一個名為 path.txt 的檔案以寫入模式打開
# with open('0_path.txt', 'w') as file:
#     # 使用 os 模組中的 listdir 函數列出目錄下的所有檔案和子目錄
#     for filename in os.listdir(directory_path):
#         # 這個迴圈會迭代目錄下的每個檔案和子目錄
#         # 使用 os.path.join 來建立完整的檔案路徑
#         file_path = os.path.join(directory_path, filename)
#         file.write(file_path + '\n')
# ---------------------
# 2: 路徑排序
# # 讀取 path.txt 中的檔案路徑
# with open('0_path.txt', 'r') as file:
#     file_paths = file.read().splitlines()
#
# # 自訂排序函數，根據路徑中的數字進行排序
# def sort_by_number(path):
#     # 使用正規表達式擷取路徑中的數字部分，並轉換為整數以進行排序
#     import re
#     match = re.search(r'(\d+)', path)
#     if match:
#         return int(match.group())
#     else:
#         return 0  # 如果路徑中沒有數字，將其視為 0
#
# # 根據路徑中的數字進行排序
# sorted_paths = sorted(file_paths, key=sort_by_number)
#
# # 將排序後的路徑寫回 path.txt 檔案
# with open('0_path.txt', 'w') as file:
#     for path in sorted_paths:
#         file.write(path + '\n')
# ---------------------
# 3: 路徑寫進 menu.js
# D:\xampp_8.0.28\htdocs\eat8\前端\data\new_menu.js
with open('0_path.txt', 'r') as file:
    pathList = file.read().splitlines()

for index, value in enumerate(pathList):
    # './665.jpg'
    realPath = value.split('.')[1] + '.' + value.split('.')[2]
    imgID = value.split('/')[1].split('.')[0].split('-')[0]
    # { image: require('../assets/images/restaurant/2.jpg'), imgID:'2' },
    a = '{ image: require(\'../assets/images/restaurant'
    b = "\'), imgID:\'"
    c = "\'},"
    pathList[index] = a + realPath + b + imgID + c
# print(pathList)

# 寫進
with open('0_new_menu.js', 'w') as file:
    for i in pathList:
        file.write(i + '\n')
# ---------------------