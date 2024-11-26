//장바구니 데이터
const cart = {};

// HTML 요소 참조
const menu = document.querySelector("#menu");
const cartDisplay = document.querySelector("#cart");
const totalDisplay = document.querySelector("#total");

//메뉴 버튼 클릭 이벤트 추가
menu.addEventListener("click", (event) => {
// 버튼 세개가 담겨있는 메뉴를 클릭했는데,
//클릭한 그 위치가 버튼이면 통과
if (event.target.tagName === "BUTTON") {
const name = event. target.getAttribute("data-name");
// 그 타겟의 속성(data-name)을 가지고 와서, name에 할당해
const price = Number(event.target.getAttribute("data-price"));
// 그 타겟의 속성(data-price)을 가지고 와서, price에 할당해

// 장바구니 수량 추가 또는 수량 증가, 삼항연산자 버전
// cart[name] = cart[name] ? { price, count: cart[name].count + 1 } : {price, count: 1 };
// 만약 'cart'에 'name'이라는 상품이 존재한다면 +1, 존재하지 않는다면 장바구니에 추가하고 수량 1로 설정/ if문 버전

// 객체 접근법 1. 점표기법(객체명,키이름) 2. 대괄호 표기법(객체명[키이름])
// 예시: cart.coffee cart[coffee]
// 위에 선언된 cart라는 객체에 접근할거야(초기 값 없음)
// 카트 현 상황은 모르지만, 내가 버튼을 눌렀을때 카트 안에 같은 상품이 있으면 갯수를 늘려주고, 없으면 1개라고 표시해줘
if (cart[name]) { cart[name].count++; }
else { cart[name] = {price, count: 1 } ; }

// UI 업데이트
updateCart(); // 외부에 선언된 함수 콜링
console.log(cart);// 카트 현상황 보여줘
}
});

// 장바구니와 총액 업데이트
function updateCart() {
    cartDisplay. innerHTML = ""; // 변수cartDisplay의 자식 태그구성을 공백으로 초기화
    let total = 0; // 총 금액은 0이다.
    
    // for in 구문, 객체 안에서만 도는 반복문
    // 번외) for of 구문, 배열 안에서만 도는 반복문
    // cart라는 객체 안에서만, 각 메뉴(덩어리)를 name이라는 변수로 부를게
    for (const name in cart) {
        const { price , count } = cart[name]; 
        // 구조 분해 할당 함, 오른쪽 값을 왼쪽의 구성으로 해체
        // 값이 두개가 들어있는 상채라, price와 count에 각각 할당
        total += price * count; // 계산해서,total에 누적할당해줘
        
        const item = document. createElement("div");
        // div만들어서 item이라고 할게
        // item에 글씨만 넣어줘 .textContent

        item.textContent = `${name} x${count} (${(price * count).toLocaleString()}원)`;
        // toLocaleString() 라는 메서드는 문화권에 대응, 우리나라 3자리수 콤마를 넣으려는 함수
        cartDisplay.appendChild(item);
        // .appendChild(item) 미리 만들어둔 cartDisplay에 item을 자식으로 추가해줘
    }

        totalDisplay.textContent = total.toLocaleString();
        // 미리 만들어둔 totalDisplay에 세자리 콤마 금액을 글씨만 떼어 넣어줘

}
