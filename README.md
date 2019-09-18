# サンプルアプリケーション
公開、非公開での簡易なリアルタイムチャットアプリケーションです。

## 使用技術
* node.js 
* フレームワーク: Express 4 
* ORM: sequelize v4
* DB: SQlite3
* テンプレート: ejs
* その他: 
  * session管理: express-session
  * session-store: redis
  * チャット: socket.io

## 基本機能
* ユーザー登録
* ログイン（メールアドレス、パスワードで認証）
* チャット
  * 公開チャットと非公開チャットがあります。
  * 非公開チャットルームにはチャットルーム作成者が指定したユーザーのみが入室できます。

## 課題
1. データベースに保存されたユーザーアカウント情報を盗まれた場合に、被害を少なくするための処理・仕組み<br>
→DBに保存するpasswordを暗号化して対応。暗号化にはbcryptを使用。

2. 悪意のある別サイトからの、ユーザーアカウント作成のPOST処理で、ユーザーアカウントを作成出来ないようする仕組み<br>
→csrf対策。sessionにtokenを仕込んで、post処理の中で確認。

3. ログインした状態で、node.js アプリケーションを再起動した場合に、ログイン状態が持続するようにする仕組み<br>
→redisにsession情報を保存することで対応。

4. ログインしていない状態で、ログイン後の画面のURLを入力した場合、ログイン画面を表示し、ログイン成功後、入力したURLの画面を表示する仕組み<br>
→ログイン画面に遷移する段階で、sessionに目的のurlを保存して、ログイン時に取り出す方式。クエリパラメータに入れる方法もあったが、うまくいかなかった。
 
5. 限られたメンバー間でのみチャットが出来るようにする仕組み<br>
→特定の部屋に入室するためのGET処理で、アクセスしてきたユーザーが、その部屋のホスト（チャットルーム作成者）またはゲスト（ホストに招待された人）かどうかをチェック。
また、socket.ioのroomsの機能を使って、同じチャットルームのメンバー間でwebsocket通信を行えるようにした。

## 実装できなかった機能
1. チャット画面を開いた後、時間経過でログインしていない状態になった場合、再度ログインするまでチャット出来ないようにする仕組み
チャットルーム入室時およびチャットメッセージ送信時にsessionを取得してユーザーを特定するようにしているが、
cookieの有効期限が切れて、sessionが維持されてしまいサーバーサイドでユーザーが認証されてしまう（http通信では弾かれる）。

2. ネットワークが繋がっていない状態で、チャット画面でメッセージを入力した時に対応する処理・仕組み

3. 上述の機能のテストコードがまだ書けていない。

## 上記以外にわからなかったこと、何かしらの対策が必要だと思う点
* 非公開チャットルームでsocket.ioのroomsの機能を使って、joinするroomを指定するために、入室時にサーバーにチャットルームのidを送信しているが、
クライアント側でスクリプトを書き換えて別のチャットルームのidを送れば、招待されていないチャットルームと通信できてしまうように思われる。
* websocketによる通信がhttpによる通信と具体的に何がどう違うのか理解できていない。
* expressの設計の考え方。ロジックのかき分け、例外処理の記述など理解不足。
