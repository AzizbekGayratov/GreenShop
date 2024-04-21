const box = document.querySelector('.product__card_box');
const modal = document.querySelector('.modal');
const cloase__btn = document.querySelector('.modal__close_btn');
const content = document.querySelector('.modal__content_block');

const render = (data) => {
    box.innerHTML = data.map((item) => `
    <div class="product__card">
        <div class="product__img_block">
            <img src="${item.img}" alt="img">
        </div>
        <div class="product__content">
            <h3 class="product__des">${item.name}</h3>
            <p class="product__price">$${item.price}</p>
            <button data-id="${item.id}" class="product__btn">View</button>        
        </div>
    </div>
    `).join("")
}

const getData = () => {
    fetch('http://localhost:3000/products')
        .then((res) => res.json())
        .then((data) => {
            render(data)
        })
}

const renderSingleData = (data) => {
    content.innerHTML = `
    <div class="modal__card">
        <div class="modal__img_block">
            <img src="${data.img}" alt="img">
        </div>
        <div class="modal__card_content">
            <h3 class="modal__card_title">${data.name}</h3>
            <p class="modal__card_price">$${data.price}</p>
            <div class="modal__card_des_box">
                <span class="modal__card_cap">Short Description:</span>
                <p class="modal__card_text">The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. </p>
            </div>
            <button data-buy="${data.id}" class="modal__card_btn">Buy</button>
        </div>
    </div>
    `;
    const buy__btn = document.querySelector('.modal__card_btn');
    buy__btn.addEventListener("click", () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const element = cart.find(item => item.id === data.id);
        if (!element) {
            cart.push(data);
            localStorage.setItem("cart", JSON.stringify(cart));
        }
        modal.classList.remove("active")
        document.body.style.overflow = "auto";
    })
}

box.addEventListener("click", (e) => {
    if (e.target.dataset.id) {
        fetch(`http://localhost:3000/products/${e.target.dataset.id}`)
            .then((res) => res.json())
            .then((data) => {
                modal.classList.add("active");
                document.body.style.overflow = "hidden";
                renderSingleData(data)
            })
    }
})
cloase__btn.addEventListener("click", () => {
    modal.classList.remove("active")
    document.body.style.overflow = "auto";
})


getData()