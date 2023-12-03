class Chatbox {
  constructor() {
    this.args = {
      openButton: document.querySelector(".chatbox__button--btn"),
      chatBox: document.querySelector(".chatbox__support"),
      sendButton: document.querySelector(".send__button"),
    };

    this.state = false;
    this.messages = [];
    this.conversationState = "normal";
    this.subtopicState = null;
  }

  display() {
    const { openButton, chatBox, sendButton } = this.args;

    openButton.addEventListener("click", () => this.toggleState(chatBox));

    sendButton.addEventListener("click", () => this.onSendButton(chatBox));

    const node = chatBox.querySelector("input");
    node.addEventListener("keyup", ({ key }) => {
      if (key === "Enter") {
        this.onSendButton(chatBox);
      }
    });
  }

  toggleState(chatbox) {
    this.state = !this.state;

    // show or hides the box
    if (this.state) {
      chatbox.classList.add("chatbox--active");
    } else {
      chatbox.classList.remove("chatbox--active");
    }
  }

  async onSendButton(chatbox) {
    var textField = chatbox.querySelector("input");
    let text1 = textField.value;
    if (text1 === "") {
      return;
    }

    let msg1 = { name: "User", message: text1 };
    this.messages.push(msg1);

    try {
        const response = await fetch("http://127.0.0.1:5000/fc/topics", {
            method: "POST",
            body: JSON.stringify({ message: text1 }),
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // let breakTopics  = false;
        //
        // while (!breakTopics) {
        //
        // }

        const r = await response.json();
        let msg2 = { name: "Bot", message: r.answer };
        console.log(msg2)

        if(this.conversationState === "normal") {
            let detectedTopic = this.detectTopic(msg2)
            if(detectedTopic === "pengembalian") {
                this.conversationState = detectedTopic;
                msg2 = {name: "Bot", message: "Sekarang anda masukk ke topik Pengembalian buku."}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
                return;

            }else if (detectedTopic === "peminjaman") {
                this.conversationState = detectedTopic;
                msg2 = {name: "Bot", message: "Sekarang anda masukk ke topik Peminjaman buku."}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
                return;
            } else if(detectedTopic === 'informasi_umum') {
                this.conversationState = detectedTopic;
                msg2 = {name: "Bot", message: "Sekarang anda masukk ke topik Informasi Umum Perpustakaan."}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
                return;
            } else if(detectedTopic === "berkas_wisuda") {
                this.conversationState = detectedTopic;
                msg2 = {name: "Bot", message: "Sekarang anda masukk ke topik Kelengkapan Berkas Wisuda."}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
                return;
            } else if(detectedTopic === "visi_misi") {
                this.conversationState = detectedTopic;
                msg2 = {name: "Bot", message: "Sekarang anda masukk ke topik Visi dan Misi."}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
                return;
            }

            else {
                msg2 = {name: "Bot", message: "Maaf kami tidak tau maksud anda"}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
                return;
            }
        }


        // const rSub = await response.json();
        // let msgSub = { name: "Bot", message: rSub.answer };
        // console.log("msg sub: ", msgSub)

        // --------- Pengembalian --------------
        if(this.conversationState !== "normal" && this.conversationState === "pengembalian") {
            // let detectedSubTopic =
            this.subtopicState = this.detectSubTopicPengembalian(msg2);
            if(this.subtopicState === "langkah") {
                const ansLangkah = await fetch("http://127.0.0.1:5000/fc/topics/pengembalian/langkah")
                const response = await ansLangkah.json();
                msg2 = {name: "Bot", message: response.answer}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
                return;
            } else if(this.subtopicState === "kondisi") {
                const ansKondisi = await fetch("http://127.0.0.1:5000/fc/topics/pengembalian/kondisi")
                const response = await ansKondisi.json();
                msg2 = {name: "Bot", message: response.answer}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
                return;
            } else if (this.subtopicState === "denda")  {
                const ansDenda = await fetch("http://127.0.0.1:5000/fc/topics/pengembalian/denda")
                const response = await ansDenda.json();
                msg2 = {name: "Bot", message: response.answer}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
                return;
            } else if (this.subtopicState === "maksimal") {
                const ansMaksimal = await fetch("http://127.0.0.1:5000/fc/topics/pengembalian/maksimal")
                const response = await ansMaksimal.json();
                msg2 = {name: "Bot", message: response.answer}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
                return;
            }

            else {
                const ansPengembalian = await fetch("http://127.0.0.1:5000/fc/topics/pengembalian/fail")
                const response = await ansPengembalian.json();
                msg2 = {name: "Bot", message: response.answer}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
                return;
            }
        }


        // --------- Peminjaman ---------------
        if(this.conversationState !== "normal" && this.conversationState === "peminjaman") {
            // let detectedSubTopic =
            this.subtopicState = this.detectSubTopicPeminjaman(msg2);
            if(this.subtopicState === "syarat") {
                const ansSyarat = await fetch("http://127.0.0.1:5000/fc/topics/peminjaman/syarat")
                const response = await ansSyarat.json();
                msg2 = {name: "Bot", message: response.answer}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
                return;
            } else if (this.subtopicState === "langkah") {
                const ansLangkah = await fetch("http://127.0.0.1:5000/fc/topics/peminjaman/langkah")
                const response = await ansLangkah.json();
                msg2 = {name: "Bot", message: response.answer}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
                return;
            } else if (this.subtopicState === "maksimal") {
                const ansBatas = await fetch("http://127.0.0.1:5000/fc/topics/peminjaman/maksimal")
                const response = await ansBatas.json();
                msg2 = {name: "Bot", message: response.answer}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
                return;
            }

            else {
                const ansPengembalian = await fetch("http://127.0.0.1:5000/fc/topics/peminjaman/fail")
                const response = await ansPengembalian.json();
                msg2 = {name: "Bot", message: response.answer}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
                return;
            }
        }


        // --------- Informasi Umum Perpustakaan ---------------
        if(this.conversationState !== "normal" && this.conversationState === "informasi_umum") {
            // let detectedSubTopic =
            this.subtopicState = this.detectSubTopicInformasiUmum(msg2);
            if(this.subtopicState === "layanan") {
                const ansLayanan = await fetch("http://127.0.0.1:5000/fc/topics/informasi/layanan")
                const response = await ansLayanan.json();
                msg2 = {name: "Bot", message: response.answer}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
                return;
            } else if(this.subtopicState === "peraturan_kunjungan") {
                const ansKunjungan = await fetch("http://127.0.0.1:5000/fc/topics/informasi/kunjungan")
                const response = await ansKunjungan.json();
                msg2 = {name: "Bot", message: response.answer}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
                return;
            } else if(this.subtopicState === "mou") {
                const ansMou = await fetch("http://127.0.0.1:5000/fc/topics/informasi/mou")
                const response = await ansMou.json();
                msg2 = {name: "Bot", message: response.answer}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
                return;
            } else if(this.subtopicState === "struktur") {
                const ansStruktur = await fetch("http://127.0.0.1:5000/fc/topics/informasi/struktur")
                const response = await ansStruktur.json();
                msg2 = {name: "Bot", message: response.answer}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
                return;
            } else if(this.subtopicState === "akreditasi") {
                const ansAkreditasi = await fetch("http://127.0.0.1:5000/fc/topics/informasi/akreditasi")
                const response = await ansAkreditasi.json();
                msg2 = {name: "Bot", message: response.answer}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
                return;
            } else if(this.subtopicState === "dikembalikan_pihak_lain") {
                const ansDikembalikan = await fetch("http://127.0.0.1:5000/fc/topics/informasi/dikembalikan")
                const response = await ansDikembalikan.json();
                msg2 = {name: "Bot", message: response.answer}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
                return;
            } else if(this.subtopicState === "bebas_pinjam") {
                const ansBebas = await fetch("http://127.0.0.1:5000/fc/topics/informasi/bebas_pinjam")
                const response = await ansBebas.json();
                msg2 = {name: "Bot", message: response.answer}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
                return;
            }

            else {
                const ansPengembalian = await fetch("http://127.0.0.1:5000/fc/topics/informasi/fail")
                const response = await ansPengembalian.json();
                msg2 = {name: "Bot", message: response.answer}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
                return;
            }
        }


        // --------- Kelengkapan Berkas Wisuda ---------------
        if(this.conversationState !== "normal" && this.conversationState === "berkas_wisuda") {
            // let detectedSubTopic =
            this.subtopicState = this.detectSubTopicKelengkapanBerkas(msg2);
            if(this.subtopicState === "syarat_wisuda") {
                const ansSyarat = await fetch("http://127.0.0.1:5000/fc/topics/berkas_wisuda/syarat_wisuda")
                const response = await ansSyarat.json();
                msg2 = {name: "Bot", message: response.answer}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
                return;
            } else if(this.subtopicState === "is_cd_proyek_akhir") {
                const ansCdProyekAkhir = await fetch("http://127.0.0.1:5000/fc/topics/berkas_wisuda/cd")
                const response = await ansCdProyekAkhir.json();
                msg2 = {name: "Bot", message: response.answer}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
                return;
            } else if(this.subtopicState === "qr_code") {
                const ansQrCode = await fetch("http://127.0.0.1:5000/fc/topics/berkas_wisuda/qr_code")
                const response = await ansQrCode.json();
                msg2 = {name: "Bot", message: response.answer}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
                return;
            }

            else {
                const ansFail = await fetch("http://127.0.0.1:5000/fc/topics/berkas_wisuda/fail")
                const response = await ansFail.json();
                msg2 = {name: "Bot", message: response.answer}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
                return;
            }
        }

        // --------- Visi dan Misi ---------------
        if(this.conversationState !== "normal" && this.conversationState === "visi_misi") {
            // let detectedSubTopic =
            this.subtopicState = this.detectSubTopicVisiDanMisi(msg2);
            if(this.subtopicState === "visi") {
                const ansVisi = await fetch("http://127.0.0.1:5000/fc/topics/visi_misi/visi")
                const response = await ansVisi.json();
                msg2 = {name: "Bot", message: response.answer}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
                return;
            } else if (this.subtopicState === "misi") {
                const ansMisi = await fetch("http://127.0.0.1:5000/fc/topics/visi_misi/misi")
                const response = await ansMisi.json();
                msg2 = {name: "Bot", message: response.answer}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
                return;
            }

            else {
                const ansFail = await fetch("http://127.0.0.1:5000/fc/topics/visi_misi/fail")
                const response = await ansFail.json();
                msg2 = {name: "Bot", message: response.answer}
                this.messages.push(msg2);
                this.updateChatText(chatbox);
                textField.value = "";
                return;
            }
        }


    } catch (error) {
        console.error("Error:", error);
        this.updateChatText(chatbox);
        textField.value = "";
    }
  }

  detectTopic(text) {
      const pengembalianBuku = ["kembali", "buku"]
      const peminjamanBuku = ["pinjam", "buku"]
      const informasiUmum = ["informasi", "umum"]
      const informasiPerpustakaan = ["informasi", "pustaka"]
      const kelengkapanBerkasWisuda = ["lengkap", "berkas", "wisuda"]
      const berkasWisuda = ["berkas", "wisuda"]
      const visiDanMisi = ["visi", "misi"]

      let pengembalianBukuValid = pengembalianBuku.every(element => text.message.includes(element));
      let peminjamanBukuValid = peminjamanBuku.every(element => text.message.includes(element));
      let informasiPerpustakaanValid = informasiPerpustakaan.every(element => text.message.includes(element));
      let informasiUmumValid = informasiUmum.every(element => text.message.includes(element))
      let kelengkapanBerkasWisudaValid = kelengkapanBerkasWisuda.every(element => text.message.includes(element))
      let berkasWisudaValid = berkasWisuda.every(element => text.message.includes(element))
      let visiDanMisiValid = visiDanMisi.every(element => text.message.includes(element))

      if(pengembalianBukuValid) {
          return "pengembalian"
      } else if (peminjamanBukuValid) {
          return "peminjaman"
      } else if(informasiPerpustakaanValid || informasiUmumValid) {
          return "informasi_umum"
      } else if(kelengkapanBerkasWisudaValid || berkasWisudaValid) {
          return "berkas_wisuda"
      } else if(visiDanMisiValid) {
          return "visi_misi"
      }
  }

  detectSubTopicPengembalian(msg) {
      // const langkahPengembalian = ["langkah", "cara", "tutorial", "tutor"]
      // const kondisiPengembalian = ["rusak", "kondisi", "hilang"]
      // const dendaPengembalian = ["denda"]
      // const maksimalPengembalian = ["batas", "masa", "maksimal", "panjang", "lama"]

      // let langkahPengembalianBuku = langkahPengembalian.every(element => msg.message.includes(element));
      // let kondisiPengembalianBuku = kondisiPengembalian.every(element => msg.message.includes(element));

      if(msg.message.includes("langkah") || msg.message.includes("cara") || msg.message.includes("tutorial") || msg.message.includes("tutor")) {
          return "langkah"
      } else if(msg.message.includes("kondisi") || msg.message.includes("rusak") || msg.message.includes("hilang")) {
          return "kondisi"
      } else if(msg.message.includes("denda") || msg.message.includes("tentu")) {
          return "denda"
      } else if (msg.message.includes("batas") || msg.message.includes("masa") || msg.message.includes("maksimal") || msg.message.includes("panjang") || msg.message.includes("lama")) {
        return "maksimal"
      }
  }

  detectSubTopicPeminjaman(msg) {
      // const maksimalPeminjaman = ["batas", "masa", "maksimal", "panjang", "lama"]
      // const syaratPeminjaman = ["syarat", "butuh", "pinjam"]
      // const langkahPeminjaman = ["langkah", "cara", "tutorial", "tutor"]


      if(msg.message.includes("langkah") || msg.message.includes("cara") || msg.message.includes("tutorial") || msg.message.includes("tutor")) {
          return "langkah"
      } else if(msg.message.includes("syarat") || msg.message.includes("butuh")) {
          return "syarat"
      } else if (msg.message.includes("batas") || msg.message.includes("masa") || msg.message.includes("maksimal") || msg.message.includes("panjang") || msg.message.includes("lama")) {
        return "maksimal"
      }
  }

  detectSubTopicInformasiUmum(msg) {
      // const jamLayanan = ["jam", "buka", "tutup"]
      // const peraturanPengunjung = ["atur", 'wajib', 'tas', 'loker', 'jaket', 'makan', 'minum', 'presensi']
      // const dikembalikanOrangLain = ["kembali", "orang"] || ["kembali", "teman"]
      // const mou = ["mou"]
      // const strukturKeanggotaan = ["struktur", "anggota"]
      // const sertifikasiAkreditas = ["sertifikat", "akreditasi"]
      // const bebasPinjam = ["d", "pus"] || ["d", "pustaka"] || ["s", "pustaka", "d"] || ["s", "pus", "d"]

      const dikembalikanOrangLain = ["kembali", "orang"]
      const dikembalikanTeman =  ["kembali", "teman"]
      let dikembalikanOrangLainValid = dikembalikanOrangLain.every(element => msg.message.includes(element))
      let dikembalikanTemanValid = dikembalikanTeman.every(element => msg.message.includes(element))

      // Bebas Pinjam
      const bebasPinjamD3 = ["d", "pus"]
      const bebasPinjamD4 = ["d", "pustaka"]
      const bebasPinjamS2D3 = ["s", "pustaka", "d"]
      const bebasPinjamS2D4 = ["s", "pus", "d"]

      let bebasPinjamD3Valid = bebasPinjamD3.every(el => msg.message.includes(el))
      let bebasPinjamD4Valid = bebasPinjamD4.every(el => msg.message.includes(el))
      let bebasPinjamS2D3Valid = bebasPinjamS2D3.every(el => msg.message.includes(el))
      let bebasPinjamS2D4Valid = bebasPinjamS2D4.every(el => msg.message.includes(el))

      if(msg.message.includes("jam") || msg.message.includes("buka") || msg.message.includes("tutup")) {
          return "layanan"
      } else if(msg.message.includes("atur") || msg.message.includes("wajib") || msg.message.includes("tas") || msg.message.includes("loker") || msg.message.includes("jaket") || msg.message.includes("makan") || msg.message.includes("minum") || msg.message.includes("presensi")) {
          return "peraturan_kunjungan"
      } else if (msg.message.includes("mou") ) {
        return "mou"
      } else if (msg.message.includes("struktur") || msg.message.includes("anggota")) {
          return "struktur"
      } else if(msg.message.includes("sertifikat") || msg.message.includes("akreditasi")) {
          return "akreditasi"
      } else if (dikembalikanOrangLainValid || dikembalikanTemanValid) {
          return "dikembalikan_pihak_lain"
      } else if(bebasPinjamD3Valid || bebasPinjamD4Valid || bebasPinjamS2D3Valid || bebasPinjamS2D4Valid) {
          return "bebas_pinjam"
      }
  }

  detectSubTopicKelengkapanBerkas(msg) {
      // const syaratWisuda = ["syarat", "buka", "tutup"]
      // const isCdProyekAkhir = ["cd", "dvd", "kaset"] || ["tentu", "cd"] || ["isi", "cd"]
      // const codeQr = ["qr", "qrcode", "code", "kesah"] ||

      const ketentuanCd = ["tentu", "cd"]
      const isiCd = ["isi", "cd"]

      let ketentuanCdValid = ketentuanCd.every(element => msg.message.includes(element))
      let isiCdValid = isiCd.every(element => msg.message.includes(element))

      if(msg.message.includes("syarat") || msg.message.includes("wisuda")) {
          return "syarat_wisuda"
      } else if (msg.message.includes("kaset") || msg.message.includes("cd") || msg.message.includes("dvd") || ketentuanCdValid || isiCdValid ) {
          return "is_cd_proyek_akhir"
      } else if(msg.message.includes("qr") || msg.message.includes("qrcode") || msg.message.includes("code") || msg.message.includes("kode") || msg.message.includes("kesah") ) {
          return "qr_code"
      }
  }

  detectSubTopicVisiDanMisi(msg) {
      // const maksimalPeminjaman = ["batas", "masa", "maksimal", "panjang", "lama"]
      // const syaratPeminjaman = ["syarat", "butuh", "pinjam"]
      // const langkahPeminjaman = ["langkah", "cara", "tutorial", "tutor"]


      if(msg.message.includes("visi")) {
          return "visi"
      } else if(msg.message.includes('misi')) {
          return "misi"
      }
  }

  handleResponse(response ) {
    if(this.conversationState === "peminjaman") {

    }
  }

  updateChatText(chatbox) {
    var html = "";
    this.messages
      .slice()
      .reverse()
      .forEach(function (item, index) {
        if (item.name === "Bot") {
          html +=
            '<div class="messages__item messages__item--visitor">' +
            item.message +
            "</div>";
        } else {
          html +=
            '<div class="messages__item messages__item--operator">' +
            item.message +
            "</div>";
        }
      });

    const chatmessage = chatbox.querySelector(".chatbox__messages");
    chatmessage.innerHTML = html;
  }
}

const chatbox = new Chatbox();
chatbox.display();
