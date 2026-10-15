/* ==========================================================================
   MODULE FORM - VALIDASI CLIENT-SIDE (Z = 0)
   ========================================================================== */

export function initFormValidation() {
    const form = document.getElementById('supplier-form');
    const nameInput = document.getElementById('supplier-name');
    const nameError = document.getElementById('name-error');
    const successMsg = document.getElementById('form-success-msg');

    // Jika form tidak ditemukan (misal elemen HTML belum di-load), hentikan fungsi
    if (!form) return;

    form.addEventListener('submit', function (event) {
        // Mencegah form melakukan reload halaman bawaan browser
        event.preventDefault();

        // 1. Reset state (Hapus error dan pesan sukses sebelumnya)
        let isValid = true;
        nameInput.classList.remove('is-invalid');
        nameError.textContent = '';
        successMsg.classList.add('hidden');

        // Ambil nilai input dan hapus spasi berlebih di awal/akhir
        const nameValue = nameInput.value.trim();

        // 2. Logika Validasi (Nama minimal 5 karakter)
        if (nameValue === '') {
            nameInput.classList.add('is-invalid'); // Beri border merah
            nameError.textContent = 'Nama toko tidak boleh kosong.'; // Teks error (Syarat PTS)
            isValid = false;
        } else if (nameValue.length < 5) {
            nameInput.classList.add('is-invalid');
            nameError.textContent = 'Nama toko harus memiliki minimal 5 karakter.';
            isValid = false;
        }

        // 3. Jika Semua Validasi Lolos (Success State)
        if (isValid) {
            successMsg.textContent = `Pendaftaran berhasil! Terima kasih, ${nameValue}. Tim kurasi Tarakota akan meninjau produk Anda.`;
            successMsg.classList.remove('hidden');

            // Kosongkan form kembali
            form.reset();

            // (Opsional) Sembunyikan pesan sukses setelah 5 detik agar UI tetap bersih
            setTimeout(() => {
                successMsg.classList.add('hidden');
            }, 5000);
        }
    });

    // 4. UX Tambahan: Hapus pesan error secara real-time saat pengguna mulai mengetik ulang
    nameInput.addEventListener('input', function () {
        if (nameInput.classList.contains('is-invalid')) {
            nameInput.classList.remove('is-invalid');
            nameError.textContent = '';
        }
    });
}