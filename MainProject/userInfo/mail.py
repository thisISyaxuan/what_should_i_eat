import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
import time
import datetime
import base64
import imghdr

def main(uid, uName, uEmail, rID, rName, rPhone, rAddress, open, rPhoto, rText):
    uEmail = 's109213068@mail1.ncnu.edu.tw'
    smtp=smtplib.SMTP('smtp.gmail.com', 587)
    smtp.ehlo()
    smtp.starttls()    # tls 加密
    smtp.login('kieililiyihiaihiai@gmail.com', 'zkkl uvka mrhp xgnm')
    from_addr = 'waht_should_i_eat@gmail.com'

    MsgForAdmin = ForAdmin(uid, uName, uEmail, rID, rName, rPhone, rAddress, open, rPhoto, rText)
    smtp.sendmail(from_addr, 's109213068@mail1.ncnu.edu.tw', MsgForAdmin)

    MsgForUser = ForUser(uName)
    smtp.sendmail(from_addr, uEmail, MsgForUser)
    return True

def ForAdmin(uid, uName, uEmail, rID, rName, rPhone, rAddress, open, rPhoto, rText):
    if (len(rPhoto)>0):
        image_data = base64.b64decode(rPhoto)
        image_type = detect_image_type(rPhoto)
    content = (
        f'以下為收到錯誤回報之店家：<br>'
        f'流水號：{rID}<br>'
        f'店名：{rName}<br>'
        f'<br>'
        f'該店家資訊欲修改之處：<br>'
        f'電話：{rPhone}<br>'
        f'地址：{rAddress}<br>'
        f'營業時間：{open}<br>'
        f'菜單：若使用者有上傳，請見附檔<br>'
        f'其他：{rText}<br>'
        f'<br>'
        f'請在審核之後通知使用者：<br>'
        f'流水號：{uid}<br>'
        f'帳號名稱：{uName}<br>'
        f'電子郵件：{uEmail}<br>'
    )

    if (len(rPhoto) > 0):
        mime = MIMEMultipart()
        text_part = MIMEText(content, "html", "utf-8")
        mime.attach(text_part)
        image_part = MIMEImage(image_data, name=f"{rID}.{image_type}")
        mime.attach(image_part)
    else:
        mime = MIMEText(content, "html", "utf-8")
    mime['Subject']= f'來自使用者流水號為 {uid} 的錯誤回報'
    mime["From"]="吃啥(what_should_i_eat)"
    return mime.as_string()

def detect_image_type(base64_string):
    # 解碼 base64 字串
    decoded = base64.b64decode(base64_string)
    # 檢測圖片類型
    image_type = imghdr.what(None, h=decoded)
    print(image_type)
    return image_type

def ForUser(uName):
    today=datetime.date.today()
    content = (
        f"感謝使用者 {uName} 所提交的錯誤回報！<br>"
        f"我們將在審核之後，通知您審核結果。<br>"
        f"若審核通過，您即可獲得 200 雞腿幣 ~"
    )
    mime=MIMEText(content, "html", "utf-8")
    mime['Subject']="APP 吃啥 已收到您的錯誤回報"
    mime["From"]="吃啥(waht_should_i_eat)"
    return mime.as_string()