// miniprogram/pages/index/index.js

const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    listData: [],
    current: 'links'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 获取轮播图数据的方法
  // getSwiperList() {
  //   wx.request({
  //     url: '',
  //     method: 'GET',
  //     success: (res) => {
  //       this.setData({
  //         swiperList: res.data
  //       })
  //     }
  //   })
  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getListData();
    // this.getSwiperList()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //点赞功能
  handleLinks(ev) {
    let id = ev.target.dataset.id;

    wx.cloud.callFunction({
      name: 'update',
      data: {
        collection: 'users',
        doc: id,
        data: "{links : _.inc(1)}"
      }
    }).then((res) => {
      let updated = res.result.stats.updated;
      if (updated) {
        let cloneListData = [...this.data.listData];
        for (let i = 0; i < cloneListData.length; i++) {
          if (cloneListData[i]._id == id) {
            cloneListData[i].links++;
          }
        }
        this.setData({
          listData: cloneListData
        });
      }
    });
  },
  //推荐
  handleCurrent(ev) {
    let current = ev.target.dataset.current;
    if (current == this.data.current) {
      return false;
    }
    this.setData({
      current
    }, () => {
      this.getListData();
    });
  },
  getListData() {
    db.collection('users')
      .field({
        userPhoto: true,
        nickName: true,
        links: true
      })
      .orderBy(this.data.current, 'desc')
      .get()
      .then((res) => {
        this.setData({
          listData: res.data
        });
      });
  },
  //点击跳转个人信息
  handleDetail(ev) {
    let id = ev.target.dataset.id;
    wx.navigateTo({
      url: '/pages/detail/detail?userId=' + id
    })
  },
  // getBannerList() {
  //   db.collection('banner').get().then((res) => {
  //     this.setData({
  //       imgUrls: res.data
  //     });
  //   });
  // }
})