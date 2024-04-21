const box = document.querySelector('.product__card_box');
const modal = document.querySelector('.modal');
const cloase__btn = document.querySelector('.modal__close_btn');

const render = (data) => {
    box.innerHTML = data.map((item) => `
    <div class="product__card">
        <div class="product__img_block">
            <img src="${item.img}" alt="img">
        </div>
        <div class="product__content">
            <h3 class="product__des">${item.name}</h3>
            <p class="product__price">$${item.price}</p>
            <button data-id="${item.id}" class="product__btn">Add</button>        
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

box.addEventListener("click", (e) => {
    if (e.target.dataset.id) {
        fetch(`http://localhost:3000/products/${e.target.dataset.id}`)
            .then((res) => res.json())
            .then((data) => {
                modal.classList.add("active");
                document.body.style.overflow = "hidden";
            })
    }
})
cloase__btn.addEventListener("click", () => {
    modal.classList.remove("active")
    document.body.style.overflow = "";
})


getData()