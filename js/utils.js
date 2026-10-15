/* ==========================================================================
   MODULE UTILS - FUNGSI BANTUAN & ANALISIS DATA
   ========================================================================== */

/**
 * 1. Fungsi Debounce (Challenge C = 2)
 * Menunda eksekusi fungsi pencarian hingga pengguna berhenti mengetik.
 * 
 * @param {Function} func - Fungsi utama (misal fungsi search/filter)
 * @param {number} delay - Waktu tunda dalam milidetik (ms)
 * @returns {Function} - Fungsi yang sudah dibungkus timer debounce
 */
export function debounce(func, delay = 300) {
    let timeoutId;
    
    return function (...args) {
        // Hapus timer lama jika user mengetik lagi sebelum delay habis
        clearTimeout(timeoutId);
        
        // Buat timer baru
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

/**
 * 2. Fungsi Analisis Data Wajib (Menghitung Statistik API)
 * Sesuai ketentuan PTS: Menghasilkan minimal 2 informasi pengolahan data.
 * 
 * @param {Array} products - Array of objects dari DummyJSON
 * @returns {Object} - Ringkasan statistik (Total item, rata-rata, produk termahal)
 */
export function analyzeProductData(products) {
    // Validasi data masuk
    if (!products || !Array.isArray(products) || products.length === 0) {
        return {
            totalProducts: 0,
            averagePrice: 0,
            formattedAverage: 'Rp 0',
            highestPricedItem: null
        };
    }

    // A. Menghitung Total Produk
    const totalProducts = products.length;

    // B. Menghitung Rata-rata Harga menggunakan reduce()
    const totalPrice = products.reduce((sum, item) => sum + item.price, 0);
    const averagePrice = totalPrice / totalProducts;

    // C. Mencari Produk Termahal menggunakan sort()
    // Kita copy array agar tidak merusak urutan data asli, lalu sorting descending
    const sortedByPrice = [...products].sort((a, b) => b.price - a.price);
    const highestPricedItem = sortedByPrice[0];

    // Konversi kurs ke Rupiah kasar (Misal $1 = Rp 15.000) agar tema UMKM terasa
    const rupiahCourse = 15000;
    const avgInRupiah = averagePrice * rupiahCourse;
    
    // Format mata uang
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    });

    return {
        totalProducts: totalProducts,
        averagePrice: averagePrice,
        formattedAverage: formatter.format(avgInRupiah),
        highestPricedItem: highestPricedItem
    };
}

/**
 * 3. Fungsi Helper Format Harga
 * Menyeragamkan format tampilan harga produk pada kartu (cards).
 */
export function formatPriceToRupiah(priceInDollar) {
    const course = 15000;
    const priceInRp = priceInDollar * course;
    
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(priceInRp);
}