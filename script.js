const socket = io("https://damp-cove-32919.herokuapp.com/")

const form = document.querySelector('.conversation-compose')
const messageInput = document.querySelector('.input-msg')
let className = 'sent'
const user = prompt('name')
showMessage('Welcome, ' + user)

socket.emit('new-user', user)

socket.on('user-connected', name => {
   showMessage(`${name} connected`)
})

socket.on('user-disconnected', name => {
    showMessage(`${name} disconnected`)
 })

socket.on('chat-message', data => {
    console.log(data.name)
    console.log(user)
    if(user === data.name){
        className = 'sent'
    } else {
        className = 'received'
    }
    showMessage(`${data.name}: ${data.message}`)
})

form.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})

function showMessage(message){
    const main = document.querySelector('.conversation-container')
    const p = document.createElement('div')
    p.className = 'message ' + className
    p.textContent = message
    main.appendChild(p)
}