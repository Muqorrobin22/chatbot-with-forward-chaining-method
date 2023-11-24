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


@app.get("/fc/topics/pengembalian/langkah/success")
def pengembalian():
    # answer = textProcessing(text)
    resp = "Setelah habis masa pinjamnya, maka buku teks yang dipinjam harus dikembalikan. Proses pengembalian pinjaman dilakukan oleh petugas atau pustakawan pada layanan sirkulasi. Dan pastikan keadaan buku saat dikembalikan masih tetap utuh seperti saat peminjaman"
    message = {"answer": resp};
    return jsonify(message);


@app.get("/fc/topics/pengembalian/langkah/fail")
def fail_pengembalian():
    # answer = textProcessing(text)
    resp = "Mohon maaf anda sekarang berada pada topik Pengembalian buku, mungkin bisa diperjelas lagi kebutuhan infromasi anda sekarang untuk pengembalian buku."
    message = {"answer": resp};
    return jsonify(message);


if __name__ == "__main__":
    app.run(debug=True);
