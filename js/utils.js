/* ==========================================================================
   MODULE UTILS - FUNGSI BANTUAN, TRANSFORMATION & ANALISIS DATA
   ========================================================================== */

// Katalog Alat Musik & Aksesoris Tarakota Skena
const musicGearCatalog = [
    { title: "Fender Player Stratocaster Guitar", category: "Gitar", description: "Gitar elektrik klasik ikonik dengan 3 single-coil pickup Player Series, neck maple modern C, dan tremolo 2-point synchronous.", thumbnail: "https://images.unsplash.com/photo-1550985616-10810253b84d?w=500&auto=format&fit=crop", price: 849 },
    { title: "Gibson Les Paul Standard '60s", category: "Gitar", description: "Gitar elektrik legendaris dengan body mahoni, AA figured maple top, pickup Burstbucker 61, dan konstruksi set-neck presisi.", thumbnail: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format&fit=crop", price: 2799 },
    { title: "BOSS DS-1 Distortion Pedal", category: "Pedal & Efek", description: "Pedal efek distorsi standar panggung dengan karakter tone tajam berkristal, cocok untuk genre Rock, Grunge, dan Metal.", thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500&auto=format&fit=crop", price: 69 },
    { title: "Ibanez TS9 Tube Screamer", category: "Pedal & Efek", description: "Pedal overdrive legendaris warna hijau dengan dorongan mid-range hangat untuk mendongkrak karakter ampli tabung.", thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500&auto=format&fit=crop", price: 109 },
    { title: "Shure SM58 Dynamic Vocal Mic", category: "Pro Audio", description: "Mikrofon vokal panggung standar industri dengan pola kardioid serbaguna, tahan banting, dan peredam noise internal.", thumbnail: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500&auto=format&fit=crop", price: 99 },
    { title: "Shure SM57 Instrument Microphone", category: "Pro Audio", description: "Mikrofon dinamik instrumen serbaguna untuk kabinet gitar, snare drum, dan instrumen tiup dengan respon frekuensi tajam.", thumbnail: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500&auto=format&fit=crop", price: 99 },
    { title: "Fender Player Precision Bass", category: "Bass", description: "Bass elektrik 4-string dengan split-coil pickup Alnico 5, punch bass tebal, dan profil leher nyaman untuk panggung.", thumbnail: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=500&auto=format&fit=crop", price: 799 },
    { title: "Focusrite Scarlett 2i2 4th Gen", category: "Pro Audio", description: "Audio interface USB studio recording 2-in/2-out dengan preamp ultra-low noise, mode Air, dan konverter 192kHz/24-bit.", thumbnail: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop", price: 199 },
    { title: "KRK Rokit 5 G4 Studio Monitor", category: "Pro Audio", description: "Speaker monitor studio pro 5-inci bi-amp dengan Kevlar driver, DSP graphic EQ, dan respon frekuensi flat presisi.", thumbnail: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&auto=format&fit=crop", price: 189 },
    { title: "Roland TD-17KVX2 V-Drums Kit", category: "Drum & Perkusi", description: "Set drum elektrik profesional dengan pad mesh-head 12 inci, cymbals thin-profile, serta modul TD-17 dengan Bluetooth.", thumbnail: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=500&auto=format&fit=crop", price: 1599 },
    { title: "Korg Minilogue XD Synthesizer", category: "Keyboard & Synth", description: "Synthesizer analog hibrida 4-voice polyphonic dengan digital multi-engine, 16-step sequencer, dan efek stereo berkualitas.", thumbnail: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=500&auto=format&fit=crop", price: 649 },
    { title: "Marshall DSL40CR Tube Amp", category: "Amplifier", description: "Amplifier gitar combo tabung 40 Watt dengan speaker Celestion V-Type 12-inci, 2 channel gain terpisah, dan efek Reverb.", thumbnail: "https://images.unsplash.com/photo-1543362906-acfc16c67564?w=500&auto=format&fit=crop", price: 899 },
    { title: "Boss Katana-50 MkII Guitar Amp", category: "Amplifier", description: "Amplifier pemodelan combo 50-Watt serbaguna dengan 5 karakter amp unik, 60+ efek BOSS internal, dan USB recording.", thumbnail: "https://images.unsplash.com/photo-1543362906-acfc16c67564?w=500&auto=format&fit=crop", price: 269 },
    { title: "Audio-Technica ATH-M50x", category: "Pro Audio", description: "Headphone studio monitor profesional terpopuler dengan driver 45mm, isolasi suara luar biasa, dan desain swivel 90 derajat.", thumbnail: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop", price: 149 },
    { title: "Mogami Gold Studio XLR Cable 10ft", category: "Aksesoris", description: "Kabel mikrofon kabel balanced kualitas audiophile dengan konektor Neutrik berlapis emas dan pelindung noise maksimal.", thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop", price: 49 },
    { title: "Ernie Ball Slinky Strings Pack", category: "Aksesoris", description: "Senar gitar elektrik berlapis nikel gauge .010-.046 paling populer dengan nada jernih dan keandalan tinggi.", thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop", price: 12 },
    { title: "Yamaha HS5 Studio Monitor", category: "Pro Audio", description: "Speaker monitor studio aktif 5-inci dengan bass-reflex woofer ikonik warna putih, suara jujur dan jernih untuk mixing.", thumbnail: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&auto=format&fit=crop", price: 199 },
    { title: "Novation Launchkey 49 MK3", category: "Keyboard & Synth", description: "MIDI Controller Keyboard 49 tuts dengan 16 pad sensitif kecepatan warna RGB, fader, encoder, dan integrasi DAW mendalam.", thumbnail: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=500&auto=format&fit=crop", price: 229 },
    { title: "Electro-Harmonix Big Muff Pi", category: "Pedal & Efek", description: "Pedal efek Fuzz Sustainer legendaris yang menghasilkan tone distortion tebal bersuara khas raksasa.", thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500&auto=format&fit=crop", price: 95 },
    { title: "Epiphone SG Standard Cherry", category: "Gitar", description: "Gitar elektrik double-cutaway ikonik berwana Heritage Cherry dengan pickup ProBucker humbucker dan leher mahoni.", thumbnail: "https://images.unsplash.com/photo-1550985616-10810253b84d?w=500&auto=format&fit=crop", price: 499 },
    { title: "Pearl Export EXX Drum Set", category: "Drum & Perkusi", description: "Set drum akustik 5-piece terlaris di dunia dengan shell gabungan mahoni/poplar, hardware seri 830, dan pedal Demonator.", thumbnail: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=500&auto=format&fit=crop", price: 799 },
    { title: "Roland FP-30X Digital Piano", category: "Keyboard & Synth", description: "Piano digital portabel dengan tuts berbobot PHA-4 Standard, generator suara SuperNATURAL, dan konektivitas Bluetooth.", thumbnail: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=500&auto=format&fit=crop", price: 749 },
    { title: "Dunlop Tortex Picks 0.88mm Pack", category: "Aksesoris", description: "Paket pick gitar Tortex hijau tebal 0.88mm dengan daya cengkeram tinggi dan daya tahan gesekan senar maksimal.", thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop", price: 8 },
    { title: "Strymon Timeline Delay Pedal", category: "Pedal & Efek", description: "Pedal efek delay stereo kelas flagship studio dengan 12 mesin delay unik, kontrol MIDI, dan preset memori internal.", thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500&auto=format&fit=crop", price: 449 },
    { title: "Hercules GS414B PLUS Stand", category: "Aksesoris", description: "Stand gitar gantung dengan sistem Auto Grip System (AGS) otomatis yang mengunci leher gitar dengan aman di panggung.", thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop", price: 59 },
    { title: "Orange Crush 35RT Combo Amp", category: "Amplifier", description: "Ampli gitar solid-state 35 Watt 2-channel dengan tuner bawaan, efek Reverb jernih, dan speaker World of Orange 10-inci.", thumbnail: "https://images.unsplash.com/photo-1543362906-acfc16c67564?w=500&auto=format&fit=crop", price: 299 },
    { title: "Levy's 2\" Leather Guitar Strap", category: "Aksesoris", description: "Strap/Tali gitar bahan kulit sapi asli lebar 2 inci dengan bantalan bahu empuk untuk kenyamanan manggung berjam-jam.", thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop", price: 45 },
    { title: "Audio-Technica AT2020 Mic", category: "Pro Audio", description: "Mikrofon kondenser kardioid studio rekaman dengan diafragma berelemen rendah massa untuk respon frekuensi luas.", thumbnail: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500&auto=format&fit=crop", price: 99 },
    { title: "Squier Classic Vibe '60s Jazz Bass", category: "Bass", description: "Bass elektrik 4-string bergaya retro vintage dengan dual Fender-designed alnico single-coil pickups dan leher C-shape.", thumbnail: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=500&auto=format&fit=crop", price: 479 },
    { title: "Yamaha Pacifica 112V Guitar", category: "Gitar", description: "Gitar elektrik serbaguna dengan konfigurasi pickup HSS (Humbucker-Single-Single), body alder, dan push-pull coil tap switch.", thumbnail: "https://images.unsplash.com/photo-1550985616-10810253b84d?w=500&auto=format&fit=crop", price: 329 }
];

/**
 * Memetakan data hasil Fetch API DummyJSON ke Katalog Alat Musik Tarakota
 */
export function transformToMusicGear(apiProducts) {
    if (!apiProducts || !Array.isArray(apiProducts)) return [];

    return apiProducts.map((product, index) => {
        const gearInfo = musicGearCatalog[index % musicGearCatalog.length];
        return {
            ...product,
            title: gearInfo.title,
            category: gearInfo.category,
            description: gearInfo.description,
            thumbnail: gearInfo.thumbnail,
            price: gearInfo.price
        };
    });
}

/**
 * 1. Fungsi Debounce (Challenge C = 2)
 */
export function debounce(func, delay = 300) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

/**
 * 2. Fungsi Analisis Data Wajib
 */
export function analyzeProductData(products) {
    if (!products || !Array.isArray(products) || products.length === 0) {
        return {
            totalProducts: 0,
            averagePrice: 0,
            formattedAverage: 'Rp 0',
            highestPricedItem: null
        };
    }

    const totalProducts = products.length;
    const totalPrice = products.reduce((sum, item) => sum + item.price, 0);
    const averagePrice = totalPrice / totalProducts;

    const sortedByPrice = [...products].sort((a, b) => b.price - a.price);
    const highestPricedItem = sortedByPrice[0];

    const rupiahCourse = 15000;
    const avgInRupiah = averagePrice * rupiahCourse;
    
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