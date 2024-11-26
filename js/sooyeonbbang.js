const cart = {};
const speechBubble = document.getElementById("speech");
const breadButtons = document.querySelectorAll(".bread");

breadButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const name = button.getAttribute("data-name");
        const price = Number(button.getAttribute("data-price"));

        if (cart[name]) {
            cart[name].count++;
        } else {
            cart[name] = { price, count: 1 };
        }

        updateCart();
        updateSpeechBubble(); // 말풍선 업데이트 호출
    });
});

// 총합 업데이트 
function updateCart() {
    const totalElement = document.getElementById("total");
    let total = 0;

    for (const name in cart) {
        const { price, count } = cart[name];
        total += price * count; // 총합 계산
    }

    totalElement.textContent = total.toLocaleString(); // 총합만 표시
}

function updateSpeechBubble() {
    const cartItems = Object.entries(cart)
        .map(([name, { price, count }]) => `${name} x${count} (${(price * count).toLocaleString()}원)`)
        .join("<br>");
    speechBubble.innerHTML = cartItems || "어서옵쇼"; // 장바구니 정보 또는 기본 메시지
}
