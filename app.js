const API = "https://69080b1eb49bea95fbf23575.mockapi.io/api/v1/shop";

const productsEl = document.getElementById("products");

async function getProducts() {
  try {
    productsEl.innerHTML = `<p class="text-center text-xl">Loading...</p>`;

    const res = await fetch(API);

    if (!res.ok) {
      throw new Error("Serverda xatolik");
    }

    const data = await res.json();

    renderProducts(data);
  } catch (err) {
    productsEl.innerHTML = `<p class="text-red-500 text-center">${err.message}</p>`;
  }
}

function renderProducts(arr) {
  productsEl.innerHTML = `
    <div class="grid grid-cols-2 gap-6 max-w-6xl h-[] mx-auto ">
      ${arr
        .map(
          (item) => `
        <div class="bg-white rounded-3xl shadow p-4 text-center hover:scale-105 duration-300">
          <img class="h-100 mx-auto object-contain" src="${item.image}" />
          <h2 class="text-xl font-semibold mt-3">${item.title}</h2>
          <p class="text-gray-500">${item.price} $</p>
          <button class="mt-2 cursor-pointer bg-blue-500 text-white px-5 py-2 rounded-xl">
            Sotib olish
          </button>
        </div>
      `,
        )
        .join("")}
    </div>
  `;
}

getProducts();

const themeBtn = document.getElementById("themeBtn");
const moonIcon =  `<svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12.2 22c4.53 0 8.45-2.91 9.76-7.24a1.002 1.002 0 0 0-1.25-1.25c-.78.23-1.58.35-2.38.35-4.52 0-8.2-3.68-8.2-8.2 0-.8.12-1.6.35-2.38.11-.35.01-.74-.25-1s-.64-.36-1-.25A10.17 10.17 0 0 0 2 11.8C2 17.42 6.57 22 12.2 22M8.18 4.65c-.03.34-.05.68-.05 1.02 0 5.62 4.57 10.2 10.2 10.2.34 0 .68-.02 1.02-.05C17.93 18.38 15.23 20 12.2 20 7.68 20 4 16.32 4 11.8a8.15 8.15 0 0 1 4.18-7.15"
                  ></path>
                </svg>`

const sunIcon = `<svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
fill="currentColor" viewBox="0 0 24 24" >

<path d="M12 17.01c2.76 0 5.01-2.25 5.01-5.01S14.76 6.99 12 6.99 6.99 9.24 6.99 12s2.25 5.01 5.01 5.01M12 9c1.66 0 3.01 1.35 3.01 3.01s-1.35 3.01-3.01 3.01-3.01-1.35-3.01-3.01S10.34 9 12 9m1 10h-2v3h2zm0-17h-2v3h2zM2 11h3v2H2zm17 0h3v2h-3zM4.22 18.36l.71.71.71.71 1.06-1.06 1.06-1.06-.71-.71-.71-.71-1.06 1.06zM19.78 5.64l-.71-.71-.71-.71-1.06 1.06-1.06 1.06.71.71.71.71 1.06-1.06zm-12.02.7L6.7 5.28 5.64 4.22l-.71.71-.71.71L5.28 6.7l1.06 1.06.71-.71zm8.48 11.32 1.06 1.06 1.06 1.06.71-.71.71-.71-1.06-1.06-1.06-1.06-.71.71z"></path>
</svg>`


themeBtn.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");

  themeBtn.classList.toggle("dark-icon");

  if (themeBtn.classList.contains("dark-icon")) {
    themeBtn.innerHTML = sunIcon;
  } else {
    themeBtn.innerHTML = moonIcon;
  }
});
