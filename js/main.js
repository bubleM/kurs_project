document.addEventListener('DOMContentLoaded', () => {
    // Инициализация слайдера товаров
    const sliders = document.querySelectorAll('.block-slider');

    sliders.forEach(slider => {
        const slidesContainer = slider.querySelector('.slides');
        const prevButton = slider.querySelector('.prev');
        const nextButton = slider.querySelector('.next');
        const items = slider.querySelectorAll('.item');

        const totalItems = items.length;
        let visibleItems = 4;
        const gap = 15;
        let index = 0;

        function updateVisibleItems() {
            const width = window.innerWidth;
            visibleItems = width < 768 ? 2 : width < 1024 ? 3 : 4;
        }

        function updateSlider() {
            updateVisibleItems();
            const itemWidth = items[0].offsetWidth;
            const translateX = index * (itemWidth + gap);
            slidesContainer.style.transform = `translateX(-${translateX}px)`;
        }

        nextButton.addEventListener('click', () => {
            const maxIndex = Math.max(totalItems - visibleItems, 0);
            if (index < maxIndex) {
                index++;
                updateSlider();
            }
        });

        prevButton.addEventListener('click', () => {
            if (index > 0) {
                index--;
                updateSlider();
            }
        });

        window.addEventListener('resize', () => {
            updateVisibleItems();
            index = Math.min(index, Math.max(totalItems - visibleItems, 0));
            updateSlider();
        });

        updateSlider();
    });

    // Обработчик кнопок "В корзину"
    const buttons = document.querySelectorAll('.item-button');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            this.classList.toggle('in-cart');
            this.textContent = this.classList.contains('in-cart') ? 'В корзине' : 'В корзину';
        });
    });

    // Обработчик кнопки меню-бургера
    const burgerBtn = document.querySelector('.burger');
    const menu = document.querySelector('.menu');

    burgerBtn.addEventListener('click', () => {
        menu.classList.toggle('active');
    });

    document.querySelector(".burger").addEventListener("click", function () {
        let icon = this.querySelector(".burger-menu");
        icon.src = icon.src.includes("burger.svg") ? "img/cross_white.svg" : "img/burger.svg";
    });

    // Открытие/закрытие корзины
    const cartPanel = document.querySelector('.cart-panel');
    const cartIcon = document.querySelector('.cart-icon');
    const closeCart = document.querySelector('.close-cart');
    const cartItemsList = document.querySelector('.cart-items');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateButtonState() {
        buttons.forEach(button => {
            const itemName = button.closest('.item')?.querySelector('.item-text')?.textContent;
            if (!itemName) return;

            button.classList.toggle('in-cart', cart.includes(itemName));
            button.textContent = cart.includes(itemName) ? 'В корзине' : 'В корзину';
        });
    }

    function updateCartUI() {
        if (!cartItemsList) return;
        cartItemsList.innerHTML = '';

        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;

            const removeBtn = document.createElement('button');
            removeBtn.innerHTML = '<img src="img/cross_black.svg" alt="Удалить">';
            removeBtn.classList.add('remove-item'); 

            removeBtn.addEventListener('click', () => {
                cart = cart.filter(cartItem => cartItem !== item);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartUI();
                updateButtonState();
            });

            li.appendChild(removeBtn);
            cartItemsList.appendChild(li);
        });
    }

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const itemName = this.closest('.item')?.querySelector('.item-text')?.textContent;
            if (!itemName) return;

            cart.includes(itemName) ? cart.splice(cart.indexOf(itemName), 1) : cart.push(itemName);

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartUI();
            updateButtonState();
        });
    });

    cartIcon.addEventListener('click', () => cartPanel.classList.add('active'));
    closeCart.addEventListener('click', () => cartPanel.classList.remove('active'));

    updateCartUI();
    updateButtonState();
});
