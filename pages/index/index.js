Page({
  data: {
    tierUser:'Regular',
    tier: [
      {
        name: 'Regular',
        icon: '/assets/icon-regular.png',
        description: 'Akumulasikan < 1.000 Poin di bulan ini',
        width: '50%',
        barPosition: 'center',
      },
      {
        name: 'Gold',
        icon: '/assets/icon-gold.png',
        description: 'Akumulasikan 1.000 - 2.999 Poin di bulan ini',
        width: '100%',
        barPosition: 'center',
      },
      {
        name: 'Platinum',
        icon: '/assets/icon-platinum.png',
        description: ' Aktif sampai 17 Feb 2026',
        width: '100%',
        barPosition: 'center',
      },
      {
        name: 'Diamond',
        icon: '/assets/icon-diamond.png',
        description: 'Akumulasikan > 10.000 Poin di bulan ini',
        width: '50%',
        barPosition: 'center',
      },
    ],
    isSwiping: false,
    swippingY: 0,
    scales:[],
    swippingX: 0,
    sliderValue: 0,
    tierType:'Regular',
    indicatorDots: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    sliderValue: 0,
    itemWidth:'',
    width:'',
    marginTop:'',
    backgroundColor: '#b22427',
    backgroundImage: '/assets/bg-regular.png',
    tierIcon: '/assets/icon-regular.png',
    backgroundRewardTransparent:'/assets/reward-regular.jpg',
    descriptionTier:'Akumulasikan < 1.000 Poin di bulan ini',
    milestoneWidth: '50%',
    milestoneStartDot: true,
    milestoneEndDot: true,
    milestonePosition: 'center',
    milestoneBarPosition: 'right',
    milestones: [
      {
        width: '50%',
        startDot: true,
        endDot: false,
        barPosition: 'right',
        position: 'center'
      },
      {
        width: '100%',
        startDot: true,
        endDot: true,
        barPosition: 'center',
        position: 'center'
      },
      {
        width: '100%',
        startDot: true,
        endDot: true,
        barPosition: 'center',
        position: 'center'
      },
      {
        width: '50%',
        startDot: false,
        endDot: true,
        barPosition: 'left',
        position: 'center'
      }
    ],
    voucherList: [],
    showVoucherModal: false,
    showDetailVoucherModal: false,
    rewardList: [],
    backgroundReward: '/assets/bg-reward-regular.png',
    bgInfoColor1:'#51000A',
    bgInfoColor2:'#FF3E3E',
  },
  
  onLoad(){
    this.getVoucherList(0)
    this.getRewardList(0)
    this.getBackgroundColor(0)
    this.getBackgroundImage(0)
    this.getBackgroundReward(0)
    this.getBackgroundRewardTransparent(0)
    this.getTierIcon(0)
    this.updateNavigationBarColor(this.getNavigationBarColor(0));
    this.getInfoColor(0)
    const res = wx.getSystemInfoSync();
    const windowWidth = res.windowWidth;
  
    const itemWidth = `${Math.ceil(0.5 * windowWidth / 2)}px`;
    const marginTop = `${Math.ceil(0.5 * windowWidth / 4)}rpx`;
    
    this.setData({
      itemWidth:itemWidth,
      marginTop: marginTop,
      width: Math.abs( windowWidth * 0.5),
      scales: [1, 0,0,0]
    });
  },
  onSwipeStart(e) {
    this.setData({ isSwiping: true });
  },
  
  onSwipeEnd() {
    this.setData({ isSwiping: false });
  },

  onTouchMove(e){
    const touchMoveX = e.touches[0].clientX;
  },
  
  onSwipeTransition(e) {
    const dx = e.detail?.dx;
    const width = this.data.width;
    const sliderValue = this.data.sliderValue;
    let scales = [];
    this.data.tier.forEach((item, index) => {
      let distanceFromCenter = Math.abs(index - sliderValue); 
      let adjustedDistance = Math.abs(dx) / width;
      let scale = 1 - (adjustedDistance * 0.999 * distanceFromCenter);
      scale = Math.max(0, scale); 
      scales.push(scale);
    });
    this.setData({
      scales: scales
    });

      // console.log('scales: ', scales);
  },
  onSliderChange(e) {
    this.setData({ isSwiping: true });
    console.log('change')

    const value = e.detail.value;
    const dotVisibility = this.getMilestoneDots(value);
    this.getInfoColor(value);
    this.setData({
      sliderValue: value,
      tierType: this.getTierType(value),
      backgroundColor: this.getBackgroundColor(value),
      backgroundImage: this.getBackgroundImage(value),
      backgroundReward: this.getBackgroundReward(value),
      backgroundRewardTransparent: this.getBackgroundRewardTransparent(value),
      tierIcon: this.getTierIcon(value),
      milestoneWidth: this.getMilestoneWidth(value),
      milestoneStartDot: dotVisibility.start,
      milestoneEndDot: dotVisibility.end,
      milestonePosition: this.getMilestonePosition(value),
      milestoneBarPosition: this.getMilestoneBarPosition(value),
      descriptionTier: this.getTierDescription(value),
      isSwiping: false,
    });
    this.updateNavigationBarColor(this.getNavigationBarColor(value));
    this.getVoucherList(value)
    this.getRewardList(value)
  },

  onSwiperChange(e) {
    const value = e.detail.current;
    const dotVisibility = this.getMilestoneDots(value);
    this.getInfoColor(value);
    this.setData({
      sliderValue: value,
      tierType: this.getTierType(value),
      backgroundColor: this.getBackgroundColor(value),
      backgroundImage: this.getBackgroundImage(value),
      backgroundReward: this.getBackgroundReward(value),
      backgroundRewardTransparent: this.getBackgroundRewardTransparent(value),
      tierIcon: this.getTierIcon(value),
      milestoneWidth: this.getMilestoneWidth(value),
      milestoneStartDot: dotVisibility.start,
      milestoneEndDot: dotVisibility.end,
      milestonePosition: this.getMilestonePosition(value),
      milestoneBarPosition: this.getMilestoneBarPosition(value),
      descriptionTier: this.getTierDescription(value),
    });
    this.updateNavigationBarColor(this.getNavigationBarColor(value));
    this.getVoucherList(value)
    this.getRewardList(value)
  },

  updateNavigationBarColor(color) {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: color,
      animation: {
        duration: 300,
        timingFunc: 'easeIn'
      }
    });
  },

  getTierType(value) {
    switch (value) {
      case 0:
        return 'Regular';
      case 1:
        return 'Gold';
      case 2:
        return 'Platinum';
      case 3:
        return 'Diamond';
      default:
        return 'Regular';
    }
  },

  getBackgroundColor(value) {
    switch (value) {
      case 0:
        return 'red';
      case 1:
        return 'yellow';
      case 2:
        return 'black';
      case 3:
        return 'diamond';
      default:
        return 'black';
    }
  },

  getBackgroundImage(value) {
    switch (value) {
      case 0:
        return '/assets/bg-regular.png';
      case 1:
        return '/assets/bg-gold.png';
      case 2:
        return '/assets/bg-platinum.png';
      case 3:
          return '/assets/bg-diamond.png';
      default:
        return '/assets/bg-regular.png';
    }
  },

  getTierIcon(value) {
    switch (value) {
      case 0:
        return '/assets/icon-regular.png';
      case 1:
        return '/assets/icon-gold.png';
      case 2:
        return '/assets/icon-platinum.png';
      case 3:
          return '/assets/icon-diamond.png';
      default:
        return '/assets/icon-regular.png';
    }
  },

  getBackgroundReward(value) {
    switch (value) {
      case 0:
        return '/assets/bg-reward-regular.png';
      case 1:
        return '/assets/bg-reward-gold.png';
      case 2:
        return '/assets/bg-reward-platinum.png';
      case 3:
          return '/assets/bg-reward-diamond.png';
      default:
        return '/assets/bg-reward-regular.png';
    }
  },

  getBackgroundRewardTransparent(value) {
    switch (value) {
      case 0:
        return '/assets/reward-regular.jpg';
      case 1:
        return '/assets/reward-gold.jpg';
      case 2:
        return '/assets/reward-platinum.jpg';
      case 3:
          return '/assets/reward-diamond.jpg';
      default:
        return '/assets/reward-regular.jpg';
    }
  },

  getNavigationBarColor(value) {
    switch (value) {
      case 0:
        return '#b22427';
      case 1:
        return '#D37E12';
      case 2:
        return '#00060E';
      case 3:
          return '#033777';
      default:
        return '#b22427';
    }
  },

  getInfoColor(value) {
    const listInfoColor = [
      {
        id: 0,
        tierType:'Regular',
        color1: '#51000A',
        color2:'#FF3E3E'
      },
      {
        id: 1,
        tierType:'Gold',
        color1: '#D37E12',
        color2:'#FFE090'
      },
      {
        id: 2,
        tierType:'Platinum',
        color1: '#000',
        color2:'#DAE0E9'
      },
      {
        id: 3,
        tierType:'Diamond',
        color1: '#002148',
        color2:'#035EE6'
      },
    ];

    const infoColor = listInfoColor.find(item => item.id === value);
    this.setData({
      bgInfoColor1: infoColor.color1,
      bgInfoColor2: infoColor.color2,
    })
  },

  getTierDescription(value) {
    switch (value) {
      case 0:
        return 'Akumulasikan < 1.000 Poin di bulan ini';
      case 1:
        return 'Akumulasikan 1.000 - 2.999 Poin di bulan ini';
      case 2:
        return 'Aktif sampai 17 Feb 2026';
      case 3:
          return 'Akumulasikan > 10.000 Poin di bulan ini';
      default:
        return 'Akumulasikan < 1.000 Poin di bulan ini';
    }
  },

  getMilestoneWidth(value) {
    switch (value) {
      case 0:
        return '50%';
      case 1:
        return '100%';
      case 2:
        return '100%';
      case 3:
        return '50%';
      default:
        return '100%';
    }
  },

  getMilestoneDots(value) {
    switch (value) {
      case 0:
        return { start: true, end: false };
      case 1:
        return { start: true, end: true };
      case 2:
        return { start: true, end: true }; 
      case 3:
        return { start: false, end: true };
      default:
        return { start: true, end: true };
    }
  }, 
  getMilestonePosition(value) {
    switch (value) {
      case 0:
        return 'center';
      case 1:
      case 2:
        return 'center';
      case 3:
        return 'center';
      default:
        return 'center';
    }
  },
  getMilestoneBarPosition(value) {
    switch (value) {
      case 0:
        return 'right';
      case 1:
      case 2:
        return 'center';
      case 3:
        return 'left';
      default:
        return 'center';
    }
  },

  getVoucherList(value) {
    const voucherListRegular = [
    ];

    const voucherListGold = [
      {
        id: 1,
        image: '/assets/bg-regular.png',
        icon: '/assets/logo-wetv.png',
        description: 'Langganan WeTV 30 Hari',
      },
      
    ];

    const voucherListPlatinum = [
      {
        id: 1,
        image: '/assets/bg-regular.png',
        icon: '/assets/logo-wetv.png',
        title: 'Diskon 20%',
        description: 'Langganan WeTV 30 Hari',
      },
      {
        id: 2,
        image: '/assets/bg-regular.png',
        icon: '/assets/logo-wetv.png',
        title: 'Diskon 20%',
        description: 'Langganan WeTV 30 Hari',
      },
      {
        id: 3,
        image: '/assets/bg-regular.png',
        icon: '/assets/logo-wetv.png',
        title: 'Diskon 20%',
        description: 'Langganan WeTV 30 Hari',
      },
    ];

    const voucherListDiamond= [
      {
        id: 1,
        image: '/assets/bg-regular.png',
        icon: '/assets/logo-wetv.png',
        title: 'Diskon 20%',
        description: 'Langganan WeTV 30 Hari',
      },
      {
        id: 2,
        image: '/assets/bg-regular.png',
        icon: '/assets/logo-wetv.png',
        description: 'Langganan WeTV 30 Hari',
      },
    ];
    switch (value) {
      case 0:
        return this.setData({ voucherList: voucherListRegular });
      case 1:
        return this.setData({ voucherList: voucherListGold });
      case 2:
        return this.setData({ voucherList: voucherListPlatinum });
      case 3:
        return this.setData({ voucherList: voucherListDiamond });
      default:
        return this.setData({ voucherList: voucherListRegular });
    }
  },

  getRewardList(value) {
    const rewardListRegular =[
      {
        description: '1x Poin Ektra',
        bgImage:'/assets/benefit-regular.png',
      }
    ]
    const rewardListGold=[
      {
        description: '2x Poin Ektra',
        bgImage:'/assets/benefit-gold.png',
      },
      {
        description: 'Akses Airport Longue',
        bgImage:'/assets/benefit-gold.png',
      },
    ]
    const rewardListPlatinum =[
      {
        description: '3x Poin Ektra',
        bgImage:'/assets/benefit-platinum.png',
      },
      {
        description: 'Akses GraPARI',
        bgImage:'/assets/benefit-platinum.png',
      },
      {
        description: 'Akses Airport Longue',
        bgImage:'/assets/benefit-platinum.png',
      },
      {
        description: '3x Poin Ektra',
        bgImage:'/assets/benefit-platinum.png',
      },
    ]
    const rewardListDiamond =[
      {
        description: '4 Poin Ektra',
        bgImage:'/assets/benefit-diamond.png',
      },
      {
        description: 'Akses GraPARI',
        bgImage:'/assets/benefit-diamond.png',
      },
      {
        description: 'Akses Airport Longue',
        bgImage:'/assets/benefit-diamond.png',
      },
    ]
    switch (value) {
      case 0:
        return this.setData({ rewardList: rewardListRegular });
      case 1:
        return this.setData({ rewardList: rewardListGold });
      case 2:
        return this.setData({ rewardList: rewardListPlatinum });
      case 3:
        return this.setData({ rewardList: rewardListDiamond });
      default:
        return this.setData({ rewardList: rewardListRegular });
    }
  },

  onVoucherClick() {
    this.setData({
      showVoucherModal: true
    });
  },

  closeModal() {
    this.setData({ showVoucherModal: false });
  },

  preventTouch() {
  },

  onDetailVoucherClick() {
    this.setData({
      showDetailVoucherModal: true
    });
  },

  closeDetailModal() {
    this.setData({ showDetailVoucherModal: false });
  },
});
