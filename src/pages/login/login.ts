//login.ts
//获取应用实例
import { IMyApp } from '@/app'

const app = getApp<IMyApp>()

let setIntervalTimer = 0, TIMER_SIZE = 5;

Page({
  data: {
    isGetCode: false,
    className: 'disabled',
    mobile: '',

    // 验证码页面
    registClassName: 'disabled',
    registered: false,
    timer: TIMER_SIZE,
    agree:  false,
    code: ''
  },

  // 获取验证码
  getCode() {
    const {mobile} = this.data
    app.$http.post('/api', {mobile}).then(res => {
      this.setData!({ isGetCode: true })
      this.setTimer()
    })
  },

  //事件处理函数
  inputMobile(e: any) {
    const isValid = /^1[3456789]\d{9}$/.test(e.detail.value)
    this.setData!({
      mobile: e.detail.value,
      className: (isValid ? '' : 'disabled')
    })
  },

  tapNext() {
    const { data: { className, mobile, isGetCode }, setTimer, getCode } = this
    if(className !== 'disabled') {
      // getCode()
      this.setData!({ isGetCode: true })
      setTimer()
    }
  },

  // 验证码模块
  setTimer() {
    this.setData!({ timer: TIMER_SIZE })
    let { timer } = this.data
    setIntervalTimer = setInterval(() => {
      if(timer <= TIMER_SIZE && timer > 0) {
        timer--
        this.setData!({ timer })
        console.log(timer)
      } else {
        clearInterval(setIntervalTimer)
      }
    }, 1000)
  },

  inputCode(e: any) {
    const code = e.detail.value
    this.setData!({
      code: code,
      registClassName: (/^\d{4}$/.test(code) ? '' : 'disabled')
    })
  },

  postCode() {
    const { timer } = this.data
    if(timer > 0) {
      return;
    }
    this.setTimer()
    // this.getCode()
  },

  toggleAgree() {
    this.setData!({agree: !this.data.agree})
  },

  register() {
    const {registClassName, mobile, code, agree} = this.data
    if(registClassName === 'disabled') {
      return
    }
    if(!agree) {
      wx.showToast({title: '请勾选同意服务协议', icon: 'none'})
      return;
    }
    app.$http.post('/register', {
      mobile,
      code
    }).then(res => {
      // 
    })
  },
  

  // miniapp LifeCycle
  onLoad() {
    // 
    // app.$http.get('')
  },
  onShow() {
    // 
  },
  onHide() {
    // 
  },
  onUnload() {
    clearInterval(setIntervalTimer)
  }
})
