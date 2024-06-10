from flask import Flask, render_template, request, jsonify
from text_processing import textProcessing
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.get("/")
def index_get():
    return render_template("base.html")


@app.post("/fc/topics")
def topics():
    text = request.get_json().get("message")

    answer = textProcessing(text)
    message = {"answer": answer};
    return jsonify(message);


@app.get("/fc/topics/pengembalian/langkah")
def langkah_pengembalian():
    # answer = textProcessing(text)
    resp = "Setelah habis masa pinjamnya, maka buku teks yang dipinjam harus dikembalikan. Proses pengembalian pinjaman dilakukan oleh petugas atau pustakawan pada layanan sirkulasi. Dan pastikan keadaan buku saat dikembalikan masih tetap utuh seperti saat peminjaman"
    message = {"answer": resp};
    return jsonify(message);


@app.get("/fc/topics/pengembalian/denda")
def denda_pengembalian():
    resp = "Buku pinjaman harus dikembalikan sesuai tanggal yang tertera pada lembar tanggal kembali (due date) dalam keadaan baik seperti pada saat dipinjam. Pengembalian yang melampaui  batas tanggal tersebut dikenakan sanksi denda sebesar Rp500,00 per hari per eksemplar buku."
    message = {"answer": resp};
    return jsonify(message);


@app.get("/fc/topics/pengembalian/maksimal")
def maksimal_pengembalian():
    resp = "Buku teks  bisa dipinjam sivitas akademika PENS dengan jangka waktu 3 (tiga) minggu atau 21 Hari. Dan dapat diperpanjang lagi, sepanjang tidak ada yang memesan"
    message = {"answer": resp};
    return jsonify(message);


@app.get("/fc/topics/pengembalian/kondisi")
def kondisi_pengembalian():
    # answer = textProcessing(text)
    resp = '''
    Demikian pula buku yang rusak atau hilang selama masa pinjaman menjadi tanggung jawab peminjam sepenuhnya. Buku yang rusak harus semaksimal mungkin diperbaiki sehingga kembali baik seperti semula, sedangkan buku yang hilang dikenakan sanksi sebagai berikut:

    a. Mengganti dengan buku yang sama (baik judul, pengarang, maupun penerbitnya sedangkan edisi dan tahun terbit boleh berbeda tetapi yang lebih baru)
    b. Apabila buku yang sama tidak ditemukan, maka yang bersangkutan harus mengkopi buku eksemplar lain milik perpustakaan jika buku tersebut ada lebih dari satucopy
    
    Apabila ketentuan a dan b
    tidak dapat dipenuhi maka yang bersangkutan harus mencari buku dengan subyek yang sama atau hampir sama meskipun judul, pengarang dan penerbit berbeda. Selain itu buku ketiga ini harus mempunyai ciri fisik yang mendekati buku yang diganti, misalnya jumlah halaman tebal buku, ukuran besarnya, dll.
'''
    message = {"answer": resp};
    return jsonify(message);


@app.get("/fc/topics/pengembalian/fail")
def fail_pengembalian():
    # answer = textProcessing(text)
    resp = "Mohon maaf anda sekarang berada pada topik Pengembalian buku, mungkin bisa diperjelas lagi kebutuhan infromasi anda sekarang untuk pengembalian buku."
    message = {"answer": resp};
    return jsonify(message);


@app.get("/fc/topics/peminjaman/syarat")
def syarat_peminjaman():
    resp = "persyaratan peminjaman buku adalah membawa smartcard."
    message = {"answer": resp};
    return jsonify(message);


@app.get("/fc/topics/peminjaman/langkah")
def langkah_peminjaman():
    resp = """
Jika persyaratan sudah dibawa, kamu bisa datang ke perpustakaan  kemudian kamu bisa melihat  ketersediaan buku di komputer

OPAC yang berada di
perpustakaan. kemudian anda bisa 
mencari buku yang ingin anda pinjam sesuai dengan rak yang tercantum dalam informasi di komputer tadi.

setelah andamenemukan buku, anda bisa  menuju ke
bagian sirkulasi untuk  menunjukkan
smartcard dan  menulis NRP di kartu
kuning.  selanjutnya petugas akan  melakukan proses entry  peminjaman."""
    message = {"answer": resp};
    return jsonify(message);


@app.get("/fc/topics/peminjaman/maksimal")
def maksimal_peminjaman():
    resp = "Buku teks  bisa dipinjam sivitas akademika PENS dengan jangka waktu 3 (tiga) minggu atau 21 Hari. Dan dapat diperpanjang lagi, sepanjang tidak ada yang memesan"
    message = {"answer": resp};
    return jsonify(message);


@app.get("/fc/topics/peminjaman/fail")
def fail_peminjaman():
    resp = "Mohon maaf anda sekarang berada pada topik Peminjaman buku, mungkin bisa diperjelas lagi kebutuhan infromasi anda sekarang untuk Peminjaman buku."
    message = {"answer": resp};
    return jsonify(message);


@app.get("/fc/topics/informasi/layanan")
def layanan_informasi_umum():
    resp = """Jam Layanan Perpustakaan: 
Senin - Kamis : 08.00 - 16.30 WIB
Jum'at        : 07.30 - 16.30 WIB 
  (Istirahat) : 11.30 - 12.30 WIB
Sabtu - Minggu: 10.00 - 14.00 WIB
"""
    message = {"answer": resp};
    return jsonify(message);


@app.get("/fc/topics/informasi/kunjungan")
def kunjungan_informasi_umum():
    resp = """
    Kewajiban Anggota/Pengunjung Perpustakaan:
1. Mentaati peraturan Perpustakaan PENS yang berlaku
2. Mengisi presensi kehadiran di Perpustakaan PENS setiap berkunjung langsung ke perpustakaan
3. Bertanggungjawab atas koleksi yang rusak/hilang saat peminjaman dan menerima sanksi yang berlaku
4. Menjaga keamanan fasilitas yang disediakan perpustakaan
5. Selalu menyimpan tas/jaket di locker yang disediakan saat akan memasuki ruang perpustakaan
6. Tidak makan dan minum di ruang perpustakaan.
"""
    message = {"answer": resp};
    return jsonify(message);


@app.get("/fc/topics/informasi/mou")
def mou_informasi_umum():
    resp = """
    MOU Perpustakaan PENS dapat dilihat pada laman berikut: https://perpustakaan.pens.ac.id/informasi-layanan/
"""
    message = {"answer": resp};
    return jsonify(message);


@app.get("/fc/topics/informasi/struktur")
def struktur_informasi_umum():
    resp = """
    Struktur Keanggotaan Perpustakaan PENS dapat dilihat pada lamaan berikut: https://perpustakaan.pens.ac.id/struktur-keanggotaan/
"""
    message = {"answer": resp};
    return jsonify(message);


@app.get("/fc/topics/informasi/akreditasi")
def akreditasi_informasi_umum():
    resp = """
    Perpustakaan PENS telah mendapatkan nilai predikat "Akreditasi A" dan sertifikat akreditasi dapat dilihat di link berikut: https://perpustakaan.pens.ac.id/struktur-keanggotaan/
"""
    message = {"answer": resp};
    return jsonify(message);


@app.get("/fc/topics/informasi/dikembalikan")
def dikembalikan_informasi_umum():
    resp = """
    Saat mengembalikan buku di perpustakaan, tidak perlu melakukannya atas nama peminjam. Diperbolehkan untuk mengembalikan buku dengan cara menitipkannya kepada teman, yang nantinya akan mengembalikannya ke perpustakaan.
"""
    message = {"answer": resp};
    return jsonify(message);


@app.get("/fc/topics/informasi/bebas_pinjam")
def bebas_pinjam_informasi_umum():
    resp = """
    Mahasiswa D4 maupun S2 diperbolehkan untuk meminjam buku di perpustakaan D3. begitu pula sebaliknya, Mahasiswa D3 dan S2 juga diperbolehkan meminjam buku di perpustakaan D4.
"""
    message = {"answer": resp};
    return jsonify(message);


@app.get("/fc/topics/informasi/fail")
def fail_informasi_umum():
    resp = "Mohon maaf anda sekarang berada pada topik Informasi umum Perpustakaan, mungkin bisa diperjelas lagi kebutuhan infromasi anda sekarang untuk Informasi umum Perpustakaan."
    message = {"answer": resp};
    return jsonify(message);


@app.get("/fc/topics/berkas_wisuda/syarat_wisuda")
def syarat_kelengkapan_wisuda():
    resp = """
    Persyaratan yang harus di lengkapi sebelum wisuda antara lain:
1. Upload Proyek Akhir di : tugasakhir.digilib.pens.ac.id
2. Menyerahkan 1 eksemplar buku Proyek Akhir yang telah dijilid softcover dan mencantumkan QRCode
3. Menyerahkan 1 keping CD Proyek Akhir yang berisi sesuai dengan ketentuan
4. Setelah semua berkas telah di verifikasi oleh petugas dan tidak memiliki tanggungan pinjaman koleksi di perpustakaan maka mahasiswa akan mendapatkan surat keterangan perpustakaan secara online
"""
    message = {"answer": resp};
    return jsonify(message);


@app.get("/fc/topics/berkas_wisuda/cd")
def cd_kelengkapan_wisuda():
    resp = """
    Ketentuan isi CD Proyek Akhir antara lain:
1. File lengkap (cover s.d. lampiran) format .doc dan .pdf
2. File program/software (bagi mahasiswa yang membuat program aplikasi)
3. File presentasi format .ppt
4. File jurnal (Khusus mahasiswa D4 dan S2)
Note: Wadah Cd telah disediakan oleh Perpustakaan
"""
    message = {"answer": resp};
    return jsonify(message);


@app.get("/fc/topics/berkas_wisuda/qr_code")
def qr_code_kelengkapan_wisuda():
    resp = """
    QR Code untuk lembar pengesahan bisa diunduh di : online.mis.pens.ac.id
"""
    message = {"answer": resp};
    return jsonify(message);


@app.get("/fc/topics/berkas_wisuda/fail")
def fail_kelengkapan_wisuda():
    resp = "Mohon maaf anda sekarang berada pada topik Kelengkapan Berkas Wisuda, mungkin bisa diperjelas lagi kebutuhan infromasi anda sekarang untuk Kelengkapan Data Wisuda."
    message = {"answer": resp};
    return jsonify(message);


@app.get("/fc/topics/visi_misi/visi")
def visi_topics_visidanMisi():
    resp = """
    Sesuai dengan visi dan misi PENS, Perpustakaan PENS memiliki visi yakni:
Menjadi perpustakaan yang unggul dengan fasilitas yang lengkap, modern dan mampu memberikan pelayanan terbaik kepada pemakainya dengan berbasis teknologi komputer.
"""
    message = {"answer": resp};
    return jsonify(message);


@app.get("/fc/topics/visi_misi/misi")
def misi_topics_visidanMisi():
    resp = """
    Perpustakaan memiliki beberapa misi untuk mewujudkan visi yang telah kami paparkan diatas:
1. Mengoleksi semua informasi yang berhubungan dengan ketentuan akademis di PENS.
2. Mengelola informasi dengan canggih dan modern agar dapat diakses pemakai dengan mudah, cepat dan tepat.
3. Memberikan fasilitas yang memadai kepada pemakai agar dapat mewujudkan fungsi perpustakaan sebagai sarana bantu proses belajar mengajar.
4. Mengarahkan setiap program yang telah tersusun dengan baik sehingga dapat diwujudkan secara optimal sesuai dengan visi yang telah diuraikan.
"""
    message = {"answer": resp};
    return jsonify(message);


@app.get("/fc/topics/visi_misi/fail")
def fail_topics_visidanMisi():
    resp = "Mohon maaf anda sekarang berada pada topik Visi dan Misi, mungkin bisa diperjelas lagi kebutuhan infromasi anda sekarang untuk Visi dan Misi."
    message = {"answer": resp};
    return jsonify(message);


@app.get("/fc/topics/koleksi/jurnal")
def jurnal_koleksi():
    resp = """
    UPT Perpustakan Politeknik Elektronika Negeri Surabaya memiliki fasilitas internal akses jurnal cetak dan e-journal yang dapat dimanfaatkan pengguna yang terdiri dari:

1. JETS (Journal of Engineering and Technological Sciences)
2. JICTRA (Journal of ICT Research and Applications)
3. KURSOR
4. CommIT (Communication and Information Technology)
5. IJEEI (International Journal on Electrical Engineering and Informatics)
6. IJTECH (International Journal of Technology)
"""
    message = {"answer": resp};
    return jsonify(message);


@app.get("/fc/topics/koleksi/ebook")
def ebook_koleksi():
    resp = """
    Koleksi E-Book PENS dapat di akses di link berikut: http://ebook.pens.ac.id/
"""
    message = {"answer": resp};
    return jsonify(message);


@app.get("/fc/topics/koleksi/fail")
def fail_koleksi():
    resp = "Mohon maaf anda sekarang berada pada topik Koleksi, mungkin bisa diperjelas lagi kebutuhan infromasi anda sekarang untuk Koleksi."
    message = {"answer": resp};
    return jsonify(message);


# Start of: Changed Version - Rule Based

@app.get("/rule-based/syarat-peminjaman")
def rule_base_syarat_peminjaman():
    resp = "persyaratan peminjaman buku adalah membawa smartcard."
    message = {"answer": resp};
    return jsonify(message)


@app.get("/rule-based/langkah-peminjaman")
def rule_base_langkah_peminjaman():
    resp = """Langkah peminjaman buku:\n
1. Membawa smartcard dan melihat ketersediaan buku di komputer
2. Mencari buku yang ingin anda pinjam sesuai dengan rak yang tercantum dalam informasi di komputer.
3. Setelah menemukan buku, anda bisa menuju ke bagian sirkulasi untuk  menunjukkan smartcard dan  menulis NRP di kartu kuning yang selanjutnya petugas akan  melakukan proses entry  peminjaman.
"""
    message = {"answer": resp};
    return jsonify(message)

@app.get("/rule-based/langkah-pengembalian")
def rule_base_langkah_pengembalian():
    resp = """Langkah pengembalian buku:\n
1. Membawa buku ke perpustakaan dan serahkan ke bagian layanan sirkulasi 
2. Kemudian nanma dan nrp anda akan di data dan pastikan keadaan buku saat dikembalikan masih tetap utuh seperti saat peminjaman
"""
    message = {"answer": resp};
    return jsonify(message)


@app.get("/rule-based/kondisi-rusak")
def rule_base_kondisi_rusak():
    resp = """Buku yang rusak atau hilang selama masa pinjaman menjadi tanggung jawab peminjam sepenuhnya. Buku yang rusak harus semaksimal mungkin diperbaiki sehingga kembali baik seperti semula
"""
    message = {"answer": resp};
    return jsonify(message)


@app.get("/rule-based/kondisi-hilang-1")
def rule_base_kondisi_hilang_1():
    resp = """Jika buku yang dipinjam hilang, maka anda harus mengganti dengan buku yang sama (baik judul, pengarang, maupun penerbitnya sedangkan edisi dan tahun terbit boleh berbeda tetapi yang lebih baru)
"""
    message = {"answer": resp};
    return jsonify(message)


@app.get("/rule-based/kondisi-hilang-2")
def rule_base_kondisi_hilang_2():
    resp = """Apabila anda tidak menemukan buku yang sama, maka anda harus mengkopi buku eksemplar lain milik perpustakaan jika buku tersebut ada lebih dari satucopy. Jika tidak, maka anda harus mencari buku dengan subyek yang sama atau hampir sama meskipun judul, pengarang dan penerbit berbeda. 
"""
    message = {"answer": resp};
    return jsonify(message)


@app.get("/rule-based/maksimal-pinjam")
def rule_base_kondisi_maksimal_peminjaman():
    resp = """Buku teks  bisa dipinjam sivitas akademika PENS dengan jangka waktu 3 (tiga) minggu atau 21 Hari. Dan dapat diperpanjang lagi, sepanjang tidak ada yang memesan 
"""
    message = {"answer": resp};
    return jsonify(message)

@app.get("/rule-based/denda")
def rule_base_kondisi_denda():
    resp = """Pengembalian yang melampaui  batas pengembalian akan dikenakan sanksi denda sebesar Rp500,00 per-hari per eksemplar buku.
"""
    message = {"answer": resp};
    return jsonify(message)


@app.get("/rule-based/informasi-jam-layanan")
def rule_base_informasi_jam_layanan():
    resp = """Jam Layanan Perpustakaan: \n
Senin - Kamis : 08.00 - 16.30 WIB
Jum'at        : 07.30 - 16.30 WIB
  (Istirahat) : 11.30 - 12.30 WIB
Sabtu - Minggu: 10.00 - 14.00 WIB
"""
    message = {"answer": resp};
    return jsonify(message)

@app.get("/rule-based/peraturan-pengunjung")
def rule_base_dikembalikan_orang_lain():
    resp = """Kewajiban Anggota/Pengunjung Perpustakaan:\n
1. Mentaati peraturan Perpustakaan PENS yang berlaku\n
2. Mengisi presensi kehadiran di Perpustakaan PENS setiap berkunjung langsung ke perpustakaan\n
3. Bertanggungjawab atas koleksi yang rusak/hilang saat peminjaman dan menerima sanksi yang berlaku\n
4. Menjaga keamanan fasilitas yang disediakan perpustakaan\n
5. Selalu menyimpan tas/jaket di locker yang disediakan saat akan memasuki ruang perpustakaan\n
6. Tidak makan dan minum di ruang perpustakaan.
"""
    message = {"answer": resp};
    return jsonify(message)

@app.get("/rule-based/dikembalikan-orang-lain")
def rule_base_informasi_peraturan_pengunjung():
    resp = """Saat mengembalikan buku di perpustakaan, tidak perlu melakukannya atas nama peminjam. Diperbolehkan untuk mengembalikan buku dengan cara menitipkannya kepada teman, yang nantinya akan mengembalikannya ke perpustakaan.
"""
    message = {"answer": resp};
    return jsonify(message)


@app.get("/rule-based/mou")
def rule_base_mou():
    resp = """MOU Perpustakaan PENS dapat dilihat pada laman berikut:\n \linkhttps://perpustakaan.pens.ac.id/informasi-layanan/\link
"""
    message = {"answer": resp};
    return jsonify(message)

@app.get("/rule-based/struktur-keanggotaan")
def rule_base_struktur_keanggotaan():
    resp = """Struktur Keanggotaan Perpustakaan PENS dapa dilihat pada lamaan berikut:\n \linkhttps://perpustakaan.pens.ac.id/struktur-keanggotaan/\link
"""
    message = {"answer": resp};
    return jsonify(message)


@app.get("/rule-based/sertifikat-akreditasi")
def rule_base_sertifikat_akreditasi():
    resp = """Perpustakaan PENS telah mendapatkan nilai predikat "Akreditasi A" dan sertifikat akreditasi dapat dilihat di link berikut:\n \linkhttps://perpustakaan.pens.ac.id/struktur-keanggotaan/\link
"""
    message = {"answer": resp};
    return jsonify(message)


@app.get("/rule-based/bebas-pinjam")
def rule_base_bebas_pinjam():
    resp = """Mahasiswa D4 maupun S2 diperbolehkan untuk meminjam buku di perpustakaan D3. begitu pula sebaliknya, Mahasiswa D3 dan S2 juga diperbolehkan meminjam buku di perpustakaan D4
"""
    message = {"answer": resp};
    return jsonify(message)


@app.get("/rule-based/syarat-wisuda")
def rule_syarat_wisuda():
    resp = """Persyaratan yang harus di lengkapi sebelum wisuda antara lain:\n
1. Upload Proyek Akhir di :\n \linkhttps://tugasakhir.digilib.pens.ac.id\link
2. Menyerahkan 1 eksemplar buku Proyek Akhir yang telah dijilid softcover dan mencantumkan QRCode
3. Menyerahkan 1 keping CD Proyek Akhir yang berisi sesuai dengan ketentuan
4. Setelah semua berkas telah di verifikasi oleh petugas dan tidak memiliki tanggungan pinjaman koleksi di perpustakaan maka mahasiswa akan mendapatkan surat keterangan perpustakaan secara online
"""
    message = {"answer": resp};
    return jsonify(message)

@app.get("/rule-based/cd-proyek-akhir")
def rule_cs_proyek_akhir():
    resp = """Ketentuan isi CD Proyek Akhir antara lain:\n
1. File lengkap (cover s.d. lampiran) format .doc dan .pdf
2. File program/software (bagi mahasiswa yang membuat program aplikasi)
3. File presentasi format .ppt
4. File jurnal (Khusus mahasiswa D4 dan S2)\n
Note: Wadah Cd telah disediakan oleh Perpustakaan
"""
    message = {"answer": resp};
    return jsonify(message)


@app.get("/rule-based/qrcode-pengesahan")
def rule_pengesahan():
    resp = """QR Code untuk lembar pengesahan bisa diunduh di : \linkhttps://online.mis.pens.ac.id\link
"""
    message = {"answer": resp};
    return jsonify(message)


@app.get("/rule-based/visi")
def rule_visi():
    resp = """Sesuai dengan visi dan misi PENS, Perpustakaan PENS memiliki visi yakni:\n
Menjadi perpustakaan yang unggul dengan fasilitas yang lengkap, modern dan mampu memberikan pelayanan terbaik kepada pemakainya dengan berbasis teknologi komputer.
"""
    message = {"answer": resp};
    return jsonify(message)


@app.get("/rule-based/misi")
def rule_misi():
    resp = """Perpustakaan memiliki beberapa misi untuk mewujudkan visi yang telah kami paparkan diatas:\n
1. Mengoleksi semua informasi yang berhubungan dengan ketentuan akademis di PENS.\n
2. Mengelola informasi dengan canggih dan modern agar dapat diakses pemakai dengan mudah, cepat dan tepat.\n
3. Memberikan fasilitas yang memadai kepada pemakai agar dapat mewujudkan fungsi perpustakaan sebagai sarana bantu proses belajar mengajar.\n
4. Mengarahkan setiap program yang telah tersusun dengan baik sehingga dapat diwujudkan secara optimal sesuai dengan visi yang telah diuraikan.
"""
    message = {"answer": resp};
    return jsonify(message)


@app.get("/rule-based/koleksi-jurnal")
def rule_koleksi_jurnal():
    resp = """UPT Perpustakan Politeknik Elektronika Negeri Surabaya memiliki fasilitas internal akses jurnal cetak dan e-journal yang dapat dimanfaatkan pengguna yang terdiri dari:\n\n

1. JETS (Journal of Engineering and Technological Sciences)\n
2. JICTRA (Journal of ICT Research and Applications)\n
3. KURSOR\n
4. CommIT (Communication and Information Technology)\n
5. IJEEI (International Journal on Electrical Engineering and Informatics)\n
6. IJTECH (International Journal of Technology)
"""
    message = {"answer": resp};
    return jsonify(message)


@app.get("/rule-based/koleksi-ebook")
def rule_koleksi_ebook():
    resp = """Koleksi E-Book PENS dapat di akses di link berikut: \linkhttp://ebook.pens.ac.id/\link
"""
    message = {"answer": resp};
    return jsonify(message)



@app.get("/rule-based/pinjam-confirm")
def rule_pinjam_confirm():
    resp = """Apa yang ingin Anda tanyakan, apakah mengenai syarat peminjaman buku, cara peminjaman buku, atau hal lainnya?
"""
    message = {"answer": resp};
    return jsonify(message)


@app.get("/rule-based/kembali-confirm")
def rule_kembali_confirm():
    resp = """Apa yang ingin Anda tanyakan, apakah mengenai cara pengembalian buku, aturan pengembalian buku, atau hal lainnya?
"""
    message = {"answer": resp};
    return jsonify(message)


@app.get("/rule-based/syarat-confirm")
def rule_syarat_confirm():
    resp = """Apa yang ingin Anda tanyakan, apakah mengenai persyaratan peminjaman buku, pengembalian buku, atau persyaratan wisuda?
"""
    message = {"answer": resp};
    return jsonify(message)

@app.get("/rule-based/keanggotaan")
def rule_keanggotaan():
    resp = """Keanggotaan perpustakaan terbuka bagi sivitas Politeknik Elektronika Negeri Surabaya. Aktivasi keanggotaan dapat dilakukan dengan menunjukkan:\n
1. Smart Card / Kartu Mahasiswa (KTM) PENS
2. Kartu Pegawai PENS
"""
    message = {"answer": resp};
    return jsonify(message)


@app.get("/rule-based/koleksi_perpus")
def rule_koleksi_perpus():
    resp = """Koleksi buku Perpustakaan PENS meliputi buku cetak, modul ajar, ebook, jurnal dan tugas akhir D3, D4, dan Thesis
"""
    message = {"answer": resp};
    return jsonify(message)


@app.get("/rule-based/struktur_organisasi")
def rule_struktur_organisasi():
    resp = """Struktur Organisasi Perpustakaan PENS dapat dilihat pada link berikut \linkhttps://perpustakaan.pens.ac.id/struktur-keanggotaan/\link
"""
    message = {"answer": resp};
    return jsonify(message)


@app.get("/rule-based/koleksi_buku")
def rule_koleksi_buku():
    resp = """Anda dapat melihat koleksi buku perpustakaan dengan cara:\n

1. Sambungkan koneksi Anda dengan wifi eepiswlan.
2. Buka link berikut: \linkhttps://mis.pens.ac.id/\link
3. Pilih menu Lain-lain dan kemudian pilih Perpustakaan.
4. Klik logo PENS dan cari buku yang Anda inginkan di kolom pencarian.\n

Dengan langkah-langkah ini, Anda dapat mengakses koleksi buku yang tersedia di perpustakaan.
"""
    message = {"answer": resp};
    return jsonify(message)



@app.get("/rule-based/layanan_loker")
def rule_layanan_loker():
    resp = """Layanan loker UPT Perpustakaan Politeknik Elektronika Negeri Surabaya yang disediakan bagi para pengguna untuk menyimpan barang – barang seperti tas, jaket, buku, serta berbagai barang bawaan yang layak untuk disimpan di lemari loker.
"""
    message = {"answer": resp};
    return jsonify(message)


@app.get("/rule-based/layanan_referensi")
def rule_referensi():
    resp = """Layanan Koleksi Referensi terdiri dari Kamus, Ensiklopedia, Handbook, Abstraks, Manual Book, dan Laporan Tahunan. Layanan referensi di UPT Perpustakaan Politeknik Elektronika Negeri Surabaya menggunakan open access atau sistem layanan terbuka, dimana setiap pengguna dapat mengambil sendiri koleksi referensi secara langsung dari rak. 
"""
    message = {"answer": resp};
    return jsonify(message)


@app.get("/rule-based/koleksi_modul")
def rule_koleksi_module_ajar():
    resp = """Data judul koleksi modul ajar sudah tersedia di komputer Online Public Access Catalogue (OPAC) perpustakaan dengan mengakses \linkhttps://mis.eepis-its.edu/\link guna untuk memudahkan pencarian modul ajar dengan cepat dan tepat. Selanjutnya ketua kelas beserta perwakilan teman kelas berkunjung ke Perpustakaan untuk melakukan proses peminjaman modul ajar.
"""
    message = {"answer": resp};
    return jsonify(message)


@app.get("/rule-based/mencari_buku")
def rule_mencari_buku():
    resp = """Berikut langkah-langkah untuk mencari buku di rak:\n

1. Buka: \linkhttps://mis.pens.ac.id\link, kemudian klik Perpustakaan.
2. Klik logo PENS, kemudian klik Collection dan pilih jenis koleksi.
3. Ketik kata kunci buku yang dibutuhkan, kemudian catat lokasinya. Misalnya, D4/TAK/3396/2017, yang artinya:\n
 -D4: Koleksi perpustakaan D4
 -TAK: Tugas Akhir Jurusan Komputer
 -3396: Nomor Induk TA
 -2017: Tahun Wisuda
"""
    message = {"answer": resp};
    return jsonify(message)


@app.get("/rule-based/pengadaan_buku")
def rule_pengadaan_buku():
    resp = """Berikut cara pengadaan buku perpustakaan PENS:\n

1. Buka \linkhttps://mis.pens.ac.id\link, kemudian klik Unit dan pilih Perpustakaan.
2. Klik Pemesanan Buku Baru.
3. Klik Tambah.
4. Isi detail buku yang ingin dipesan, lalu klik Simpan.
"""
    message = {"answer": resp};
    return jsonify(message)


@app.get("/rule-based/tata_tertib")
def rule_tata_tertib():
    resp = """Tata tertib perpustakaan PENS dapat dilihat di link berikut : \linkhttps://perpustakaan.pens.ac.id/tentang-kami/\link
"""
    message = {"answer": resp};
    return jsonify(message)


@app.get("/rule-based/npp_perpustakaan")
def rule_npp_perpustakaan():
    resp = """NPP Perpustakaann PENS : 3578082C0200001
"""
    message = {"answer": resp};
    return jsonify(message)


# End of: Changed Version - Rule Based

if __name__ == "__main__":
    app.run(debug=False, port=5000);
