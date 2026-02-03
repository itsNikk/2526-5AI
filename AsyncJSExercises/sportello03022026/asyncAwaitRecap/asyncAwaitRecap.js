/*
* ESERCIZIO: 
* Scrivi una funzione che:
    1. Recupera un utente a caso da jsonplaceholder
    2. Use l'email dello user per recuperare tutti i suoi post
    3. Per ogni post ottieni i commenti
    4. stampa in console: nome utente, titolo del primo post e quanti commenti ha ricevuto

    * VINCOLI:
    1. preferire async/await
    2. ...
    */

const URL = "https://jsonplaceholder.typicode.com/users/"

async function getUserInfo() {

    // * 1. Recuperiamo un utente a caso da server
    const randomUserId = Math.floor((Math.random() * 10) + 1);
    // Fetch è una Promise
    const userResponse = await fetch(URL + randomUserId);
    console.log(userResponse);
    const user = await userResponse.json();
    console.log(user);

    console.log("Utente trovato: " + user.name);
    console.log("Email: " + user.email);

    // *2. recuperiamo tutti i post dei quell'utente
    const postsResponse = await fetch("https://jsonplaceholder.typicode.com/posts?userId=" + randomUserId)
    const posts = await postsResponse.json();

    if (posts.length === 0) {
        console.log("Nessun post trovato");
    }

    console.log("Numero tot di posts: " + posts.length);
    console.log("Titolo primo post: " + posts[0].title);

    // *3. per ogni post ottieni i commenti
    const allPostsResponse = await fetch("https://jsonplaceholder.typicode.com/posts");
    const allPosts = await allPostsResponse.json();

    //Foreach
    for (const post of allPosts) {
        //console.log(post.id);
        const postCommentsResponse = await fetch("https://jsonplaceholder.typicode.com/comments?postId=" + post.id)
        const postComments = await postCommentsResponse.json();
        console.log(postComments);

    }

}



//Content Negotiation : Accept (C) e Content-Type (CS)





getUserInfo()