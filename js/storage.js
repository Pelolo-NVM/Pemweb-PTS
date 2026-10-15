/* ==========================================================================
   MODULE STORAGE - PENANGANAN LOCALSTORAGE (FAVORIT/BOOKMARK)
   ========================================================================== */

// Kunci utama untuk menyimpan data di memori browser
const STORAGE_KEY = 'tarakota_favorites';

/**
 * 1. Mengambil seluruh daftar produk favorit dari localStorage
 * @returns {Array} Array yang berisi objek produk favorit
 */
export function getFavorites() {
    const savedData = localStorage.getItem(STORAGE_KEY);
    // Jika ada data, ubah teks JSON menjadi Array. Jika kosong, kembalikan Array kosong []
    return savedData ? JSON.parse(savedData) : [];
}

/**
 * 2. Mengecek apakah sebuah produk sudah difavoritkan sebelumnya
 * @param {number} productId - ID dari produk yang dicek
 * @returns {boolean} True jika sudah favorit, False jika belum
 */
export function isFavorite(productId) {
    const favorites = getFavorites();
    // Cari apakah ada produk dengan ID yang sama di dalam array
    return favorites.some(item => item.id === productId);
}

/**
 * 3. Menambahkan atau menghapus produk dari daftar favorit (Toggle)
 * @param {Object} product - Objek data produk utuh dari API
 * @returns {boolean} Status akhir: true jika berhasil ditambah, false jika dihapus
 */
export function toggleFavorite(product) {
    let favorites = getFavorites();
    
    // Cari posisi index produk di dalam array favorit
    const index = favorites.findIndex(item => item.id === product.id);
    let isNowFavorited = false;

    if (index === -1) {
        // Jika index -1 (artinya tidak ditemukan), maka TAMBAHKAN ke favorit
        favorites.push(product);
        isNowFavorited = true;
    } else {
        // Jika ditemukan, maka HAPUS dari favorit (Toggle hapus)
        favorites.splice(index, 1);
        isNowFavorited = false;
    }

    // Simpan kembali array yang sudah diubah ke dalam localStorage dalam format String
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    
    return isNowFavorited;
}