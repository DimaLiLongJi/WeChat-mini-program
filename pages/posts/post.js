var postsData = require('../../data/posts-data.js')

Page({
  
  data: {
    conditiontr: true,
    conditionfl: false,
  },

  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    this.setData(
      { posts_key: postsData.postsList }
    )
  },

  onPostsTap: function(event){
    var postsId = event.currentTarget.dataset.postsid;
    // 获取设置的postsIdd 在currentTarget

    wx.navigateTo({
      url: 'posts-detail/posts-detail?id=' + postsId,
    })
    // 上传postsId到某个JS中传输
  },
  

  onSwiperTap: function(event){
    var postsId = event.target.dataset.postsid;
    // target是当前点击的组件是img，而currentTarget则是事件捕获的组件是swiper
    wx.navigateTo({
      url:'posts-detail/posts-detail?id=' + postsId,
    })
  }
})
