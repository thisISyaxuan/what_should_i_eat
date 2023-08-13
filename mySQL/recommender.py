# requirement
# ------------------------------------
# pip install pandas
# pip install pymysql
# ------------------------------------
import pandas as pd
import pymysql
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from numpy import dot
from numpy.linalg import norm

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
    result = cursor.fetchall()    # tuple
    # 查欄位名稱
    sql = f"SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '{tabel_name}'"
    cursor.execute(sql)
    columns = [row[0] for row in cursor.fetchall()]
    # tuple 轉 pd
    result = pd.DataFrame(result, columns=columns)
    if (index != 'NULL'):
        result.set_index(index,inplace=True)
    # print(result)
    return result

def RecommenderInit(uID, recommend_num):
    user_like = get_pd('user_like', 'uID', uID)
    new_rLabel = get_pd('new_rlabel', 'rID', "NULL")
    # 餘弦算相似度
    SimilarityMatrix = cosine_similarity(user_like.values, new_rLabel.values)
    SimilarityMatrix = pd.DataFrame(SimilarityMatrix, index=user_like.index, columns=new_rLabel.index)
    result = get_the_most_similar_res(uID, SimilarityMatrix, recommend_num)
    return result

def RecommenderContent(uID, recommend_num):
    NewRLabel = get_pd('new_rlabel', 'rID', "NULL")
    CostDetail = get_pd('cost_detail', 'cID', "NULL")
    # user vector 
    resRating = pd.merge(CostDetail[["uID", "rID"]], NewRLabel, on='rID')
    resRating.drop(['rID'], axis=1, inplace=True)
    user_vec = resRating.groupby("uID").mean()
    # 餘弦算相似度
    SimilarityMatrix = cosine_similarity(user_vec.values, NewRLabel.values)
    SimilarityMatrix = pd.DataFrame(SimilarityMatrix, index=user_vec.index, columns=NewRLabel.index)
    result = get_the_most_similar_res(uID, SimilarityMatrix, recommend_num)
    return result

def get_the_most_similar_res(uID, SimilarityMatrix, recommend_num):
    # Get the most similar restaurant
    # Find the top-n restaurant most similar to the user
    user_like = SimilarityMatrix.loc[uID].values
    SortedIndex = np.argsort(user_like)[::-1][:recommend_num]
    result = (list(SimilarityMatrix.columns[SortedIndex]))
    return result

def RecommenderUserBasedCollaborativeFiltering(uID, SimilarUsers_num, recommend_num):
    new_rlabel = get_pd('new_rlabel', "NULL", "NULL")
    CostDetail = get_pd('cost_detail', 'cID', "NULL")
    resRating = pd.merge(CostDetail[["uID", "rID", "rating"]], new_rlabel, on='rID')
    # Calculate the similarity between the user and other users
    similarities = []
    user_ids = []
    for other_user in resRating.uID.unique():
        if other_user == uID:
            continue
        common_res = find_common_res(uID, other_user, resRating)
        if len(common_res)<10:
            sim = 0
        else:
            # 尚未測試
            sim = cal_similarity_for_res_ratings(uID, other_user, common_res, resRating)
        similarities.append(sim)
        user_ids.append(other_user)
    # Find top n similar users
    similarities,user_ids = np.array(similarities),np.array(user_ids)
    sorted_index = (np.argsort(similarities)[::-1][:SimilarUsers_num]).tolist()
    most_similar_users = user_ids[sorted_index].tolist()
    result = recommend(uID, most_similar_users, recommend_num, resRating)
    return result

def find_common_res(user1, user2, df):
    # Find restaurant that both users have watched
    s1 = set((df.loc[df["uID"]==user1,"rID"].values))
    s2 = set((df.loc[df["uID"]==user2,"rID"].values))
    # return 交集的元素
    return s1.intersection(s2)

def cal_similarity_for_res_ratings(user1, user2, res_id, df, method="cosine"):
    # Calculate the similarity for res ratings between user1 and user2
    u1 = df[df["uID"]==user1]
    u2 = df[df["uID"]==user2]
    vec1 = u1[u1.rID.isin(res_id)].sort_values(by="rID")["rating"].values
    vec2 = u2[u2.rID.isin(res_id)].sort_values(by="rID")["rating"].values
    # cosine
    return dot(vec1, vec2)/(norm(vec1)*norm(vec2))

def recommend(uID, similar_users, recommend_num, df):
    # Find the restaurant the user hasn't seen and the similar users have seen.
    seen_res = np.unique(df.loc[df["uID"]==uID, "rID"].values)
    not_seen_res = df["rID"].isin(seen_res)==False
    similar_res = df["uID"].isin(similar_users)
    # 沒吃過且相似
    not_seen_res_ratings = df[not_seen_res & similar_res][["rID","rating"]]
    # Find average ratings by the most similar users
    average_ratings = not_seen_res_ratings.groupby("rID").mean()
    top_ratings = average_ratings.sort_values(by="rating",ascending=False).iloc[:recommend_num]
    return top_ratings.index.tolist()

def GoPrint(MyResult, RatingSort):
    restaurant = get_pd('restaurant', "rID", "NULL")
    if (RatingSort):
        temp_restaurant = restaurant.loc[restaurant.index.isin(MyResult)]
        sorted_restaurant = temp_restaurant.sort_values(by="rMap_Score", ascending=False)
        # print(sorted_restaurant[['rID', 'rMap_Score']])
        MyResult = sorted_restaurant.index.tolist()
    # print(MyResult)
    for i in range(len(MyResult)):
        print(f"{'{: 4}'.format(int(MyResult[i]))} {'{: 0.2f}'.format(float(restaurant.loc[MyResult[i]]['rMap_Score']))} {restaurant.loc[MyResult[i]]['rName']}")

def main():
    # uID 欲推薦的餐廳數
    init = RecommenderInit(1, 5)
    content = RecommenderContent(1, 5)
    # uID 欲比較的使用者人數 欲推薦的餐廳數
    filtering = RecommenderUserBasedCollaborativeFiltering(1, 10, 5)
    all_result = set(init + content + filtering)
    print("sorted")
    GoPrint(list(all_result), True)
    print("---------------------------------------")
    print("not sort")
    GoPrint(list(all_result), False)
    db.close

if __name__ == '__main__':
    main()