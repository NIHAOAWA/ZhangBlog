async function getFriends() {
    return (await get('/api/home')).author.friends
}

function getPaper() {
    // 获取到画布（纸）
    return document.getElementById('sky')
}

function whichFriend(x, y, friendsXY) {
    for (let friend in friendsXY) {
        const friendX = friendsXY[0]
        const friendY = friendsXY[1]

        if (x >= friendX && x <= friendX + 5 && y >= friendY && y <= friendY + 5) return friend
    }
    return null
}

async function init() {
    const paper = getPaper()
    const ctx = paper.getContext('2d')
    const friends = await getFriends()
    const friendsXY = {}
    for (let key of Object.keys(friends)) {
        friendsXY[key] = []
    }

    paper.width = window.innerWidth
    paper.height = window.innerHeight

    ctx.height = paper.height
    ctx.width = paper.width

    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, paper.width, paper.height)

    ctx.fillStyle = '#FFFFFF'
    for (let i = 0; i < Object.keys(friends).length; i++) {
        const x = Math.random() * ctx.width
        const y = Math.random() * ctx.height
        ctx.fillRect(x, y, 5, 5)

        friendsXY[friends[Object.keys(friends)[i]]] = [x, y]
    }

    paper.onclick = e => {
        console.log('点击了')
        const result = whichFriend(e.clientX, e.clientY, friendsXY)
        console.log(result)
        if (result === null) return e.preventDefault()
        const a = document.createElement('a')
        a.href = friends[result]
        a.target = '_blank'
        a.click()
    }
}

init()