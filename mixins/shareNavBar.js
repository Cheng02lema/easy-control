// 共享顶部导航样式
export const shareNavBar = {
    data () {
        return {
           tabbar: this.$store.state.tabbarList,
		   background: {
			backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
		   	// 导航栏背景图
		   	//方式一、ground: 'url(https://cdn.uviewui.com/uview/swiper/1.jpg) no-repeat',
		   	// 还可以设置背景图size属性
		   	// backgroundSize: 'cover',
		   	// 方式二、background: '#ff0000',
		   	//方式三、backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
		  	//backgroundImage: 'linear-gradient(0deg, rgb(28, 250,250), rgb(250,0,200))'
		   },
        }
    },
	

    onLoad(option)
	{
		
    }
}