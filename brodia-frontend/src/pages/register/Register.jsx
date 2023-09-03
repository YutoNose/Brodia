import React from 'react'
import "./Register.css";

export default function Register() {
  return (
    <div className='login'>
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className='loginLogo'>Brodia</h3>
                <span className="loginDesc">エンジニアのためのコード・学習成果共有プラットフォーム</span>
            </div>
            <div className="loginRight">
                <div className="loginBox">
                    <p className="loginMsg">新規登録はこちら</p>
                    <input type="text" className='loginInput' placeholder='Username'/>
                    <input type="text" className='loginInput' placeholder='Password'/>
                    <input type="text" className='loginInput' placeholder='Password(確認)'/>
                    <button className='loginButton'>サインアップ</button>
                    <button className="loginRegisterButton">ログイン</button>
                </div>
            </div>
        </div>
    </div>
  )
}
