/* ==========================================================================
   MASTER CONTROLLER - FETCH API, DOM RENDER & EVENT HANDLING
   ========================================================================== */

// 1. Impor semua modul yang sudah kita buat
import { debounce, analyzeProductData, formatPriceToRupiah } from './utils.js';
import { getFavorites, isFavorite, toggleFavorite } from './storage.js';
import { initFormValidation } from './form.js';

// 2. Seleksi Elemen DOM
const productContainer = document.getElementById('product-container');
const searchInput = document.getElementById('search-input');
const btnShowBookmarks = document.getElementById('btn-show-bookmarks');
const stateMessage = document.getElementById('ui-state-message');
const statTotal = document.getElementById('stat-total');
const statAvg = document.getElementById('stat-avg');

// Variabel Global untuk menyimpan data API
let allProducts = [];
let isShowingBookmarks = false; // Status apakah sedang mode lihat favorit

// 3. Fungsi Render Data ke DOM (Safe Update tanpa innerHTML)
function renderProducts(products) {
    productContainer.replaceChildren(); // Kosongkan kontainer

    if (products.length === 0) {
        const emptyMsg = document.createElement('p');
        emptyMsg.textContent = isShowingBookmarks ? 'Kamu belum memiliki produk favorit.' : 'Produk tidak ditemukan.';
        emptyMsg.style.gridColumn = '1 / -1';
        emptyMsg.style.textAlign = 'center';
        productContainer.appendChild(emptyMsg);
        return;
    }

    products.forEach(product => {
        // Buat elemen kartu (card)
        const card = document.createElement('article');
        card.className = 'product-card';

        // Wrapper Gambar & Kategori
        const imgWrapper = document.createElement('div');
        imgWrapper.className = 'product-img-wrapper';
        
        const img = document.createElement('img');
        img.src = product.thumbnail;
        img.alt = product.title;
        img.loading = 'lazy'; // Performa ekstra
        
        const badge = document.createElement('span');
        badge.className = 'badge-category';
        badge.textContent = product.category;

        imgWrapper.append(img, badge);

        // Body Info Produk
        const body = document.createElement('div');
        body.className = 'product-body';

        const title = document.createElement('h3');
        title.className = 'product-title';
        title.textContent = product.title;

        const desc = document.createElement('p');
        desc.className = 'product-desc';
        desc.textContent = product.description;

        // Footer Card (Harga & Tombol Favorit)
        const footer = document.createElement('div');
        footer.className = 'product-footer';

        const price = document.createElement('span');
        price.className = 'product-price';
        price.textContent = formatPriceToRupiah(product.price);

        const btnFavorite = document.createElement('button');
        btnFavorite.className = `btn-bookmark ${isFavorite(product.id) ? 'active' : ''}`;
        btnFavorite.textContent = isFavorite(product.id) ? '⭐ Disimpan' : '☆ Favorit';
        btnFavorite.dataset.id = product.id; // Simpan ID di elemen

        footer.append(price, btnFavorite);
        body.append(title, desc, footer);
        card.append(imgWrapper, body);

        productContainer.appendChild(card);
    });
}

// 4. Fungsi Mengambil Data (Fetch API) dengan async/await
async function loadData() {
    try {
        // A. Loading State
        productContainer.classList.add('hidden');
        stateMessage.classList.remove('hidden');
        stateMessage.innerHTML = `
            <div class="loader-spinner" role="status">
                <span class="visually-hidden">Memuat data produk...</span>
            </div>
            <p>Menghubungkan ke gudang Tarakota...</p>
        `;

        // B. Fetch Data ke API Eksternal
        const response = await fetch('https://dummyjson.com/products');
        
        // Pengecekan HTTP Error
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        allProducts = data.products; // DummyJSON menyimpan array di dalam properti "products"

        // C. Success State
        stateMessage.classList.add('hidden');
        productContainer.classList.remove('hidden');
        renderProducts(allProducts);

        // D. Update Statistik Wajib
        const stats = analyzeProductData(allProducts);
        statTotal.textContent = stats.totalProducts + ' Item';
        statAvg.textContent = stats.formattedAverage;

    } catch (error) {
        // E. Error State
        stateMessage.innerHTML = `
            <p class="text-error">Data gagal dimuat. Periksa koneksi internet Anda.</p>
            <p class="text-error" style="font-size: 0.8rem; margin-top:0.5rem;">Log: ${error.message}</p>
            <button id="btn-retry" class="btn-retry">Coba Lagi</button>
        `;
        
        // Event Listener untuk tombol Retry
        document.getElementById('btn-retry').addEventListener('click', loadData);
    }
}

// 5. Fitur Pencarian Dinamis dengan Debounce (Challenge C = 2)
const handleSearch = debounce((event) => {
    const keyword = event.target.value.toLowerCase();
    
    // Jika sedang di mode favorit, cari dari data favorit. Jika tidak, dari allProducts.
    const dataSource = isShowingBookmarks ? getFavorites() : allProducts;
    
    const filteredProducts = dataSource.filter(product => 
        product.title.toLowerCase().includes(keyword) || 
        product.category.toLowerCase().includes(keyword)
    );
    
    renderProducts(filteredProducts);
}, 300); // Waktu tunda 300ms

searchInput.addEventListener('input', handleSearch);

// 6. Fitur Toggle Bookmark View (Melihat produk yang difavoritkan)
btnShowBookmarks.addEventListener('click', () => {
    isShowingBookmarks = !isShowingBookmarks;
    
    if (isShowingBookmarks) {
        btnShowBookmarks.textContent = '📦 Kembali ke Semua Produk';
        btnShowBookmarks.style.backgroundColor = 'var(--color-dark)';
        renderProducts(getFavorites());
    } else {
        btnShowBookmarks.textContent = '⭐ Lihat Favorit Saya';
        btnShowBookmarks.style.backgroundColor = 'var(--color-primary)';
        // Terapkan ulang pencarian jika input search tidak kosong
        const currentSearch = searchInput.value;
        if(currentSearch) {
            searchInput.dispatchEvent(new Event('input'));
        } else {
            renderProducts(allProducts);
        }
    }
});

// 7. Event Delegation untuk Tombol Favorit di dalam Cards
productContainer.addEventListener('click', (event) => {
    // Cek apakah yang diklik adalah tombol bookmark
    if (event.target.classList.contains('btn-bookmark')) {
        const productId = parseInt(event.target.dataset.id);
        const productData = allProducts.find(p => p.id === productId) || getFavorites().find(p => p.id === productId);
        
        if (productData) {
            // Jalankan fungsi toggle dari storage.js
            const isNowFavorited = toggleFavorite(productData);
            
            // Update UI tombol
            if (isNowFavorited) {
                event.target.classList.add('active');
                event.target.textContent = '⭐ Disimpan';
            } else {
                event.target.classList.remove('active');
                event.target.textContent = '☆ Favorit';
                
                // Jika sedang di mode "Lihat Favorit", langsung hapus card dari layar
                if (isShowingBookmarks) {
                    renderProducts(getFavorites());
                }
            }
        }
    }
});

// 8. Inisialisasi Aplikasi Saat Halaman Siap
document.addEventListener('DOMContentLoaded', () => {
    initFormValidation(); // Jalankan form.js
    loadData();           // Tarik data API
});