/* ==========================================================================
   MASTER CONTROLLER - FETCH API, DOM RENDER & EVENT HANDLING
   ========================================================================== */

import { debounce, analyzeProductData, formatPriceToRupiah, transformToMusicGear } from './utils.js';
import { getFavorites, isFavorite, toggleFavorite } from './storage.js';
import { initFormValidation } from './form.js';

// Seleksi Elemen DOM
const productContainer = document.getElementById('product-container');
const searchInput = document.getElementById('search-input');
const btnShowBookmarks = document.getElementById('btn-show-bookmarks');
const stateMessage = document.getElementById('ui-state-message');
const statTotal = document.getElementById('stat-total');
const statAvg = document.getElementById('stat-avg');

let allProducts = [];
let isShowingBookmarks = false;

// Fungsi Render Data ke DOM
function renderProducts(products) {
    productContainer.replaceChildren();

    if (products.length === 0) {
        const emptyMsg = document.createElement('p');
        emptyMsg.textContent = isShowingBookmarks ? 'Kamu belum memiliki produk favorit.' : 'Produk tidak ditemukan.';
        emptyMsg.style.gridColumn = '1 / -1';
        emptyMsg.style.textAlign = 'center';
        productContainer.appendChild(emptyMsg);
        return;
    }

    products.forEach(product => {
        const card = document.createElement('article');
        card.className = 'product-card';

        const imgWrapper = document.createElement('div');
        imgWrapper.className = 'product-img-wrapper';
        
        const img = document.createElement('img');
        img.src = product.thumbnail;
        img.alt = product.title;
        img.loading = 'lazy';
        
        const badge = document.createElement('span');
        badge.className = 'badge-category';
        badge.textContent = product.category;

        imgWrapper.append(img, badge);

        const body = document.createElement('div');
        body.className = 'product-body';

        const title = document.createElement('h3');
        title.className = 'product-title';
        title.textContent = product.title;

        const desc = document.createElement('p');
        desc.className = 'product-desc';
        desc.textContent = product.description;

        const footer = document.createElement('div');
        footer.className = 'product-footer';

        const price = document.createElement('span');
        price.className = 'product-price';
        price.textContent = formatPriceToRupiah(product.price);

        const btnFavorite = document.createElement('button');
        btnFavorite.className = `btn-bookmark ${isFavorite(product.id) ? 'active' : ''}`;
        btnFavorite.textContent = isFavorite(product.id) ? '⭐ Disimpan' : '☆ Favorit';
        btnFavorite.dataset.id = product.id;

        footer.append(price, btnFavorite);
        body.append(title, desc, footer);
        card.append(imgWrapper, body);

        productContainer.appendChild(card);
    });
}

// Fungsi Fetch Data dari API DummyJSON
async function loadData() {
    try {
        productContainer.classList.add('hidden');
        stateMessage.classList.remove('hidden');
        stateMessage.innerHTML = `
            <div class="loader-spinner" role="status">
                <span class="visually-hidden">Memuat data produk...</span>
            </div>
            <p>Menghubungkan ke gudang Tarakota...</p>
        `;

        const response = await fetch('https://dummyjson.com/products');
        
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        
        // Transformasi produk DummyJSON ke Katalog Alat Musik Tarakota
        allProducts = transformToMusicGear(data.products);

        stateMessage.classList.add('hidden');
        productContainer.classList.remove('hidden');
        renderProducts(allProducts);

        const stats = analyzeProductData(allProducts);
        statTotal.textContent = stats.totalProducts + ' Item';
        statAvg.textContent = stats.formattedAverage;

    } catch (error) {
        stateMessage.innerHTML = `
            <p class="text-error">Data gagal dimuat. Periksa koneksi internet Anda.</p>
            <p class="text-error" style="font-size: 0.8rem; margin-top:0.5rem;">Log: ${error.message}</p>
            <button id="btn-retry" class="btn-retry">Coba Lagi</button>
        `;
        document.getElementById('btn-retry').addEventListener('click', loadData);
    }
}

// Fitur Pencarian Dinamis dengan Debounce
const handleSearch = debounce((event) => {
    const keyword = event.target.value.toLowerCase();
    const dataSource = isShowingBookmarks ? getFavorites() : allProducts;
    
    const filteredProducts = dataSource.filter(product => 
        product.title.toLowerCase().includes(keyword) || 
        product.category.toLowerCase().includes(keyword) ||
        product.description.toLowerCase().includes(keyword)
    );
    
    renderProducts(filteredProducts);
}, 300);

searchInput.addEventListener('input', handleSearch);

// Toggle Bookmark View
btnShowBookmarks.addEventListener('click', () => {
    isShowingBookmarks = !isShowingBookmarks;
    
    if (isShowingBookmarks) {
        btnShowBookmarks.textContent = '📦 Kembali ke Semua Produk';
        btnShowBookmarks.style.backgroundColor = 'var(--color-dark)';
        renderProducts(getFavorites());
    } else {
        btnShowBookmarks.textContent = '⭐ Lihat Favorit Saya';
        btnShowBookmarks.style.backgroundColor = 'var(--color-primary)';
        const currentSearch = searchInput.value;
        if(currentSearch) {
            searchInput.dispatchEvent(new Event('input'));
        } else {
            renderProducts(allProducts);
        }
    }
});

// Event Delegation Tombol Favorit
productContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-bookmark')) {
        const productId = parseInt(event.target.dataset.id);
        const productData = allProducts.find(p => p.id === productId) || getFavorites().find(p => p.id === productId);
        
        if (productData) {
            const isNowFavorited = toggleFavorite(productData);
            
            if (isNowFavorited) {
                event.target.classList.add('active');
                event.target.textContent = '⭐ Disimpan';
            } else {
                event.target.classList.remove('active');
                event.target.textContent = '☆ Favorit';
                
                if (isShowingBookmarks) {
                    renderProducts(getFavorites());
                }
            }
        }
    }
});

// Inisialisasi
document.addEventListener('DOMContentLoaded', () => {
    initFormValidation();
    loadData();
});