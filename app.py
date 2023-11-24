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


if __name__ == "__main__":
    app.run(debug=True);
