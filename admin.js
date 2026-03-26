const API_URL = "https://69080b1eb49bea95fbf23575.mockapi.io/api/v1/shop";

const nameInput = document.getElementById("name");
const priceInput = document.getElementById("price");
const currencySelect = document.getElementById("currency");
const linkInput = document.getElementById("link");
const categorySelect = document.getElementById("category");
const addBtn = document.getElementById("addBtn");
const tbody = document.getElementById("tbody");

let products = [];

async function fetchProducts() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    products = data;
    renderProducts();
  } catch (error) {
    console.error("Xatolik:", error);
  }
}

function renderProducts() {
  tbody.innerHTML = "";

  products.forEach((product, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td class="px-10 ">${product.title}</td>
      <td class="px-6 ">${product.price}$</td>
      <td class="px-6 text-center">
        <button onclick="deleteProduct(${index})" class="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition">
          O'chirish
        </button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

addBtn.addEventListener("click", async () => {
  const title = nameInput.value.trim();
  const price = priceInput.value.trim();
  const image = linkInput.value.trim();
  const category = categorySelect.value;

  if (!title || !price || !image) {
    alert("Barcha maydonlarni to'ldiring");
    return;
  }

  const newProduct = {
    title,
    price: Number(price),
    image,
    category,
    description: "Yangi mahsulot"
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newProduct)
    });

    if (!response.ok) {
      throw new Error("Ma'lumot qo'shilmadi");
    }

    fetchProducts();

    nameInput.value = "";
    priceInput.value = "";
    linkInput.value = "";
    categorySelect.value = "iphone";
    currencySelect.value = "USD";
  } catch (error) {
    console.error("Qo'shishda xatolik:", error);
  }
});

async function deleteProduct(index) {
  const product = products[index];

  if (!product || !product.id) {
    alert("O'chirish uchun id topilmadi");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${product.id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error("O'chirib bo'lmadi");
    }

    fetchProducts();
  } catch (error) {
    console.error("O'chirishda xatolik:", error);
  }
}

fetchProducts();
