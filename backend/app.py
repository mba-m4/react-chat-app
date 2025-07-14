# ライブラリのインポート
from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS

# インスタンスを作成
app = Flask(__name__)
CORS(app)  # すべてのオリジンを許可（必要に応じてoriginsを指定）
socketio = SocketIO(app, cors_allowed_origins="*", path="/socket/")

# 送信ボタン押下時に実行
@socketio.on('send_message')
def handle_message(data):
    # クライアントに対してイベントを送る
    socketio.emit('receive_message', data)

if __name__ == '__main__':
    socketio.run(app, port=3000)
