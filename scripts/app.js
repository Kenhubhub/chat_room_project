//DOM queries
const chatList = document.querySelector(".chat-list");
const newChatForm = document.querySelector(".new-chat");
const changeName = document.querySelector(".new-name");
const updateMsg = document.querySelector(".update-mssg");
const rooms = document.querySelector(".chat-rooms");
rooms.addEventListener("click", e => {
    if(e.target.tagName === "BUTTON"){
        console.log(e.target.tagName);
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute("id"));
        chatroom.getChats(chat => {
            chatUI.render(chat);
        })
    }
})
changeName.addEventListener("submit", e => {
    e.preventDefault();
    
    chatroom.updateName(changeName.name.value.trim());
    
    changeName.reset();
    //show and hide update message
    updateMsg.innerHTML = "Name has been changed successfully";
    setTimeout(()=>{
        updateMsg.innerHTML = "";
    }, 3000)

})
newChatForm.addEventListener("submit", e => {
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message).then( () => {
        newChatForm.reset();
        
    }).catch( err => console.log(err));
})
//check local storage for name
const username = localStorage.username ? localStorage.username : "Anonymous";
//class instance
const chatroom = new Chatroom("general",username);
const chatUI = new ChatUI(chatList);


//get chats and render
chatroom.getChats( data => {
    
    chatUI.render(data);
})