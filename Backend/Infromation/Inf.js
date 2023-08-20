async function getToken() {
    const authData = await fetch("http://20.244.56.144/train/auth", {
        method: 'POST',
        body: JSON.stringify({
            
                "companyName": "Amity University",
                "clientID": "fc1c8ec5-6377-4f77-9511-4578f09400b2",
                "ownerName": "Adarsh",
                "ownerEmail": "adarsh1dandotiya@gmail.com",
                "rollNo": "A60205220107",
                 "clientSecret": "weGxRQcoxpAQxuFk"
            
        })
    })
    const curData = await authData.json()
    return curData;
}

module.exports={getToken}