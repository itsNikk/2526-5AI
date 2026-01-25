const uID = 1;

async function getUserPosts(userId) {
    const usersUrl = "https://jsonplaceholder.typicode.com/users/" + userId
    const userPostsUrl = "https://jsonplaceholder.typicode.com/posts?userId=" + userId

    const userResponse = await fetch(usersUrl)
    const userPostsResponse = await fetch(userPostsUrl)

    const userData = await userResponse.json()
    const userPostsData = await userPostsResponse.json()
    
    //Utile per capite la struttura della risposta
    //console.log(userPostsData);

    console.log("Lo user " + userData.name + " ha scritto " + userPostsData.length + " post.");

}

getUserPosts(1)