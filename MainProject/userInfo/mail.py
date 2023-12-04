import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
from PIL import Image
import io
import base64
import imghdr

def main(uid, uName, uEmail, rID, rName, rPhone, rAddress, open, rPhoto, rText):
    try:
        # write_photo_to_file(rPhoto)
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
    except:
        return False

def write_photo_to_file(rPhoto):
    file_path = 'photo.txt'  # 要寫入的檔案路徑
    try:
        with open(file_path, 'w') as file:
            file.write(rPhoto)
        print("寫入成功")
    except Exception as e:
        print(f"寫入失敗：{e}")

def ForAdmin(uid, uName, uEmail, rID, rName, rPhone, rAddress, open, rPhoto, rText):
    msg = f'以下為收到錯誤回報之店家：<br>'
    msg += f'流水號：{rID}<br>'
    msg += f'店名：{rName}<br>'
    msg += f'<br>'
    msg += f'該店家資訊欲修改之處：<br>'
    msg += f'電話：{rPhone}<br>'
    msg += f'地址：{rAddress}<br>'
    msg += f'營業時間：{open}<br>'
    msg += f'菜單：若使用者有上傳，請見附檔<br>'
    msg += f'其他：{rText}<br>'
    msg += f'<br>'
    msg += f'請在審核之後通知使用者：<br>'
    msg += f'流水號：{uid}<br>'
    msg += f'帳號名稱：{uName}<br>'
    msg += f'電子郵件：{uEmail}<br>'
    print(len(rPhoto))
    if (len(rPhoto)==0):
        mime = MIMEText(msg, "html", "utf-8")
    else:
        mime = MIMEMultipart()
        text_part = MIMEText(msg, "html", "utf-8")
        mime.attach(text_part)
        # image_data = convert_to_png(rPhoto)
        # image_part = MIMEImage(base64.b64decode(rPhoto), name=f"{rID}.jpeg")
        image_part = MIMEImage(base64.b64decode(rPhoto), _subtype="png")  # error here
        # image_part.add_header('content-disposition', 'attachment', filename=f'{rID}.jpeg')
        image_part.add_header('content-disposition', 'attachment', filename='%s' % 'menu.png')
        # Then attach to message attachment file
        mime.attach(image_part)

        mime.attach(image_part)
    mime['Subject']= f'來自 {uName} 的錯誤回報'
    mime["From"]="吃啥(what_should_i_eat)"
    return mime.as_string()

def convert_to_png(base64_image):
    try:
        image_data = base64.b64decode(base64_image)
        img = Image.open(io.BytesIO(image_data))
        output_buffer = io.BytesIO()
        img.save(output_buffer, format='PNG')
        png_base64 = base64.b64encode(output_buffer.getvalue()).decode('utf-8')
        return png_base64
    except Exception as e:
        print("Error:", e)
        return None

def ForUser(uName):
    msg = f"感謝使用者 {uName} 所提交的錯誤回報！<br>"
    msg += f"我們將在審核之後，通知您審核結果。<br>"
    msg += f"若審核通過，您即可獲得 200 雞腿幣 ~"
    mime=MIMEText(msg, "html", "utf-8")
    mime['Subject']="APP 吃啥 已收到您的錯誤回報"
    mime["From"]="吃啥(what_should_i_eat)"
    return mime.as_string()