const list = document.querySelector('.cart__list');

const render = (data) => {
    list.innerHTML = data.map((item) => `
    <li class="cart__item">
        <div class="cart__img_block">
            <div class="cart__img">
                <img src="${item.img}" alt="img">
            </div>
            <h3 class="cart__title">${item.name}</h3>
        </div>
        <span class="cart__price">$${item.price}</span>
        <button data-delete="${item.id}" class="cart__btn">Delete</button>
    </li>
    `).join("")
}

const getData = () => {
    const data = JSON.parse(localStorage.getItem("cart"))
    render(data)
}

list, addEventListener("click", (e) => {
    if (e.target.dataset.delete) {
        const cart = JSON.parse(localStorage.getItem("cart"));
        const element = cart.find(item => item.id === e.target.dataset.delete);
        if (element) {
            cart.pop(e.target.dataset.delete)
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }
    getData()
})


getData()