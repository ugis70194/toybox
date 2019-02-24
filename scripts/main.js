document.querySelector('h1').textContent = 'Hello world!'
document.querySelector('html').onclick = () => {
    console.log('なにすんねん！しばくぞ')
}
const MyImage = document.querySelector('img')
MyImage.onclick = () => {
    const MySrc = MyImage.getAttribute('src')
    if(MySrc === 'https://pbs.twimg.com/profile_images/378800000000403108/c8cfcb35c76ca5fc55fc2dc680685e8c_400x400.png'){
        MyImage.setAttribute('src','https://pbs.twimg.com/profile_images/909282330476388352/RdTwaruq_400x400.jpg')
    }
    else {
        MyImage.setAttribute('src','https://pbs.twimg.com/profile_images/378800000000403108/c8cfcb35c76ca5fc55fc2dc680685e8c_400x400.png')
    }
}

const MyButton = document.querySelector('button')
const MyHeading = document.querySelector('h1')

function setUserName() {
    const myName = prompt('なまえをいれてね')
    localStorage.setItem('name' ,myName)
    MyHeading.textContent = 'こんにちは ' + myName
}

if(!localStorage.getItem('name')) setUserName()
else {
    const storedName = localStorage.getItem('name')
    MyHeading.textContent = 'こんにちは ' + storedName
}

MyButton.onclick = () => setUserName()

