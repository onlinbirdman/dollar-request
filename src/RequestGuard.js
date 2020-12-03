export default class RequestGuard {
    // 生产接口白名单
    whiteList = []

    blackList = [
        'www.mdollar.cn'
    ]
    warningTimes = 0

    constructor (channel, NODE_ENV = 'production', whiteList = []) {
        this.channel = channel
        this.NODE_ENV = NODE_ENV
        this.whiteList.push(...whiteList)
    }

    check ({ baseURL, url }) {
        const urlIsTarget = /^http/.test(url)
        const checkTarget = urlIsTarget ? url : baseURL
        const domainCheck = () => {
            let i = 0
            // 一旦匹配为黑名单，校验不通过
            if (this.blackList.some(item => checkTarget.indexOf(item) !== -1)) {
                return false
            }
            do {
                const whiteItem = this.whiteList[i]
                if (checkTarget.indexOf(whiteItem) !== -1) return true // 一旦找到白名单里面有，域名校验通过
                i++
            } while (i < this.whiteList.length)
            return false
        }
        if (!domainCheck()) return this.showWarning(`接口域名【${checkTarget}】为非生产域名，请勿上生产！`)
        if (this.NODE_ENV !== 'production') return this.showWarning(`当前编译环境【${this.NODE_ENV}】为非生产环境，请勿上生产！`)
    }

    showWarning (wariningMsg) {
        console.warn(wariningMsg)
        if (this.warningTimes > 0) return
        this.warningTimes++
        if (this.channel === 'uni') {
            setTimeout(() => {
                (uni.alert || uni.showModal)({
                    title: '温馨提示',
                    content: '本页面仅供测试或体验',
                    success: function (res) {}
                })
            }, 2000)
        } else {
            try {
                if (!document.getElementById('_warning')) {
                    const ele = document.createElement('div')
                    ele.id = '_warning'
                    ele.innerHTML = `本页面仅供测试与体验`
                    ele.style = `
                    position: fixed;
                    zIndex: 999;
                    top: 0;
                    left:0;
                    right:0;
                    color:#fff;
                    background: rgba(0,0,0, .8);
                    height:.2rem;
                    font-size:.16rem;
                    opacity: 1;
                    text-align: center;
                    line-height:.2rem;
                    `
                    document.body.appendChild(ele)
                    setTimeout(() => {
                        ele.style = `opacity: 0;height: 0;position: fixed;
                        zIndex: -1;`
                    }, 3000)
                }
            } catch (error) {
                console.error('error', error)
            }
        }
    }
}
