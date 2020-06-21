export const headerConfigs = {
    icons: [
        {
            iconName: 'home',
            url: './home'
        },
        {
            iconName: 'desktop',
            url: './auth'
        },
        {
            iconName: 'book',
            url: './abc'
        },
        {
            iconName: 'users',
            url: './abc'
        },
        {
            iconName: 'building',
            url: './abc'
        }

    ],
    menus: [
        {
            name: "create",
            title: "Create",
            iconName: "plus",
            mdSize:true,
            isHeader:true,
            list_options: [
                {
                    iconName: 'edit',
                    title:"Post",
                    name:'createPost',
                    url: '',
                    isPopup:true,
                    isIcon:true,
                    isTextType:true,
                    serviceName:'postService',
                    actionName:'create'
                },
                {
                    iconName: 'book',
                    title:"Story",
                    url: '',
                    devider:true,
                    isIcon:true,
                    isTextType:true,
                    serviceName:'postService',
                    actionName:'create'
                },
                {
                    iconName: 'star',
                    title:"Life Event",
                    url: '',
                    isIcon:true,
                    isTextType:true,
                    serviceName:'postService',
                    actionName:'create'
                }
            ]
        },
        {
            name: "messanger",
            title: "Messanger",
            iconName: "comment",
            mdSize:true,
            isHeader:true
            
        },
        {
            name: "notification",
            title: "Notification",
            iconName: "bell",
            mdSize:true,
            isHeader:true
            
        },
        {
            name: "my_profile",
            title: "Settings",
            iconName: "caret_down",
            mdSize:true,
            isHeader:true,
            list_options: [
                {   
                    name:"my_profile",
                    iconName: 'star',
                    title:"Life Event",
                    url: '',
                    devider:true,
                    isIcon:true,
                    isTextType:true,
                },
                {   
                    name:"feedback",
                    iconName: 'feedback',
                    title:"Give Feedback",
                    url: '',
                    isPopup:true,
                    devider:true,
                    isIcon:true,
                    isTextType:true
                },
                {   
                    actionName:"themeChange",
                    iconName: 'moon',
                    title:"Dark Mode",
                    isToggle:true,
                    isIcon:true,
                    isTextType:true,
                    serviceName: "globalService",
                },
                {   
                    name:"logOut",
                    iconName: 'sign_out',
                    title:"Log Out",
                    isIcon:true,
                    isTextType:true,
                    serviceName: "authService",
                    actionName:"logOut",
                }
            ]
        }
    ]

}

export const homeConfigs = {
    sidebarConfig:[
        {
            iconName: 'edit',
            title:"Covid-19 Center",
            url: '',
            isPopup:true,
            isIcon:false,
            isTextType:true,
            imageURL:'../../../assets/images/icon_images/korona.png'
        },
        {
            iconName: 'edit',
            title:"Live Videos",
            url: '',
            isPopup:true,
            isIcon:false,
            isTextType:true,
            imageURL:'../../../assets/images/icon_images/live.png'
        },
        {
            iconName: 'edit',
            title:"Marketplace",
            url: '',
            isPopup:true,
            isIcon:false,
            isTextType:true,
            imageURL:'../../../assets/images/icon_images/home.png'
        },
        {
            iconName: 'edit',
            title:"Videos",
            url: '',
            isPopup:true,
            isIcon:false,
            isTextType:true,
            imageURL:'../../../assets/images/icon_images/video.png'
        },
        {
            iconName: 'edit',
            title:"Pages",
            url: '',
            isPopup:true,
            isIcon:false,
            isTextType:true,
            imageURL:'../../../assets/images/icon_images/flag.png'
        },
        {
            iconName: 'edit',
            title:"Events",
            url: '',
            isPopup:true,
            isIcon:false,
            isTextType:true,
            imageURL:'../../../assets/images/icon_images/event.png'
        },
        {
            iconName: 'edit',
            title:"Groups",
            url: '',
            isPopup:true,
            isIcon:false,
            isTextType:true,
            imageURL:'../../../assets/images/icon_images/group.png'
        },
        {
            iconName: 'edit',
            title:"FundRaisers",
            url: '',
            isPopup:true,
            isIcon:false,
            isTextType:true,
            imageURL:'../../../assets/images/icon_images/love.png'
        },
        {
            iconName: 'edit',
            title:"Games",
            url: '',
            isPopup:true,
            isIcon:false,
            isTextType:true,
            imageURL:'../../../assets/images/icon_images/game.png'
        },
        {
            iconName: 'edit',
            title:"Jobs",
            url: '',
            isPopup:true,
            isIcon:false,
            isTextType:true,
            imageURL:'../../../assets/images/icon_images/case.png'
        }
    ]
}

export const createConfig = {
        title:"Milan Raval",
        url: '',
        isIcon:false,
        isTextType:true,
        imageURL:'../../../assets/images/icon_images/messanger.png',
        subTitle:"public"
}