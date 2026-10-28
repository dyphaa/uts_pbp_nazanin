/* ===== Musik latar =====
   Isi lagu di index.html pada <audio id="musik" src="...">  */
var musik = document.getElementById("musik");

function putarMusik() {
  musik.play(); // [DI LUAR CHEATSHEET] play()
}
// Lagu TIDAK autoplay: baru diputar saat tombol "Open Invitation" diklik (lihat bukaUndangan)
/* ===== Countdown menuju 8 November 2026, jam 15.00 ===== */
var tujuan = new Date(2026, 10, 8, 15); // tahun, bulan (0-11), tanggal, jam

function tambahNol(angka) {
  if (angka < 10) {
    return "0" + angka;
  }
  return angka;
}

function hitungMundur() {
  var sekarang = new Date();
  var selisih = (tujuan - sekarang) / 1000; // detik
  if (selisih < 0) {
    selisih = 0;
  }
  var hari = Math.floor(selisih / 86400); // [DI LUAR CHEATSHEET] Math.floor
  var jam = Math.floor((selisih % 86400) / 3600);
  var menit = Math.floor((selisih % 3600) / 60);
  var detik = Math.floor(selisih % 60);
  document.getElementById("hari").textContent = tambahNol(hari);
  document.getElementById("jam").textContent = tambahNol(jam);
  document.getElementById("menit").textContent = tambahNol(menit);
  document.getElementById("detik").textContent = tambahNol(detik);
}
hitungMundur();
setInterval(hitungMundur, 1000);

/* ===== Nomor telepon: hanya angka ===== */
function bersihkanTelp() {
  var kolom = document.getElementById("telp");
  var asli = kolom.value;
  var bersih = "";
  for (var i = 0; i < asli.length; i++) {
    var huruf = asli.charAt(i); // [DI LUAR CHEATSHEET] charAt
    if (huruf >= "0" && huruf <= "9") {
      bersih += huruf;
    }
  }
  kolom.value = bersih; // huruf selain angka langsung dibuang
}

/* ===== Pilihan tunggal (Will You Attend & Number of Guests) ===== */
var jawabanHadir = "";
var jawabanTamu = "";

function pilih(idDipilih, daftarId) {
  daftarId.forEach(function (id) {
    document.getElementById(id).classList.remove("sel");
  });
  document.getElementById(idDipilih).classList.add("sel");
  var teks = document.getElementById(idDipilih).textContent;
  if (idDipilih === "a1" || idDipilih === "a2" || idDipilih === "a3") {
    jawabanHadir = teks;
  } else {
    jawabanTamu = teks;
  }
}

/* ===== QR tiruan (mockup visual) ===== */
function buatQR() {
  var hasil = "";
  for (var baris = 0; baris < 21; baris++) {
    for (var kolom = 0; kolom < 21; kolom++) {
      var sudut = (baris < 7 && kolom < 7) || (baris < 7 && kolom > 13) || (baris > 13 && kolom < 7);
      var hitam = Math.random() > 0.5; // [DI LUAR CHEATSHEET] Math.random
      if (sudut) {
        var x = baris % 14;
        var y = kolom % 14;
        hitam = x === 0 || x === 6 || y === 0 || y === 6 || (x > 1 && x < 5 && y > 1 && y < 5);
      }
      if (hitam) {
        hasil += "<div></div>";
      } else {
        hasil += "<div class='putih'></div>";
      }
    }
  }
  document.getElementById("qr").innerHTML = hasil; // [DI LUAR CHEATSHEET] innerHTML
}

/* ===== RSVP Now -> pop-up E-Ticket (simulasi) ===== */
function kirimRSVP() {
  var nama = document.getElementById("nama").value;
  if (jawabanHadir === "" || jawabanTamu === "") {
    document.getElementById("error").textContent = "Please choose your attendance and number of guests.";
    return false; // cegah form terkirim
  }
  document.getElementById("error").textContent = "";
  var kode = "HK-2026-" + (Math.floor(Math.random() * 9000) + 1000);
  document.getElementById("tNama").textContent = nama;
  document.getElementById("tKode").textContent = kode;
  if (jawabanTamu === "Attending with Partner") {
    document.getElementById("tTamu").textContent = "2 Guests";
  } else {
    document.getElementById("tTamu").textContent = "1 Guest";
  }
  buatQR();
  document.getElementById("popup").classList.add("tampil");
  return false;
}

function tutupPopup() {
  document.getElementById("popup").classList.remove("tampil");
}

function simpanTiket() {
  var tombol = document.getElementById("simpan");
  tombol.textContent = "Saved (simulation)";
  setTimeout(function () {
    tombol.textContent = "Download E-Ticket / Save Image";
  }, 2000);
}

/* ===== Copy nomor rekening (klik teks "No. rekening") ===== */
function salin(nomor, idTeks) {
  navigator.clipboard.writeText(nomor); // [DI LUAR CHEATSHEET] clipboard
  var teks = document.getElementById(idTeks);
  teks.textContent = "Copied!";
  setTimeout(function () {
    teks.textContent = "No. rekening : " + nomor;
  }, 1500);
}

/* ===== Header: beri latar krem saat halaman di-scroll ===== */
window.addEventListener("scroll", function () {
  var header = document.getElementById("atas");
  if (window.scrollY > 40) { // [DI LUAR CHEATSHEET] scrollY
    header.classList.add("gulir");
  } else {
    header.classList.remove("gulir");
  }
});

/* ===== Animasi masuk: elemen muncul pelan saat terlihat di layar ===== */
var daftarMuncul = document.querySelectorAll(".muncul"); // [DI LUAR CHEATSHEET] querySelectorAll

function cekMuncul() {
  if (document.body.classList.contains("terkunci")) {
    return; // masih di beranda depan (amplop), animasi dimulai setelah amplop dibuka
  }
  daftarMuncul.forEach(function (elemen) {
    var posisi = elemen.getBoundingClientRect().top; // [DI LUAR CHEATSHEET] getBoundingClientRect
    if (posisi < window.innerHeight - 60) {
      elemen.classList.add("masuk");
    }
  });
}
window.addEventListener("scroll", cekMuncul);
window.addEventListener("load", cekMuncul);
cekMuncul();

/* ===== Beranda depan: buka amplop -> lagu mulai -> halaman utama tampil ===== */
function bukaUndangan() {
  document.getElementById("sampul").classList.add("buka"); // judul memudar
  document.getElementById("amplop").classList.add("buka");
  document.getElementById("btnBuka").disabled = true;
  putarMusik(); // lagu mulai saat amplop dibuka

  setTimeout(function () {
    document.getElementById("sampul").classList.add("geser"); // sampul naik dan memudar
    document.body.classList.remove("terkunci");
    window.scrollTo(0, 0);
    cekMuncul();
  }, 1700);

  setTimeout(function () {
    document.getElementById("sampul").classList.add("hilang");
  }, 2900);
}
