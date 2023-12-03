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


@app.get("/fc/topics/informasi/fail")
def fail_informasi_umum():
    resp = "Mohon maaf anda sekarang berada pada topik Informasi umum Perpustakaan, mungkin bisa diperjelas lagi kebutuhan infromasi anda sekarang untuk Informasi umum Perpustakaan."
    message = {"answer": resp};
    return jsonify(message);


if __name__ == "__main__":
    app.run(debug=True);
