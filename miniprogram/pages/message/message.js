// miniprogram/pages/message/message.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userMessage: [],
    logged: false
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (app.userInfo._id) {
      this.setData({
        logged: true,
        userMessage: app.userMessage
      });
    } else {
      wx.showToast({
        title: '请先登录',
        duration: 2000,
        icon: 'none',
        success: () => {
          setTimeout(() => {
            wx.switchTab({
              url: '/pages/user/user'
            })
          }, 2000);
        }
      })
    }
  },
  onMyEvent(ev) {
    // console.log(ev);
    this.setData({
      userMessage: []
    }, () => {
      this.setData({
        userMessage: ev.detail
      });
    });
  }
})