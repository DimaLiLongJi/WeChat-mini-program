var postsData = require('../../../data/posts-data.js');

Page({
  data: {
    isPlayingMusic: false,
  },
  onLoad: function (option) {
    //输出文章内容
    var postsId = option.id;
    this.setData({ postId: postsId });
    //中转到data中中，以备用
    this.setData({
      posts_key: postsData.postsList[postsId]
    });


    //初始化所有未读都为false，并放入storage中数组

    var postsCollected = wx.getStorageSync('postsCollected');
    // 得到缓存里的数组{true false}
    if (postsCollected) {
      var postCollected = postsCollected[postsId];
      // 得到对应序列号下的布尔值
      this.setData({
        collected: postCollected
        // 绑定到data:{collected}中
      });
    }
    else {
      var postsCollected = {};
      // 创建一个空的数列
      postsCollected[postsId] = false;
      // 把false放入数列，初始化都为false
      wx.setStorageSync('postsCollected', postsCollected);
      // 把postsCollected放入缓存中
    };

    var that = this.data.isPlayingMusic;
    // data在load：functtion(){}外声明，可用；但在下面的函数中没有声明所以要重新赋值
    wx.onBackgroundAudioPlay(function(event){
      that.setData({
        isPlayingMusic: true,
      })
    });
    // 监听音乐打开，data中的值要变为true
    wx.onBackgroundAudioPause(function(event){
      that.setData({
        isPlayingMusic: false,
      })
    });
     // 监听音乐关闭，data中的值要变为false
  },

  //按键点击，缓存与data中collec的更新

  onCollectTap: function (event) {
    var postsCollected = wx.getStorageSync('postsCollected');
    // 拿到storage数组
    var postCollected = postsCollected[this.data.postId];
    // 拿到数组中对应页面的布尔值
    postCollected = !postCollected;
    // 取反，true与false相互颠倒
    postsCollected[this.data.postId] = postCollected;
    wx.setStorageSync('postsCollected', postsCollected);
    // 更新数组中的布尔值(文章是否收藏）
    this.setData({ collected: postCollected });
    //把变量绑定到data中中

    wx.showToast({
      title: postCollected ? "收藏成功" : "取消成功",
      duration: 1000,
    });
    //三元判断 如果postCollected:true为收藏；如果false为取消
  },

  onShareTap: function (event) {
    wx.showActionSheet({
      itemList: [
        "分享给微信好友",
        "分享到朋友圈",
        "分享到QQ",
        "分享到微博",
      ],
      itemColor: "#405f80",
    })
  },

  // 音乐开关
  onMusicTap: function (event) {
    var currentPostId = this.data.postId;
    //从data中获取文章的序列号

    var isPlayingMusic = this.data.isPlayingMusic;
    // 设置后台播放为默认关闭false

    if (isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({ isPlayingMusic: false });
    }
    // 如果为开启，则停止播放并设置isPlayingMusic为false

    else {
      wx.playBackgroundAudio({
        dataUrl: postsData.postsList[currentPostId].music.url,
        title: postsData.postsList[currentPostId].music.title,
        coverImgUrl: postsData.postsList[currentPostId].music.coverImg,
        // 从传输过来的文章中获得文章序列号并传输进内容
      });
      this.setData({ isPlayingMusic: true });
    }
    //相反打开播放器，并设置isPlayingMusic为false
  },

})