import React from 'react'
import "./Login.css";

export default function Login() {
  return (
    <div className='login'>
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className='loginLogo'>Brodia</h3>
                <span className="loginDesc">エンジニアのためのコード・学習成果共有プラットフォーム</span>
            </div>
            <div className="loginRight">
                <div className="loginBox">
                    <p className="loginMsg">ログインはこちら</p>
                    <input type="text" className='loginInput' placeholder='Email'/>
                    <input type="text" className='loginInput' placeholder='Password'/>
                    <button className='loginButton'>ログイン</button>
                    <span className="loginForgot">パスワードを忘れた</span>
                    <button className="loginRegisterButton">アカウント作成</button>
                </div>
            </div>
        </div>
    </div>
  )
}
